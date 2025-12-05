// src/pages/Payments.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex, 
  FaCcApplePay, 
  FaCheckCircle, 
  FaLock, 
  FaShieldAlt, 
  FaClock,
  FaGift,
  FaPercentage,
  FaReceipt,
  FaArrowLeft,
  FaQrcode
} from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
  const { purchaseCourse, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.state?.section;
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState(1);
  const [showPromoError, setShowPromoError] = useState(false);

  const coursePrice = section?.price || 99000;
  const discountAmount = (coursePrice * discount) / 100;
  const totalPrice = coursePrice - discountAmount;
  const installmentPrice = totalPrice / installmentPlan;

  const promoCodes = [
    { code: 'EDU2024', discount: 20, valid: true },
    { code: 'STUDENT50', discount: 50, valid: true },
    { code: 'FIRSTBUY', discount: 30, valid: true },
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

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const processPayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Purchase course
    purchaseCourse(section);
    
    // Navigate after 3 seconds
    setTimeout(() => {
      const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/videos/${slug}`);
    }, 3000);
  };

  const validateForm = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      alert('To\'g\'ri kart raqamini kiriting');
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
    return true;
  };

  const paymentMethods = [
    { id: 'card', name: 'Bank Karti', icon: <FaCreditCard />, color: '#4F46E5' },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal />, color: '#003087' },
    { id: 'apple', name: 'Apple Pay', icon: <FaCcApplePay />, color: '#000000' },
    { id: 'qr', name: 'QR Kod', icon: <FaQrcode />, color: '#10B981' },
  ];

  const installmentPlans = [
    { months: 1, label: 'Bir martalik' },
    { months: 3, label: '3 oyga' },
    { months: 6, label: '6 oyga' },
    { months: 12, label: '12 oyga' },
  ];

  const features = [
    'Doimiy ruxsat',
    'Barcha yangilanishlar bepul',
    'Sertifikat olish huquqi',
    'Qoʻllab-quvvat xizmati',
    '30 kun davomida pulni qaytarish kafolati',
    'Mobil ilovaga ruxsat',
  ];

  if (!section) {
    return null;
  }

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
                <span className="detail-value">{totalPrice.toLocaleString()} so'm</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tranzaksiya ID:</span>
                <span className="detail-value">TXN-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sana:</span>
                <span className="detail-value">{new Date().toLocaleDateString('uz-UZ')}</span>
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
                Kursni boshlash
              </button>
              <button 
                onClick={() => navigate('/dashboard/home')}
                className="back-home-btn"
              >
                Bosh sahifa
              </button>
            </div>
            <p className="redirect-message">
              Siz avtomatik ravishda kurs sahifasiga yo'naltirilasiz...
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
            <h1 className="page-title">To'lov</h1>
            <div className="security-badge">
              <FaLock /> 100% xavfsiz
            </div>
          </header>

          <div className="payments-content">
            {/* Left Column - Course Info */}
            <div className="course-info-section">
              <div className="course-card">
                <div className="course-header">
                  <h2 className="course-title">{section.sectionName}</h2>
                  <span className="course-category">
                    {section.category || "Professional kurs"}
                  </span>
                </div>
                
                <div className="course-image">
                  <img 
                    src={section.thumbnail || `https://picsum.photos/seed/${section.sectionId}/400/250`} 
                    alt={section.sectionName}
                  />
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

                <div className="price-section">
                  <div className="price-row">
                    <span>Kurs narxi:</span>
                    <span className="original-price">
                      {coursePrice.toLocaleString()} so'm
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="price-row discount-row">
                      <span>Chegirma ({discount}%):</span>
                      <span className="discount-amount">
                        -{discountAmount.toLocaleString()} so'm
                      </span>
                    </div>
                  )}
                  <div className="price-row total-row">
                    <span>Jami:</span>
                    <span className="total-price">
                      {totalPrice.toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                {installmentPlan > 1 && (
                  <div className="installment-info">
                    <FaClock className="installment-icon" />
                    <span>
                      {installmentPlan} oyga bo'lib to'lash: 
                      <strong> {Math.round(installmentPrice).toLocaleString()} so'm/oy</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Promo Code Section */}
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
                  />
                  <button onClick={handlePromoCode} className="apply-promo-btn">
                    <FaPercentage /> Qo'llash
                  </button>
                </div>
                {showPromoError && (
                  <p className="promo-error">Noto'g'ri promo kod</p>
                )}
                <div className="promo-codes">
                  <p className="available-promos">Mavjud promo kodlar:</p>
                  <div className="promo-tags">
                    {promoCodes.map((promo) => (
                      <span key={promo.code} className="promo-tag">
                        {promo.code} (-{promo.discount}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Form */}
            <div className="payment-form-section">
              <div className="payment-card">
                <h2 className="payment-title">To'lov usulini tanlang</h2>
                
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                      style={{ borderColor: paymentMethod === method.id ? method.color : '' }}
                    >
                      <span className="method-icon" style={{ color: method.color }}>
                        {method.icon}
                      </span>
                      <span className="method-name">{method.name}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label className="form-label">Karta raqami</label>
                      <div className="card-input-wrapper">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="card-input"
                        />
                        <div className="card-icons">
                          <FaCcVisa className="card-icon visa" />
                          <FaCcMastercard className="card-icon mastercard" />
                          <FaCcAmex className="card-icon amex" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Karta egasi</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Ism Familiya"
                        className="card-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label className="form-label">Amal qilish muddati</label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="card-input"
                        />
                      </div>
                      <div className="form-group half">
                        <label className="form-label">CVV</label>
                        <div className="cvv-input-wrapper">
                          <input
                            type="password"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            maxLength="3"
                            className="card-input"
                          />
                          <span className="cvv-hint">Karta orqasidagi 3 raqam</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="paypal-section">
                    <FaPaypal className="paypal-icon" />
                    <p className="paypal-description">
                      To'lovni amalga oshirish uchun PayPal hisobingizga yo'naltirilasiz.
                    </p>
                    <button className="paypal-button">PayPal orqali to'lash</button>
                  </div>
                )}

                {paymentMethod === 'apple' && (
                  <div className="apple-pay-section">
                    <FaCcApplePay className="apple-pay-icon" />
                    <p className="apple-pay-description">
                      Apple Pay orqali tez va xavfsiz to'lov.
                    </p>
                    <button className="apple-pay-button">Apple Pay orqali to'lash</button>
                  </div>
                )}

                {paymentMethod === 'qr' && (
                  <div className="qr-section">
                    <div className="qr-code-placeholder">
                      <FaQrcode className="qr-icon" />
                      <p>To'lov qilish uchun QR kodni skanerlang</p>
                    </div>
                    <p className="qr-description">
                      Telefon kamerasi yordamida QR kodni skanerlang va to'lovni amalga oshiring.
                    </p>
                  </div>
                )}

                {/* Installment Plans */}
                <div className="installment-section">
                  <h3 className="installment-title">Bo'lib to'lash</h3>
                  <div className="installment-plans">
                    {installmentPlans.map((plan) => (
                      <button
                        key={plan.months}
                        className={`installment-plan ${installmentPlan === plan.months ? 'selected' : ''}`}
                        onClick={() => setInstallmentPlan(plan.months)}
                      >
                        <span className="plan-months">{plan.months} oy</span>
                        <span className="plan-price">
                          {plan.months === 1 
                            ? 'Bir martalik' 
                            : `${Math.round(totalPrice / plan.months).toLocaleString()} so'm/oy`
                          }
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="terms-section">
                  <label className="terms-checkbox">
                    <input type="checkbox" defaultChecked />
                    <span>
                      Men <a href="#terms" className="terms-link">shartlar va qoidalar</a> bilan roziman
                    </span>
                  </label>
                  <p className="terms-note">
                    <FaShieldAlt className="shield-icon" />
                    To'lov ma'lumotlaringiz 256-bit SSL shifrlash yordamida himoyalangan
                  </p>
                </div>

                {/* Payment Button */}
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
                      <FaLock /> {totalPrice.toLocaleString()} so'm to'lash
                    </>
                  )}
                </button>

                {/* Secure Payment Info */}
                <div className="secure-info">
                  <div className="secure-item">
                    <FaShieldAlt />
                    <span>100% xavfsiz to'lov</span>
                  </div>
                  <div className="secure-item">
                    <FaReceipt />
                    <span>Avtomatik hisob-faktura</span>
                  </div>
                  <div className="secure-item">
                    <FaClock />
                    <span>24/7 qo'llab-quvvat</span>
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