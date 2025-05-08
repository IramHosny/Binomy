import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffresByOwner } from "./redux/offreSlice"; // adapte le chemin
import { useNavigate } from "react-router-dom";

function MesOffres() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const offres = useSelector((state) => state.offre?.offrelist);
  console.log(offres)

  useEffect(() => {
    if (current?._id) {
      dispatch(fetchOffresByOwner(current._id));

    }
  }, [dispatch, current]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Offres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offres?.length > 0 ? (
          offres?.map((offer) => (
            <div key={offer._id} className="border p-4 rounded shadow">
              <img
                src={`http://localhost:5000/offres/${offer.images?.[0]}`}
                alt={offer.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{offer?.title}</h2>
              <p className="text-gray-600 text-sm">{offer?.description}</p>
              <p className="font-bold mt-2">{offer?.price} DT</p>
              <button
                onClick={() => navigate(`/offredetails/${offer?._id}`)}
                className="mt-2 text-indigo-600 underline text-sm"
              >
                Voir détails
              </button>
            </div>
          ))
        ) : (
          <p>Vous n'avez publié aucune offre pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default MesOffres;
