# srcs/api-gateway/Dockerfile

FROM node:18-alpine

# Créer un répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires au début pour optimiser le cache
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port de l'API Gateway
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]
