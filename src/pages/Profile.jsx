import React, { useState } from 'react';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">Profil Ma'lumotlari</h1>
        
        {/* Profile Image */}
        <div className="space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mx-auto">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profil rasmi"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
            Rasmni yuklash
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* User Information */}
        <div className="text-gray-700 text-left space-y-3">
          <p>
            <span className="font-semibold text-gray-900">Ism:</span> Ism Familya
          </p>
          <p>
            <span className="font-semibold text-gray-900">Email:</span> example@mail.com
          </p>
          <p>
            <span className="font-semibold text-gray-900">Telefon:</span> +998 90 123 45 67
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
