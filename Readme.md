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

7) questions / réponses
- What are containers and what are their advantages?
    - Le container est une technologie de virtualisation légère qui permet d'isoler et d'exécuter des applications dans des environnements autonomes.
    - légéreté et rapidité: contrairement aux VM qui nécessitent une virtualisation de l'hôte, les conteneurs partagent le noyau du systéme hôte.
    - portabilité: les conteneurs permettent d'emballer une application avec toutes ses dépendances dans un seul paquet.

- What is the difference between containers and virtual machines?
    - une vm a besoin de son propre systéme d'exploitation, un conteneur est une virtualisation au sein du systéme d'exploitation utilisé.
    - donc le conteneur consomme moins de temps et de ressources.

- What is Docker and what is it used for?
    - docker est une plateforme open-source qui permet de conteneuriser des applications
    - déploiement, microservices, ci/cd etc.

- What is a microservices' architecture?
    - une architecture de microservice est un style d'archietcture logicielle qui permet de diviser une application en un ensemble de services qui communiquent via un API.

- Why do we use microservices architecture?
    - déploiement autonome: chaque équipe peut, développer, tester, déployer son microservice de maniére indépendante
    - résilience accrue: si un microservice tombe en panne, l'ensemble de l'application ne s'arréte pas. les autres continuent de fonctionner normalement.
    - technologies variées: chaque microservice peut utiliser un langage différent.
    - etc.

- What is a queue and what is it used for?
    - c'est une structure de données qui suit la logique FIFO (first in first out).
    - assurer la communication entre service, gérer les pics de données.

- What is RabbitMQ?
    - c'est un systéme de gestion de file de messsage, un intermédiaire entre les services.

- What is a Dockerfile?
    - c'est un fichier qui contient une série d'instructions que Docker utilise pour contruire une image.

- Explain the instructions used on the Dockerfile.
    ```
    FROM python:3.12-alpine                                     utilise une image de base (alpine)
    WORKDIR /usr/src/                                           définit le répertoire de travail
    COPY requirements.txt ./                                    copie le fichier "requierements.txt" depuis ton dossier local vers le répertoire de travail
    RUN pip install --no-cache-dir -r requirements.txt          installer les dépendances de python qui sont dans "requierements.txt"
    COPY . .                                                    copie tout le dossier local dans le répertoire de travail
    ENTRYPOINT ["python", "server.py"]                          la commande par défaut qui sera exécutée quand on démarre le conteneur
    ```

- What is a Docker volume?
    - il permet la conservation des données en dehors du cycle de vie des conteneurs.

- Why do we use Docker volumes?
    - les containers docker sont éphéméres.
    - quand on supprime un conteneur, les données sont perdues. avec docker volume on peut conserver les données.

- What is the Docker network?
    - c'est un systéme de communication qui permet de aux conteneurs de communiquer entre eux ou à l'extérieur, tout en en gardant l'isolation.

- Why do we use the Docker network?
    - communication simplifiée entre les conteneurs.
    - les conteneurs au sein d'un même réseau peuvent se parler seulement en utilisant leurs noms de service au lieu de s adresses IP.

- What is a Docker image?
    - c'est un fichier exécutable qui contient tout le nécessaire pour exécuter une application.

- Why do we use Docker images?
    - elle est utilisée pour créer des conteneurs.