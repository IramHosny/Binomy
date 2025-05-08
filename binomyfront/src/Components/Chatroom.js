import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from './socket';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Chatroom = () => {
  const { roomId } = useParams();
  const currentUser = useSelector((state) => state.user?.user);
  const users = useSelector((state) => state.users?.users);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const [id1, id2] = roomId.split('_');
  const receiverId = currentUser._id === id1 ? id2 : id1;

  useEffect(() => {
    if (roomId) socket.emit('joinRoom', roomId);
  }, [roomId]);

  useEffect(() => {
    if (users && receiverId) {
      const user = users.find((u) => u._id === receiverId);
      if (user) setReceiverName(`${user.nom} ${user.prenom}`);
    }
  }, [users, receiverId]);

  useEffect(() => {
    if (!receiverId || !currentUser?._id) return;

    const fetchConversation = async () => {
      setIsLoading(true);
      setMessages([]);
      try {
        const res = await axios.get(`http://localhost:5000/conversation/${currentUser._id}`);
        const conv = res.data.find((c) => c.members.includes(receiverId));
        if (conv) {
          setConversationId(conv._id);
          const msgRes = await axios.get(`http://localhost:5000/message/${conv._id}`);
          setMessages(msgRes.data);
        } else {
          setConversationId(null); // Aucun historique = pas encore de conversation
        }
      } catch (err) {
        console.error('Erreur conversation :', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [receiverId, currentUser?._id, roomId]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('receiveMessage');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    let convId = conversationId;

    try {
      // Créer la conversation uniquement si elle n'existe pas encore
      if (!convId) {
        const createRes = await axios.post('http://localhost:5000/conversation/add', {
          senderId: currentUser._id,
          receiverId,
        });
        convId = createRes.data._id;
        setConversationId(convId);
      }

      const message = {
        sender: currentUser._id,
        text,
        conversationId: convId,
        room: roomId,
      };

      socket.emit('sendMessage', message);
      await axios.post('http://localhost:5000/message/add', message);
      setText('');
    } catch (err) {
      console.error('Erreur envoi message :', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">
        💬 Discussion avec {receiverName || '...'}
      </h2>

      <div className="h-80 overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
        {isLoading ? (
          <div className="text-center text-gray-500">Chargement des messages...</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 text-sm ${msg.sender === currentUser._id ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.sender === currentUser._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Écris ton message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chatroom;

