// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ openAuthModal }) => {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl"
          : "bg-gradient-to-r from-blue-600/10 via-white/80 to-purple-600/10 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          Edu<span className="text-blue-4xl text-blue-600">Hub</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {["#home", "#xizmatlar", "#darslar", "#narxlar", "#aloqa"].map((link, i) => (
            <button
              key={i}
              onClick={() => scrollTo(link.slice(1))}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {["Bosh sahifa", "Xizmatlar", "Kurslar", "Narxlar", "Aloqa"][i]}
            </button>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt /> Chiqish
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition"
            >
              Kirish / Ro'yxatdan o'tish
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl text-gray-800"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6"
        >
          <div className="flex flex-col items-center gap-6">
            {["Bosh sahifa", "Xizmatlar", "Kurslar", "Narxlar", "Aloqa"].map((text, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollTo(["home", "xizmatlar", "darslar", "narxlar", "aloqa"][i]);
                  setMenuOpen(false);
                }}
                className="text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                {text}
              </button>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full"
                >
                  Dashboard
                </button>
                <button onClick={logout} className="text-red-600">
                  Chiqish
                </button>
              </>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold"
              >
                Kirish
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;