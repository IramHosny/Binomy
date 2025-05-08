import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FaComments } from 'react-icons/fa'; // icône

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#2563EB',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#2563EB',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  { id: '0', message: "Bonjour ! Quel est votre prénom ?", trigger: '1' },
  { id: '1', user: true, trigger: '2' },
  { id: '2', message: "Enchanté, {previousValue} ! Comment puis-je vous aider ?", trigger: '3' },
  {
    id: '3',
    options: [
      { value: 'admin', label: "Je veux contacter l’administrateur", trigger: '4' },
      { value: 'reserver', label: "Comment réserver un logement ?", trigger: '5' },
      { value: 'poster', label: "Comment déposer une annonce ?", trigger: '6' },
      { value: 'messagerie', label: "Y a-t-il une messagerie intégrée ?", trigger: '7' },
      { value: 'tarif', label: "Y a-t-il des frais de service ?", trigger: '8' },
      { value: 'profil', label: "Puis-je modifier mon profil ?", trigger: '9' },
    ]
  },
  { id: '4', message: "Vous pouvez contacter l’administrateur via la page Contact.", end: true },
  { id: '5', message: "Créez un compte, explorez les offres et envoyez une demande au bailleur.", end: true },
  { id: '6', message: "Allez dans la section Publications ou Offres et cliquez sur 'Ajouter'.", end: true },
  { id: '7', message: "Oui, une messagerie est disponible après connexion.", end: true },
  { id: '8', message: "Non, le service est totalement gratuit pour les étudiants.", end: true },
  { id: '9', message: "Rendez-vous dans votre profil et cliquez sur 'Modifier le profil'.", end: true },
];

export default function ChatBott() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        title="Discuter avec Binomy"
      >
        <FaComments size={24} />
      </button>

      {/* Fenêtre du chatbot */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[320px] shadow-xl">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} floating={false} />
          </ThemeProvider>
        </div>
      )}
    </>
  );
}
