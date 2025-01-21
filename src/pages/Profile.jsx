// Profil.jsx
import React from 'react';

const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profil</h2>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-medium mb-2">Foydalanuvchi Ma'lumotlari</h3>
        <p><strong>Ism:</strong> Ism Familya</p>
        <p><strong>Email:</strong> example@mail.com</p>
        <p><strong>Telefon:</strong> +998 90 123 45 67</p>
      </div>
    </div>
  );
};

export default Profile;
