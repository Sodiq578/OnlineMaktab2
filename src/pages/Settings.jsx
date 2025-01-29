import React, { useState } from "react";
import { FaMobileAlt, FaLaptop, FaTrashAlt, FaRegEnvelope } from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const [devices, setDevices] = useState([
    { id: 1, type: "Mobil Telefon", model: "Samsung Galaxy S23", icon: <FaMobileAlt /> },
    { id: 2, type: "Noutbuk", model: "MacBook Pro 2023", icon: <FaLaptop /> },
    { id: 3, type: "Planshet", model: "iPad Pro", icon: <FaMobileAlt /> },
    { id: 4, type: "Smartwatch", model: "Apple Watch", icon: <FaLaptop /> },
  ]);

  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#333");
  const [theme, setTheme] = useState("light");
  const [feedback, setFeedback] = useState("");

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`settings-container ${theme}`}
      style={{
        "--font-size": `${fontSize}px`,
        "--font-color": fontColor,
      }}
    >
  

      <div className="settings-content">
        {/* Qurilmalar */}
        <div className="setting-section">
          <h2>Qurilmalar</h2>
          <ul className="device-list">
            {devices.map((device) => (
              <li key={device.id} className="device-item">
                <div className="device-info">
                  {device.icon} {device.type} - {device.model}
                </div>
                <button onClick={() => handleDeleteDevice(device.id)} className="btn-delete">
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Fikr */}
        <div className="setting-section">
          <h2>Fikr-mulohaza</h2>
          <textarea
            placeholder="Fikringizni bu yerga yozing..."
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>
          <button className="btn-submit">
            <FaRegEnvelope /> Yuborish
          </button>
        </div>
      </div>

      <footer className="settings-footer">
        <p>Versiya: 1.0.0 | Jamoa: Dasturchilar guruhi</p>
      </footer>
    </div>
  );
};

export default Settings;
