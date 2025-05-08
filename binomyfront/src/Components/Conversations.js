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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">📨 Mes conversations</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500">Aucune conversation pour le moment.</p>
      ) : (
        <ul className="space-y-4">
{[...new Map(
  conversations.map((conv) => {
    const receiverId = conv.members.find((id) => id !== currentUser._id);
    return [receiverId, conv]; // Use receiverId as key
  })
).values()].map((conv) => {
  const receiver = getReceiver(conv.members);
  if (!receiver) return null;
  const roomId = generateRoomId(currentUser._id, receiver._id);

  return (
    <li key={conv._id} className="border-b pb-2">
      <Link
        to={`/chat/${roomId}`}
        className="flex items-center justify-between hover:bg-gray-100 p-3 rounded transition"
      >
        <div>
          <p className="font-semibold">{receiver.nom} {receiver.prenom}</p>
          <p className="text-sm text-gray-500">Cliquez pour discuter</p>
        </div>
        <span className="text-sm text-blue-600">➡️</span>
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
