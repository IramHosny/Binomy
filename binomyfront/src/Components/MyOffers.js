import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres, addOffre, deleteoffre } from "./redux/offreSlice"; // adapte le chemin selon ton arborescence
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyOffers() {
const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const dispatch = useDispatch();

  const offres = useSelector((state) => state.offre?.offrelist);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchOffres());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 4) {
      alert("Vous pouvez ajouter jusqu'à 4 images maximum.");
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!form.title || !form.description || !form.price) {
      Swal.fire("Champs manquants", "Merci de remplir tous les champs.", "warning");
      return;
    }
  
    if (images.length === 0) {
      Swal.fire("Aucune image", "Veuillez ajouter au moins une image.", "warning");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("createdBy", current._id);
  
    images.forEach((img) => {
      formData.append("images", img);
    });
  
    dispatch(addOffre(formData)); // ✅ tu as déjà corrigé dans offreSlice pour ne plus l’entourer dans un objet
  
    setForm({ title: "", description: "", price: "" });
    setImages([]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteoffre(id));
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {current?.role === "bailleur" && (
          <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded">
            <h2 className="text-xl font-semibold">Ajouter une offre</h2>
            <input
              type="text"
              name="title"
              placeholder="Titre"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Prix"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <label className="block mb-1 font-semibold">Images (max 4):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="mb-2"
            />

            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Publier l’offre
            </button>
          </form>
        )}

        {/* Liste des offres */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          { offres?.length > 0 ? (
            offres?.map((offer) => (
              <div key={offer?._id} className="group border rounded p-2 shadow">
                <img
                  alt={offer?.title}
                  src={`http://localhost:5000/offres/${offer?.images?.[0]}`}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <h3 className="mt-4 text-sm text-gray-700">{offer?.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{offer?.price} DT</p>
                <button
                onClick={() => navigate(`/offredetails/${offer._id}`)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                Découvrir
                </button>
              </div>
            ))
          ) : (
            <p>Aucune offre disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOffers;
