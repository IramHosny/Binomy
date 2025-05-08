// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // adapte l’URL si ton backend est hébergé ailleurs

export default socket;
