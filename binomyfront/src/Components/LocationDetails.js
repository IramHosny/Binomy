import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { deleteoffre, editoffre, fetchOffresByOwner } from "./redux/offreSlice";

function LocationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const users = useSelector((state) => state.users?.users);
  const offres = useSelector((state) => state.offre?.offrelist);
  const [offre, setOffre] = useState(null);
  const [bailleur, setBailleur] = useState(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [images, setImages] = useState([]);
  const [imagesToKeep, setImagesToKeep] = useState([]);

  useEffect(() => {
    if (offres && offres.length > 0) {
      const found = offres.find((el) => el?._id === id);
      setOffre(found);

      if (found?.createdBy) {
        let bailleur = users?.filter((el) => el?._id === found?.createdBy);
        setBailleur(bailleur[0]);
        console.log(bailleur)
      }
    }
  }, [id, offres]);

  const handleChat = () => {
    if (!bailleur || !bailleur._id) return;

    const roomId = bailleur._id < id
      ? `${bailleur._id}_${current?._id}`
      : `${current?._id}_${bailleur._id}`;

    navigate(`/chat/${roomId}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Supprimer cette offre ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
    }).then((result) => {
      if (result.isConfirmed && offre) {
        dispatch(deleteoffre(offre?._id));
        navigate("/mesoffres");
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title || offre.title);
    data.append("description", form.description || offre.description);
    data.append("price", form.price || offre.price);
    data.append("imagesToKeep", JSON.stringify(imagesToKeep));
    images.forEach((img) => data.append("images", img));

    try {
      await dispatch(editoffre({ id: offre._id, editedoffre: data }));
      dispatch(fetchOffresByOwner(current._id));
      setEditing(false);
      Swal.fire("Succès", "Offre modifiée", "success");
    } catch {
      Swal.fire("Erreur", "Échec de la modification", "error");
    }
  };

  if (!offre) return <p className="text-center py-12">Chargement...</p>;

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Images */}
        <div className="relative w-full overflow-hidden rounded-lg">
          {offre.images?.length > 1 ? (
            <div className="flex overflow-x-auto space-x-4 snap-x">
              {offre.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/offres/${img}`}
                  alt={offre?.title}
                  className="snap-center w-full md:w-1/2 rounded-lg object-cover flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <img
              src={`http://localhost:5000/offres/${offre?.images?.[0]}`}
              alt={offre.title}
              className="w-full rounded-lg object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{offre.title}</h1>
          <p className="text-gray-600 mb-4">{offre.description}</p>
          <p className="text-xl font-semibold text-indigo-600 mb-6">{offre.price} DT</p>

          {/* Infos bailleur */}
          {current?.role !=="bailleur" && (
            <div className="bg-gray-100 p-4 rounded mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Informations du propriétaire</h3>
              <p><span className="font-medium">Publié par :</span> {bailleur?.nom}{" "+bailleur?.prenom}</p>
              <p>
                <span className="font-medium">Email :</span>{" "}
                <a href={`mailto:${bailleur.email}`} className="text-indigo-600 underline">{bailleur?.email}</a>
              </p>
              <p>
                <span className="font-medium">Téléphone :</span>{" "}
                <a href={`tel:${bailleur?.tel}`} className="text-indigo-600 underline">{bailleur?.tel}</a>
              </p>
              <button
                onClick={handleChat}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Contacter via messagerie
              </button>
            </div>
          )}

          {current?._id === offre.createdBy && current?.role === "bailleur" && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setEditing(true);
                    setImagesToKeep(offre.images || []);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Modifier
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
              {editing && (
                <form onSubmit={handleEdit} className="bg-gray-100 p-4 rounded space-y-4">
                  <input
                    type="text"
                    placeholder={offre.title}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                  <textarea
                    placeholder={offre.description}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder={offre.price}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border p-2 rounded"
                  />

                  {/* anciennes images avec bouton X */}
                  <div className="flex gap-2 flex-wrap">
                    {imagesToKeep.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={`http://localhost:5000/offres/${img}`}
                          alt="ancienne"
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setImagesToKeep(imagesToKeep.filter((f) => f !== img))}
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
                    className="w-full"
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 rounded">
                      Annuler
                    </button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                      Valider
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;
