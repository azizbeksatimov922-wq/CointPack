import { useEffect, useState } from 'react'
import { ArrowLeft, Eye, House, ChartColumn, PiggyBank, Briefcase, Star, MapPin, TrendingUp, ChevronRight, LogOut, Target } from 'lucide-react'
import StartScreen from './splash.jsx'
import LoginComponent from './login.jsx'
import RegisterComponent from './register.jsx'
import JamgarmaScreen from './jamgarma.jsx'
import PulyejashScreen from './pulyejash.jsx'
import XarajatScreen from './xarajat.jsx'
import IshScreen from './ish.jsx'
import GpsScreen from './gps.jsx'
import { api } from './api.js'
const som = (n) => Math.round(n || 0).toLocaleString('ru').replace(/\s/g, ' ')
const CATS = [['Oziq-ovqat', '#3b6cf6'], ['Transport', '#ef4b5f'], ['Kiyim-kechak', '#a78bfa'], ["Ko'ngilochar", '#fbbf24'], ['Kommunal', '#34d399'], ['Boshqa', '#f472b6']]
const FOOD = [['Sofra Restoran', 4.7, 35000, 41.311, 69.279, 'Arzon narx'], ['Uzum Buloq', 4.6, 40000, 41.322, 69.25, 'Sifatli'], ['Chorraha Fast Food', 4.3, 30000, 41.3, 69.27, 'Tez va quloy'], ['Milliy Taomlar', 4.8, 30000, 41.33, 69.3, 'Mahalliy ta\'m']]
const dist = (a, b, c, d) => { const r = (x) => (x * Math.PI) / 180, h = Math.sin(r(c - a) / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(r(d - b) / 2) ** 2; return 12742 * Math.asin(Math.sqrt(h)) }

const Btn = (p) => <button {...p} className={'w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white active:scale-95 ' + (p.className || '')} />
const In = ({ label, ...p }) => <label className="block"><span className="mb-1 block text-xs text-slate-500">{label}</span><input {...p} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-blue-500" /></label>
const Top = ({ t, back }) => <div className="flex items-center gap-3 p-4">{back && <button onClick={back}><ArrowLeft size={20} /></button>}<h1 className="flex-1 text-center text-lg font-bold" style={{ marginRight: back ? 20 : 0 }}>{t}</h1></div>
const Shell = ({ children }) => <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl">{children}</div>
const HomeScreenLayout = ({ children }) => <main aria-label="Bosh sahifa">{children}</main>
const Screens = { home: HomeScreenLayout, save: JamgarmaScreen, tips: PulyejashScreen, exp: XarajatScreen, jobs: IshScreen, food: GpsScreen }
const RoutedScreen = ({ screenKey, children }) => {
  const Screen = Screens[screenKey]
  return Screen ? <Screen>{children}</Screen> : children
}

function Donut({ sums }) {
  const tot = sums.reduce((a, b) => a + b, 0) || 1; let acc = 0
  const g = sums.map((v, i) => { const s = acc; acc += (v / tot) * 100; return `${CATS[i][1]} ${s}% ${acc}%` }).join(',')
  return <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(${tot === 1 && !sums[0] ? '#e2e8f0 0 100%' : g})` }}>
    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white text-center"><span className="text-[10px] text-slate-400">Jami</span><b className="text-sm">{som(tot === 1 && !sums[0] ? 0 : tot)}</b><span className="text-[10px] text-slate-400">so'm</span></div>
  </div>
}

export default function App() {
  const [tok, setTok] = useState(localStorage.token)
  const [scr, setScr] = useState('splash'), [tab, setTab] = useState('home'), [sub, setSub] = useState(null)
  const [authError, setAuthError] = useState(''), [dataError, setDataError] = useState('')
  const [ex, setEx] = useState([]), [goals, setGoals] = useState([]), [jobs, setJobs] = useState([])
  const [pos, setPos] = useState(null), [gpsErr, setGpsErr] = useState(''), [jf, setJf] = useState('Onlayn'), [fq, setFq] = useState(''), [form, setForm] = useState({ category: CATS[0][0], amount: '', note: '' })
  const [g, setG] = useState({ title: '', target_amount: '', daily_amount: 50000, scheduled_time: '08:00', penalty_enabled: true })
  const jobLocations = [...new Set(jobs.map((job) => job.location_type).filter(Boolean))]

  const authenticate = async (values, registering = false) => {
    setAuthError('')
    try {
      const endpoint = registering ? '/register/' : '/login/'
      const body = registering
        ? { username: values.phone, first_name: values.name, email: values.email, password: values.password }
        : { username: values.phone, password: values.password }
      const r = await api(endpoint, { method: 'POST', body })
      localStorage.setItem('token', r.token)
      localStorage.setItem('phone', values.phone)
      localStorage.setItem('name', r.name || values.name || values.phone)
      setTok(r.token)
      setTab('home')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  useEffect(() => {
    if (!tok) return
    let cancelled = false
    const loadData = async () => {
      try {
        const [expenses, savings, jobList] = await Promise.all([
          api('/expenses/'),
          api('/savings/'),
          api('/jobs/'),
        ])
        if (cancelled) return
        setEx(expenses.map((expense) => ({
          ...expense,
          note: expense.title,
          created_at: expense.date,
        })))
        setGoals(savings.map((goal) => ({ ...goal, title: goal.name })))
        const mappedJobs = jobList.map((job) => ({
          ...job,
          location_type: job.location,
          platform: job.contact,
        }))
        setJobs(mappedJobs)
        if (mappedJobs.length > 0) setJf(mappedJobs[0].location_type)
        setDataError('')
      } catch (error) {
        if (!cancelled) setDataError(error.message)
      }
    }
    loadData()
    return () => { cancelled = true }
  }, [tok])
  const gps = () => navigator.geolocation ? navigator.geolocation.getCurrentPosition((p) => { setPos([p.coords.latitude, p.coords.longitude]); setGpsErr('') }, () => setGpsErr('GPS ruxsati berilmadi'), { enableHighAccuracy: true }) : setGpsErr('GPS qo\'llab-quvvatlanmaydi')
  useEffect(() => { if (tok) gps() }, [tok])

  const sums = CATS.map(([c]) => ex.filter((e) => e.category === c).reduce((a, e) => a + +e.amount, 0)), total = sums.reduce((a, b) => a + b, 0)
  const mo = [2, 1, 0].map((k) => { const d = new Date(); d.setMonth(d.getMonth() - k); return [d.toLocaleString('uz', { month: 'short' }), ex.filter((e) => { const c = new Date(e.created_at); return c.getMonth() === d.getMonth() && c.getFullYear() === d.getFullYear() }).reduce((a, e) => a + +e.amount, 0)] })
  const addEx = async () => {
    if (!+form.amount) return
    try {
      const expense = await api('/expenses/', {
        method: 'POST',
        body: {
          title: form.note || form.category,
          amount: form.amount,
          category: form.category,
          date: new Date().toISOString(),
        },
      })
      setEx((current) => [{ ...expense, note: expense.title, created_at: expense.date }, ...current])
      setForm({ ...form, amount: '', note: '' })
      setDataError('')
    } catch (error) {
      setDataError(error.message)
    }
  }
  const saveGoal = async () => {
    try {
      const goal = await api('/savings/', {
        method: 'POST',
        body: {
          name: g.title,
          target_amount: g.target_amount,
          current_amount: 0,
          daily_amount: g.daily_amount,
          scheduled_time: g.scheduled_time,
          penalty_enabled: g.penalty_enabled,
        },
      })
      setGoals((current) => [...current, { ...goal, title: goal.name }])
      setSub(null)
      setTab('save')
      setDataError('')
    } catch (error) {
      setDataError(error.message)
    }
  }
  const out = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('phone')
    localStorage.removeItem('name')
    setTok(null)
    setScr('splash')
  }

  if (!tok) {
    if (scr === 'splash') return <Shell><StartScreen onStart={() => setScr('login')} onLogin={() => setScr('login')} /></Shell>
    if (scr === 'register') return <Shell><RegisterComponent onSubmit={(values) => authenticate(values, true)} onLogin={() => { setAuthError(''); setScr('login') }} error={authError} /></Shell>
    return <Shell><LoginComponent onSubmit={(values) => authenticate(values)} onRegister={() => { setAuthError(''); setScr('register') }} error={authError} /></Shell>
  }

  const back = () => setSub(null)
  let body
  if (sub === 'analysis') body = <div className="space-y-4 p-4"><Top t="Xarajatlar tahlili" back={back} /><div className="flex rounded-full bg-slate-100 p-1 text-xs">{['Bu oy', 'Oxirgi 3 oy', 'Yil'].map((x, i) => <span key={x} className={'flex-1 rounded-full py-1.5 text-center ' + (i ? '' : 'bg-blue-600 text-white')}>{x}</span>)}</div><Donut sums={sums} />
    <div className="space-y-1.5">{CATS.map(([c, col], i) => <div key={c} className="flex items-center gap-2 text-sm"><i className="h-2.5 w-2.5 rounded-full" style={{ background: col }} /><span className="flex-1">{c}</span><b>{total ? Math.round((sums[i] / total) * 100) : 0}%</b></div>)}</div>
    <div className="rounded-2xl bg-emerald-50 p-4 text-sm"><b>Tahlil natijasi</b><p className="mt-1 text-slate-600">{total ? `Eng ko'p sarf: ${CATS[sums.indexOf(Math.max(...sums))][0]}.` : "Hali xarajat kiritilmagan."}</p><button onClick={() => setSub('tips')} className="mt-2 rounded-full bg-white px-3 py-1.5 text-emerald-700">Qanday tejash mumkin?</button></div>
    <h3 className="font-bold">O'tgan oylar bilan solishtirish</h3><div className="flex h-32 items-end justify-around">{mo.map(([m, v]) => <div key={m} className="text-center text-[10px]"><div className="mx-auto w-8 rounded-t bg-blue-500" style={{ height: Math.max(4, (v / Math.max(...mo.map((x) => x[1]), 1)) * 80) }} />{som(v)}<br />{m}</div>)}</div></div>
  else if (sub === 'tips') body = <div className="space-y-3 p-4"><Top t="Tejash bo'yicha maslahatlar" back={back} />{[['Keraksiz xarajatlarni kamaytiring', "Ko'ngilochar xarajatlarini nazorat qiling."], ["Uyg'un byudjet", "Oziq-ovqat uchun haftalik reja tuzing."], ["Tejash maqsadi qo'ying", "Masalan, 3 oyda 2 000 000 so'm jamg'aring."], ['Arzonroq variantlarni tanlang', "Arzon restoranlar ro'yxatiga qarang."]].map(([a, b]) => <div key={a} className="flex items-center rounded-2xl border p-4"><div className="flex-1"><b className="text-sm">{a}</b><p className="text-xs text-slate-500">{b}</p></div><ChevronRight size={16} /></div>)}<Btn onClick={back}>Yaxshi, tushunarli!</Btn></div>
  else if (sub === 'food') {
    const list = FOOD.map((f) => ({ f, d: pos ? dist(pos[0], pos[1], f[3], f[4]) : null })).filter(({ f }) => f[0].toLowerCase().includes(fq.toLowerCase())).sort((a, b) => (a.d ?? 0) - (b.d ?? 0))
    body = <div className="space-y-3 p-4"><Top t="Yaqin atrofdagi arzon va sifatli oziq-ovqat joylari" back={back} />
      <button onClick={gps} className="flex w-full items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-700"><MapPin size={16} />{pos ? `Joylashuv aniqlandi (${pos[0].toFixed(3)}, ${pos[1].toFixed(3)})` : gpsErr || 'GPS orqali joylashuvni aniqlash'}</button>
      <input value={fq} onChange={(e) => setFq(e.target.value)} placeholder="Joy nomi yoki taom turi..." className="w-full rounded-xl border px-3 py-3 text-sm outline-none" />
      {list.map(({ f, d }) => <div key={f[0]} className="flex items-center gap-3 rounded-2xl border p-3"><div className="h-14 w-14 rounded-xl bg-amber-100" /><div className="flex-1 text-sm"><b>{f[0]}</b><div className="flex items-center gap-1 text-xs text-slate-500"><Star size={12} className="fill-amber-400 text-amber-400" />{f[1]} {d != null && `· ${d.toFixed(1)} km`}</div><span className="rounded bg-emerald-50 px-1.5 text-[11px] text-emerald-700">{f[5]}</span><p className="text-xs text-slate-500">O'rtacha: {som(f[2])} so'm</p></div></div>)}</div>
  } else if (sub === 'addgoal') body = <div className="space-y-4 p-4"><Top t="Jamg'arma qo'shish" back={back} /><In label="Maqsadni tanlang" value={g.title} onChange={(e) => setG({ ...g, title: e.target.value })} placeholder="Noutbuk" /><In label="Summa" type="number" value={g.target_amount} onChange={(e) => setG({ ...g, target_amount: e.target.value })} /><Btn onClick={() => setSub('schedule')}>Davom etish</Btn></div>
  else if (sub === 'schedule') body = <div className="space-y-4 p-4"><Top t="Jamg'arma jadvali" back={() => setSub('addgoal')} /><In label="Kunlik to'lov miqdori (so'm)" type="number" value={g.daily_amount} onChange={(e) => setG({ ...g, daily_amount: e.target.value })} /><In label="Qaysi vaqtda?" type="time" value={g.scheduled_time} onChange={(e) => setG({ ...g, scheduled_time: e.target.value })} />
    <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">Belgilangan vaqtdan 60 daqiqa kech qolsangiz, kunlik summa kartadan yechib olinadi.</p>
    <label className="flex justify-between text-sm">Bildirishnoma <input type="checkbox" checked={g.penalty_enabled} onChange={(e) => setG({ ...g, penalty_enabled: e.target.checked })} /></label><Btn onClick={saveGoal}>Saqlash</Btn></div>
  else if (tab === 'home') body = <div><div className="rounded-b-3xl bg-gradient-to-b from-blue-600 to-indigo-800 p-5 pb-16 text-white"><div className="flex justify-between"><b>StartApp</b><button onClick={out} aria-label="Chiqish" title="Chiqish"><LogOut size={18} /></button></div><h2 className="mt-3 text-xl font-bold">Salom, {localStorage.name || 'foydalanuvchi'}!</h2><p className="text-sm opacity-80">Bugun ham o'z maqsading sari bir qadam yaqin ekansan!</p></div>
    <div className="-mt-12 space-y-4 p-4"><div className="rounded-2xl bg-white p-4 shadow-lg"><div className="flex justify-between text-sm text-slate-500">Jami xarajat <Eye size={16} /></div><b className="text-2xl">{som(total)} so'm</b></div>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">{[['Tahlil', 'analysis'], ['Oziq-ovqat', 'food'], ['Ishlar', 'jobs'], ["Jamg'arma", 'save']].map(([l, k]) => <button key={k} onClick={() => (['analysis', 'food'].includes(k) ? setSub(k) : setTab(k))} className="rounded-2xl border p-3">{l}</button>)}</div>
      <h3 className="font-bold">Tezkor amallar</h3><div className="grid grid-cols-2 gap-2 text-sm">{[['Xarajat tahlili', () => setSub('analysis')], ["Jamg'arma qo'shish", () => setSub('addgoal')], ['Yangi maqsad', () => setSub('addgoal')], ['Ish topish', () => setTab('jobs')]].map(([l, f]) => <button key={l} onClick={f} className="rounded-2xl border p-4 text-left">{l}</button>)}</div></div></div>
  else if (tab === 'exp') body = <div className="space-y-3 p-4"><Top t="Xarajatlar" /><div className="space-y-2 rounded-2xl border p-3"><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border p-3">{CATS.map(([c]) => <option key={c}>{c}</option>)}</select><In label="Summa (so'm)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /><In label="Izoh" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /><Btn onClick={addEx}>Xarajat qo'shish</Btn></div><button onClick={() => setSub('analysis')} className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-700">Tahlilni ko'rish</button>
    {ex.map((e, i) => <div key={i} className="flex justify-between rounded-xl border p-3 text-sm"><span>{e.category}<small className="block text-slate-400">{e.note}</small></span><b>-{som(e.amount)}</b></div>)}</div>
  else if (tab === 'save') body = <div className="space-y-3 p-4"><Top t="Jamg'arish maqsadi" /><div className="rounded-2xl bg-blue-50 p-4 text-center text-sm"><Target className="mx-auto text-blue-600" size={36} /><p className="my-2 text-slate-600">Orzularingizga yaqinlashing. O'zingiz uchun pul yig'ing va kelajakni rejalashtiring.</p><button onClick={() => setSub('addgoal')} className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white">Yangi maqsad qo'shish</button></div><h3 className="font-bold">Mening maqsadlarim</h3>
    {goals.map((x, i) => { const p = Math.min(100, (x.current_amount / x.target_amount) * 100 || 0); return <div key={i} className="rounded-2xl border p-4 text-sm"><div className="flex justify-between"><b>{x.title}</b><span>{som(x.target_amount)} so'm</span></div><div className="my-2 h-1.5 rounded bg-slate-100"><div className="h-full rounded bg-blue-600" style={{ width: p + '%' }} /></div><small className="text-slate-500">{Math.round(p)}% · kuniga {som(x.daily_amount)} so'm</small></div> })}</div>
  else if (tab === 'jobs') body = <div className="space-y-3 p-4"><Top t="Ko'proq pul beradigan ishlar" /><div className="flex flex-wrap gap-2 text-sm">{jobLocations.map((c) => <button key={c} onClick={() => setJf(c)} className={'rounded-full px-3 py-2 ' + (jf === c ? 'bg-blue-600 text-white' : 'bg-slate-100')}>{c}</button>)}</div>
    {jobs.filter((j) => j.location_type === jf).map((j, i) => <div key={i} className="rounded-2xl border p-4 text-sm"><b>{j.title}</b><p className="text-emerald-600">{j.salary}</p><small className="text-slate-500">{j.platform}</small></div>)}
    {!jobs.some((j) => j.location_type === jf) && <p className="rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500">Bu bo‘limda hozircha vakansiyalar yo‘q.</p>}</div>
  else body = <div className="space-y-2 p-4"><div className="py-4 text-center"><div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">{(localStorage.name || 'U')[0]}</div><b>{localStorage.name}</b><p className="text-xs text-slate-400">{localStorage.phone}</p></div>{['Shaxsiy ma\'lumot', 'Xavfsizlik', 'Bildirishnomalar', 'Til', 'Yordam va qo\'llab-quvvatlash'].map((x) => <div key={x} className="flex justify-between rounded-xl border p-3 text-sm">{x}<ChevronRight size={16} /></div>)}<button onClick={out} className="flex items-center gap-2 p-3 text-sm text-red-500"><LogOut size={16} />Chiqish</button></div>

  const T = [['home', House, 'Bosh sahifa'], ['jamgarma', PiggyBank, "Jamg'arma"], ['pulyejash', TrendingUp, 'Pul tejash'], ['xarajat', ChartColumn, 'Xarajat'], ['ish', Briefcase, 'Ish'], ['gps', MapPin, 'GPS']]
  const route = { home: 'home', jamgarma: 'save', xarajat: 'exp', ish: 'jobs' }
  const subRoute = { pulyejash: 'tips', gps: 'food' }
  const screenKey = sub || tab
  return <Shell><div className="pb-20">{dataError && <p role="alert" className="m-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{dataError}</p>}<RoutedScreen screenKey={screenKey}>{body}</RoutedScreen></div><nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 justify-around border-t bg-white py-2">{T.map(([k, I, l]) => {
    const selected = subRoute[k] ? sub === subRoute[k] : !sub && (route[k] || k) === tab
    return <button key={k} onClick={() => { setTab(route[k] || 'home'); setSub(subRoute[k] || null) }} className={'flex flex-col items-center text-[10px] ' + (selected ? 'text-blue-600' : 'text-slate-400')}><I size={20} />{l}</button>
  })}</nav></Shell>
}