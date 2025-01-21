// src/pages/Messages.jsx
import React from 'react';

const Messages = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Xabarlar</h2>
      <div className="bg-white p-4 mb-4 shadow-lg rounded-lg">
        <h3 className="text-xl font-medium">Foydalanuvchi Xabari 1</h3>
        <p>Bu yerda foydalanuvchi xabarining matni bo'ladi.</p>
      </div>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-xl font-medium">Foydalanuvchi Xabari 2</h3>
        <p>Bu yerda yana bir xabar bo'ladi.</p>
      </div>
    </div>
  );
};

export default Messages;
