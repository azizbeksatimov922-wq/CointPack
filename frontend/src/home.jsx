import React, { useState, useEffect } from 'react';
import { 
  Home, PieChart, Wallet, Briefcase, Navigation, User, Eye, EyeOff, 
  Mic, MicOff, Plus, Search, 
  TrendingUp, AlertTriangle, Compass,
  Moon, Sun, Trash2, ShieldCheck, MessageSquare, Target, KeyRound,
  Send, CornerDownLeft, CheckCircle2, ChevronRight, Receipt
} from 'lucide-react';

export default function App() {
  // USER AUTHENTICATION STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLoginInput, setUserLoginInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('home'); 
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [totalBalance, setTotalBalance] = useState(12480000);
  const [darkMode, setDarkMode] = useState(true);

  // ADMIN AUTHENTICATION STATE (Parollar yashirilgan)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('jobs'); // 'jobs' | 'messages'

  const [user] = useState({ 
    name: 'Munisa Abdulhaqova', 
    phone: '+998 90 123 45 67',
    email: 'munisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  });

  const [isRecording, setIsRecording] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Korzinka Supermarket', amount: 120000, category: 'Oziq-ovqat', date: 'Bugun, 14:20' },
    { id: 2, title: 'Yandex Taxi', amount: 25000, category: 'Transport', date: 'Bugun, 09:15' },
    { id: 3, title: 'Kiyim xaridi', amount: 450000, category: 'Kiyim-kechak', date: 'Kecha' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Oziq-ovqat');

  // JAMG'ARISH (SAVINGS) STATE
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'Yangi telefon (iPhone 15)', targetAmount: 12000000, currentAmount: 4500000 },
    { id: 2, name: 'Sayohat uchun', targetAmount: 5000000, currentAmount: 2100000 }
  ]);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [addSavingId, setAddSavingId] = useState(null);
  const [addSavingAmount, setAddSavingAmount] = useState('');

  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [addressName, setAddressName] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ISHLAR MA'LUMOTLARI
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', company: 'IT Tech', salary: "8 000 000 - 12 000 000 so'm", location: 'Toshkent', contact: '@hr_ittech' },
    { id: 2, title: 'SMM Menejer', company: 'Creative Agency', salary: "4 000 000 - 6 000 000 so'm", location: 'Masofaviy', contact: '@creative_smm' },
    { id: 3, title: 'Grafik Dizayner', company: 'Brand Studio', salary: "5 000 000 - 9 000 000 so'm", location: 'Samarqand', contact: '@brand_hr' }
  ]);

  // MIJOZLAR XABARLARI VA ADMIN JAVOBLARI (CHAT TIZIMI)
  const [userMessages, setUserMessages] = useState([
    { 
      id: 1, 
      sender: 'Sardor', 
      phone: '+998 91 234 56 78', 
      message: "Menga ishchi kerak, shuni qo'shib bering. Backend dasturchi qidiryapmiz.", 
      date: 'Bugun, 10:30',
      replies: [
        { id: 101, text: "Assalomu alaykum! E'loningiz qabul qilindi, tez orada e'lonlar bo'limiga qo'shamiz.", date: 'Bugun, 10:35' }
      ]
    },
    { 
      id: 2, 
      sender: 'Munisa Abdulhaqova', 
      phone: '+998 90 123 45 67', 
      message: "Ish o'rinlari bo'limi juda qulay ekan, rahmat!", 
      date: 'Kecha, 18:45',
      replies: []
    }
  ]);

  // FOYDALANUVCHIDAN XABAR YUBORISH STATE
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMsg, setClientMsg] = useState('');
  const [msgSentSuccess, setMsgSentSuccess] = useState(false);

  // ADMIN JAVOB YAZISH STATE
  const [replyingMsgId, setReplyingMsgId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // ADMIN YANGI ISH QO'SHISH FORMASI
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    salary: '',
    location: '',
    contact: ''
  });

  // FOYDALANUVCHINI TIZIMGA KIRITISH (USER LOGIN)
  const handleUserLogin = (e) => {
    e.preventDefault();
    if (userLoginInput.trim() !== '' && userPasswordInput.trim() !== '') {
      setIsAuthenticated(true);
      setAuthError('');
      setUserLoginInput('');
      setUserPasswordInput('');
      setActiveTab('home');
    } else {
      setAuthError("Iltimos, login va parolni kiriting!");
    }
  };

  const handleGoogleLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
    setActiveTab('home');
  };

  const handleUserLogout = () => {
    if (window.confirm("Rostdan ham hisobingizdan chiqmoqchimisiz?")) {
      setIsAuthenticated(false);
      setActiveTab('home');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c; 
    
    if (dist < 1) {
      return { num: Math.round(dist * 1000), text: `${Math.round(dist * 1000)} m` };
    }
    return { num: dist * 1000, text: `${dist.toFixed(1)} km` };
  };

  const fetchNearbyPlaces = () => {
    if (!navigator.geolocation) {
      setGpsError("Qurilmangizda GPS xizmati qo'llab-quvvatlanmaydi.");
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };

    const handleSuccess = async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const acc = position.coords.accuracy;

      setLocation({ lat, lon });
      setAccuracy(Math.round(acc));

      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=uz,ru,en`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const addr = geoData.address || {};
          const place = addr.city || addr.town || addr.village || addr.county || addr.suburb || addr.state || 'Sizning hududigiz';
          const road = addr.road ? `, ${addr.road}` : '';
          setAddressName(`${place}${road}`);
        } else {
          setAddressName(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        }

        const query = `
          [out:json][timeout:25];
          (
            node["amenity"~"restaurant|cafe|fast_food|food_court"](around:3000, ${lat}, ${lon});
            way["amenity"~"restaurant|cafe|fast_food|food_court"](around:3000, ${lat}, ${lon});
          );
          out center 25;
        `;
        const overpassRes = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });

        if (overpassRes.ok) {
          const overpassData = await overpassRes.json();
          const places = overpassData.elements.map((item) => {
            const itemLat = item.lat || (item.center && item.center.lat);
            const itemLon = item.lon || (item.center && item.center.lon);
            const name = item.tags?.name || item.tags?.['name:uz'] || item.tags?.['name:ru'] || 'Oshxona / Kafe';
            const type = item.tags?.cuisine || item.tags?.amenity || 'Milliy taomlar';
            const distObj = itemLat && itemLon ? calculateDistance(lat, lon, itemLat, itemLon) : { num: 99999, text: 'Yaqin joyda' };

            return {
              id: item.id,
              name,
              type: type.replace('_', ' '),
              distText: distObj.text,
              distNum: distObj.num,
              lat: itemLat,
              lon: itemLon
            };
          });

          places.sort((a, b) => a.distNum - b.distNum);
          setRestaurants(places);
        } else {
          setGpsError("Oshxona ma'lumotlarini yuklashda xatolik yuz berdi.");
        }
      } catch (err) {
        setGpsError("Tarmoq xatoligi yuz berdi.");
      } finally {
        setGpsLoading(false);
      }
    };

    const handleError = () => {
      setGpsLoading(false);
      setGpsError("GPS-ga ruxsat berilmadi yoki aniqlash imkoni bo'lmadi.");
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };

  useEffect(() => {
    if (activeTab === 'gps' && !location && !gpsLoading && isAuthenticated) {
      fetchNearbyPlaces();
    }
  }, [activeTab, isAuthenticated]);

  // ADMIN LOGIN TEKSHIRISH
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'adminjon' && adminPassword === 'adminaka') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setAdminUsername('');
      setAdminPassword('');
    } else {
      setLoginError("Foydalanuvchi nomi yoki parol noto'g'ri!");
    }
  };

  // MIJOZ TARAFI: XABAR YUBORISH
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!clientName || !clientMsg) return;

    const newMsg = {
      id: Date.now(),
      sender: clientName,
      phone: clientPhone || user.phone,
      message: clientMsg,
      date: 'Hozir',
      replies: []
    };

    setUserMessages(prev => [newMsg, ...prev]);
    setClientName('');
    setClientPhone('');
    setClientMsg('');
    setMsgSentSuccess(true);
    setTimeout(() => setMsgSentSuccess(false), 3000);
  };

  // ADMIN TARAFI: FOYDALANUVCHIGA JAVOB YAZISH
  const handleSendAdminReply = (msgId) => {
    if (!adminReplyText.trim()) return;

    const newReply = {
      id: Date.now(),
      text: adminReplyText,
      date: 'Hozir'
    };

    setUserMessages(prev => prev.map(msg => {
      if (msg.id === msgId) {
        return {
          ...msg,
          replies: [...msg.replies, newReply]
        };
      }
      return msg;
    }));

    setAdminReplyText('');
    setReplyingMsgId(null);
  };

  // JAMG'ARMA: YANGI MAQSAD QO'SHISH
  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalName || !goalTarget) return;

    const newGoal = {
      id: Date.now(),
      name: goalName,
      targetAmount: parseInt(goalTarget),
      currentAmount: 0
    };

    setSavingsGoals(prev => [...prev, newGoal]);
    setGoalName('');
    setGoalTarget('');
  };

  // JAMG'ARMA: PUL QO'SHISH
  const handleAddMoneyToGoal = (id) => {
    const amount = parseInt(addSavingAmount);
    if (!amount || amount <= 0) return;

    if (totalBalance < amount) {
      alert("Balansingizda yetarli mablag' mavjud emas!");
      return;
    }

    setSavingsGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return { ...goal, currentAmount: goal.currentAmount + amount };
      }
      return goal;
    }));

    setTotalBalance(prev => prev - amount);
    setAddSavingId(null);
    setAddSavingAmount('');
  };

  // JAMG'ARMA: MAQSADNI O'CHIRISH
  const handleDeleteGoal = (id) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli kirishni qo'llab-quvvatlanmaydi.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const numMatch = text.match(/\d+/g);
      const amount = numMatch ? parseInt(numMatch.join('')) * (text.toLowerCase().includes('ming') ? 1000 : 1) : 15000;
      
      const newTx = { id: Date.now(), title: text, amount, category: 'Ovozli', date: 'Hozir' };
      setTransactions(prev => [newTx, ...prev]);
      setTotalBalance(prev => prev - amount);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const amountNum = parseInt(newAmount);
    const newTx = {
      id: Date.now(),
      title: newTitle,
      amount: amountNum,
      category: newCategory,
      date: 'Hozir'
    };

    setTransactions(prev => [newTx, ...prev]);
    setTotalBalance(prev => prev - amountNum);
    setNewTitle('');
    setNewAmount('');
  };

  // ADMIN: Yangi ish qo'shish
  const handleAddJob = (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.company || !jobForm.salary) {
      alert("Iltimos, asosiy maydonlarni to'ldiring!");
      return;
    }

    const newJob = {
      id: Date.now(),
      title: jobForm.title,
      company: jobForm.company,
      salary: jobForm.salary,
      location: jobForm.location || 'Toshkent',
      contact: jobForm.contact || '@hr_admin'
    };

    setJobs(prev => [newJob, ...prev]);
    setJobForm({ title: '', company: '', salary: '', location: '', contact: '' });
    alert("Yangi ish e'loni muvaffaqiyatli qo'shildi!");
  };

  // ADMIN: Ish e'lonini o'chirish
  const handleDeleteJob = (id) => {
    if (window.confirm("Rostdan ham ushbu e'lonni o'chirmoqchimisiz?")) {
      setJobs(prev => prev.filter(job => job.id !== id));
    }
  };

  // ADMIN: Xabarni o'chirish
  const handleDeleteMessage = (id) => {
    setUserMessages(prev => prev.filter(m => m.id !== id));
  };

  const openTelegram = () => {
    window.open('https://t.me/telegram', '_blank');
  };

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex justify-center min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-200'}`}>
      <div className={`w-full max-w-[410px] min-h-screen flex flex-col relative pb-20 font-sans shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

        {/* 1. FOYDALANUVCHINING LOGIN SAHIFASI */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center mx-auto border border-blue-500/20 shadow-lg">
                <TrendingUp size={32} />
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                StartApp
              </h2>
              <p className="text-xs text-slate-400">Tizimga kirish uchun ma&apos;lumotlaringizni kiriting</p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleUserLogin} className={`p-5 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white border-slate-200'}`}>
              <div>
                <label className="text-[10px] text-slate-400 font-medium mb-1 block">Login yoki Telefon</label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <User size={16} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Login yoki telefon raqamingiz" 
                    value={userLoginInput}
                    onChange={(e) => setUserLoginInput(e.target.value)}
                    className="bg-transparent text-xs outline-none w-full"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-medium mb-1 block">Parol</label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <KeyRound size={16} className="text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={userPasswordInput}
                    onChange={(e) => setUserPasswordInput(e.target.value)}
                    className="bg-transparent text-xs outline-none w-full"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95"
              >
                Kirish
              </button>

              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-slate-700/50"></div>
                <span className="px-3 text-[10px] text-slate-400 uppercase font-medium">yoki</span>
                <div className="flex-1 border-t border-slate-700/50"></div>
              </div>

              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border text-xs font-bold transition active:scale-95 shadow-sm ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google orqali kirish
              </button>
            </form>
          </div>
        ) : (
          /* 2. TIZIMGA KIRILGAN KO'RINISH */
          <>
            {activeTab === 'home' && (
              <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-50">
                <button 
                  onClick={startVoiceRecognition}
                  className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform active:scale-95 border border-white/20 ${
                    isRecording ? 'bg-rose-600 animate-pulse text-white' : 'bg-blue-600 text-white'
                  }`}
                  title="Ovozli xarajat"
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button 
                  onClick={openTelegram}
                  className="w-12 h-12 rounded-full bg-[#2AABEE] text-white shadow-xl flex items-center justify-center transition-transform active:scale-95 border border-white/20"
                  title="Telegram"
                >
                  <Send size={18} className="mr-0.5" />
                </button>
              </div>
            )}

            {/* HEADER */}
            {activeTab !== 'home' && (
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-40 shadow-sm ${darkMode ? 'bg-slate-900/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-100 backdrop-blur-md'}`}>
                <button onClick={() => setActiveTab('home')} className="text-xs font-bold text-blue-500 flex items-center gap-1">
                  ← Orqaga
                </button>
                <span className={`text-xs font-bold capitalize ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {activeTab === 'expenses' && 'Xarajatlar'}
                  {activeTab === 'analytics' && 'Xarajatlar tahlili'}
                  {activeTab === 'gps' && 'Aniq GPS & Oshxonalar'}
                  {activeTab === 'savings' && "Jamg'arish Maqsadi"}
                  {activeTab === 'jobs' && "Ko'proq pul beradigan ishlar"}
                  {activeTab === 'contact' && 'Admin bilan aloqa & Chat'}
                  {activeTab === 'admin' && 'Admin Panel'}
                  {activeTab === 'profile' && 'Shaxsiy profil'}
                </span>
                <div className="w-10"></div>
              </div>
            )}

            {/* BOSH SAHIFA */}
            {activeTab === 'home' && (
              <div>
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white p-6 rounded-b-[32px] shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                        <TrendingUp size={18} />
                      </div>
                      <span className="font-extrabold text-lg tracking-tight">StartApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setDarkMode(!darkMode)} 
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition backdrop-blur-sm"
                        title={darkMode ? "Kun rejimi" : "Tun rejimi"}
                      >
                        {darkMode ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-blue-100" />}
                      </button>
                      <button 
                        onClick={() => setActiveTab('admin')}
                        className={`p-2 rounded-xl transition backdrop-blur-sm border ${
                          isAdminLoggedIn ? 'bg-amber-500 text-white border-amber-400' : 'bg-white/20 text-blue-100 border-white/30'
                        }`}
                        title="Admin Panel"
                      >
                        <ShieldCheck size={18} />
                      </button>
                      <img onClick={() => setActiveTab('profile')} src={user.avatar} className="w-8 h-8 rounded-full border-2 border-white/40 cursor-pointer object-cover" alt="avatar" />
                    </div>
                  </div>

                  <h2 className="text-lg font-bold">Salom, {user.name.split(' ')[0]}!</h2>
                  <p className="text-[11px] text-blue-100/80 mt-0.5">Bugun ham o&apos;z maqsading sari bir qadam yaqinsan!</p>

                  <div className={`mt-4 rounded-2xl p-4 shadow-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700/60 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                    <div className={`flex justify-between items-center text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>Jami mablag&apos;</span>
                      <button onClick={() => setBalanceVisible(!balanceVisible)}>
                        {balanceVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                    <div className={`text-xl font-black mt-1 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {balanceVisible ? `${totalBalance.toLocaleString()} so'm` : "•••••••• so'm"}
                    </div>
                  </div>
                </div>

                <div className="px-5 mt-5">
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { title: 'Xarajatlar', icon: Receipt, color: 'bg-rose-500/10 text-rose-500', tab: 'expenses' },
                      { title: 'Tahlil', icon: PieChart, color: 'bg-blue-500/10 text-blue-500', tab: 'analytics' },
                      { title: 'Yaqin Oshxona', icon: Navigation, color: 'bg-amber-500/10 text-amber-500', tab: 'gps' },
                      { title: "Jamg'arma", icon: Wallet, color: 'bg-indigo-500/10 text-indigo-500', tab: 'savings' }
                    ].map((item, idx) => (
                      <button key={idx} onClick={() => setActiveTab(item.tab)} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition active:scale-95 ${darkMode ? 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className={`p-2.5 rounded-xl ${item.color}`}>
                          <item.icon size={18} />
                        </div>
                        <span className={`text-[10px] font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-5 mt-5 space-y-3">
                  <h3 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Tezkor amallar</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setActiveTab('expenses')} className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition ${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><Receipt size={16} /></div>
                      <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Xarajatlarim</span>
                    </button>
                    <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition ${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><PieChart size={16} /></div>
                      <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Xarajat tahlili</span>
                    </button>
                    <button onClick={() => setActiveTab('gps')} className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition ${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Compass size={16} /></div>
                      <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Aniq GPS Joylashuv</span>
                    </button>
                    <button onClick={() => setActiveTab('jobs')} className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition ${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><Briefcase size={16} /></div>
                      <div>
                        <span className={`text-[11px] font-bold block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Ish topish</span>
                        <span className="text-[9px] text-emerald-400 font-medium">{jobs.length} ta vakansiya</span>
                      </div>
                    </button>
                  </div>

                  <button 
                    onClick={() => setActiveTab('contact')} 
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition ${darkMode ? 'bg-indigo-900/30 border-indigo-700/50 text-indigo-200' : 'bg-indigo-50 border-indigo-100 text-indigo-900'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Admin bilan bog&apos;lanish</span>
                        <span className="text-[10px] text-indigo-400/80">Xabar yuborish va javoblarni olish</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-indigo-400" />
                  </button>
                </div>
              </div>
            )}

            {/* XARAGATLAR BO'LIMI */}
            {activeTab === 'expenses' && (
              <div className="p-5 space-y-4">
                <form onSubmit={handleAddExpense} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Yangi xarajat qo&apos;shish</h4>
                  <input 
                    type="text" 
                    placeholder="Xarajat nomi (masalan: Tushlik)" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Summa (so'm)" 
                      value={newAmount} 
                      onChange={(e) => setNewAmount(e.target.value)} 
                      className={`w-1/2 border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                    />
                    <select 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)} 
                      className={`w-1/2 border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                    >
                      <option value="Oziq-ovqat">Oziq-ovqat</option>
                      <option value="Transport">Transport</option>
                      <option value="Kiyim-kechak">Kiyim-kechak</option>
                      <option value="Xizmatlar">Xizmatlar</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition">Qo&apos;shish</button>
                </form>

                <div className="space-y-2">
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Tarix</h4>
                  {transactions.map((tx) => (
                    <div key={tx.id} className={`p-3 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div>
                        <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{tx.title}</div>
                        <div className="text-[10px] text-slate-400">{tx.category} • {tx.date}</div>
                      </div>
                      <div className="text-xs font-extrabold text-rose-500">
                        -{tx.amount.toLocaleString()} so&apos;m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAHLIL (ANALYTICS) BO'LIMI */}
            {activeTab === 'analytics' && (
              <div className="p-5 space-y-4">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <h4 className={`text-xs font-bold mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Kategoriyalar bo&apos;yicha</h4>
                  <div className="space-y-3">
                    {[
                      { cat: 'Oziq-ovqat', pct: '45%', color: 'bg-rose-500' },
                      { cat: 'Kiyim-kechak', pct: '35%', color: 'bg-indigo-500' },
                      { cat: 'Transport', pct: '20%', color: 'bg-amber-500' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item.cat}</span>
                          <span className="text-slate-400">{item.pct}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/20 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: item.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GPS & OSHXONALAR BO'LIMI */}
            {activeTab === 'gps' && (
              <div className="p-5 space-y-4">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                      <Navigation size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{addressName || "Joylashuv aniqlanmoqda..."}</div>
                      {accuracy && <div className="text-[10px] text-slate-400">Aniqlik darajasi: ~{accuracy} metr</div>}
                    </div>
                  </div>
                  <button 
                    onClick={fetchNearbyPlaces}
                    disabled={gpsLoading}
                    className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-xl transition"
                  >
                    {gpsLoading ? "Yangilanmoqda..." : "Joylashuvni yangilash"}
                  </button>
                </div>

                {gpsError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>{gpsError}</span>
                  </div>
                )}

                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Search size={16} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Oshxona yoki kafe qidirish..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs outline-none w-full"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Yaqin atrofdagi oshxonalar ({filteredRestaurants.length})</h4>
                  {filteredRestaurants.map((res) => (
                    <div key={res.id} className={`p-3 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div>
                        <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{res.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{res.type}</div>
                      </div>
                      <div className="text-xs font-extrabold text-amber-500">
                        {res.distText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JAMG'ARMA BO'LIMI */}
            {activeTab === 'savings' && (
              <div className="p-5 space-y-4">
                <form onSubmit={handleCreateGoal} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Yangi maqsad yaratish</h4>
                  <input 
                    type="text" 
                    placeholder="Maqsad nomi (masalan: Noutbuk)" 
                    value={goalName} 
                    onChange={(e) => setGoalName(e.target.value)} 
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <input 
                    type="number" 
                    placeholder="Kerakli summa (so'm)" 
                    value={goalTarget} 
                    onChange={(e) => setGoalTarget(e.target.value)} 
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition">Maqsadni Saqlash</button>
                </form>

                <div className="space-y-3">
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Mening maqsadlarim</h4>
                  {savingsGoals.map((goal) => {
                    const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
                    return (
                      <div key={goal.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{goal.name}</div>
                            <div className="text-[10px] text-slate-400">{goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} so&apos;m</div>
                          </div>
                          <button onClick={() => handleDeleteGoal(goal.id)} className="text-slate-500 hover:text-rose-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="w-full h-2 bg-slate-700/20 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[10px] font-bold text-indigo-400">{percent}% bajarildi</span>
                          {addSavingId === goal.id ? (
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                placeholder="Summa" 
                                value={addSavingAmount}
                                onChange={(e) => setAddSavingAmount(e.target.value)}
                                className={`w-20 p-1 text-[10px] rounded border outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                              />
                              <button onClick={() => handleAddMoneyToGoal(goal.id)} className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded">
                                +
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setAddSavingId(goal.id)} className="text-[10px] font-bold text-emerald-400 hover:underline">
                              + Pul qo&apos;shish
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ISHLAR BO'LIMI */}
            {activeTab === 'jobs' && (
              <div className="p-5 space-y-3">
                <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Mavjud vakansiyalar</h4>
                {jobs.map((job) => (
                  <div key={job.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{job.title}</div>
                        <div className="text-[10px] text-slate-400">{job.company} • {job.location}</div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Aktiv</span>
                    </div>
                    <div className="text-xs font-extrabold text-emerald-500">{job.salary}</div>
                    <div className="text-[10px] text-blue-400 font-medium">Aloqa: {job.contact}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ALOQA VA CHAT BO'LIMI */}
            {activeTab === 'contact' && (
              <div className="p-5 space-y-4">
                <form onSubmit={handleSendMessage} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Admin uchun xabar qoldiring</h4>
                  <input 
                    type="text" 
                    placeholder="Ismingiz" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <input 
                    type="text" 
                    placeholder="Telefon raqamingiz (ixtiyoriy)" 
                    value={clientPhone} 
                    onChange={(e) => setClientPhone(e.target.value)} 
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <textarea 
                    placeholder="Xabaringiz yoki e'lon matni..." 
                    value={clientMsg} 
                    onChange={(e) => setClientMsg(e.target.value)} 
                    rows={3}
                    className={`w-full border p-2.5 rounded-xl text-xs outline-none resize-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition">
                    Xabar Yuborish
                  </button>
                  {msgSentSuccess && (
                    <div className="text-[10px] text-emerald-400 font-bold text-center">Xabar admin paneliga yuborildi!</div>
                  )}
                </form>

                <div className="space-y-3">
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Sizning xabarlaringiz va javoblar</h4>
                  {userMessages.map((msg) => (
                    <div key={msg.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-400">{msg.sender}</span>
                        <span className="text-[9px] text-slate-500">{msg.date}</span>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{msg.message}</p>
                      
                      {msg.replies.length > 0 && (
                        <div className="mt-2 pl-3 border-l-2 border-indigo-500 space-y-2">
                          {msg.replies.map((r) => (
                            <div key={r.id} className="bg-indigo-500/10 p-2 rounded-xl">
                              <div className="text-[9px] font-bold text-indigo-400">Admin javobi:</div>
                              <p className={`text-[11px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{r.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN PANEL */}
            {activeTab === 'admin' && (
              <div className="p-5 space-y-4">
                {!isAdminLoggedIn ? (
                  <form onSubmit={handleAdminLogin} className={`p-5 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white border-slate-200'}`}>
                    <div className="text-center space-y-1">
                      <ShieldCheck size={32} className="mx-auto text-amber-500" />
                      <h3 className={`text-base font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Admin Kirish</h3>
                    </div>

                    {loginError && (
                      <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-[11px]">
                        {loginError}
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Login</label>
                      <input 
                        type="text" 
                        placeholder="Admin login" 
                        value={adminUsername} 
                        onChange={(e) => setAdminUsername(e.target.value)} 
                        className={`w-full border p-2.5 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Parol</label>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <input 
                          type={showAdminPassword ? "text" : "password"} 
                          placeholder="Admin parol" 
                          value={adminPassword} 
                          onChange={(e) => setAdminPassword(e.target.value)} 
                          className="bg-transparent text-xs outline-none w-full"
                        />
                        <button type="button" onClick={() => setShowAdminPassword(!showAdminPassword)}>
                          {showAdminPassword ? <EyeOff size={14} className="text-slate-400" /> : <Eye size={14} className="text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-3 rounded-xl shadow-lg transition">
                      Admin Panelga Kirish
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Admin Boshqaruvi</span>
                      <button onClick={() => setIsAdminLoggedIn(false)} className="text-[10px] text-rose-400 hover:underline">
                        Chiqish
                      </button>
                    </div>

                    <div className="flex border-b border-slate-700">
                      <button 
                        onClick={() => setAdminActiveTab('jobs')} 
                        className={`flex-1 py-2 text-center text-xs font-bold border-b-2 ${adminActiveTab === 'jobs' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'}`}
                      >
                        Ishlar Boshqaruvi
                      </button>
                      <button 
                        onClick={() => setAdminActiveTab('messages')} 
                        className={`flex-1 py-2 text-center text-xs font-bold border-b-2 ${adminActiveTab === 'messages' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'}`}
                      >
                        Mijoz Xabarlari
                      </button>
                    </div>

                    {adminActiveTab === 'jobs' && (
                      <div className="space-y-4">
                        <form onSubmit={handleAddJob} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                          <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Yangi vakansiya qo&apos;shish</h4>
                          <input 
                            type="text" 
                            placeholder="Ish nomi (masalan: Python Backend)" 
                            value={jobForm.title} 
                            onChange={(e) => setJobForm({...jobForm, title: e.target.value})} 
                            className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                          />
                          <input 
                            type="text" 
                            placeholder="Kompaniya nomi" 
                            value={jobForm.company} 
                            onChange={(e) => setJobForm({...jobForm, company: e.target.value})} 
                            className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                          />
                          <input 
                            type="text" 
                            placeholder="Oylik maosh (masalan: 10 000 000 so'm)" 
                            value={jobForm.salary} 
                            onChange={(e) => setJobForm({...jobForm, salary: e.target.value})} 
                            className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                          />
                          <input 
                            type="text" 
                            placeholder="Joylashuv (masalan: Toshkent)" 
                            value={jobForm.location} 
                            onChange={(e) => setJobForm({...jobForm, location: e.target.value})} 
                            className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                          />
                          <input 
                            type="text" 
                            placeholder="Aloqa (masalan: @hr_contact)" 
                            value={jobForm.contact} 
                            onChange={(e) => setJobForm({...jobForm, contact: e.target.value})} 
                            className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                          />
                          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-xl shadow-md transition">
                            Vakansiyani Chop Etish
                          </button>
                        </form>

                        <div className="space-y-2">
                          <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Mavjud vakansiyalarni boshqarish</h4>
                          {jobs.map((j) => (
                            <div key={j.id} className={`p-3 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                              <div>
                                <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{j.title}</div>
                                <div className="text-[10px] text-slate-400">{j.company}</div>
                              </div>
                              <button onClick={() => handleDeleteJob(j.id)} className="text-rose-500 hover:text-rose-700">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {adminActiveTab === 'messages' && (
                      <div className="space-y-3">
                        <h4 className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Mijozlardan kelgan xabarlar</h4>
                        {userMessages.map((m) => (
                          <div key={m.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-xs font-bold text-amber-400">{m.sender}</span>
                                <span className="text-[10px] text-slate-400 block">{m.phone}</span>
                              </div>
                              <button onClick={() => handleDeleteMessage(m.id)} className="text-slate-500 hover:text-rose-500">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{m.message}</p>
                            
                            {m.replies.length > 0 && (
                              <div className="mt-2 pl-3 border-l-2 border-amber-500 space-y-1">
                                {m.replies.map((r) => (
                                  <p key={r.id} className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Yuborilgan: {r.text}</p>
                                ))}
                              </div>
                            )}

                            {replyingMsgId === m.id ? (
                              <div className="mt-2 space-y-2">
                                <textarea 
                                  placeholder="Javobingizni yozing..." 
                                  value={adminReplyText}
                                  onChange={(e) => setAdminReplyText(e.target.value)}
                                  className={`w-full border p-2 rounded-xl text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => handleSendAdminReply(m.id)} className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                                    Javobni Yuborish
                                  </button>
                                  <button onClick={() => setReplyingMsgId(null)} className="text-slate-400 text-[10px] px-2 py-1.5">
                                    Bekor qilish
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setReplyingMsgId(m.id)} className="text-[10px] font-bold text-amber-400 hover:underline block pt-1">
                                Javob berish
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SHAXSIY PROFIL */}
            {activeTab === 'profile' && (
              <div className="p-5 space-y-4">
                <div className={`p-5 rounded-3xl border text-center space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <img src={user.avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500/30 object-cover" alt="profile" />
                  <div>
                    <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</h3>
                    <p className="text-xs text-slate-400">{user.phone}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>

                <button 
                  onClick={handleUserLogout} 
                  className="w-full bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 text-xs font-bold py-3 rounded-2xl transition"
                >
                  Tizimdan Chiqish
                </button>
              </div>
            )}

            {/* BOTTOM NAVIGATION BAR */}
            <div className={`fixed bottom-0 max-w-[410px] w-full border-t flex justify-around py-2.5 z-40 backdrop-blur-md ${
              darkMode ? 'bg-slate-900/95 border-slate-800/80 text-slate-400' : 'bg-white/95 border-slate-200 text-slate-500'
            }`}>
              {[
                { tab: 'home', label: 'Bosh sahifa', icon: Home },
                { tab: 'expenses', label: 'Xarajatlar', icon: Receipt },
                { tab: 'gps', label: 'GPS', icon: Compass },
                { tab: 'jobs', label: 'Ishlar', icon: Briefcase },
                { tab: 'profile', label: 'Profil', icon: User }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.tab;
                return (
                  <button 
                    key={item.tab} 
                    onClick={() => setActiveTab(item.tab)}
                    className={`flex flex-col items-center gap-1 transition ${
                      isActive ? 'text-blue-500 scale-105' : 'hover:text-slate-300'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-[9px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

      </div>
    </div>
  );
}