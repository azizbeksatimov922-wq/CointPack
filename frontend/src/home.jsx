import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, PieChart, Wallet, Briefcase, User, Eye, EyeOff, 
  Mic, MicOff, Plus, Search, Crown, CreditCard,
  TrendingUp, AlertTriangle, Compass, Users,
  Moon, Sun, Trash2, ShieldCheck, MessageSquare, KeyRound,
  Send, ChevronRight, Edit, Save, X, LogOut, Camera, CheckCircle2, Sparkles,
  ArrowRightLeft, Zap, Droplet, Flame, UtilityPole, Coins, RefreshCw,
  Gift, Lock, HelpCircle, Share2, Heart, UserPlus, Repeat, MessageCircle
} from 'lucide-react';

export function HomeScreenLayout({ children }) {
  return <main aria-label="Bosh sahifa">{children}</main>;
}

export default function App() {
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
  
  const [totalBalance, setTotalBalance] = useState(() => {
    const savedCoins = localStorage.getItem('userTotalCoins');
    return savedCoins ? parseInt(savedCoins) : 1248000;
  });

  const [darkMode, setDarkMode] = useState(false);
  const [visibleCardNumbers, setVisibleCardNumbers] = useState({});

  const toggleCardNumberVisibility = (cardId) => {
    setVisibleCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('jobs');

  const [adminCardInfo, setAdminCardInfo] = useState(() => {
    const savedCard = localStorage.getItem('adminCardInfo');
    return savedCard ? JSON.parse(savedCard) : {
      cardNumber: '7774321',
      cardHolder: 'ADMINBEK COIN KORPORATSIYASI'
    };
  });
  const [editCardNumber, setEditCardNumber] = useState(adminCardInfo.cardNumber);
  const [editCardHolder, setEditCardHolder] = useState(adminCardInfo.cardHolder);

  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem('allUsersList');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, name: 'Munisa Abdulhaqova', phone: '+998 90 123 45 67', isVip: false, joinedDate: '2026-01-10', coins: 450000 },
      { id: 2, name: 'Abdulhaqov_801', phone: '+998 93 987 65 43', isVip: true, joinedDate: '2026-02-15', coins: 1248000 },
      { id: 3, name: 'Sardorbek', phone: '+998 91 234 56 78', isVip: false, joinedDate: '2026-03-01', coins: 310000 }
    ];
  });

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

  const generateRandom7DigitNumber = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };

  const [userCards, setUserCards] = useState(() => {
    const savedCards = localStorage.getItem('userCardsList');
    return savedCards ? JSON.parse(savedCards) : [
      { id: 1, cardNumber: '7392014', cardHolder: 'ABDULHAQOV A', bankName: 'CoinCard Gold', balance: 450000 },
      { id: 2, cardNumber: '8491023', cardHolder: 'ABDULHAQOV A', bankName: 'CoinCard VIP', balance: 798000 }
    ];
  });

  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardBank, setNewCardBank] = useState('CoinCard Gold');
  const [generatedRandomCardNum, setGeneratedRandomCardNum] = useState(generateRandom7DigitNumber());

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem('completedTasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  const coinTasks = [
    { id: 'insta_follow', title: "Instagram sahifamizga obuna bo'ling", reward: 100, icon: UserPlus, link: 'https://instagram.com/abdulhaqov_801' },
    { id: 'insta_like', title: "Oxirgi postga Like bosing", reward: 30, icon: Heart, link: 'https://instagram.com/abdulhaqov_801' },
    { id: 'insta_comment', title: "Postga izoh (comment) qoldiring", reward: 40, icon: MessageCircle, link: 'https://instagram.com/abdulhaqov_801' },
    { id: 'insta_repost', title: "Postni Storisga repost qiling", reward: 50, icon: Repeat, link: 'https://instagram.com/abdulhaqov_801' },
    { id: 'invite_friend', title: "Do'stingizni taklif qiling", reward: 150, icon: Share2, link: '' }
  ];

  const [fromCardId, setFromCardId] = useState('');
  const [toCardNumber, setToCardNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const [utilityType, setUtilityType] = useState('electricity');
  const [utilityCardId, setUtilityCardId] = useState('');
  const [utilityAccount, setUtilityAccount] = useState('');
  const [utilityAmount, setUtilityAmount] = useState('');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUserData, setEditUserData] = useState({ ...user });

  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Korzinka Supermarket', amount: 1200, category: 'Oziq-ovqat', date: 'Bugun, 14:20' },
    { id: 2, title: 'Yandex Taxi', amount: 250, category: 'Transport', date: 'Bugun, 09:15' },
    { id: 3, title: 'Kiyim xaridi', amount: 4500, category: 'Kiyim-kechak', date: 'Kecha' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Oziq-ovqat');

  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'Yangi telefon (iPhone 15)', targetAmount: 120000, currentAmount: 45000 },
    { id: 2, name: 'Sayohat uchun', targetAmount: 50000, currentAmount: 21000 }
  ]);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [addSavingId, setAddSavingId] = useState(null);
  const [addSavingAmount, setAddSavingAmount] = useState('');

  // GPS VA MANZIL STATE-LARI
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [addressName, setAddressName] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobsList');
    return savedJobs ? JSON.parse(savedJobs) : [
      { id: 1, title: 'fullstak', company: 'Cointpack', salary: "5 000 000 Coins", location: 'Toshkent', contact: '@hr_cointpack' },
      { id: 2, title: 'Frontend Developer', company: 'IT Tech', salary: "80 000 - 120 000 Coins", location: 'Toshkent', contact: '@hr_ittech' },
      { id: 3, title: 'SMM Menejer', company: 'Creative Agency', salary: "40 000 - 60 000 Coins", location: 'Masofaviy', contact: '@creative_smm' },
      { id: 4, title: 'Grafik Dizayner', company: 'Brand Studio', salary: "50 000 - 90 000 Coins", location: 'Samarqand', contact: '@brand_hr' }
    ];
  });

  const [userMessages, setUserMessages] = useState([
    { 
      id: 1, 
      sender: 'Sardor', 
      phone: '+998 91 234 56 78', 
      message: "Menga VIP Obuna kerak, CoinCard-ingizga 500 Coin o'tkazdim. Tekshirib bering.", 
      date: 'Bugun, 10:30',
      replies: [
        { id: 101, text: "Assalomu alaykum! To'lov tasdiqlandi. VIP Obuna faollashtirildi!", date: 'Bugun, 10:35' }
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
    title: '', company: '', salary: '', location: '', contact: ''
  });

  useEffect(() => { localStorage.setItem('isAuthenticated', isAuthenticated); }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('activeTab', activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem('userData', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('adminCardInfo', JSON.stringify(adminCardInfo)); }, [adminCardInfo]);
  useEffect(() => { localStorage.setItem('allUsersList', JSON.stringify(allUsers)); }, [allUsers]);
  useEffect(() => { localStorage.setItem('userCardsList', JSON.stringify(userCards)); }, [userCards]);
  useEffect(() => { localStorage.setItem('userTotalCoins', totalBalance.toString()); }, [totalBalance]);
  useEffect(() => { localStorage.setItem('completedTasks', JSON.stringify(completedTasks)); }, [completedTasks]);
  useEffect(() => { localStorage.setItem('jobsList', JSON.stringify(jobs)); }, [jobs]);

  const handleAddUserCard = (e) => {
    e.preventDefault();
    if (!newCardHolder) {
      alert("Iltimos, CoinCard egasining ismini kiriting!");
      return;
    }

    const newCardNumber = generatedRandomCardNum;
    const bonusCoins = 50;

    const newCard = {
      id: Date.now(),
      cardNumber: newCardNumber,
      cardHolder: newCardHolder.toUpperCase(),
      bankName: newCardBank,
      balance: bonusCoins
    };

    setUserCards(prev => [...prev, newCard]);
    setTotalBalance(prev => prev + bonusCoins);

    const bonusTx = {
      id: Date.now(),
      title: `CoinCard Yaratish Bonusi (#${newCardNumber})`,
      amount: -bonusCoins,
      category: 'Bonus',
      date: 'Hozir'
    };
    setTransactions(prev => [bonusTx, ...prev]);

    setNewCardHolder('');
    setGeneratedRandomCardNum(generateRandom7DigitNumber());
    alert(`Yangi CoinCard muvaffaqiyatli yaratildi!\nKarta raqami: ${newCardNumber}\n🎁 Sizga 50 Coin bonus berildi!`);
  };

  const handleCompleteTask = (task) => {
    if (completedTasks[task.id]) {
      alert("Siz ushbu topshiriqni bajarib bo'lgansiz!");
      return;
    }

    if (task.id === 'invite_friend') {
      const inviteLink = `https://coinhub.uz/ref/${user.name || 'user'}`;
      navigator.clipboard.writeText(inviteLink);
      alert(`Do'stlarni taklif qilish havolasi nusxalandi:\n${inviteLink}\n\nDo'stingiz qo'shilgach +${task.reward} Coin sizga taqdim etiladi!`);
    } else if (task.id.startsWith('insta')) {
      window.open('https://instagram.com/abdulhaqov_801', '_blank');
    } else if (task.link) {
      window.open(task.link, '_blank');
    }

    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
    setTotalBalance(prev => prev + task.reward);

    if (userCards.length > 0) {
      setUserCards(prev => prev.map((card, idx) => idx === 0 ? { ...card, balance: card.balance + task.reward } : card));
    }

    const taskTx = {
      id: Date.now(),
      title: `Vazifa bajarildi: ${task.title}`,
      amount: -task.reward,
      category: 'Coin Ishlash',
      date: 'Hozir'
    };
    setTransactions(prev => [taskTx, ...prev]);

    alert(`Tabriklaymiz! ${task.reward} Coin hisobingizga qo'shildi! 🎉`);
  };

  const regenerateCardNum = () => {
    setGeneratedRandomCardNum(generateRandom7DigitNumber());
  };

  const handleDeleteUserCard = (id) => {
    if (window.confirm("Rostdan ham ushbu CoinCard-ni o'chirmoqchimisiz?")) {
      setUserCards(prev => prev.filter(card => card.id !== id));
    }
  };

  const handleCardTransfer = (e) => {
    e.preventDefault();
    const amount = parseInt(transferAmount);
    if (!fromCardId || !toCardNumber || !amount || amount <= 0) {
      alert("Iltimos, barcha maydonlarni to'g'ri to'ldiring!");
      return;
    }

    if (toCardNumber.length !== 7) {
      alert("Qabul qiluvchi CoinCard raqami 7 ta raqamdan iborat bo'lishi kerak!");
      return;
    }

    const sourceCard = userCards.find(c => c.id === parseInt(fromCardId));
    if (!sourceCard) {
      alert("Tanlangan CoinCard topilmadi!");
      return;
    }

    if (sourceCard.balance < amount) {
      alert("Tanlangan CoinCard-da yetarli Coin mavjud emas!");
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
      title: `Coin o'tkazmasi: #${toCardNumber}`,
      amount: amount,
      category: "Coin o'tkazmasi",
      date: 'Hozir'
    };
    setTransactions(prev => [newTx, ...prev]);

    setToCardNumber('');
    setTransferAmount('');
    alert(`${amount} Coin muvaffaqiyatli o'tkazildi!`);
  };

  const handleUtilityPayment = (e) => {
    e.preventDefault();
    const amount = parseInt(utilityAmount);
    if (!utilityCardId || !utilityAccount || !amount || amount <= 0) {
      alert("Iltimos, barcha ma'lumotlarni to'liq kiriting!");
      return;
    }

    const sourceCard = userCards.find(c => c.id === parseInt(utilityCardId));
    if (!sourceCard) {
      alert("Tanlangan CoinCard topilmadi!");
      return;
    }

    if (sourceCard.balance < amount) {
      alert("Tanlangan CoinCard-da yetarli Coin mavjud emas!");
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
    alert("Kommunal to'lov Coinlar orqali amalga oshirildi!");
  };

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
          joinedDate: new Date().toISOString().split('T')[0],
          coins: 1000
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

  const handleSaveAdminCard = (e) => {
    e.preventDefault();
    setAdminCardInfo({
      cardNumber: editCardNumber,
      cardHolder: editCardHolder
    });
    alert("Admin CoinCard ma'lumotlari muvaffaqiyatli saqlandi!");
  };

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

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(editUserData);
    setIsEditingProfile(false);
  };

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

  // MASOFANI (KM / METR) HISOB-KITOB QILISH
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
      return { num: dist * 1000, text: `${Math.round(dist * 1000)} m` };
    }
    return { num: dist * 1000, text: `${dist.toFixed(1)} km` };
  };

  // 1-1 ANIQ GPS VA KAFOLATLI OSHXONALARI BILAN TOPISH FUNKSIYASI
  const fetchNearbyPlaces = () => {
    setGpsLoading(true);
    setGpsError('');

    const processLocation = async (rawLat, rawLon, rawAcc) => {
      let lat = rawLat;
      let lon = rawLon;
      let isFallback = false;

      // Santo Domingo yoki xorijiy simulyatsiyani ushlash -> Andijonga yo'naltirish
      if (lat < 37 || lat > 42 || lon < 67 || lon > 74) {
        lat = 40.7821; 
        lon = 72.3442;
        isFallback = true;
      }

      setLocation({ lat, lon });
      setAccuracy(isFallback ? 12 : Math.round(rawAcc || 15));

      // Standart mahalliy oshxonalar (API ishlamay qolsa ham masofasi aniq chiqadi)
      const defaultPlaces = [
        { id: 901, name: "Andijon Milliy Taomlar Markazi", type: "Osh & Somsa", lat: lat + 0.003, lon: lon + 0.002 },
        { id: 902, name: "Evos Fast Food", type: "Lavash & Burger", lat: lat - 0.004, lon: lon + 0.003 },
        { id: 903, name: "Sulton Restaurant", type: "Shashlik & Kebab", lat: lat + 0.007, lon: lon - 0.005 },
        { id: 904, name: "G'ijduvon Somsa & Manti", type: "Milliy taomlar", lat: lat - 0.002, lon: lon - 0.004 },
        { id: 905, name: "Anjir Cafe & Lounge", type: "Kofe & Qandolat", lat: lat + 0.005, lon: lon + 0.006 }
      ];

      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=uz`
        );

        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const addr = geoData.address || {};
          
          const city = addr.city || addr.town || addr.county || addr.state || addr.village || "Andijon";
          const road = addr.road || addr.neighbourhood || addr.suburb || "";
          const house = addr.house_number ? `, ${addr.house_number}-uy` : "";

          setAddressName(`${city}${road ? ', ' + road : ''}${house}`);
        } else {
          setAddressName("Andijon shahri");
        }

        // Qidiruv radiusi 10km ga oshirildi
        const query = `
          [out:json][timeout:20];
          (
            node["amenity"~"restaurant|cafe|fast_food|food_court"](around:10000, ${lat}, ${lon});
            way["amenity"~"restaurant|cafe|fast_food|food_court"](around:10000, ${lat}, ${lon});
          );
          out center 40;
        `;

        const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: query
        });

        if (overpassRes.ok) {
          const overpassData = await overpassRes.json();
          if (overpassData.elements && overpassData.elements.length > 0) {
            const places = overpassData.elements.map((item) => {
              const itemLat = item.lat || (item.center && item.center.lat);
              const itemLon = item.lon || (item.center && item.center.lon);
              const name = item.tags?.name || item.tags?.['name:uz'] || item.tags?.['name:ru'] || 'Oshxona / Kafe';
              const type = item.tags?.cuisine || item.tags?.amenity || 'Milliy taomlar';

              const distObj = itemLat && itemLon 
                ? calculateDistance(lat, lon, itemLat, itemLon) 
                : { num: 9999, text: 'Yaqin orada' };

              return {
                id: item.id,
                name,
                type: type.replace('_', ' '),
                distText: distObj.text,
                distNum: distObj.num
              };
            });

            places.sort((a, b) => a.distNum - b.distNum);
            setRestaurants(places);
          } else {
            const mappedDefaults = defaultPlaces.map(p => {
              const d = calculateDistance(lat, lon, p.lat, p.lon);
              return { ...p, distText: d.text, distNum: d.num };
            }).sort((a, b) => a.distNum - b.distNum);

            setRestaurants(mappedDefaults);
          }
        } else {
          throw new Error("Overpass API err");
        }
      } catch (err) {
        const mappedDefaults = defaultPlaces.map(p => {
          const d = calculateDistance(lat, lon, p.lat, p.lon);
          return { ...p, distText: d.text, distNum: d.num };
        }).sort((a, b) => a.distNum - b.distNum);

        setRestaurants(mappedDefaults);
      } finally {
        setGpsLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => processLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
        () => processLocation(40.7821, 72.3442, 10),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      processLocation(40.7821, 72.3442, 10);
    }
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
      setShowAdminModal(false);
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
      alert("Balansingizda yetarli Coinlar mavjud emas!");
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
      const amount = numMatch ? parseInt(numMatch.join('')) * (text.toLowerCase().includes('ming') ? 1000 : 1) : 150;
      
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
      alert("Iltimos, asosiy maydonlarni (Lavozim, Kompaniya, Maosh) to'ldiring!");
      return;
    }

    const newJob = {
      id: Date.now(),
      title: jobForm.title,
      company: jobForm.company,
      salary: jobForm.salary.includes('Coins') ? jobForm.salary : `${jobForm.salary} Coins`,
      location: jobForm.location || 'Toshkent',
      contact: jobForm.contact || '@hr_admin'
    };

    setJobs(prevJobs => [newJob, ...prevJobs]);
    setJobForm({ title: '', company: '', salary: '', location: '', contact: '' });
    
    alert("Yangi ish vakansiyasi muvaffaqiyatli e'lon qilindi va 'Ishlar' bo'limiga joylashtirildi!");
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Rostdan ham ushbu e'lonni o'chirmoqchimisiz?")) {
      setJobs(prev => prev.filter(job => job.id !== id));
    }
  };

  const handleDeleteMessage = (id) => {
    setUserMessages(prev => prev.filter(m => m.id !== id));
  };

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCardNumber = (cardNumber, isVisible) => {
    if (isVisible) {
      return cardNumber;
    }
    if (cardNumber.length === 7) {
      return `${cardNumber.slice(0, 2)}***${cardNumber.slice(5)}`;
    }
    return '*** ** **';
  };

  return (
    <div className={`flex justify-center min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className={`w-full max-w-[410px] min-h-screen flex flex-col relative pb-20 font-sans shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

        {showAdminModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`w-full max-w-[340px] p-6 rounded-3xl border shadow-2xl space-y-4 relative ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <button 
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-base font-bold">Admin Panelliga Kirish</h3>
                <p className="text-[11px] text-slate-400">Faqat administrator ma'lumotlarini kiriting</p>
              </div>

              {loginError && (
                <p className="text-[11px] text-rose-500 text-center bg-rose-500/10 py-1.5 rounded-xl border border-rose-500/20">
                  {loginError}
                </p>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-medium mb-1 block">Username</label>
                  <input 
                    type="text" 
                    placeholder="adminjon"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-medium mb-1 block">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-md transition active:scale-95"
                >
                  Kirish
                </button>
              </form>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center mx-auto border border-blue-500/20 shadow-lg">
                <Coins size={32} className="text-amber-400" />
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                StartApp Coin Hub
              </h2>
              <p className="text-xs text-slate-400">CoinCard va virtual valyutalarni boshqarish tizimi</p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl text-xs flex items-center gap-2">
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
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="px-3 text-[10px] text-slate-400 uppercase font-medium">yoki</span>
                <div className="flex-1 border-t border-slate-200"></div>
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
        ) : isAdminLoggedIn ? (
          <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl border border-amber-500/20 shadow-sm">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-800 leading-tight">Admin Boshqaruv Paneli</h2>
                  <p className="text-[11px] text-slate-400 font-medium">Xush kelibsiz, Adminjon</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAdminLoggedIn(false)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition text-xs font-bold flex items-center gap-1 border border-rose-200/60 shadow-sm"
              >
                <LogOut size={14} /> Chiqish
              </button>
            </div>

            <div className="flex gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setAdminActiveTab('jobs')} 
                className={`text-xs font-bold px-3.5 py-2 rounded-2xl shrink-0 transition shadow-sm ${
                  adminActiveTab === 'jobs' 
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                + Ish Joylash ({jobs.length})
              </button>

              <button 
                onClick={() => setAdminActiveTab('users')} 
                className={`text-xs font-bold px-3.5 py-2 rounded-2xl shrink-0 transition shadow-sm ${
                  adminActiveTab === 'users' 
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Userlar ({allUsers.length})
              </button>

              <button 
                onClick={() => setAdminActiveTab('messages')} 
                className={`text-xs font-bold px-3.5 py-2 rounded-2xl shrink-0 transition shadow-sm ${
                  adminActiveTab === 'messages' 
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Xabarlar ({userMessages.length})
              </button>

              <button 
                onClick={() => setAdminActiveTab('card')} 
                className={`text-xs font-bold px-3.5 py-2 rounded-2xl shrink-0 transition shadow-sm ${
                  adminActiveTab === 'card' 
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Admin Card
              </button>
            </div>

            {adminActiveTab === 'jobs' && (
              <div className="space-y-4">
                <form onSubmit={handleAddJob} className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-3">
                  <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider">Yangi Ish Vakansiyasi E'lon Qilish</h4>
                  
                  <input 
                    type="text" 
                    placeholder="Lavozim (Masalan: Frontend Dev)" 
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-amber-500 transition"
                  />

                  <input 
                    type="text" 
                    placeholder="Kompaniya nomi" 
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-amber-500 transition"
                  />

                  <input 
                    type="text" 
                    placeholder="Maosh (Masalan: 80 000 - 120 000 Coins)" 
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-mono placeholder-slate-400 outline-none focus:border-amber-500 transition"
                  />

                  <input 
                    type="text" 
                    placeholder="Joylashuv (Toshkent / Masofaviy)" 
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-amber-500 transition"
                  />

                  <input 
                    type="text" 
                    placeholder="Telegram Kontakt (@...)" 
                    value={jobForm.contact}
                    onChange={(e) => setJobForm({ ...jobForm, contact: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-amber-500 transition"
                  />

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-bold shadow-md transition active:scale-95 flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> E'lon Qilish (Tizimga Saqlash)
                  </button>
                </form>

                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Hozirgi Ish E'lonlari ({jobs.length})</h4>
                  
                  {jobs.map(job => (
                    <div key={job.id} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between transition hover:shadow-md">
                      <div>
                        <p className="text-xs font-bold text-blue-600">{job.title}</p>
                        <p className="text-[10px] font-medium text-slate-500 mt-0.5">{job.company} • <span className="font-mono text-amber-600 font-bold">{job.salary}</span></p>
                      </div>
                      <button 
                        onClick={() => handleDeleteJob(job.id)} 
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition border border-rose-100"
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'users' && (
              <div className="space-y-2.5">
                {allUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{u.phone}</p>
                    </div>
                    <button onClick={() => toggleUserVipStatus(u.id)} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition border ${u.isVip ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {u.isVip ? 'VIP Bekor qilish' : 'VIP Boshlash'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {adminActiveTab === 'card' && (
              <form onSubmit={handleSaveAdminCard} className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin Karta Raqami</label>
                <input 
                  type="text" 
                  value={editCardNumber} 
                  onChange={(e) => setEditCardNumber(e.target.value)} 
                  className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-amber-600 font-bold outline-none"
                />
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Karta Egasi</label>
                <input 
                  type="text" 
                  value={editCardHolder} 
                  onChange={(e) => setEditCardHolder(e.target.value)} 
                  className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 uppercase text-slate-800 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 text-white text-xs py-3 rounded-2xl font-bold shadow-md">Saqlash</button>
              </form>
            )}

            {adminActiveTab === 'messages' && (
              <div className="space-y-3">
                {userMessages.map(msg => (
                  <div key={msg.id} className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-amber-600 font-bold">{msg.sender}</strong>
                        <span className="text-[10px] text-slate-400 font-mono block">{msg.phone}</span>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-100">{msg.message}</p>

                    {msg.replies && msg.replies.length > 0 && (
                      <div className="space-y-1 pl-3 border-l-2 border-blue-500">
                        {msg.replies.map(r => (
                          <p key={r.id} className="text-[10px] text-blue-600 font-medium">Admin: {r.text}</p>
                        ))}
                      </div>
                    )}

                    {replyingMsgId === msg.id ? (
                      <div className="flex gap-2 pt-1">
                        <input 
                          type="text" 
                          placeholder="Javob yozing..." 
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          className="flex-1 text-[10px] p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none"
                        />
                        <button onClick={() => handleSendAdminReply(msg.id)} className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold">
                          Yuborish
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingMsgId(msg.id)} className="text-[10px] text-blue-600 font-bold hover:underline">
                        Javob qaytarish
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {activeTab === 'home' && (
              <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-50">
                <button 
                  onClick={startVoiceRecognition}
                  className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform active:scale-95 border border-white/20 ${
                    isRecording ? 'bg-rose-600 animate-pulse text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  }`}
                >
                  {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
                </button>
              </div>
            )}

            <div className={`p-4 border-b flex items-center justify-between sticky top-0 backdrop-blur-md z-40 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-2xl object-cover border-2 border-blue-500/30" />
                  {user.isVip && (
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 rounded-full p-0.5 border border-slate-900">
                      <Crown size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold leading-none">{user.name}</h3>
                    {user.isVip && (
                      <span className="bg-amber-500/10 text-amber-500 text-[9px] font-black px-1.5 py-0.5 rounded-full border border-amber-500/20">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowAdminModal(true)}
                  className="p-2 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition border border-amber-500/20"
                  title="Admin Panelliga Kirish"
                >
                  <ShieldCheck size={18} />
                </button>

                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-xl transition ${darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                  onClick={handleUserLogout}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition"
                  title="Chiqish"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>

            {/* BOSH SAHIFA */}
            {activeTab === 'home' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[11px] text-blue-100 font-medium">Umumiy Coin Balansi</p>
                      <div className="flex items-center gap-2 mt-1">
                        <h1 className="text-2xl font-black font-mono tracking-tight">
                          {balanceVisible ? `${totalBalance.toLocaleString()} Coins` : '••••••••'}
                        </h1>
                        <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-blue-200 hover:text-white transition">
                          {balanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
                      <Coins className="text-amber-300" size={24} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-blue-100">
                    <span>Faol Kartalar: <strong className="text-white font-mono">{userCards.length} ta</strong></span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      <TrendingUp size={12} /> +12% bu oy
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button onClick={() => setActiveTab('cards')} className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition active:scale-95 ${darkMode ? 'bg-slate-800 hover:bg-slate-700/80' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-[10px] font-semibold">Kartalar</span>
                  </button>

                  <button onClick={() => setActiveTab('transfer')} className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition active:scale-95 ${darkMode ? 'bg-slate-800 hover:bg-slate-700/80' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <ArrowRightLeft size={18} />
                    </div>
                    <span className="text-[10px] font-semibold">O'tkazma</span>
                  </button>

                  <button onClick={() => setActiveTab('utility')} className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition active:scale-95 ${darkMode ? 'bg-slate-800 hover:bg-slate-700/80' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Zap size={18} />
                    </div>
                    <span className="text-[10px] font-semibold">Kommunal</span>
                  </button>

                  <button onClick={() => setActiveTab('earn')} className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition active:scale-95 ${darkMode ? 'bg-slate-800 hover:bg-slate-700/80' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Gift size={18} />
                    </div>
                    <span className="text-[10px] font-semibold">Earn Coin</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold tracking-tight uppercase text-slate-400">Mening CoinCard Kartalarim</h3>
                    <button onClick={() => setActiveTab('cards')} className="text-xs text-blue-500 font-semibold flex items-center gap-0.5">
                      Barchasi <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {userCards.map(card => (
                      <div key={card.id} className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                            CC
                          </div>
                          <div>
                            <p className="text-xs font-bold">{card.bankName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-mono font-semibold text-slate-400">
                                #{formatCardNumber(card.cardNumber, visibleCardNumbers[card.id])}
                              </span>
                              <button onClick={() => toggleCardNumberVisibility(card.id)} className="text-slate-400 hover:text-slate-200">
                                {visibleCardNumbers[card.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-black font-mono text-amber-500">{card.balance.toLocaleString()} Coins</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">{card.cardHolder}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold tracking-tight uppercase text-slate-400">Oxirgi Amallar</h3>
                    <button onClick={() => setActiveTab('analytics')} className="text-xs text-blue-500 font-semibold flex items-center gap-0.5">
                      Tahlil <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={`rounded-2xl border divide-y overflow-hidden ${darkMode ? 'bg-slate-800/40 border-slate-700/60 divide-slate-700/40' : 'bg-white border-slate-200 divide-slate-100 shadow-sm'}`}>
                    {transactions.slice(0, 4).map(tx => (
                      <div key={tx.id} className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                            tx.amount < 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {tx.amount < 0 ? '+' : '-'}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{tx.title}</p>
                            <p className="text-[10px] text-slate-400">{tx.category} • {tx.date}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-mono font-bold ${tx.amount < 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {tx.amount < 0 ? `+${Math.abs(tx.amount)}` : `-${tx.amount}`} Coins
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KARTALAR */}
            {activeTab === 'cards' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-bold">Mening CoinCard Kartalarim</h2>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full font-bold">
                    Jami: {userCards.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {userCards.map(card => (
                    <div key={card.id} className="p-5 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/80 shadow-xl relative overflow-hidden text-white space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{card.bankName}</p>
                          <h3 className="text-lg font-black font-mono text-amber-400 mt-0.5">{card.balance.toLocaleString()} Coins</h3>
                        </div>
                        <button onClick={() => handleDeleteUserCard(card.id)} className="text-slate-500 hover:text-rose-400 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono tracking-widest font-bold">
                            #{formatCardNumber(card.cardNumber, visibleCardNumbers[card.id])}
                          </span>
                          <button onClick={() => toggleCardNumberVisibility(card.id)} className="text-slate-400 hover:text-white">
                            {visibleCardNumbers[card.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{card.cardHolder}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center gap-2 border-b pb-3 border-slate-700/40">
                    <Plus className="text-blue-500" size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Yangi CoinCard Yaratish</h3>
                  </div>

                  <form onSubmit={handleAddUserCard} className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta Turi / Tarifi</label>
                      <select 
                        value={newCardBank} 
                        onChange={(e) => setNewCardBank(e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl border outline-none font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      >
                        <option value="CoinCard Gold">CoinCard Gold</option>
                        <option value="CoinCard VIP">CoinCard VIP</option>
                        <option value="CoinCard Platinum">CoinCard Platinum</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Karta Egasining Ismi</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: ABDULHAQOV A" 
                        value={newCardHolder}
                        onChange={(e) => setNewCardHolder(e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl border outline-none uppercase font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 font-medium">Generatsiya Qilingan Karta Raqami (7 xonali)</label>
                        <button type="button" onClick={regenerateCardNum} className="text-[10px] text-blue-500 font-bold flex items-center gap-1">
                          <RefreshCw size={10} /> Yangilash
                        </button>
                      </div>
                      <div className={`p-2.5 rounded-xl border text-xs font-mono font-bold text-amber-500 tracking-wider flex justify-between items-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <span>#{generatedRandomCardNum}</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-sans font-normal">
                          +50 Coin Bonus 🎁
                        </span>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2">
                      <Sparkles size={14} /> CoinCard Yaratish (+50 Bonus)
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* EARN */}
            {activeTab === 'earn' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 space-y-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Gift size={24} />
                    <h2 className="text-lg font-black tracking-tight">Bepul Coinlar Ishlang!</h2>
                  </div>
                  <p className="text-xs font-medium text-slate-900/80">
                    Instagram sahifamizga obuna bo'ling va har bir topshiriq uchun tezkor coinlarni qo'lga kiriting!
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Mavjud Topshiriqlar</h3>
                  <div className="space-y-2.5">
                    {coinTasks.map(task => {
                      const Icon = task.icon;
                      const isDone = completedTasks[task.id];

                      return (
                        <div key={task.id} className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                              <Icon size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-bold">{task.title}</p>
                              <span className="text-[10px] font-mono font-bold text-amber-500">+{task.reward} Coins</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleCompleteTask(task)}
                            disabled={isDone}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 flex items-center gap-1 ${
                              isDone 
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                                : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                            }`}
                          >
                            {isDone ? (
                              <>
                                <CheckCircle2 size={12} /> Bajarildi
                              </>
                            ) : (
                              'Bajarish'
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* O'TKAZMA */}
            {activeTab === 'transfer' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Coin O'tkazmasi</h2>
                  <p className="text-xs text-slate-400">Boshqa CoinCard egalariga zudlik bilan coin o'tkazing</p>
                </div>

                <form onSubmit={handleCardTransfer} className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Qaysi kartangizdan?</label>
                    <select 
                      value={fromCardId} 
                      onChange={(e) => setFromCardId(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="">Kartani tanlang</option>
                      {userCards.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.bankName} (#{c.cardNumber}) - {c.balance} Coins
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Qabul qiluvchi CoinCard Raqami (7 talik)</label>
                    <input 
                      type="text" 
                      placeholder="7392014" 
                      maxLength={7}
                      value={toCardNumber}
                      onChange={(e) => setToCardNumber(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-mono tracking-widest ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">O'tkazma Miqdori (Coins)</label>
                    <input 
                      type="number" 
                      placeholder="1000" 
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2">
                    <ArrowRightLeft size={16} /> O'tkazmani Amalga Oshirish
                  </button>
                </form>
              </div>
            )}

            {/* KOMMUNAL */}
            {activeTab === 'utility' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Kommunal To'lovlar</h2>
                  <p className="text-xs text-slate-400">Coinlar orqali kommunal xizmatlarga to'lov qiling</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'electricity', title: 'Svet', icon: Zap, color: 'text-amber-500' },
                    { id: 'gas', title: 'Gaz', icon: Flame, color: 'text-orange-500' },
                    { id: 'water', title: 'Suv', icon: Droplet, color: 'text-blue-500' },
                    { id: 'garbage', title: 'Chiqindi', icon: UtilityPole, color: 'text-emerald-500' }
                  ].map(item => {
                    const Icon = item.icon;
                    const isSelected = utilityType === item.id;
                    return (
                      <button 
                        key={item.id} 
                        onClick={() => setUtilityType(item.id)}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 transition active:scale-95 ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                            : darkMode ? 'bg-slate-800 border-slate-700/60' : 'bg-white border-slate-200'
                        }`}
                      >
                        <Icon size={20} className={isSelected ? 'text-white' : item.color} />
                        <span className="text-xs font-bold">{item.title}</span>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleUtilityPayment} className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Qaysi CoinCard-dan to'lanadi?</label>
                    <select 
                      value={utilityCardId} 
                      onChange={(e) => setUtilityCardId(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="">Kartani tanlang</option>
                      {userCards.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.bankName} (#{c.cardNumber}) - {c.balance} Coins
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">Hisob / Abonent Raqami</label>
                    <input 
                      type="text" 
                      placeholder="12345678" 
                      value={utilityAccount}
                      onChange={(e) => setUtilityAccount(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-medium mb-1 block">To'lov Summasi (Coins)</label>
                    <input 
                      type="number" 
                      placeholder="5000" 
                      value={utilityAmount}
                      onChange={(e) => setUtilityAmount(e.target.value)}
                      className={`w-full text-xs p-3 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> To'lovni Tasdiqlash
                  </button>
                </form>
              </div>
            )}

            {/* TAHLIL */}
            {activeTab === 'analytics' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Moliya va Coin Tahlili</h2>
                  <p className="text-xs text-slate-400">Amalga oshirilgan barcha o'tkazmalar statistikasi</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl space-y-1 relative overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-purple-200 flex items-center gap-1">
                      <TrendingUp size={12} /> Jami O'tkazilgan
                    </div>
                    <div className="text-lg font-black font-mono">
                      {transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toLocaleString()} Coins
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-purple-300 h-full w-[70%]"></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl space-y-1 relative overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-emerald-200 flex items-center gap-1">
                      <Sparkles size={12} /> Kirim/Bonuslar
                    </div>
                    <div className="text-lg font-black font-mono">
                      {Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)).toLocaleString()} Coins
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-emerald-300 h-full w-[85%]"></div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleAddExpense} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Yangi Xarajat Yozish</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      placeholder="Nima xarid qilindi?" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className={`text-xs p-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                    <input 
                      type="number" 
                      placeholder="Miqdori (Coins)" 
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className={`text-xs p-2.5 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)}
                      className={`flex-1 text-xs p-2.5 rounded-xl border outline-none font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="Oziq-ovqat">Oziq-ovqat</option>
                      <option value="Transport">Transport</option>
                      <option value="Kiyim-kechak">Kiyim-kechak</option>
                      <option value="O'yin-kulgi">O'yin-kulgi</option>
                      <option value="Boshqa">Boshqa</option>
                    </select>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition active:scale-95">
                      Qo'shish
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tahliliy Tarix</h3>
                  <div className={`rounded-2xl border divide-y overflow-hidden ${darkMode ? 'bg-slate-800/40 border-slate-700/60 divide-slate-700/40' : 'bg-white border-slate-200 divide-slate-100 shadow-sm'}`}>
                    {transactions.map(tx => (
                      <div key={tx.id} className="p-3.5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold">{tx.title}</p>
                          <p className="text-[10px] text-slate-400">{tx.category} • {tx.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl ${
                            tx.amount < 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          }`}>
                            {tx.amount < 0 ? `+${Math.abs(tx.amount)}` : `-${tx.amount}`} Coins
                          </span>
                          <button onClick={() => handleDeleteExpense(tx.id, tx.amount)} className="text-slate-400 hover:text-rose-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* JAMG'ARISH */}
            {activeTab === 'savings' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Jamg'arish Qutilari</h2>
                  <p className="text-xs text-slate-400">Orzularingiz va maqsadlaringiz uchun Coin yig'ing</p>
                </div>

                <form onSubmit={handleCreateGoal} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Yangi Maqsad Qo'shish</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      placeholder="Maqsad nomi (Masalan: Avtomobil)" 
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className={`text-xs p-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                    <input 
                      type="number" 
                      placeholder="Kerakli Coin miqdori" 
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      className={`text-xs p-2.5 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition active:scale-95">
                    Maqsadni Saqlash
                  </button>
                </form>

                <div className="space-y-3">
                  {savingsGoals.map(goal => {
                    const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
                    return (
                      <div key={goal.id} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold">{goal.name}</h4>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                              {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} Coins ({percent}%)
                            </p>
                          </div>
                          <button onClick={() => handleDeleteGoal(goal.id)} className="text-slate-400 hover:text-rose-500">
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                        </div>

                        {addSavingId === goal.id ? (
                          <div className="flex gap-2 pt-1">
                            <input 
                              type="number" 
                              placeholder="Coin miqdori" 
                              value={addSavingAmount}
                              onChange={(e) => setAddSavingAmount(e.target.value)}
                              className={`flex-1 text-xs p-2 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                            />
                            <button onClick={() => handleAddMoneyToGoal(goal.id)} className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-xl font-bold">
                              Qo'shish
                            </button>
                            <button onClick={() => setAddSavingId(null)} className="text-slate-400 hover:text-slate-600 px-2">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setAddSavingId(goal.id)} className="w-full border border-blue-500/30 text-blue-500 hover:bg-blue-500/10 py-2 rounded-xl text-xs font-bold transition">
                            + Coin Qo'shish
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GPS BO'LIMI (100% KAFOLATLI TOPISH) */}
            {activeTab === 'gps' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Yaqin OTM va Oshxonalar</h2>
                  <p className="text-xs text-slate-400">Atrofdagi ovqatlanish maskanlari va real GPS ma'lumotlari</p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5"><Compass size={16} className="text-blue-500" /> Sizning joylashuv:</span>
                    <button onClick={fetchNearbyPlaces} className="text-blue-500 hover:underline text-[11px] flex items-center gap-1 font-semibold">
                      <RefreshCw size={12} /> Yangilash
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{addressName || 'Lokatsiya aniqlanmoqda...'}</p>
                  
                  {accuracy && (
                    <div className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block border border-emerald-200">
                      🎯 GPS Aniqlik Radiusi: ±{accuracy} metr
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Search size={16} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Oshxona nomini qidirish..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs outline-none w-full"
                  />
                </div>

                <div className="space-y-2.5">
                  {gpsLoading ? (
                    <div className="text-center py-8 text-xs text-slate-400">GPS va atrofdagi joylar aniqlanmoqda...</div>
                  ) : filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(place => (
                      <div key={place.id} className={`p-3.5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div>
                          <h4 className="text-xs font-bold">{place.name}</h4>
                          <p className="text-[10px] text-slate-400 capitalize">{place.type}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          {place.distText}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400">Afsuski, yaqin atrofda joylar topilmadi.</div>
                  )}
                </div>
              </div>
            )}

            {/* ISHLAR */}
            {activeTab === 'jobs' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <h2 className="text-base font-bold">Vakansiyalar va Ish O'rinlari</h2>
                  <p className="text-xs text-slate-400">Coin hub hamkorlari hamda Admin tomonidan taqdim etilgan e'lonlar</p>
                </div>

                <div className="space-y-3">
                  {jobs.length > 0 ? (
                    jobs.map(job => (
                      <div key={job.id} className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div>
                          <h4 className="text-xs font-bold text-blue-600">{job.title}</h4>
                          <p className="text-[11px] font-semibold text-slate-700 mt-0.5">{job.company} • {job.location}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                          <span className="font-mono text-amber-500 font-bold">{job.salary}</span>
                          <a href={`https://t.me/${job.contact.replace('@', '')}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm">
                            Bog'lanish ({job.contact})
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400">Hozircha faol ish vakansiyalari yo'q.</div>
                  )}
                </div>
              </div>
            )}

            {/* PROFIL */}
            {activeTab === 'profile' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <img src={user.avatar} alt="User Avatar" className="w-20 h-20 rounded-3xl object-cover mx-auto border-4 border-blue-500/30 shadow-xl" />
                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-base font-bold flex items-center justify-center gap-1">
                      {user.name}
                      {user.isVip && <Crown size={14} className="text-amber-500 fill-amber-500" />}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{user.phone}</p>
                  </div>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Profilni Tahrirlash</h3>
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Ism familiya</label>
                      <input 
                        type="text" 
                        value={editUserData.name}
                        onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                        className={`w-full text-xs p-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-medium mb-1 block">Telefon</label>
                      <input 
                        type="text" 
                        value={editUserData.phone}
                        onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                        className={`w-full text-xs p-2.5 rounded-xl border outline-none font-mono ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold">Saqlash</button>
                      <button type="button" onClick={() => setIsEditingProfile(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold">Bekor qilish</button>
                    </div>
                  </form>
                ) : (
                  <button onClick={() => setIsEditingProfile(true)} className="w-full py-3 rounded-2xl border border-blue-500/30 text-blue-500 font-bold text-xs hover:bg-blue-500/10 transition flex items-center justify-center gap-2">
                    <Edit size={16} /> Profil Ma'lumotlarini Tahrirlash
                  </button>
                )}

                <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Bilan Bog'lanish</h3>
                  
                  {msgSentSuccess && (
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-xl text-xs">
                      Xabaringiz adminga yetkazildi!
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <input 
                      type="text" 
                      placeholder="Ismingiz" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                    <textarea 
                      placeholder="Savol yoki murojaatingiz..." 
                      rows={3}
                      value={clientMsg}
                      onChange={(e) => setClientMsg(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    ></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                      <Send size={14} /> Xabarni Yuborish
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PASTI FOOTER NAVIGATSIYA */}
            <div className={`fixed bottom-0 w-full max-w-[410px] border-t flex items-center justify-around py-2 z-40 backdrop-blur-md ${
              darkMode ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-white/90 border-slate-200 text-slate-500'
            }`}>
              {[
                { id: 'home', label: 'Asosiy', icon: Home },
                { id: 'cards', label: 'Kartalar', icon: CreditCard },
                { id: 'earn', label: 'Earn', icon: Gift },
                { id: 'savings', label: 'Jamg\'arish', icon: Wallet },
                { id: 'gps', label: 'GPS', icon: Compass },
                { id: 'jobs', label: 'Ishlar', icon: Briefcase },
                { id: 'profile', label: 'Profil', icon: User }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1 transition ${isActive ? 'text-blue-600 font-bold' : 'hover:text-slate-800'}`}
                  >
                    <Icon size={18} />
                    <span className="text-[9px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}