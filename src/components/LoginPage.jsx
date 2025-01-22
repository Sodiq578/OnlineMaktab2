import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import LoginImg from "../assets/forLoginPage.avif";

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState(['', '', '', '']); // Updated SMS code handling
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: SMS Code
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword && firstName && lastName && phoneNumber) {
      setStep(2); // Move to SMS step
    } else {
      alert('Parollar mos kelmayapti yoki boshqa maydonlar to\'ldirilmagan.');
    }
  };

  const handleSmsSubmit = (e) => {
    e.preventDefault();
    // SMS kodni tekshirish
    if (smsCode.join('') === '1234') {
      navigate('/dashboard');
    } else {
      alert('Kod noto‘g‘ri, qayta urinib ko‘ring!');
    }
  };

  const handleChange = (e, index) => {
    const newSmsCode = [...smsCode];
    newSmsCode[index] = e.target.value.slice(0, 1); // Faqat bitta raqamni qabul qiladi
    setSmsCode(newSmsCode);

    // Agar raqam kiritilsa, keyingi inputga o'tish
    if (e.target.value) {
      const nextInput = index + 1;
      if (nextInput < smsCode.length) {
        document.getElementById(`smsInput${nextInput}`).focus();
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Image Section */}
      <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${LoginImg})` }}></div>

      {/* Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        {step === 1 ? (
          <form onSubmit={handleRegister} className="w-full md:w-3/4 lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Ro'yxatdan o'tish</h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ism</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Familya</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Familyangizni kiriting"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parol</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Parolingizni kiriting"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parolni tasdiqlash</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Parolni qayta kiriting"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Telefon raqamingizni kiriting"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Ro'yxatdan o'tish
            </button>
          </form>
        ) : (
          <form onSubmit={handleSmsSubmit} className="w-full max-w-sm bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">SMS Kodni Kiriting</h1>
            
            <div className="flex space-x-4 mb-4">
              {smsCode.map((code, index) => (
                <input
                  key={index}
                  type="text"
                  value={code}
                  onChange={(e) => handleChange(e, index)}
                  id={`smsInput${index}`}
                  maxLength="1"
                  className="w-1/4 px-4 py-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="X"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
            >
              Tasdiqlash
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
