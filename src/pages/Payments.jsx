// src/pages/Payments.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  FaCreditCard, 
  FaWallet, 
  FaMobileAlt,
  FaQrcode,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
  FaClock,
  FaGift,
  FaPercentage,
  FaReceipt,
  FaArrowLeft,
  FaExchangeAlt,
  FaHandHoldingUsd,
  FaFileInvoiceDollar,
  FaBarcode,
  FaStore,
  FaUniversity,
  FaMoneyBillWave,
  FaCoins,
  FaChartLine,
  FaUserTie,
  FaCalendarCheck,
  FaHeadset
} from 'react-icons/fa';
import './Payments.css';

// O'zbekiston to'lov tizimlari logolari uchun SVG komponentlar
const ClickLogo = ({ size = 24, color = "#FF6B00" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={color} />
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PaymeLogo = ({ size = 24, color = "#00A000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" fill={color} />
    <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UzcardLogo = ({ size = 24, color = "#00A000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="white" stroke={color} strokeWidth="2" />
    <path d="M8 9H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 15H13" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Payments = () => {
  const { purchaseCourse, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.state?.section;
  
  const [paymentMethod, setPaymentMethod] = useState('click');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPromoError, setShowPromoError] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');

  const coursePrice = section?.price || 990000;
  const discountAmount = Math.round((coursePrice * discount) / 100);
  const totalPrice = coursePrice - discountAmount;
  const installmentPrice = Math.round(totalPrice / installmentPlan);

  const promoCodes = [
    { code: 'OQUV2024', discount: 20, valid: true },
    { code: 'TALABA30', discount: 30, valid: true },
    { code: 'BIRINCHI', discount: 15, valid: true },
    { code: 'ONA25', discount: 25, valid: true },
  ];

  useEffect(() => {
    if (!section) {
      navigate('/dashboard/home');
    }
  }, [section, navigate]);

  const handlePromoCode = () => {
    const validPromo = promoCodes.find(promo => 
      promo.code === promoCode.toUpperCase() && promo.valid
    );
    
    if (validPromo) {
      setDiscount(validPromo.discount);
      setShowPromoError(false);
    } else {
      setDiscount(0);
      setShowPromoError(true);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    if (value.length > 2) {
      value = `+998 ${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 7)} ${value.slice(7)}`;
    }
    setPhoneNumber(value);
  };

  const processPayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);
    
    purchaseCourse(section);
    
    setTimeout(() => {
      const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/videos/${slug}`);
    }, 3000);
  };

  const validateForm = () => {
    if (paymentMethod === 'card' || paymentMethod === 'click') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        alert('To\'g\'ri karta raqamini kiriting (16 ta raqam)');
        return false;
      }
      if (!cardName) {
        alert('Karta egasi ismini kiriting');
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        alert('Amal qilish muddatini kiriting (MM/YY)');
        return false;
      }
      if (!cvv || cvv.length !== 3) {
        alert('To\'g\'ri CVV raqamini kiriting');
        return false;
      }
    }
    
    if (paymentMethod === 'payme' || paymentMethod === 'mobile') {
      if (!phoneNumber || phoneNumber.replace(/\D/g, '').length !== 12) {
        alert('To\'g\'ri telefon raqamini kiriting');
        return false;
      }
    }
    
    if (paymentMethod === 'bank' && !selectedBank) {
      alert('Bankni tanlang');
      return false;
    }
    
    return true;
  };

  const paymentMethods = [
    { 
      id: 'click', 
      name: 'Click', 
      icon: <ClickLogo />, 
      color: '#FF6B00',
      description: 'Click ilovasi orqali tez to\'lov',
      recommended: true
    },
    { 
      id: 'payme', 
      name: 'Payme', 
      icon: <PaymeLogo />, 
      color: '#00A000',
      description: 'Payme ilovasi orqali to\'lov'
    },
    { 
      id: 'card', 
      name: 'Bank Karti', 
      icon: <FaCreditCard />, 
      color: '#4F46E5',
      description: 'Uzcard/Humo orqali to\'lov'
    },
    { 
      id: 'mobile', 
      name: 'Mobil To\'lov', 
      icon: <FaMobileAlt />, 
      color: '#10B981',
      description: 'Telefon raqamidan to\'lov'
    },
    { 
      id: 'qr', 
      name: 'QR Kod', 
      icon: <FaQrcode />, 
      color: '#8B5CF6',
      description: 'QR kod skanerlash orqali'
    },
    { 
      id: 'bank', 
      name: 'Bank O\'tkazmasi', 
      icon: <FaUniversity />, 
      color: '#F59E0B',
      description: 'Bank orqali naqd pul'
    },
  ];

  const banks = [
    { id: 'kapital', name: 'Kapital Bank', color: '#1E40AF' },
    { id: 'ipakyuli', name: 'Ipak Yuli Bank', color: '#DC2626' },
    { id: 'saderat', name: 'Saderat Iran', color: '#059669' },
    { id: 'asia', name: 'Asia Alliance Bank', color: '#7C3AED' },
    { id: 'agro', name: 'Agrobank', color: '#D97706' },
    { id: 'halq', name: 'Halq Bank', color: '#2563EB' },
  ];

  const installmentPlans = [
    { months: 1, label: 'Bir martalik to\'lov', interest: 0 },
    { months: 3, label: '3 oyga bo\'lib', interest: 5 },
    { months: 6, label: '6 oyga bo\'lib', interest: 8 },
    { months: 9, label: '9 oyga bo\'lib', interest: 12 },
    { months: 12, label: '12 oyga bo\'lib', interest: 15 },
  ];

  const features = [
    'Davlat sertifikati',
    'O\'qituvchi bilan maslahat',
    'Loyiha portfoliogi',
    'Ish topishda yordam',
    'Doimiy yangilanishlar',
    'Guruh chatida qatnashish',
  ];

  const benefits = [
    { icon: <FaFileInvoiceDollar />, text: 'Davlat sertifikati' },
    { icon: <FaUserTie />, text: 'Karyera maslahatlari' },
    { icon: <FaCalendarCheck />, text: 'Moslashuvchan vaqt' },
    { icon: <FaHeadset />, text: '24/7 qo\'llab-quvvat' },
    { icon: <FaChartLine />, text: 'Karyera o\'sishi' },
    { icon: <FaCoins />, text: 'Investitsiyaga yuqori daromad' },
  ];

  if (!section) {
    return null;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  return (
    <div className="payments-page">
      {paymentSuccess ? (
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h1 className="success-title">To'lov muvaffaqiyatli amalga oshirildi! 🎉</h1>
            <p className="success-message">
              Tabriklaymiz! Siz "{section.sectionName}" kursini muvaffaqiyatli sotib oldingiz.
            </p>
            
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Kurs nomi:</span>
                <span className="detail-value">{section.sectionName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">To'lov summasi:</span>
                <span className="detail-value">{formatCurrency(totalPrice)}</span>
              </div>
              {discount > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Chegirma:</span>
                  <span className="detail-value discount">{formatCurrency(discountAmount)} ({discount}%)</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Tranzaksiya ID:</span>
                <span className="detail-value">TXN-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sana:</span>
                <span className="detail-value">{new Date().toLocaleDateString('uz-UZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}</span>
              </div>
            </div>

            <div className="success-benefits">
              <h3>Endi siz quyidagi imkoniyatlarga ega bo'ldingiz:</h3>
              <div className="benefits-grid">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    {benefit.icon}
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="success-actions">
              <button 
                onClick={() => {
                  const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  navigate(`/videos/${slug}`);
                }}
                className="start-course-btn"
              >
                🎬 Kursni boshlash
              </button>
              <button 
                onClick={() => navigate('/dashboard/home')}
                className="back-home-btn"
              >
                🏠 Bosh sahifa
              </button>
            </div>
            <p className="redirect-message">
              3 soniyadan so'ng kurs sahifasiga yo'naltirilasiz...
            </p>
          </div>
        </div>
      ) : (
        <div className="payments-container">
          <header className="payments-header">
            <button 
              onClick={() => navigate('/dashboard/home')}
              className="back-button"
            >
              <FaArrowLeft /> Orqaga
            </button>
            <div className="header-center">
              <h1 className="page-title">To'lov Sahifasi</h1>
              <p className="page-subtitle">Xavfsiz va qulay to'lov</p>
            </div>
            <div className="security-badge">
              <FaLock /> 100% xavfsiz
            </div>
          </header>

          <div className="payments-content">
            <div className="course-info-section">
              <div className="course-card">
                <div className="course-badge">
                  <span className="hot-badge">🔥 Ommabop</span>
                  <span className="certificate-badge">📜 Sertifikat</span>
                </div>
                
                <div className="course-header">
                  <h2 className="course-title">{section.sectionName}</h2>
                  <div className="course-meta">
                    <span className="meta-item">
                      <FaClock /> {section.totalDuration || 120} daqiqa
                    </span>
                    <span className="meta-item">
                      <UzcardLogo size={20} /> O'zbekiston bo'ylab
                    </span>
                  </div>
                </div>

                <div className="course-image">
                  <img 
                    src={section.thumbnail || `https://picsum.photos/seed/${section.sectionId}/400/250`} 
                    alt={section.sectionName}
                  />
                  <div className="image-overlay">
                    <span>Premium Kurs</span>
                  </div>
                </div>

                <div className="course-features">
                  <h3 className="features-title">Kurs imkoniyatlari:</h3>
                  <ul className="features-list">
                    {features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <FaCheckCircle className="feature-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stats-card">
                  <div className="stat-item">
                    <span className="stat-label">O'quvchilar</span>
                    <span className="stat-value">1,250+</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Reyting</span>
                    <span className="stat-value">4.9 ⭐</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Muvaffaqiyat</span>
                    <span className="stat-value">95%</span>
                  </div>
                </div>
              </div>

              <div className="price-card">
                <h3 className="price-title">
                  <FaMoneyBillWave /> Narx hisobi
                </h3>
                
                <div className="price-details">
                  <div className="price-row">
                    <span>Kurs narxi:</span>
                    <span className="original-price">{formatCurrency(coursePrice)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <>
                      <div className="price-row discount-row">
                        <span>Chegirma ({discount}%):</span>
                        <span className="discount-amount">-{formatCurrency(discountAmount)}</span>
                      </div>
                      <div className="saved-badge">
                        💰 {formatCurrency(discountAmount)} tejadingiz!
                      </div>
                    </>
                  )}
                  
                  <div className="price-row total-row">
                    <span>Jami to'lov:</span>
                    <span className="total-price">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                {installmentPlan > 1 && (
                  <div className="installment-summary">
                    <FaExchangeAlt className="installment-icon" />
                    <div className="installment-info">
                      <span className="installment-label">
                        {installmentPlan} oyga bo'lib to'lash:
                      </span>
                      <span className="installment-price">
                        {formatCurrency(installmentPrice)} / oy
                      </span>
                      <span className="interest-note">
                        (Foiz: {installmentPlans.find(p => p.months === installmentPlan)?.interest}%)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="promo-section">
                <h3 className="promo-title">
                  <FaGift /> Promo kod
                </h3>
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Promo kodni kiriting"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                    onKeyPress={(e) => e.key === 'Enter' && handlePromoCode()}
                  />
                  <button onClick={handlePromoCode} className="apply-promo-btn">
                    <FaPercentage /> Qo'llash
                  </button>
                </div>
                
                {showPromoError && (
                  <div className="promo-error">
                    ❌ Noto'g'ri promo kod. Qayta urinib ko'ring.
                  </div>
                )}
                
                <div className="promo-codes">
                  <p className="available-promos">Mavjud promo kodlar:</p>
                  <div className="promo-tags">
                    {promoCodes.map((promo) => (
                      <span 
                        key={promo.code} 
                        className={`promo-tag ${promoCode.toUpperCase() === promo.code ? 'active' : ''}`}
                        onClick={() => {
                          setPromoCode(promo.code);
                          handlePromoCode();
                        }}
                      >
                        {promo.code} (-{promo.discount}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-form-section">
              <div className="payment-card">
                <div className="payment-header">
                  <h2 className="payment-title">To'lov usulini tanlang</h2>
                  <div className="payment-secure">
                    <FaShieldAlt /> Bank darajasida xavfsizlik
                  </div>
                </div>

                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="method-header">
                        <span 
                          className="method-icon"
                          style={{ color: method.color, backgroundColor: `${method.color}20` }}
                        >
                          {method.icon}
                        </span>
                        <div className="method-info">
                          <span className="method-name">{method.name}</span>
                          {method.recommended && (
                            <span className="recommended-badge">Tavsiya etiladi</span>
                          )}
                        </div>
                      </div>
                      <p className="method-description">{method.description}</p>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'click' && (
                  <div className="click-form">
                    <div className="form-header">
                      <ClickLogo size={32} />
                      <h3>Click orqali to'lov</h3>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <FaCreditCard /> Karta raqami
                      </label>
                      <div className="card-input-wrapper">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="8600 1234 5678 9012"
                          maxLength="19"
                          className="card-input"
                        />
                        <div className="card-types">
                          <UzcardLogo size={24} />
                          <span className="card-type-text">Humo</span>
                          <span className="card-type-text">Visa</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        👤 Karta egasi
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="ISM FAMILIYA"
                        className="card-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label className="form-label">
                          📅 Amal qilish muddati
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setExpiryDate(value);
                          }}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="card-input"
                        />
                      </div>
                      <div className="form-group half">
                        <label className="form-label">
                          🔒 CVV
                        </label>
                        <div className="cvv-input-wrapper">
                          <input
                            type="password"
                            value={cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                              setCvv(value);
                            }}
                            placeholder="123"
                            maxLength="3"
                            className="card-input"
                          />
                          <div className="cvv-hint">
                            Karta orqasidagi 3 ta raqam
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="click-benefits">
                      <div className="benefit">
                        <FaCheckCircle /> 1% cashback
                      </div>
                      <div className="benefit">
                        <FaCheckCircle /> Tezkor to'lov
                      </div>
                      <div className="benefit">
                        <FaCheckCircle /> SMS xabarnoma
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'payme' && (
                  <div className="payme-form">
                    <div className="form-header">
                      <PaymeLogo size={32} />
                      <h3>Payme orqali to'lov</h3>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <FaMobileAlt /> Telefon raqami
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="+998 90 123 45 67"
                        className="phone-input"
                      />
                      <p className="input-note">
                        Raqamingizga SMS kod yuboriladi
                      </p>
                    </div>

                    <div className="payme-benefits">
                      <h4>Payme afzalliklari:</h4>
                      <ul>
                        <li>💳 Bank kartasiz to'lov</li>
                        <li>⚡ Bir daqiqada to'lov</li>
                        <li>🛡️ 100% xavfsiz</li>
                        <li>💰 Komissiya 0%</li>
                      </ul>
                    </div>
                  </div>
                )}

                {paymentMethod === 'mobile' && (
                  <div className="mobile-payment-form">
                    <div className="form-header">
                      <FaMobileAlt className="mobile-icon" />
                      <h3>Mobil to'lov</h3>
                    </div>
                    
                    <div className="operator-selector">
                      <h4>Operatorni tanlang:</h4>
                      <div className="operators">
                        <button className="operator-btn active">
                          <div className="operator-logo">U</div>
                          Ucell
                        </button>
                        <button className="operator-btn">
                          <div className="operator-logo">B</div>
                          Beeline
                        </button>
                        <button className="operator-btn">
                          <div className="operator-logo">Uz</div>
                          Uzmobile
                        </button>
                        <button className="operator-btn">
                          <div className="operator-logo">M</div>
                          MobiUZ
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Telefon raqami</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="+998 90 123 45 67"
                        className="phone-input"
                      />
                    </div>

                    <div className="mobile-instruction">
                      <p><strong>📱 Qanday to'lash:</strong></p>
                      <ol>
                        <li>Telefon raqamingizni kiriting</li>
                        <li>SMS kodni oling</li>
                        <li>Kodni tasdiqlang</li>
                        <li>To'lov muvaffaqiyatli amalga oshadi</li>
                      </ol>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bank-transfer-form">
                    <div className="form-header">
                      <FaUniversity className="bank-icon" />
                      <h3>Bank o'tkazmasi</h3>
                    </div>
                    
                    <div className="bank-selector">
                      <h4>Bankni tanlang:</h4>
                      <div className="banks-grid">
                        {banks.map((bank) => (
                          <button
                            key={bank.id}
                            className={`bank-btn ${selectedBank === bank.id ? 'selected' : ''}`}
                            onClick={() => setSelectedBank(bank.id)}
                            style={{ borderColor: selectedBank === bank.id ? bank.color : '' }}
                          >
                            <div 
                              className="bank-color" 
                              style={{ backgroundColor: bank.color }}
                            ></div>
                            <span>{bank.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedBank && (
                      <div className="bank-details">
                        <h4>Bank rekvizitlari:</h4>
                        <div className="details-grid">
                          <div className="detail">
                            <span className="detail-label">Bank nomi:</span>
                            <span className="detail-value">{banks.find(b => b.id === selectedBank)?.name}</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">Hisob raqami:</span>
                            <span className="detail-value">2020 8000 1234 5678</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">MFO:</span>
                            <span className="detail-value">00442</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">INN:</span>
                            <span className="detail-value">123456789</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">Oluvchi:</span>
                            <span className="detail-value">"Edu Platform" MCHJ</span>
                          </div>
                        </div>
                        
                        <div className="bank-instruction">
                          <p><strong>💳 Qanday to'lash:</strong></p>
                          <ol>
                            <li>Bankka boring</li>
                            <li>Yuqoridagi rekvizitlarni ko'rsating</li>
                            <li>To'lov chekini saqlang</li>
                            <li>Chekni bizga yuboring</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="installment-section">
                  <h3 className="installment-title">
                    <FaHandHoldingUsd /> Bo'lib to'lash
                  </h3>
                  <div className="installment-plans">
                    {installmentPlans.map((plan) => {
                      const monthlyPayment = Math.round(totalPrice / plan.months);
                      const totalWithInterest = Math.round(monthlyPayment * plan.months);
                      
                      return (
                        <button
                          key={plan.months}
                          className={`installment-plan ${installmentPlan === plan.months ? 'selected' : ''}`}
                          onClick={() => setInstallmentPlan(plan.months)}
                        >
                          <div className="plan-header">
                            <span className="plan-months">{plan.months} oy</span>
                            {plan.interest > 0 && (
                              <span className="interest-rate">+{plan.interest}%</span>
                            )}
                          </div>
                          <div className="plan-payment">
                            <span className="payment-amount">
                              {formatCurrency(monthlyPayment)} / oy
                            </span>
                            {plan.interest > 0 && (
                              <span className="total-with-interest">
                                Jami: {formatCurrency(totalWithInterest)}
                              </span>
                            )}
                          </div>
                          <span className="plan-label">{plan.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="security-section">
                  <div className="security-item">
                    <FaLock className="security-icon" />
                    <div>
                      <h4>100% xavfsiz</h4>
                      <p>SSL shifrlash yordamida</p>
                    </div>
                  </div>
                  
                  <div className="security-item">
                    <FaShieldAlt className="security-icon" />
                    <div>
                      <h4>Kafolat</h4>
                      <p>30 kunlik pulni qaytarish</p>
                    </div>
                  </div>
                  
                  <div className="security-item">
                    <FaReceipt className="security-icon" />
                    <div>
                      <h4>Hisob-faktura</h4>
                      <p>Avtomatik yuboriladi</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={processPayment}
                  disabled={isProcessing}
                  className={`payment-button ${isProcessing ? 'processing' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      To'lov amalga oshirilmoqda...
                    </>
                  ) : (
                    <>
                      <FaLock /> {formatCurrency(totalPrice)} to'lash
                    </>
                  )}
                </button>

                <div className="payment-footer">
                  <p className="footer-note">
                    To'lovni amalga oshirish orqali siz 
                    <a href="#terms" className="terms-link"> foydalanish shartlari</a> bilan roziligingizni bildirasiz.
                  </p>
                  <div className="contact-support">
                    <FaHeadset /> Savollaringiz bo'lsa: +998 90 123 45 67
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;