import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RechercheEtudiants from './RechercheEtudiants';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserCard = ({ id, name, title, image }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.user);

  const handleChat = () => {
    if (!currentUser || !currentUser._id) {
      Swal.fire({
        title: "Non connecté",
        text: "Veuillez vous connecter pour contacter cet étudiant.",
        icon: "info",
        confirmButtonText: "OK"
      });
      return; // 🔒 empêche navigation si pas connecté
    }

    const roomId = currentUser._id < id
      ? `${currentUser._id}_${id}`
      : `${id}_${currentUser._id}`;

    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="max-w-xs bg-white rounded-xl shadow p-4 text-center">
      <img
        className="w-24 h-24 rounded-full mx-auto object-cover"
        src={image}
        alt={name}
      />
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
        Étudiant
      </span>
      <div className="mt-4 flex justify-around text-sm">
        <button
          onClick={handleChat}
          className="text-blue-600 hover:underline"
        >
          Contacter
        </button>
        <Link
          to={`/memberProfile/${id}`}
          className="text-purple-600 hover:underline"
        >
          À propos
        </Link>
      </div>
    </div>
  );
};

function Community({ user }) {
  const users = useSelector((state) => state.users?.users);

  const filteredUsers = users?.filter(
    (el) =>
      el?.email !== 'admin@gmail.com' &&
      el?.email !== user?.email &&
      el?.role === 'etudiant' &&
      el?.etat === 'accepté'
  );

  return (
    <>
      <h2 className="text-xl font-semibold text-center my-6">🎓 Communauté des étudiants</h2>
      <RechercheEtudiants />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((el) => (
            <UserCard
              key={el._id}
              id={el._id}
              name={`${el.nom} ${el.prenom}`}
              title={`Étudiant(e) à ${el.institut}`}
              image={`http://localhost:5000/files/${el.photo}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Aucun utilisateur trouvé.</p>
        )}
      </div>
    </>
  );
}

export default Community;
