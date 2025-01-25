import React, { useState } from 'react';
import { FaMobileAlt, FaLaptop } from 'react-icons/fa';

const Devices = () => {
  const [devices, setDevices] = useState([
    { id: 1, type: 'Mobil Telefon', model: 'Samsung Galaxy S23', icon: <FaMobileAlt style={{ color: '#000' }} /> },
    { id: 2, type: 'Mobil Telefon', model: 'iPhone 14 Pro', icon: <FaMobileAlt style={{ color: '#000' }} /> },
    { id: 3, type: 'Noutbuk', model: 'MacBook Pro 2023', icon: <FaLaptop style={{ color: '#000' }} /> },
    { id: 4, type: 'Noutbuk', model: 'Dell XPS 15', icon: <FaLaptop style={{ color: '#000' }} /> },
  ]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleRemoveDevice = (id) => {
    const updatedDevices = devices.filter((device) => device.id !== id);
    setDevices(updatedDevices);
    if (selectedDevice && selectedDevice.id === id) {
      setSelectedDevice(null);
    }
  };

  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Qurilmalar</h1>
      {devices.length > 0 ? (
        <ul style={styles.devicesList}>
          {devices.map((device) => (
            <li
              key={device.id}
              style={styles.deviceItem}
              onClick={() => handleSelectDevice(device)}
            >
              <div style={styles.deviceInfo}>
                {device.icon}
                <div>
                  <p style={styles.deviceType}>{device.type}</p>
                  <p style={styles.deviceModel}>{device.model}</p>
                </div>
              </div>
              <button
                style={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveDevice(device.id);
                }}
              >
                O'chirish
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noDevicesText}>Ulangan qurilmalar yo'q.</p>
      )}

      {selectedDevice && (
        <div style={styles.selectedDeviceContainer}>
          <h2 style={styles.selectedDeviceTitle}>Tanlangan Qurilma:</h2>
          <p style={styles.selectedDeviceInfo}>
            {selectedDevice.icon} {selectedDevice.type} - {selectedDevice.model}
            <button
              style={styles.removeButton}
              onClick={() => handleRemoveDevice(selectedDevice.id)}
            >
              O'chirish
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  devicesList: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  deviceItem: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  deviceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  deviceType: {
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  deviceModel: {
    color: '#666',
    fontSize: '1rem',
  },
  removeButton: {
    padding: '6px 12px',
    backgroundColor: '#ff3838',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  selectedDeviceContainer: {
    marginTop: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  selectedDeviceTitle: {
    fontSize: '1.8rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '20px',
  },
  selectedDeviceInfo: {
    fontSize: '1.2rem',
    color: '#666',
  },
  noDevicesText: {
    fontSize: '1.2rem',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '20px',
  },
};

export default Devices;
