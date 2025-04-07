# play-with-containers

1) dockeriser une architecture compléte en m'inspirant du projet crud-master

2) L’archi contient:
- inventory-db (PostgreSQL)
- billing-db (PostgreSQL)
- rabbit-queue (RabbitMQ)
- inventory-app (service Flask ou autre)
- billing-app (consomme des messages RabbitMQ)
- api-gateway-app (point d'entrée HTTP)
- Le tout doit être orchestré avec docker-compose, connecté par un réseau Docker interne, et bien isolé de l’extérieur sauf l’API Gateway.

3) Analyse(à containeriser):
- inventory-app: Python, PostgreSQL, 8080
- billing-app: Python, PostgreSQL, 8080, RabbitMQ
- api-gateway-app: Python, 3000, RabbitMQ(producteur)
- inventory-db: PostgreSQL
- billing-db: PostgreSQL
- rabbit-queue: RabbitMQ

4) Créer un docker-compose.yml (centraliser tout dedans):
- déclarer les services
- les relier à un réseau commun
- ajouter les volumes persistants
- utiliser un ficher .env pour les mots de passes et les configurations sensibles

5) Créer un dockerfile par app

6) commande à retenir
- docker-compose config: permet de vérifer la configuration de docker-compose avant de lancer
- docker-compose build: construire les images
- 

7) à tenir en compte
- désactiver Buildkit 