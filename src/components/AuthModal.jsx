// src/components/AuthModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaPhone, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { auth, googleProvider, setupRecaptcha } from "../firebase";
import { signInWithPopup, signInWithPhoneNumber } from "firebase/auth";

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("main");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      setError("Google bilan kirishda xato: " + err.message);
    }
    setLoading(false);
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setError("");
    if (!phone.match(/^\+998[0-9]{9}$/)) {
      setError("Telefon raqam formati: +998901234567");
      return;
    }
    setLoading(true);
    try {
      const verifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(result);
      setStep("code");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await confirmationResult.confirm(code);
      onClose();
    } catch (err) {
      setError("Kod xato");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // xato tuzatildi
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {step === "main" ? "Kirish" : step === "phone" ? "Telefon" : "Kod"}
                </h2>
                <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              {step === "main" && (
                <div className="space-y-4">
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center gap-3 font-semibold transition"
                  >
                    <FaGoogle /> Google bilan kirish
                  </button>
                  <button
                    onClick={() => setStep("phone")}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3"
                  >
                    <FaPhone /> Telefon raqam bilan
                  </button>
                </div>
              )}

              {step === "phone" && (
                <form onSubmit={sendCode}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998901234567"
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 outline-none mb-4"
                    required
                  />
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold"
                  >
                    {loading ? "Yuborilmoqda..." : "Kod yuborish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("main")}
                    className="w-full mt-3 text-gray-600"
                  >
                    Orqaga
                  </button>
                </form>
              )}

              {step === "code" && (
                <form onSubmit={verifyCode}>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    maxLength="6"
                    className="w-full p-4 text-center text-2xl tracking-widest rounded-xl border border-gray-300 focus:border-green-500 outline-none mb-4"
                    required
                  />
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold"
                  >
                    Tasdiqlash
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Recaptcha container tashqarida */}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default AuthModal;
