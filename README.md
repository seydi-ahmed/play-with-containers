# play-with-containers

## Projet
le lien vers le projet est: https://github.com/01-edu/public/tree/master/subjects/devops/play-with-containers.

## Description

**play-with-containers** est un projet Dockerisé qui utilise plusieurs services (API Gateway, Inventory, Billing) pour simuler une application full-stack avec une gestion des requêtes via RabbitMQ et un proxy avec Nginx. Ce projet est conçu pour gérer les informations de facturation et d'inventaire tout en testant l'architecture des containers Docker.

Ce projet remplace les VM initialement gérées avec Vagrant par des containers Docker, offrant ainsi une gestion plus simple et plus rapide des différents services.


## Prérequis

Assurez-vous que vous avez installé Docker et Docker Compose sur votre machine. Si vous ne les avez pas installés, suivez les instructions sur leurs sites officiels :

- [Installer Docker](https://docs.docker.com/get-docker/)
- [Installer Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clonez le repository :**

    ```bash
    git clone https://learn.zone01dakar.sn/git/mouhameddiouf/play-with-containers.git
    cd play-with-containers
    ```

2. **Créez un fichier `.env` dans la racine du projet** en utilisant le modèle suivant :

    ```bash
    cp .env.sample .env
    ```

    Remplissez les variables du fichier `.env` avec les valeurs appropriées pour votre environnement.

3. **Lancez les containers avec Docker Compose :**

    ```bash
    docker-compose up --build
    ```

    Cela va démarrer tous les services dans des containers Docker (API Gateway, Billing App, Inventory App, RabbitMQ, PostgreSQL).

## Commandes Docker utiles

- **Voir l'état des containers en cours d'exécution :**
  
    ```bash
    docker ps
    ```

- **Vérifier la politique de redémarrage :**

    ```bash
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" api-gateway
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" billing-app
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" inventory-app
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" inventory-db
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" billing-db
    docker inspect -f "{{ .HostConfig.RestartPolicy }}" rabbitmq
    ```

- **Lister tous les volumes présents sur le systéme :**

    ```bash
    docker volume ls
    ```

- **Lister les images docker présents sur le systéme :**

    ```bash
    docker images
    ```

- **Redémarrer un container spécifique :**

    ```bash
    docker restart <container_name>
    ```

- **Arrêter un container spécifique :**

    ```bash
    docker stop <container_name>
    ```

- **Arrêter tous les containers :**

    ```bash
    docker-compose down
    ```

- **Supprimer tous les conteneurs :**

    ```bash
    docker rm -f $(docker ps -aq)
    ```

- **Supprimer toutes les images :**

    ```bash
    docker rmi -f $(docker images -q)
    ```

- **Supprimer tous les volumes :**

    ```bash
    docker volume rm $(docker volume ls -q)
    ```

---

## API Endpoints

### 1. API Gateway

L'API Gateway expose plusieurs routes et fait office de reverse proxy pour les services d'inventaire et de facturation.

- **GET /api/movies** : Récupère la liste des films dans l'inventaire.
  
    Exemple de requête avec Postman :
    ```bash
    GET http://localhost:3000/api/movies
    ```

- **POST /api/movies** : Ajoute un film à l'inventaire.

    Exemple de requête avec Postman :
    ```bash
    POST http://localhost:3000/api/movies
    {
      "title": "Nouveau film",
      "description": "Description du film"
    }
    ```

- **POST /api/billing** : Crée une commande pour le système de facturation via RabbitMQ.

    Exemple de requête avec Postman :
    ```bash
    POST http://localhost:3000/api/billing
    {
      "user_id": "20",
      "number_of_items": "99",
      "total_amount": "250"
    }
    ```

---

## Architecture

Le projet est constitué de plusieurs services interconnectés :

1. **API Gateway** : Sert de point d'entrée pour les clients, proxy les requêtes vers les services appropriés.
2. **Billing App** : Gère les factures et envoie les messages dans RabbitMQ pour traitement.
3. **Inventory App** : Gère l'inventaire des films.
4. **RabbitMQ** : File d'attente pour le traitement asynchrone des commandes.
5. **PostgreSQL** : Base de données pour l'inventaire et la facturation.

---

## Tests

1. **Vérification du fonctionnement de l'inventaire** :  
   Envoyez une requête GET à `http://localhost:3000/api/movies` pour vérifier la récupération des films.

2. **Ajout d'un film** :  
   Utilisez la requête POST à `http://localhost:3000/api/movies` pour ajouter un film à l'inventaire.

3. **Création d'une commande de facturation** :  
   Envoyez une requête POST à `http://localhost:3000/api/billing` pour créer une nouvelle commande de facturation.

4. **Simulation d'un arrêt de service** :  
   Testez la gestion des commandes même lorsque `billing-app` est arrêté. Vérifiez que la commande est mise en attente dans RabbitMQ.

---

## Dépannage

Si vous rencontrez des problèmes avec l'une des étapes ci-dessus, voici quelques points à vérifier :

- Assurez-vous que Docker et Docker Compose sont correctement installés.
- Vérifiez que les variables d'environnement dans le fichier `.env` sont correctement configurées.
- Consultez les logs des containers avec la commande `docker logs -f <container_name>` pour obtenir des informations de débogage.

---

## Auteur

- **Nom** : Mouhamed DIOUF
- **GitHub** : [mouhameddiouf](https://github.com/seydi-ahmed)
- **Email** : seydiahmedelcheikh@gmail.com
- **Numéro** : +221776221681
- **Réseaux** : [LinkedIn](https://linkedin.com/in/mouhamed-diouf-435207174)

---