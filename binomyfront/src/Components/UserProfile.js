import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditUserModal from './EditUserModal';

function UserProfile({ user }) {
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Photo + bouton */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={user.photo ? `http://localhost:5000/files/${user.photo}` : "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67338d48953975001dd4b439.png"}
            alt="Profil"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
          />
          {user.role === "etudiant" ? (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Modifier le profil
            </button>
          ) : (
            <Link to="/mesoffres">
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Mes offres
              </button>
            </Link>
          )}
        </div>

        {/* Infos utilisateur */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Bonjour, {user.prenom || "—"}</h2>
            <p className="text-gray-600">{user.niveau} à {user.institut || "—"}</p>
            <p className="text-gray-500 mt-1">{"Âge :" + (user.age || "—")} ans</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">À propos de moi</h3>
            <p className="text-gray-700 bg-gray-100 p-3 rounded">{user.about || "Pas de description."}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Nom" value={user.nom} />
            <InfoItem label="Prénom" value={user.prenom} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Téléphone" value={user.tel} />
            <InfoItem label="Origine" value={user.gouvernorat} />
            <InfoItem label="Institut" value={user.institut} />
            <InfoItem label="Adresse actuelle" value={user.adresse} />
          </div>
        </div>
      </div>

      {/* Modal externe d'édition */}
      {editing && <EditUserModal user={user} onClose={() => setEditing(false)} />}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded shadow-sm border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{value || "—"}</p>
    </div>
  );
}

export default UserProfile;
