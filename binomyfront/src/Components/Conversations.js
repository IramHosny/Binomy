import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Conversations = () => {
  const currentUser = useSelector((state) => state.user?.user);
  const users = useSelector((state) => state.users?.users);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/conversation/${currentUser._id}`);
        setConversations(res.data.reverse());
      } catch (err) {
        console.error('Erreur récupération des conversations :', err);
      }
    };

    if (currentUser?._id) {
      fetchConversations();
    }
  }, [currentUser?._id]);

  const getReceiver = (members) => {
    const receiverId = members.find((id) => id !== currentUser._id);
    return users?.find((u) => u._id === receiverId);
  };

  const generateRoomId = (id1, id2) => {
    return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-blue-300">
      <h2
        className="text-3xl mb-6 text-center"
        style={{
          color: '#00AEEF',
          fontStyle: 'italic',
          fontFamily: "'Comic Sans MS', cursive",
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        📨 Mes conversations
      </h2>

      {conversations.length === 0 ? (
        <p className="text-gray-500 text-center">Aucune conversation pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {[...new Map(
            conversations.map((conv) => {
              const receiverId = conv.members.find((id) => id !== currentUser._id);
              return [receiverId, conv];
            })
          ).values()].map((conv) => {
            const receiver = getReceiver(conv.members);
            if (!receiver) return null;
            const roomId = generateRoomId(currentUser._id, receiver._id);

            return (
              <li key={conv._id} className="border-b pb-2">
                <Link
                  to={`/chat/${roomId}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-white hover:bg-blue-100 transition duration-300 shadow-sm"
                >
                  <div>
                    <p
                      className="text-lg font-semibold text-gray-800"
                      style={{ fontFamily: "'Comic Sans MS', cursive" }}
                    >
                      {receiver.nom} {receiver.prenom}
                    </p>
                    <p className="text-sm text-gray-500 italic">Cliquez pour discuter 💬</p>
                  </div>
                  <span className="text-xl text-[#F5A623] transition-transform transform hover:scale-110">➡️</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Conversations;
