# Changements requis dans le code avant dockerisation :
1) Dans les connexions à PostgreSQL, tu utilises localhost :
- À modifier en utilisant les noms de services Docker Compose (inventory-db, billing-db) comme hostname dans le code ou via .env.
2) Même chose pour RabbitMQ :
- Au lieu de 192.168.56.30, on utilisera rabbit-queue (nom du conteneur).
- Le .env devra être modifié pour l’environnement Docker.

# docker rm -f billing-db

# arréter tous les conteneurs en cours d'exécution
docker stop $(docker ps -aq)

# supprimer tous les conteneurs
docker rm $(docker ps -aq)

# supprimer toutes les images docker
docker rmi $(docker images -q)

# vérifier les conteneurs
docker ps -a

# vérifier les images
docker images

# stopper les conteneurs
docker stop $(docker ps -aq)

# suppriemr tous les conteneurs
docker rm -f $(docker ps -aq)

# suppriemr les volumes
docker volume prune

docker volume rm $(docker volume ls -q)

docker exec -it rabbitmq /bin/bash

docker tag postgres:15-alpine inventory-database
docker tag postgres:15-alpine billing-database
docker tag rabbitmq:3-management RabbitMQ


docker inspect -f "{{ .HostConfig.RestartPolicy }}" api-gateway
docker inspect -f "{{ .HostConfig.RestartPolicy }}" billing-app
docker inspect -f "{{ .HostConfig.RestartPolicy }}" inventory-app
docker inspect -f "{{ .HostConfig.RestartPolicy }}" inventory-db
docker inspect -f "{{ .HostConfig.RestartPolicy }}" billing-db
docker inspect -f "{{ .HostConfig.RestartPolicy }}" rabbitmq


Vous avez dit :
docker exec -it inventory-db psql -U postgres -d movies

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);