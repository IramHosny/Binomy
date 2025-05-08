import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, deletePost } from './redux/postSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Pubs({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post?.postList || []);
  const currentUser = user;

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePublish = async () => {
    if (!newPost.title.trim() || !newPost.description.trim()) return;

    const postData = {
      title: newPost.title,
      description: newPost.description,
      author: {
        _id: currentUser._id,
        name: `${currentUser.nom} ${currentUser.prenom}`,
        role: currentUser.role || 'Membre',
        imageUrl: currentUser.photo || 'https://via.placeholder.com/100',
      },
    };

    dispatch(addPost(postData));
    setNewPost({ title: '', description: '' });
    setShowModal(false);
  };

  const handleDeletePost = (id) => {
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
        Swal.fire("Supprimé", "Votre publication a été supprimée.", "success");
      }
    });
  };

  const handleChat = (id) => {
    if (!currentUser || !currentUser._id) return;
    const roomId = currentUser._id < id ? `${currentUser._id}_${id}` : `${id}_${currentUser._id}`;
    navigate(`/chat/${roomId}`);
  };

  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Trouver votre binôme!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Découvrez les dernières annonces et partages des étudiants en quête de colocation.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par mot-clé..."
              className="px-4 py-2 rounded border text-sm outline-indigo-500"
            />
            {currentUser && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Publier
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post._id}
              className="flex max-w-xl flex-col items-start justify-between border p-4 rounded shadow-sm"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <button
                  onClick={() => handleChat(post.author._id)}
                  className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 text-xs hover:underline"
                >
                  Contacter
                </button>
              </div>

              <div className="group relative w-full">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.description}</p>
              </div>

              <div className="relative mt-6 flex items-center gap-x-4 w-full justify-between">
                <div className="flex items-center gap-x-4">
                  <img
                    src={`http://localhost:5000/files/${post.author.imageUrl}`}
                    alt=""
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                {currentUser?._id === post.author._id && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Aucune publication trouvée.
            </p>
          )}
        </div>
      </div>

      {/* Modal de publication */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Nouvelle publication</h3>
            <input
              type="text"
              placeholder="Titre"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Description"
              rows={4}
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handlePublish}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
