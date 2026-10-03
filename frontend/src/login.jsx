import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginInput: '+998 90 123 45 67',
    password: '••••••••',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-lg p-6 flex flex-col font-sans">
        
        {/* Заголовок */}
        <h1 className="text-2xl font-bold text-slate-800 mb-2 mt-4">
          Kirish
        </h1>

        {/* Подзаголовок */}
        <p className="text-sm font-semibold text-slate-800 mb-6">
          Hisobingizga kiring
        </p>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          
          {/* Телефон или Email */}
          <div className="relative border border-gray-200 rounded-2xl p-3 flex items-center gap-3 focus-within:border-blue-500 transition">
            <Phone size={20} className="text-gray-400 shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-gray-400 font-medium">Telefon raqam yoki email</label>
              <input
                type="text"
                name="loginInput"
                value={formData.loginInput}
                onChange={handleChange}
                className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent"
                placeholder="+998 90 123 45 67"
                required
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
                placeholder="••••••••"
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

          {/* Чекбокс "Meni eslab qol" */}
          <div className="flex items-center gap-2.5 mt-1">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-xs text-slate-700 font-medium cursor-pointer">
              Meni eslab qol
            </label>
          </div>

          {/* Кнопка входа */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-2xl shadow-md shadow-blue-200 transition active:scale-[0.98]"
          >
            Kirish
          </button>
        </form>

        {/* Ссылка "Забыли пароль?" */}
        <div className="mt-5 text-center">
          <a href="#forgot-password" className="text-xs text-blue-600 font-medium hover:underline">
            Parolni unutdingizmi?
          </a>
        </div>

        {/* Переход на регистрацию */}
        <div className="mt-28 mb-2 text-center text-xs text-gray-400">
          Hisobingiz yo'qmi?{' '}
          <a href="#register" className="text-blue-600 font-semibold hover:underline">
            Ro'yxatdan o'tish
          </a>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;