import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  validateUser, removeuser } from "./redux/userSlice";
import { getusers } from "./redux/usersSlice";
import { useNavigate } from "react-router-dom";

function AdminEtudiants() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users || []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const handleValidation = (id, etat) => {
    dispatch(validateUser({ id, etat }));
  };

  const handleDelete = (id) => {
    dispatch(removeuser(id));
  };

  const etudiants = users?.filter((u) => u?.role === "etudiant");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestion des Étudiants</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Nom</th>
              <th>Email</th>
              <th>État</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {etudiants?.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.nom} {user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.etat}</td>
                <td className="space-x-2 py-2">
                  {user?.etat === "en cours"? (
                    <>
                      <button
                        onClick={() => handleValidation(user?._id, "accepté")}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => handleDelete(user?._id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Refuser
                      </button>
                    </>
                  ):
                 ( <button
                    onClick={() => handleDelete(user?._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>)}
                  <button
                    onClick={() => navigate(`/memberProfile/${user?._id}`)}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Consulter
                  </button>
                  
                </td>
              </tr>
            ))}
            {etudiants?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Aucun étudiant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEtudiants;
