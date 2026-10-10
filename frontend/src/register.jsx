import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronLeft 
} from 'lucide-react';

const RegisterForm = ({ onSubmit, onLogin, error }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-lg p-6 flex flex-col font-sans">
        
        {/* Верхняя панель (Header) */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-1 text-gray-700 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Ro'yxatdan o'tish</h1>
          <div className="w-6"></div> {/* Для центрирования заголовка */}
        </div>

        {/* Подзаголовок */}
        <h2 className="text-base font-bold text-slate-800 mb-5">
          Yangi hisob yarating
        </h2>

        {error && <p role="alert" className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          
          {/* Имя и фамилия */}
          <div className="relative border border-gray-200 rounded-2xl p-3 flex items-center gap-3 focus-within:border-blue-500 transition">
            <User size={20} className="text-gray-400 shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-gray-400 font-medium">Ism va familiya</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent"
                placeholder="Ism va familiya"
                required
              />
            </div>
          </div>

          {/* Телефон номер */}
          <div className="relative border border-gray-200 rounded-2xl p-3 flex items-center gap-3 focus-within:border-blue-500 transition">
            <Phone size={20} className="text-gray-400 shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-gray-400 font-medium">Telefon raqam</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent"
                placeholder="+998 90 123 45 67"
                required
              />
            </div>
          </div>

          {/* Email (необязательно) */}
          <div className="relative border border-gray-200 rounded-2xl p-3 flex items-center gap-3 focus-within:border-blue-500 transition">
            <Mail size={20} className="text-gray-400 shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-gray-400 font-medium">Email (ixtiyoriy)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Пароль */}
          <div className="relative border border-gray-200 rounded-2xl p-3 flex items-center gap-3 focus-within:border-blue-500 transition">
            <Lock size={20} className="text-gray-400 shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-gray-400 font-medium">Parol</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent"
                placeholder="••••••"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Чекбокс согласия */}
          <div className="flex items-start gap-2.5 mt-1">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-xs text-gray-500 leading-tight cursor-pointer">
              Men <span className="text-blue-600 font-medium">foydalanuvchi shartlari</span> va{' '}
              <span className="text-blue-600 font-medium">maxfiylik siyosatiga</span> roziman
            </label>
          </div>

          {/* Кнопка регистрации */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.agreeTerms}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-3.5 rounded-2xl shadow-md shadow-blue-200 transition active:scale-[0.98]"
          >
            {isSubmitting ? 'Kutilmoqda...' : "Ro'yxatdan o'tish"}
          </button>
        </form>

        {/* Разделитель "yoki" */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-400 absolute">yoki</span>
        </div>

        {/* Кнопки сторонней авторизации (Google & Apple) */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-2.5 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Google</span>
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-2.5 hover:bg-gray-50 transition">
            <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.84.13-9.64-1.92-14.41-6.14-3.23-2.82-7.1-7.48-11.63-13.98-6.14-8.8-11.03-18.73-14.67-29.8-3.64-11.07-5.46-21.73-5.46-31.98 0-14.54 3.69-26.4 11.07-35.58 7.38-9.18 16.82-13.88 28.32-14.1 4.58 0 9.7 1.15 15.36 3.45 5.66 2.3 9.4 3.45 11.22 3.45 1.57 0 5.48-1.22 11.73-3.66 6.25-2.44 11.45-3.55 15.58-3.34 11.66.52 21.1 4.7 28.33 12.54-10.22 6.21-15.22 14.86-15 25.96.22 8.7 3.51 16.03 9.87 21.98 6.36 5.95 14.07 9.4 23.13 10.35-2.28 6.9-5.18 13.62-8.71 20.15zM119.22 31.84c0-6.93 2.5-13.52 7.5-19.78 5-6.26 11.4-10.31 19.2-12.15.22 1.09.33 2.08.33 2.97 0 6.93-2.58 13.68-7.73 20.25-5.15 6.57-11.53 10.53-19.14 11.88-.11-.98-.16-2.04-.16-3.17z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Apple</span>
          </button>
        </div>

        {/* Нижний текст переключения на Login */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Hisobingiz bormi?{' '}
          <a href="#login" onClick={(event) => { event.preventDefault(); onLogin() }} className="text-blue-600 font-semibold hover:underline">
            Kirish
          </a>
        </div>

      </div>
    </div>
  );
};

export default RegisterForm;