import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserPublicProfile() {
  const { id } = useParams();
  const users = useSelector((state) => state.users?.users);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users?.find((el) => el._id === id);
    setUser(foundUser);
  }, [id, users]);

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 relative">
        {/* Bouton contacter */}
        <div className="absolute top-4 right-4">
          <a
            href={`mailto:${user?.email}`}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Contacter
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={`http://localhost:5000/files/${user?.photo}`}
            alt={user?.nom}
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user?.prenom} {user?.nom}</h2>
            <p className="text-sm text-gray-500 mt-1">{user?.niveau} à {user?.institut}</p>
            <span className="mt-2 inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Étudiant(e)
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="font-medium text-gray-900">Email :</span> {user?.email}
          </div>
          <div>
            <span className="font-medium text-gray-900">Téléphone :</span> {user?.tel}
          </div>
          <div>
            <span className="font-medium text-gray-900">Âge :</span> {user?.age}
          </div>
          <div>
            <span className="font-medium text-gray-900">Origine :</span> {user?.gouvernorat}
          </div>
          <div>
            <span className="font-medium text-gray-900">Adresse actuelle :</span> {user?.adresse}
          </div>
        </div>

        {user?.about && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">À propos</h3>
            <p className="text-gray-600 leading-relaxed">{user.about}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPublicProfile;
