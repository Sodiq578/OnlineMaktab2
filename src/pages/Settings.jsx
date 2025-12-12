import React, { useState } from "react";
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaTrashAlt, 
  FaRegEnvelope,
  FaDesktop,
  FaTabletAlt,
  FaBell,
  FaLanguage,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSun,
  FaPalette,
  FaFont,
  FaKeyboard,
  FaVolumeUp,
  FaShieldAlt,
  FaDownload,
  FaUpload,
  FaUserShield,
  FaDatabase,
  FaHistory,
  FaLock,
  FaUnlock,
  FaWifi,
  FaBluetooth,
  FaCog,
  FaUser,
  FaInfoCircle,
  FaChevronRight,
  FaCheck,
  FaSync
} from "react-icons/fa";
import { 
  MdSecurity,
  MdNotifications,
  MdLanguage,
  MdAccessibility,
  MdStorage,
  MdBackup
} from "react-icons/md";
import "./Settings.css";

const Settings = () => {
  // Qurilmalar
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      type: "Mobil Telefon", 
      model: "Samsung Galaxy S23", 
      icon: <FaMobileAlt />,
      os: "Android 14",
      lastActive: "5 daqiqa oldin",
      ip: "192.168.1.101",
      active: true
    },
    { 
      id: 2, 
      type: "Noutbuk", 
      model: "MacBook Pro 2023", 
      icon: <FaLaptop />,
      os: "macOS Sonoma",
      lastActive: "2 soat oldin",
      ip: "192.168.1.102",
      active: false
    },
    { 
      id: 3, 
      type: "Planshet", 
      model: "iPad Pro", 
      icon: <FaTabletAlt />,
      os: "iPadOS 17",
      lastActive: "1 kun oldin",
      ip: "192.168.1.103",
      active: true
    },
    { 
      id: 4, 
      type: "Kompyuter", 
      model: "Windows PC", 
      icon: <FaDesktop />,
      os: "Windows 11",
      lastActive: "30 daqiqa oldin",
      ip: "192.168.1.104",
      active: true
    },
  ]);

  // Sozlamalar holati
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#2563eb");
  const [theme, setTheme] = useState("light");
  const [feedback, setFeedback] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    sound: true,
    vibration: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showOnlineStatus: true,
    dataCollection: false,
    personalizedAds: false
  });
  const [language, setLanguage] = useState("uz");
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    screenReader: false,
    reducedMotion: false,
    largeText: false
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    autoLock: true,
    loginAlerts: true,
    sessionTimeout: 30
  });

  // Sozlamalar bo'limlari
  const settingsSections = [
    { id: 'profile', title: 'Profil', icon: <FaUser /> },
    { id: 'appearance', title: 'Ko\'rinish', icon: <FaPalette /> },
    { id: 'notifications', title: 'Bildirishnomalar', icon: <FaBell /> },
    { id: 'privacy', title: 'Maxfiylik', icon: <MdSecurity /> },
    { id: 'security', title: 'Xavfsizlik', icon: <FaShieldAlt /> },
    { id: 'language', title: 'Til', icon: <FaLanguage /> },
    { id: 'accessibility', title: 'Qulaylik', icon: <MdAccessibility /> },
    { id: 'storage', title: 'Saqlash', icon: <MdStorage /> },
    { id: 'backup', title: 'Zaxiralash', icon: <MdBackup /> },
    { id: 'advanced', title: 'Qo\'shimcha', icon: <FaCog /> }
  ];

  // Sozlamalar qiymatlari
  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];

  const themes = [
    { id: 'light', name: 'Yorqin', icon: <FaSun /> },
    { id: 'dark', name: 'Qorong\'i', icon: <FaMoon /> },
    { id: 'auto', name: 'Avtomatik', icon: <FaSync /> }
  ];

  // Handlers
  const handleDeleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      alert('Fikr-mulohazangiz muvaffaqiyatli yuborildi!');
      setFeedback('');
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationToggle = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  const handlePrivacyToggle = (type) => {
    setPrivacy({
      ...privacy,
      [type]: !privacy[type]
    });
  };

  const handleSecurityToggle = (type) => {
    setSecurity({
      ...security,
      [type]: !security[type]
    });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleAccessibilityToggle = (type) => {
    setAccessibility({
      ...accessibility,
      [type]: !accessibility[type]
    });
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleResetSettings = () => {
    if (window.confirm('Barcha sozlamalarni standart holatga qaytarishni xohlaysizmi?')) {
      setFontSize(16);
      setFontColor("#2563eb");
      setTheme("light");
      setNotifications({
        email: true,
        push: true,
        sms: false,
        sound: true,
        vibration: true
      });
      setPrivacy({
        profileVisibility: "public",
        showOnlineStatus: true,
        dataCollection: false,
        personalizedAds: false
      });
      setLanguage("uz");
      alert('Sozlamalar muvaffaqiyatli tiklandi!');
    }
  };

  const handleExportSettings = () => {
    const settingsData = {
      fontSize,
      fontColor,
      theme,
      notifications,
      privacy,
      language,
      accessibility,
      security
    };
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'settings_backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Aktiv sozlamalar soni
  const activeSettingsCount = Object.values(notifications).filter(v => v).length +
                              Object.values(privacy).filter(v => typeof v === 'boolean' ? v : false).length +
                              Object.values(accessibility).filter(v => v).length +
                              Object.values(security).filter(v => typeof v === 'boolean' ? v : false).length;

  return (
    <div
      className={`settings-container ${theme}`}
      style={{
        "--font-size": `${fontSize}px`,
        "--font-color": fontColor,
      }}
    >
      {/* Header */}
      <div className="settings-header">
        <div className="header-main">
          <div className="header-title-section">
            <FaCog className="header-icon" />
            <div>
              <h1 className="settings-title">Sozlamalar</h1>
              <p className="settings-subtitle">
                {activeSettingsCount} ta aktiv sozlama • {devices.length} ta ulangan qurilma
              </p>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn-action btn-export"
              onClick={handleExportSettings}
              title="Sozlamalarni yuklab olish"
            >
              <FaDownload /> Eksport
            </button>
            <button 
              className="btn-action btn-reset"
              onClick={handleResetSettings}
              title="Sozlamalarni tiklash"
            >
              <FaSync /> Tiklash
            </button>
          </div>
        </div>
        
        <div className="settings-tabs">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className="settings-tab"
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {section.icon}
              <span>{section.title}</span>
              <FaChevronRight className="tab-arrow" />
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        <div className="settings-grid">
          {/* Qurilmalar */}
          <div id="devices" className="settings-card devices-card">
            <div className="card-header">
              <FaDesktop className="card-icon" />
              <h2 className="card-title">Qurilmalar</h2>
              <span className="card-badge">{devices.length} ta</span>
            </div>
            
            <div className="devices-list">
              {devices.map((device) => (
                <div key={device.id} className="device-card">
                  <div className="device-header">
                    <div className="device-icon-wrapper">
                      {device.icon}
                      <span className={`device-status ${device.active ? 'active' : 'inactive'}`}></span>
                    </div>
                    <div className="device-info">
                      <h3 className="device-model">{device.model}</h3>
                      <p className="device-type">{device.type}</p>
                    </div>
                  </div>
                  
                  <div className="device-details">
                    <div className="device-detail">
                      <span className="detail-label">Operatsion sistema:</span>
                      <span className="detail-value">{device.os}</span>
                    </div>
                    <div className="device-detail">
                      <span className="detail-label">IP manzil:</span>
                      <span className="detail-value">{device.ip}</span>
                    </div>
                    <div className="device-detail">
                      <span className="detail-label">Oxirgi faollik:</span>
                      <span className="detail-value">{device.lastActive}</span>
                    </div>
                  </div>
                  
                  <div className="device-actions">
                    <button 
                      className={`btn-device-status ${device.active ? 'btn-disconnect' : 'btn-connect'}`}
                      onClick={() => {
                        const updatedDevices = devices.map(d => 
                          d.id === device.id ? { ...d, active: !d.active } : d
                        );
                        setDevices(updatedDevices);
                      }}
                    >
                      {device.active ? 'Uzish' : 'Ulash'}
                    </button>
                    <button 
                      onClick={() => handleDeleteDevice(device.id)}
                      className="btn-device-delete"
                      title="O'chirish"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card-footer">
              <p className="card-hint">
                <FaInfoCircle /> Qurilmalarni boshqarish orqali hisobingizni xavfsiz saqlang
              </p>
            </div>
          </div>

          {/* Ko'rinish sozlamalari */}
          <div id="appearance" className="settings-card appearance-card">
            <div className="card-header">
              <FaPalette className="card-icon" />
              <h2 className="card-title">Ko'rinish</h2>
            </div>
            
            <div className="appearance-options">
              {/* Mavzular */}
              <div className="option-group">
                <h3 className="option-title">Mavzu</h3>
                <div className="theme-selector">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      className={`theme-option ${theme === t.id ? 'active' : ''}`}
                      onClick={() => handleThemeChange(t.id)}
                    >
                      <div className="theme-icon">{t.icon}</div>
                      <span className="theme-name">{t.name}</span>
                      {theme === t.id && <FaCheck className="theme-check" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shrift */}
              <div className="option-group">
                <h3 className="option-title">Shrift o'lchami</h3>
                <div className="font-slider-container">
                  <FaFont className="slider-icon" />
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="font-slider"
                  />
                  <span className="slider-value">{fontSize}px</span>
                </div>
              </div>

              {/* Rang */}
              <div className="option-group">
                <h3 className="option-title">Asosiy rang</h3>
                <div className="color-picker">
                  {['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((color) => (
                    <button
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => setFontColor(color)}
                    >
                      {fontColor === color && <FaCheck className="color-check" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bildirishnomalar */}
          <div id="notifications" className="settings-card notifications-card">
            <div className="card-header">
              <MdNotifications className="card-icon" />
              <h2 className="card-title">Bildirishnomalar</h2>
            </div>
            
            <div className="notifications-list">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">
                      {key === 'email' && <FaRegEnvelope />}
                      {key === 'push' && <FaBell />}
                      {key === 'sms' && <FaMobileAlt />}
                      {key === 'sound' && <FaVolumeUp />}
                      {key === 'vibration' && <FaMobileAlt />}
                    </div>
                    <div>
                      <h3 className="notification-title">
                        {key === 'email' && 'Email xabarlar'}
                        {key === 'push' && 'Push bildirishnomalar'}
                        {key === 'sms' && 'SMS xabarlar'}
                        {key === 'sound' && 'Ovozli signal'}
                        {key === 'vibration' && 'Titramoq'}
                      </h3>
                      <p className="notification-description">
                        {key === 'email' && 'Elektron pochtangizga yangiliklar yuboriladi'}
                        {key === 'push' && 'Telefon yoki kompyuteringizga bildirishnomalar'}
                        {key === 'sms' && 'Telefon raqamingizga SMS xabarlar'}
                        {key === 'sound' && 'Bildirishnoma uchun ovozli signal'}
                        {key === 'vibration' && 'Bildirishnoma uchun telefon titrash'}
                      </p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationToggle(key)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Xavfsizlik */}
          <div id="security" className="settings-card security-card">
            <div className="card-header">
              <FaShieldAlt className="card-icon" />
              <h2 className="card-title">Xavfsizlik</h2>
            </div>
            
            <div className="security-options">
              {Object.entries(security).map(([key, value]) => (
                <div key={key} className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      {key === 'twoFactor' && <FaUserShield />}
                      {key === 'autoLock' && <FaLock />}
                      {key === 'loginAlerts' && <FaBell />}
                      {key === 'sessionTimeout' && <FaHistory />}
                    </div>
                    <div>
                      <h3 className="security-title">
                        {key === 'twoFactor' && 'Ikki bosqichli autentifikatsiya'}
                        {key === 'autoLock' && 'Avtomatik qulf'}
                        {key === 'loginAlerts' && 'Kirish haqida ogohlantirishlar'}
                        {key === 'sessionTimeout' && 'Sessiya muddati'}
                      </h3>
                      <p className="security-description">
                        {key === 'twoFactor' && 'Hisobingizni qo\'shimcha himoya qilish'}
                        {key === 'autoLock' && 'Faol bo\'lmaganda avtomatik ravishda chiqish'}
                        {key === 'loginAlerts' && 'Yangi kirishlar haqida xabar olish'}
                        {key === 'sessionTimeout' && `${value} daqiqadan keyin avtomatik chiqish`}
                      </p>
                    </div>
                  </div>
                  {key === 'sessionTimeout' ? (
                    <select
                      value={value}
                      onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                      className="timeout-select"
                    >
                      <option value={5}>5 daqiqa</option>
                      <option value={15}>15 daqiqa</option>
                      <option value={30}>30 daqiqa</option>
                      <option value={60}>1 soat</option>
                    </select>
                  ) : (
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleSecurityToggle(key)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Til sozlamalari */}
          <div id="language" className="settings-card language-card">
            <div className="card-header">
              <MdLanguage className="card-icon" />
              <h2 className="card-title">Til</h2>
            </div>
            
            <div className="language-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-option ${language === lang.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <span className="language-name">{lang.name}</span>
                  {language === lang.code && <FaCheck className="language-check" />}
                </button>
              ))}
            </div>
          </div>

          {/* Fikr-mulohaza */}
          <div className="settings-card feedback-card">
            <div className="card-header">
              <FaRegEnvelope className="card-icon" />
              <h2 className="card-title">Fikr-mulohaza</h2>
            </div>
            
            <div className="feedback-form">
              <div className="form-group">
                <label className="form-label">Biz bilan bo'lishing</label>
                <textarea
                  className="feedback-input"
                  placeholder="Fikr, taklif yoki muammoingizni bu yerga yozing..."
                  value={feedback}
                  onChange={handleFeedbackChange}
                  rows="4"
                />
              </div>
              
              <div className="feedback-actions">
                <button 
                  className="btn-feedback-submit"
                  onClick={handleSubmitFeedback}
                  disabled={!feedback.trim()}
                >
                  <FaRegEnvelope /> Yuborish
                </button>
                <p className="feedback-hint">
                  <FaInfoCircle /> Sizning fikrlaringiz bizni yaxshilashga yordam beradi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="settings-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-version">
              <FaCog /> Versiya: 1.0.0
            </p>
            <p className="footer-team">Jamoa: Dasturchilar guruhi</p>
            <p className="footer-update">Oxirgi yangilanish: Bugun, 10:30</p>
          </div>
          
          <div className="footer-links">
            <a href="/help" className="footer-link">Yordam</a>
            <a href="/privacy" className="footer-link">Maxfiylik</a>
            <a href="/terms" className="footer-link">Shartlar</a>
            <a href="/contact" className="footer-link">Bog'lanish</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;