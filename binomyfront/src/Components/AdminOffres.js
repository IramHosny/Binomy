import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres, deleteoffre } from "./redux/offreSlice";
import { useNavigate } from "react-router-dom";

function AdminOffres() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offres = useSelector((state) => state.offre?.offrelist || []);
  const users = useSelector((state) => state.users?.users || []);

  useEffect(() => {
    dispatch(fetchOffres());
  }, [dispatch]);

  const getUserById = (id) => users.find((u) => u._id === id);

  const bailleurOffers = offres.filter((offre) => {
    const user = getUserById(offre.createdBy);
    return user?.role === "bailleur";
  });

  const handleDelete = (id) => {
    dispatch(deleteoffre(id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Offres publiées par les bailleurs</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {bailleurOffers.map((offre) => {
          const bailleur = getUserById(offre.createdBy);
          return (
            <div key={offre._id} className="bg-white p-4 rounded shadow">
              <img
                src={`http://localhost:5000/offres/${offre.images?.[0]}`}
                alt={offre.title}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">{offre.title}</h2>
              <p className="text-gray-600">{offre.price} DT</p>
              <p className="text-sm text-gray-500 mt-1">Par : {bailleur?.nom || "—"}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/offredetails/${offre._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Consulter
                </button>
                <button
                  onClick={() => handleDelete(offre._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
        {bailleurOffers.length === 0 && (
          <p className="col-span-full text-gray-500 text-center">Aucune offre trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default AdminOffres;
