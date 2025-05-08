import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "./redux/postSlice"; // adapte le chemin selon ton projet
import Swal from "sweetalert2";

function AdminPublications() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post?.postList || []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer cette publication ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(id));
        Swal.fire("Supprimé", "Publication supprimée avec succès.", "success").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Publications des amateurs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-3">{post.description}</p>
            <p className="text-xs text-gray-500 mb-1">Auteur : {post.author?.name} ({post.author?.role})</p>
            <p className="text-xs text-gray-400">{new Date(post.date).toLocaleString()}</p>
            <button
              onClick={() => handleDelete(post._id)}
              className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="col-span-full text-gray-500 text-center">Aucune publication trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPublications;
