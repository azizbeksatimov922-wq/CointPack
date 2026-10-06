import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, PieChart, Wallet, Briefcase, Navigation, User, Eye, EyeOff, 
  Mic, MicOff, Plus, Search, Crown, CreditCard,
  TrendingUp, AlertTriangle, Compass, Users,
  Moon, Sun, Trash2, ShieldCheck, MessageSquare, KeyRound,
  Send, ChevronRight, Receipt, Edit, Save, X, LogOut, Camera, CheckCircle2, Sparkles,
  ArrowRightLeft, Zap, Droplet, Flame, UtilityPole
} from 'lucide-react';

export default function App() {
  // 1. LOCALSTORAGE ORQALI LOGIN VA SAHIFA HOLATINI ESLAB QOLISH
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'home';
  });

  const [userLoginInput, setUserLoginInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [totalBalance, setTotalBalance] = useState(12480000);
  const [darkMode, setDarkMode] = useState(true);

  // KARTALAR RAQAMINI KO'RSATISH/YASHIRISH HOLATI (KARTA ID'LARI TO'PLAMI)
  const [visibleCardNumbers, setVisibleCardNumbers] = useState({});

  const toggleCardNumberVisibility = (cardId) => {
    setVisibleCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // ADMIN AUTHENTICATION STATE
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('users');

  // ADMIN KARTA MA'LUMOTLARI (PREMIUM OBUNA UCHUN)
  const [adminCardInfo, setAdminCardInfo] = useState(() => {
    const savedCard = localStorage.getItem('adminCardInfo');
    return savedCard ? JSON.parse(savedCard) : {
      cardNumber: '8600 1234 5678 9012',
      cardHolder: 'ADMINBEK KORPORATSIYASI'
    };
  });
  const [editCardNumber, setEditCardNumber] = useState(adminCardInfo.cardNumber);
  const [editCardHolder, setEditCardHolder] = useState(adminCardInfo.cardHolder);

  // FOYDALANUVCHILAR RO'YXATI (ADMIN PANEDA KO'RINADI)
  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem('allUsersList');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, name: 'Munisa Abdulhaqova', phone: '+998 90 123 45 67', isVip: false, joinedDate: '2026-01-10' },
      { id: 2, name: 'Abdulhaqov_801', phone: '+998 93 987 65 43', isVip: true, joinedDate: '2026-02-15' },
      { id: 3, name: 'Sardorbek', phone: '+998 91 234 56 78', isVip: false, joinedDate: '2026-03-01' }
    ];
  });

  // JOORIY FOYDALANUVCHI MA'LUMOTLARI
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : { 
      id: 2,
      name: 'Abdulhaqov_801', 
      phone: '+998 93 987 65 43',
      email: 'abdulhaqov@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVip: true
    };
  });

  // FOYDALANUVCHINING BANK KARTALARI
  const [userCards, setUserCards] = useState(() => {
    const savedCards = localStorage.getItem('userCardsList');
    return savedCards ? JSON.parse(savedCards) : [
      { id: 1, cardNumber: '8600 1234 5678 4321', cardHolder: 'ABDULHAQOV A', bankName: 'Uzcard', balance: 4500000 },
      { id: 2, cardNumber: '9860 8765 4321 8852', cardHolder: 'ABDULHAQOV A', bankName: 'Humo', balance: 7980000 }
    ];
  });
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardBank, setNewCardBank] = useState('Uzcard');

  // KARTA DANA KARTAGA P2P O'TKAZMA STATE'LARI
  const [fromCardId, setFromCardId] = useState('');
  const [toCardNumber, setToCardNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  // KOMMUNAL TO'LOVLAR STATE'LARI
  const [utilityType, setUtilityType] = useState('electricity');
  const [utilityCardId, setUtilityCardId] = useState('');
  const [utilityAccount, setUtilityAccount] = useState('');
  const [utilityAmount, setUtilityAmount] = useState('');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUserData, setEditUserData] = useState({ ...user });

  // FAYL YUKLASH UCHUN REF
  const fileInputRef = useRef(null);

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

  // MIJOZLAR XABARLARI VA ADMIN JAVOBLARI
  const [userMessages, setUserMessages] = useState([
    { 
      id: 1, 
      sender: 'Sardor', 
      phone: '+998 91 234 56 78', 
      message: "Menga VIP Obuna kerak, kartangizga 50,000 so'm o'tkazdim. Tekshirib bering.", 
      date: 'Bugun, 10:30',
      replies: [
        { id: 101, text: "Assalomu alaykum! To'lov tasdiqlandi. Hisobingizga VIP Obuna faollashtirildi!", date: 'Bugun, 10:35' }
      ]
    }
  ]);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMsg, setClientMsg] = useState('');
  const [msgSentSuccess, setMsgSentSuccess] = useState(false);

  const [replyingMsgId, setReplyingMsgId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    salary: '',
    location: '',
    contact: ''
  });

  // LOCALSTORAGE-GA O'ZGARISHLARNI YOZIB BORISH
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('adminCardInfo', JSON.stringify(adminCardInfo));
  }, [adminCardInfo]);

  useEffect(() => {
    localStorage.setItem('allUsersList', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('userCardsList', JSON.stringify(userCards));
  }, [userCards]);

  // KARTA QO'SHISH FUNKSIYASI
  const handleAddUserCard = (e) => {
    e.preventDefault();
    if (!newCardNumber || !newCardHolder) {
      alert("Iltimos, karta raqami va karta egasining ismini kiriting!");
      return;
    }

    const newCard = {
      id: Date.now(),
      cardNumber: newCardNumber,
      cardHolder: newCardHolder.toUpperCase(),
      bankName: newCardBank,
      balance: 0
    };

    setUserCards(prev => [...prev, newCard]);
    setNewCardNumber('');
    setNewCardHolder('');
    alert("Yangi karta muvaffaqiyatli qo'shildi!");
  };

  const handleDeleteUserCard = (id) => {
    if (window.confirm("Rostdan ham ushbu kartani o'chirmoqchimisiz?")) {
      setUserCards(prev => prev.filter(card => card.id !== id));
    }
  };

  // KARTADAN KARTAGA PUL O'TKAZMA FUNKSIYASI
  const handleCardTransfer = (e) => {
    e.preventDefault();
    const amount = parseInt(transferAmount);
    if (!fromCardId || !toCardNumber || !amount || amount <= 0) {
      alert("Iltimos, barcha maydonlarni to'g'ri to'ldiring!");
      return;
    }

    const sourceCard = userCards.find(c => c.id === parseInt(fromCardId));
    if (!sourceCard) {
      alert("Tanlangan karta topilmadi!");
      return;
    }

    if (sourceCard.balance < amount) {
      alert("Tanlangan kartada yetarli mablag' mavjud emas!");
      return;
    }

    setUserCards(prev => prev.map(c => {
      if (c.id === sourceCard.id) {
        return { ...c, balance: c.balance - amount };
      }
      return c;
    }));

    setTotalBalance(prev => prev - amount);

    const newTx = {
      id: Date.now(),
      title: `O'tkazma: ${toCardNumber}`,
      amount: amount,
      category: "Pul o'tkazmasi",
      date: 'Hozir'
    };
    setTransactions(prev => [newTx, ...prev]);

    setToCardNumber('');
    setTransferAmount('');
    alert("Pul muvaffaqiyatli o'tkazildi!");
  };

  // KOMMUNAL TO'LOV FUNKSIYASI (GAZ, SVET, SUV, TOK)
  const handleUtilityPayment = (e) => {
    e.preventDefault();
    const amount = parseInt(utilityAmount);
    if (!utilityCardId || !utilityAccount || !amount || amount <= 0) {
      alert("Iltimos, barcha ma'lumotlarni to'liq kiriting!");
      return;
    }

    const sourceCard = userCards.find(c => c.id === parseInt(utilityCardId));
    if (!sourceCard) {
      alert("Tanlangan karta topilmadi!");
      return;
    }

    if (sourceCard.balance < amount) {
      alert("Tanlangan kartada yetarli mablag' mavjud emas!");
      return;
    }

    setUserCards(prev => prev.map(c => {
      if (c.id === sourceCard.id) {
        return { ...c, balance: c.balance - amount };
      }
      return c;
    }));

    setTotalBalance(prev => prev - amount);

    const names = {
      electricity: 'Elektr energiyasi (Svet)',
      gas: 'Tabiiy gaz',
      water: 'Ichimlik suvi',
      garbage: "Chiqindi (To'lov)"
    };

    const newTx = {
      id: Date.now(),
      title: `${names[utilityType] || 'Kommunal'} - Hisob: ${utilityAccount}`,
      amount: amount,
      category: 'Kommunal to\'lov',
      date: 'Hozir'
    };
    setTransactions(prev => [newTx, ...prev]);

    setUtilityAccount('');
    setUtilityAmount('');
    alert("Kommunal to'lov muvaffaqiyatli amalga oshirildi!");
  };

  // FOYDALANUVCHINI TIZIMGA KIRITISH
  const handleUserLogin = (e) => {
    e.preventDefault();
    if (userLoginInput.trim() !== '' && userPasswordInput.trim() !== '') {
      setIsAuthenticated(true);
      setAuthError('');

      const exists = allUsers.find(u => u.name === userLoginInput || u.phone === userLoginInput);
      if (!exists) {
        const newUserObj = {
          id: Date.now(),
          name: userLoginInput,
          phone: '+998 90 ' + Math.floor(1000000 + Math.random() * 9000000),
          isVip: false,
          joinedDate: new Date().toISOString().split('T')[0]
        };
        setAllUsers(prev => [...prev, newUserObj]);
        setUser({ ...user, ...newUserObj });
      } else {
        setUser({ ...user, ...exists });
      }

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
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('activeTab');
    }
  };

  // ADMIN KARTA MA'LUMOTLARINI YANGILASH
  const handleSaveAdminCard = (e) => {
    e.preventDefault();
    setAdminCardInfo({
      cardNumber: editCardNumber,
      cardHolder: editCardHolder
    });
    alert("Karta ma'lumotlari muvaffaqiyatli saqlandi!");
  };

  // ADMIN FOYDALANUVCHINING VIP STATUSINI O'ZGARTIRISHI
  const toggleUserVipStatus = (userId) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updatedVip = !u.isVip;
        if (user.id === userId) {
          setUser(prevUser => ({ ...prevUser, isVip: updatedVip }));
        }
        return { ...u, isVip: updatedVip };
      }
      return u;
    }));
  };

  // PROFILNI SAQLASH
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(editUserData);
    setIsEditingProfile(false);
  };

  // GALEREYADAN RASM YUKLASH
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUserData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
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

  const handleDeleteExpense = (id, amount) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    setTotalBalance(prev => prev + amount);
  };

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

  const handleDeleteJob = (id) => {
    if (window.confirm("Rostdan ham ushbu e'lonni o'chirmoqchimisiz?")) {
      setJobs(prev => prev.filter(job => job.id !== id));
    }
  };

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

  const formatCardNumber = (cardNumber, isVisible) => {
    if (isVisible) {
      return cardNumber;
    }
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length >= 16) {
      return `${cleanNum.slice(0, 4)} **** **** ${cleanNum.slice(12)}`;
    }
    return '**** **** **** ****';
  };

  return (
    <div className={`flex justify-center min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-200'}`}>
      <div className={`w-full max-w-[410px] min-h-screen flex flex-col relative pb-20 font-sans shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

        {/* YASHIRIN FAYL INPUTI */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

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
          <div className="flex-1 flex flex-col">
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
                  {activeTab === 'cards' && 'Mening kartalarim'}
                  {activeTab === 'transfer' && "Kartadan kartaga o'tkazma"}
                  {activeTab === 'utilities' && "Kommunal to'lovlar"}
                  {activeTab === 'gps' && 'Aniq GPS & Oshxonalar'}
                  {activeTab === 'savings' && "Jamg'arish Maqsadi"}
                  {activeTab === 'jobs' && "Ko'proq pul beradigan ishlar"}
                  {activeTab === 'premium' && 'Premium Obuna (VIP)'}
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
                      <div className="relative cursor-pointer" onClick={() => setActiveTab('profile')}>
                        <img src={user.avatar} className="w-8 h-8 rounded-full border-2 border-white/40 object-cover" alt="avatar" />
                        {user.isVip && (
                          <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 border border-white">
                            <Crown size={10} className="fill-slate-900" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">Salom, {user.name}!</h2>
                    {user.isVip && (
                      <span className="bg-gradient-to-r from-amber-400 to-amber-200 text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                        <Crown size={10} className="fill-slate-900" /> VIP
                      </span>
                    )}
                  </div>
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

                {/* ASOSIY MENYU BO'LIMLARI */}
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setActiveTab('cards')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Mening kartalarim</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">{userCards.length} ta karta ulangan</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('transfer')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                        <ArrowRightLeft size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Kartadan kartaga</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Tezkor P2P o'tkazma</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('utilities')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Kommunal to'lovlar</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Gaz, svet, suv, tok</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('expenses')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Xarajatlar</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Kiritish va kuzatish</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('analytics')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                        <PieChart size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Tahlil</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Statistika va diagramma</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('savings')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-3">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Jamg'arish</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Maqsadlar va fond</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('jobs')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between col-span-2 ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                          <Briefcase size={20} />
                        </div>
                        <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">Daromad</span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Ko'proq pul beradigan ishlar</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Yuqori maoshli bo'sh ish o'rinlari ro'yxati</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('gps')} 
                      className={`p-4 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between col-span-2 ${
                        darkMode ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                          <Navigation size={20} />
                        </div>
                        <span className="text-[9px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold">GPS Live</span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold">Aniq GPS & Yaqin Oshxonalar</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Atrofingizdagi eng yaqin oshxonalarni topish</p>
                      </div>
                    </button>
                  </div>

                  {/* PREMIUM BANNER */}
                  <div onClick={() => setActiveTab('premium')} className="cursor-pointer bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-4 rounded-2xl text-slate-950 flex items-center justify-between shadow-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider">
                        <Crown size={16} className="fill-slate-950" /> Premium VIP Obuna
                      </div>
                      <p className="text-[10px] font-medium opacity-90">Barcha imkoniyatlarni va eksklyuziv funksiyalarni oching</p>
                    </div>
                    <ChevronRight size={20} className="opacity-80" />
                  </div>

                  {/* ADMIN BILAN ALOQA BUTTON */}
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className={`w-full p-4 rounded-2xl border flex items-center justify-between transition ${
                      darkMode ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                        <MessageSquare size={18} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold">Admin bilan aloqa</h4>
                        <p className="text-[10px] text-slate-400">Savol va takliflar uchun chat</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {/* KARTADAN KARTAGA O'TKAZMA SAHIFASI */}
            {activeTab === 'transfer' && (
              <div className="p-4 space-y-4">
                <div className={`p-5 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRightLeft className="text-indigo-500" size={20} />
                    <h3 className="text-xs font-bold">Kartadan kartaga pul o'tkazish (P2P)</h3>
                  </div>

                  <form onSubmit={handleCardTransfer} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Qaysi kartadan yechilsin?</label>
                      <select
                        value={fromCardId}
                        onChange={(e) => setFromCardId(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="">Kartani tanlang</option>
                        {userCards.map(card => (
                          <option key={card.id} value={card.id}>
                            {card.bankName} - {card.cardNumber.slice(-4)} ({card.balance.toLocaleString()} so'm)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Qabul qiluvchi karta raqami</label>
                      <input 
                        type="text"
                        placeholder="8600 **** **** ****"
                        value={toCardNumber}
                        onChange={(e) => setToCardNumber(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">O'tkazma summasi (so'm)</label>
                      <input 
                        type="number"
                        placeholder="Masalan: 50000"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 rounded-xl transition active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Send size={15} /> Pulni o'tkazish
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* KOMMUNAL TO'LOVLAR SAHIFASI */}
            {activeTab === 'utilities' && (
              <div className="p-4 space-y-4">
                <div className={`p-5 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-amber-500" size={20} />
                    <h3 className="text-xs font-bold">Kommunal to'lovlar (Gaz, Svet, Suv, Tok)</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-2">
                    <button 
                      type="button"
                      onClick={() => setUtilityType('electricity')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                        utilityType === 'electricity' 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-500 font-bold' 
                          : darkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Zap size={18} />
                      <span className="text-[9px]">Svet</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setUtilityType('gas')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                        utilityType === 'gas' 
                          ? 'bg-orange-500/20 border-orange-500 text-orange-500 font-bold' 
                          : darkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Flame size={18} />
                      <span className="text-[9px]">Gaz</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setUtilityType('water')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                        utilityType === 'water' 
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-500 font-bold' 
                          : darkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Droplet size={18} />
                      <span className="text-[9px]">Suv</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setUtilityType('garbage')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                        utilityType === 'garbage' 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 font-bold' 
                          : darkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Trash2 size={18} />
                      <span className="text-[9px]">Chiqindi</span>
                    </button>
                  </div>

                  <form onSubmit={handleUtilityPayment} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">To'lov kartasi</label>
                      <select
                        value={utilityCardId}
                        onChange={(e) => setUtilityCardId(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="">Kartani tanlang</option>
                        {userCards.map(card => (
                          <option key={card.id} value={card.id}>
                            {card.bankName} - {card.cardNumber.slice(-4)} ({card.balance.toLocaleString()} so'm)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Shaxsiy hisob (Abonent) raqami</label>
                      <input 
                        type="text"
                        placeholder="Masalan: 12345678"
                        value={utilityAccount}
                        onChange={(e) => setUtilityAccount(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">To'lov summasi (so'm)</label>
                      <input 
                        type="number"
                        placeholder="Masalan: 100000"
                        value={utilityAmount}
                        onChange={(e) => setUtilityAmount(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-3 rounded-xl transition active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Receipt size={15} /> To'lovni amalga oshirish
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* MENING KARTALARIM SAHIFASI */}
            {activeTab === 'cards' && (
              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  {userCards.map(card => (
                    <div 
                      key={card.id} 
                      className="p-5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-700/60"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium">{card.bankName}</p>
                          <p className="text-lg font-black tracking-widest mt-1">
                            {formatCardNumber(card.cardNumber, visibleCardNumbers[card.id])}
                          </p>
                        </div>
                        <button 
                          onClick={() => toggleCardNumberVisibility(card.id)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                        >
                          {visibleCardNumbers[card.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[9px] text-slate-400 uppercase">Karta egasi</p>
                          <p className="text-xs font-bold">{card.cardHolder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-slate-400 uppercase">Balans</p>
                          <p className="text-xs font-black text-emerald-400">{card.balance.toLocaleString()} so'm</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteUserCard(card.id)}
                        className="absolute top-3 right-12 text-rose-400 hover:text-rose-300 p-1"
                        title="Kartani o'chirish"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* YANGI KARTA QO'SHISH FORMALARI */}
                <form onSubmit={handleAddUserCard} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold">Yangi karta qo'shish</h4>
                  
                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta turi</label>
                    <select 
                      value={newCardBank}
                      onChange={(e) => setNewCardBank(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="Uzcard">Uzcard</option>
                      <option value="Humo">Humo</option>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta raqami</label>
                    <input 
                      type="text" 
                      placeholder="8600 0000 0000 0000" 
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta egasi ismi</label>
                    <input 
                      type="text" 
                      placeholder="FIRSTNAME LASTNAME" 
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Plus size={16} /> Karta qo'shish
                  </button>
                </form>
              </div>
            )}

            {/* XARAJTALR SAHIFASI */}
            {activeTab === 'expenses' && (
              <div className="p-4 space-y-4">
                <form onSubmit={handleAddExpense} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold">Yangi xarajat kiritish</h4>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Xarajat nomi (masalan: Tushlik)" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                    />
                    <input 
                      type="number" 
                      placeholder="Summasi (so'm)" 
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                    />
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="Oziq-ovqat">Oziq-ovqat</option>
                      <option value="Transport">Transport</option>
                      <option value="Kiyim-kechak">Kiyim-kechak</option>
                      <option value="Ko'ngilochar">Ko'ngilochar</option>
                      <option value="Boshqa">Boshqa</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition">
                      Qo'shish
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold px-1">So'nggi xarajatlar</h4>
                  {transactions.map(tx => (
                    <div key={tx.id} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                      <div>
                        <h5 className="text-xs font-bold">{tx.title}</h5>
                        <p className="text-[10px] text-slate-400">{tx.category} • {tx.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-rose-500">-{tx.amount.toLocaleString()} so'm</span>
                        <button onClick={() => handleDeleteExpense(tx.id, tx.amount)} className="text-slate-500 hover:text-rose-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAHLIL SAHIFASI */}
            {activeTab === 'analytics' && (
              <div className="p-4 space-y-4">
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold mb-4">Xarajatlar strukturasi</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Oziq-ovqat</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[45%] h-full bg-blue-500"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Kiyim-kechak</span>
                        <span className="font-bold">30%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[30%] h-full bg-purple-500"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Transport</span>
                        <span className="font-bold">15%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[15%] h-full bg-amber-500"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Boshqa</span>
                        <span className="font-bold">10%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[10%] h-full bg-rose-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* JAMG'ARISH SAHIFASI */}
            {activeTab === 'savings' && (
              <div className="p-4 space-y-4">
                <form onSubmit={handleCreateGoal} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold">Yangi jamg'arish maqsadi</h4>
                  <input 
                    type="text" 
                    placeholder="Maqsad nomi (masalan: Mashina)" 
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <input 
                    type="number" 
                    placeholder="Kerakli summa (so'm)" 
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <button type="submit" className="w-full bg-teal-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-teal-700 transition">
                    Maqsadni yaratish
                  </button>
                </form>

                <div className="space-y-3">
                  {savingsGoals.map(goal => {
                    const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
                    return (
                      <div key={goal.id} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold">{goal.name}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} so'm
                            </p>
                          </div>
                          <button onClick={() => handleDeleteGoal(goal.id)} className="text-slate-500 hover:text-rose-500">
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                            <span>Bajarildi</span>
                            <span className="font-bold text-teal-400">{percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>

                        {addSavingId === goal.id ? (
                          <div className="flex gap-2 pt-2">
                            <input 
                              type="number" 
                              placeholder="Summa" 
                              value={addSavingAmount}
                              onChange={(e) => setAddSavingAmount(e.target.value)}
                              className={`flex-1 px-3 py-1.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                            />
                            <button onClick={() => handleAddMoneyToGoal(goal.id)} className="bg-teal-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                              Saqlash
                            </button>
                            <button onClick={() => setAddSavingId(null)} className="bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setAddSavingId(goal.id)}
                            className="w-full py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                          >
                            <Plus size={14} /> Pul qo'shish
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* KO'PROQ PUL BERADIGAN ISHLAR SAHIFASI */}
            {activeTab === 'jobs' && (
              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className={`p-4 rounded-2xl border relative space-y-2 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-amber-400">{job.title}</h4>
                          <p className="text-[11px] font-medium mt-0.5">{job.company}</p>
                        </div>
                        {isAdminLoggedIn && (
                          <button onClick={() => handleDeleteJob(job.id)} className="text-rose-400 hover:text-rose-300 p-1">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 space-y-1">
                        <p>💰 Maosh: <span className="text-emerald-400 font-bold">{job.salary}</span></p>
                        <p>📍 Hudud: {job.location}</p>
                        <p>💬 Aloqa: <span className="text-blue-400 font-medium">{job.contact}</span></p>
                      </div>
                    </div>
                  ))}
                </div>

               
              </div>
            )}

            {/* GPS VA OSHXONALAR SAHIFASI */}
            {activeTab === 'gps' && (
              <div className="p-4 space-y-4">
                <div className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-rose-500">
                      <Compass size={16} className="animate-spin" /> Joylashuvingiz
                    </span>
                    <button onClick={fetchNearbyPlaces} className="text-[10px] text-blue-400 font-bold hover:underline">
                      Yangilash
                    </button>
                  </div>
                  {addressName ? (
                    <p className="text-xs font-medium text-slate-300">{addressName}</p>
                  ) : (
                    <p className="text-xs text-slate-500">GPS aniqlanmoqda...</p>
                  )}
                  {accuracy && <p className="text-[10px] text-slate-400">Aniqlik darajasi: ~{accuracy} metr</p>}
                </div>

                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Search size={16} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Oshxona yoki taom turini qidirish..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs outline-none w-full"
                  />
                </div>

                {gpsLoading ? (
                  <div className="text-center py-8 text-xs text-slate-400">Oshxonalar qidirilmoqda...</div>
                ) : gpsError ? (
                  <div className="text-center py-8 text-xs text-rose-400">{gpsError}</div>
                ) : (
                  <div className="space-y-2">
                    {filteredRestaurants.map(r => (
                      <div key={r.id} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                        <div>
                          <h5 className="text-xs font-bold">{r.name}</h5>
                          <p className="text-[10px] text-slate-400 capitalize">{r.type}</p>
                        </div>
                        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
                          {r.distText}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PREMIUM OBUNA SAHIFASI */}
            {activeTab === 'premium' && (
              <div className="p-4 space-y-4">
                <div className="text-center space-y-2 py-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-3xl flex items-center justify-center mx-auto shadow-xl text-slate-900">
                    <Crown size={36} />
                  </div>
                  <h3 className="text-lg font-black text-amber-400">VIP Obuna Statusi</h3>
                  <p className="text-xs text-slate-400">Eksklyuziv imkoniyatlar va cheklovsiz foydalanish</p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">VIP Imkoniyatlar:</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Shaxsiy profilga VIP belgi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Barcha eksklyuziv ishlarni ko'rish</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Admin bilan to'g'ridan-to'g me va tezkor aloqa</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Cheksiz jamg'arish maqsadlari</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs text-slate-400">To'lov uchun karta ma'lumoti:</p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 inline-block w-full">
                    <p className="text-sm font-black text-amber-400 tracking-wider">{adminCardInfo.cardNumber}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{adminCardInfo.cardHolder}</p>
                  </div>
                  <p className="text-[11px] text-slate-400">To'lov qilgach, chekni admin bilan aloqa chatida yuboring!</p>
                </div>
              </div>
            )}

            {/* ADMIN BILAN ALOQA SAHIFASI */}
            {activeTab === 'contact' && (
              <div className="p-4 space-y-4">
                {msgSentSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Xabaringiz yuborildi! Admin tez orada javob beradi.</span>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-xs font-bold">Adminga xabar yuborish</h4>
                  <input 
                    type="text" 
                    placeholder="Ismingiz" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <input 
                    type="text" 
                    placeholder="Telefon raqamingiz" 
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <textarea 
                    rows={3}
                    placeholder="Xabar matni..." 
                    value={clientMsg}
                    onChange={(e) => setClientMsg(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-1.5">
                    <Send size={15} /> Yuborish
                  </button>
                </form>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold px-1">Sizning xabarlaringiz va javoblar</h4>
                  {userMessages.map(msg => (
                    <div key={msg.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-200'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold">{msg.sender}</span>
                        <span className="text-[10px] text-slate-400">{msg.date}</span>
                      </div>
                      <p className="text-xs text-slate-300">{msg.message}</p>
                      
                      {msg.replies && msg.replies.length > 0 && (
                        <div className="pt-2 border-t border-slate-700/50 space-y-2">
                          {msg.replies.map(reply => (
                            <div key={reply.id} className="bg-blue-600/10 border border-blue-500/20 p-2.5 rounded-xl text-xs text-blue-300 space-y-0.5">
                              <div className="flex justify-between font-bold text-[10px] text-blue-400">
                                <span>Admin javobi:</span>
                                <span>{reply.date}</span>
                              </div>
                              <p>{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN PANEL SAHIFASI */}
            {activeTab === 'admin' && (
              <div className="p-4 space-y-4">
                {!isAdminLoggedIn ? (
                  <form onSubmit={handleAdminLogin} className={`p-5 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="text-center space-y-1 mb-2">
                      <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-sm font-bold">Admin Paneli Kirish</h3>
                    </div>

                    {loginError && (
                      <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                        <AlertTriangle size={15} />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Admin login</label>
                      <input 
                        type="text" 
                        placeholder="Login" 
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Admin parol</label>
                      <input 
                        type="password" 
                        placeholder="Parol" 
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg transition active:scale-95">
                      Admin bo'lib kirish
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2 border-b border-slate-700/60 pb-2">
                      <button 
                        onClick={() => setAdminActiveTab('users')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${adminActiveTab === 'users' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                      >
                        Foydalanuvchilar
                      </button>
                      <button 
                        onClick={() => setAdminActiveTab('messages')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${adminActiveTab === 'messages' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                      >
                        Xabarlar ({userMessages.length})
                      </button>
                      <button 
                        onClick={() => setAdminActiveTab('card')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${adminActiveTab === 'card' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                      >
                        Karta Sozlamasi
                      </button>
                    </div>

                    {adminActiveTab === 'users' && (
                      <div className="space-y-2">
                        {allUsers.map(u => (
                          <div key={u.id} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-bold">{u.name}</h5>
                                {u.isVip && <Crown size={12} className="text-amber-400 fill-amber-400" />}
                              </div>
                              <p className="text-[10px] text-slate-400">{u.phone}</p>
                            </div>
                            <button 
                              onClick={() => toggleUserVipStatus(u.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                                u.isVip ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              }`}
                            >
                              {u.isVip ? "VIP-ni olish" : "VIP berish"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {adminActiveTab === 'messages' && (
                      <div className="space-y-3">
                        {userMessages.map(msg => (
                          <div key={msg.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-xs font-bold">{msg.sender} ({msg.phone})</h5>
                                <span className="text-[10px] text-slate-400">{msg.date}</span>
                              </div>
                              <button onClick={() => handleDeleteMessage(msg.id)} className="text-rose-400 hover:text-rose-300">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-xs text-slate-300">{msg.message}</p>

                            {replyingMsgId === msg.id ? (
                              <div className="pt-2 space-y-2">
                                <textarea 
                                  rows={2}
                                  placeholder="Javob matni..." 
                                  value={adminReplyText}
                                  onChange={(e) => setAdminReplyText(e.target.value)}
                                  className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => handleSendAdminReply(msg.id)} className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs">
                                    Javob yuborish
                                  </button>
                                  <button onClick={() => setReplyingMsgId(null)} className="bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs">
                                    Bekor qilish
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setReplyingMsgId(msg.id)} className="text-[11px] text-amber-400 font-bold hover:underline">
                                Javob qaytarish
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {adminActiveTab === 'card' && (
                      <form onSubmit={handleSaveAdminCard} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                        <h4 className="text-xs font-bold text-amber-400">Admin karta sozlamalari</h4>
                        <div>
                          <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta raqami</label>
                          <input 
                            type="text" 
                            value={editCardNumber}
                            onChange={(e) => setEditCardNumber(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta egasi</label>
                          <input 
                            type="text" 
                            value={editCardHolder}
                            onChange={(e) => setEditCardHolder(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                          />
                        </div>
                        <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-md">
                          Saqlash
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SHAXSIY PROFIL SAHIFASI */}
            {activeTab === 'profile' && (
              <div className="p-4 space-y-4">
                <div className={`p-5 rounded-2xl border space-y-4 text-center ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="relative w-20 h-20 mx-auto">
                    <img src={isEditingProfile ? editUserData.avatar : user.avatar} className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" alt="avatar" />
                    {isEditingProfile && (
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-lg"
                      >
                        <Camera size={14} />
                      </button>
                    )}
                  </div>

                  {!isEditingProfile ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1.5">
                        <h3 className="text-sm font-bold">{user.name}</h3>
                        {user.isVip && <Crown size={14} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400">{user.phone}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                      <button 
                        onClick={() => { setEditUserData({ ...user }); setIsEditingProfile(true); }}
                        className="mt-3 px-4 py-2 bg-blue-600/10 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600/20 transition flex items-center gap-1.5 mx-auto"
                      >
                        <Edit size={14} /> Profilni tahrirlash
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProfile} className="space-y-3 text-left">
                      <div>
                        <label className="text-[10px] text-slate-400 font-medium mb-1 block">Ismingiz</label>
                        <input 
                          type="text" 
                          value={editUserData.name}
                          onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-medium mb-1 block">Telefon</label>
                        <input 
                          type="text" 
                          value={editUserData.phone}
                          onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-medium mb-1 block">Email</label>
                        <input 
                          type="text" 
                          value={editUserData.email}
                          onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold shadow-md">
                          Saqlash
                        </button>
                        <button type="button" onClick={() => setIsEditingProfile(false)} className="px-4 bg-slate-700 text-white py-2 rounded-xl text-xs font-bold">
                          Bekor qilish
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <button 
                  onClick={handleUserLogout}
                  className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> Hisobdan chiqish
                </button>
              </div>
            )}

            {/* PASTI NAVIGATSIYA BAR */}
            <div className={`fixed bottom-0 max-w-[410px] w-full border-t flex justify-around py-3 z-40 backdrop-blur-md ${darkMode ? 'bg-slate-900/95 border-slate-800 text-slate-400' : 'bg-white/95 border-slate-200 text-slate-500'}`}>
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-500 font-bold' : ''}`}
              >
                <Home size={18} />
                <span className="text-[9px]">Bosh sahifa</span>
              </button>

              <button 
                onClick={() => setActiveTab('transfer')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'transfer' ? 'text-blue-500 font-bold' : ''}`}
              >
                <ArrowRightLeft size={18} />
                <span className="text-[9px]">O'tkazma</span>
              </button>

              <button 
                onClick={() => setActiveTab('utilities')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'utilities' ? 'text-blue-500 font-bold' : ''}`}
              >
                <Zap size={18} />
                <span className="text-[9px]">Kommunal</span>
              </button>

              <button 
                onClick={() => setActiveTab('cards')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'cards' ? 'text-blue-500 font-bold' : ''}`}
              >
                <CreditCard size={18} />
                <span className="text-[9px]">Kartalar</span>
              </button>

              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-500 font-bold' : ''}`}
              >
                <User size={18} />
                <span className="text-[9px]">Profil</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
} 