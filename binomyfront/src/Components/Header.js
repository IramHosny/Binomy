
import { Fade} from "react-awesome-reveal";
import { Link } from 'react-router-dom';
import { Zoom } from "react-awesome-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, deletePost } from './redux/postSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Header({ user }) {
  const isAuth = localStorage.getItem("token");
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.post?.postList || []);
    const currentUser = user;
    const handleClick = () => {
    navigate('/communaute');
  };
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', description: '' });
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);
   const handleChat = (id) => {
    if (!currentUser || !currentUser._id) return;
    const roomId = currentUser._id < id ? `${currentUser._id}_${id}` : `${id}_${currentUser._id}`;
    navigate(`/chat/${roomId}`);
  };

  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className=''>
        <section className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-cyan-100 px-8 py-12" style={{marginTop:"0"}}>
          
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0" style={{marginLeft:"8%"}}>
       <Zoom triggerOnce>
        <h1 className="text-4xl font-bold text-sky-900 mb-4">
          Trouvez un logement étudiant
        </h1>
      </Zoom>
        <p className="text-lg text-sky-900 max-w-xl mb-6">
          Un réseau social tunisien pour les étudiants universitaires à la recherche de foyers universitaires (publics ou privés), de studios ou d’appartements en colocation.
        </p>
        <button   onClick={handleClick} className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition">
          Rechercher
        </button>
      </div>
     
      <div className="md:w-1/2 flex justify-center">
        <img
          src="assets/b2.png" 
          alt="Illustration maison colocation"
          className="w-80 h-auto rounded-lg shadow-md"
        />
      </div>
    </section>
    <marquee scrollamount="20"
  behavior="scroll"
  direction="left" >
<div className="overflow-hidden" style={{marginTop:"5%"}}>
  <h2
    className="animate-slide font-bold text-5xl italic text-cyan-500 drop-shadow-md text-center"
    style={{
      fontFamily: 'cursive',
      whiteSpace: 'nowrap',
    }}
  >
    🎓 Bienvenue sur Binomy !
  </h2>
</div>
</marquee>
    <div className="flex items-start gap-4 bg-cyan-50 p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
      {/* Image de l'étudiant */}
      <img
        src="assets/student-avatar.png" 
        alt="Étudiant"
        className="w-40 h-40 rounded-full border-2 border-cyan-300"
      />

      {/* Bulle de discussion */}
      <div className="bg-white border border-cyan-200 p-4 rounded-lg text-sky-900 shadow-sm">
       <p
  className="text-cyan-900 leading-relaxed"
  style={{
    fontWeight: 'bold',
    fontSize: '28px',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    backgroundColor: '#e0f7fa',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  😊 Simplifiez votre recherche de logement étudiant en vous connectant avec d'autres étudiants à la recherche d’une colocation 🏠.  
  📌 Découvrez les foyers universitaires disponibles et publiez vos annonces de location pour trouver votre binôme 🤝 !
</p>
      </div>
    </div>
        <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.9" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <Fade cascade damping={0.4}  direction='up' triggerOnce={true}>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            La colocation parfaite t'attend. Rejoins-nous !
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
            Simplifie ta recherche de colocataire avec notre app intelligente. Plus de stress, juste des rencontres adaptées !            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {isAuth?(
                <Link to="/profile"> <a
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Devenir membre
              </a></Link>
              ):  
              ( <Link to="/register"> <a
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Devenir membre
            </a></Link>)}
          
              <Link to="/about">
              <a href="#" className="text-sm/6 font-semibold text-white">
                A propos de nous <span aria-hidden="true">→</span>
              </a></Link>
            </div>
          </div>
          </Fade>
          <div className="relative mt-16 h-80 lg:mt-8">
          
          <img
  alt="Trouve ton binôme parfait"
  src="assets/st.webp"
  className="w-full max-w-lg mx-auto rounded-md object-contain"
/>
          </div>
        </div>
      </div>
    </div>
    <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  marginTop: '40px',
}}>
  {filteredPosts.map((post, index) => {
    const bubbleColors = ['#FFD700', '#FF69B4', '#FFB6C1', '#E0BBE4', '#B2F7EF', '#FFC1CC'];
    const bgColor = bubbleColors[index % bubbleColors.length];

    return (
      <article
        key={post._id}
        style={{
          backgroundColor: bgColor,
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          transform: 'scale(1)',
          transition: 'transform 0.4s ease-in-out',
          animation: 'bounceSlow 3s infinite',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{
          fontSize: '12px',
          color: '#444',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <time>
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          
        </div>

        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {post.title}
        </h3>
        <p style={{
          fontSize: '14px',
          marginTop: '8px',
          color: '#333'
        }}>
          {post.description}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px'
        }}>
          <img
            src={`http://localhost:5000/files/${post.author.imageUrl}`}
            alt="Auteur"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 0 5px rgba(0,0,0,0.2)',
            }}
          />
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
              {post.author.name} 🧑‍🎓
            </p>
            <p style={{ fontSize: '12px', color: '#555' }}>
              {post.author.role}
            </p>
          </div>
        </div>
      </article>
    );
  })}
</div>

        </div>
  )
}

export default Header