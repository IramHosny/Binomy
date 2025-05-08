const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // serveur HTTP pour socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // à adapter à l'URL de ton front si nécessaire
    methods: ["GET", "POST"],
  },
});

const db_connect = require("./connect_db");
app.use(express.json());
app.use(cors({ origin: true }));
app.use("/files", express.static("files"));
app.use('/offres', express.static('offres')); // pour servir les images


// Connexion à la base de données
db_connect();

// Routes
app.use("/user", require("./routes/user"));
app.use("/message", require("./routes/message"));
app.use("/conversation", require("./routes/conversation"));
app.use("/post", require("./routes/post"));
app.use("/offre", require("./routes/offre"));

// Socket.IO
io.on("connection", (socket) => {
  console.log("✅ Utilisateur connecté :", socket.id);

  // Rejoindre une salle pour discussion privée
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`🟢 Socket ${socket.id} a rejoint la salle ${roomId}`);
  });

  // Envoi d’un message
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Utilisateur déconnecté :", socket.id);
  });
});

// Lancement du serveur
const PORT = process.env.PORT;
server.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`🚀 Serveur en écoute sur le port ${PORT}`)
);
