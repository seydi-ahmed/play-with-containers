// crud-master/srcs/inventory-app/server.js

require("dotenv").config();
const express = require("express");
const app = express();
const movieRoutes = require("./app/routes/movie.routes"); // Chemin corrigé
const { Sequelize } = require("sequelize");
require("./app/models/movie.model");

// Middleware
app.use(express.json());

// Connexion DB
const sequelize = require("./app/config/database");
sequelize
  .authenticate()
  // .then(() => console.log("DB connectée"))
  .then(() => {
    console.log("✅ DB connectée");

    // Synchroniser tous les modèles connus avec la DB
    return sequelize.sync(); // Ajoute { force: true } pour recréer à chaque fois
  })
  .then(() => {
    console.log("📦 Tables synchronisées avec succès");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Inventory service running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Erreur DB:", err));

// Montez les routes sous /api/movies
app.use("/api/movies", movieRoutes); // Cette ligne était probablement manquante ou incorrecte

// Démarrer le serveur
const PORT = process.env.INVENTORY_PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//   // Écoute sur toutes les interfaces
//   console.log(`Inventory service running on port ${PORT}`);
// });
