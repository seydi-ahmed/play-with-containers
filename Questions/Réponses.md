
# Questions sur Docker et les Microservices

## 1. Qu'est-ce que les containers et quels sont leurs avantages ?
Les containers sont des environnements légers et isolés qui exécutent des applications. Ils partagent le même noyau mais sont indépendants. Avantages : portabilité, rapidité de déploiement, faible surcharge, isolation.

## 2. Quelle est la différence entre containers et machines virtuelles ?
Les containers partagent le même noyau du système d'exploitation, tandis que les machines virtuelles ont leur propre noyau et système d'exploitation complet, ce qui les rend plus lourdes.

## 3. Qu'est-ce que Docker et à quoi ça sert ?
Docker est une plateforme de gestion de containers. Elle permet de créer, déployer et exécuter des applications dans des containers, facilitant ainsi la portabilité et la gestion des environnements.

## 4. Qu'est-ce que l'architecture microservices ?
L'architecture microservices divise une application en petits services indépendants, chacun réalisant une fonction spécifique. Chaque service peut être développé, déployé et mis à l'échelle indépendamment.

## 5. Pourquoi utilisons-nous l'architecture microservices ?
Pour améliorer la scalabilité, faciliter les mises à jour indépendantes, augmenter la résilience et permettre un développement plus rapide et plus flexible.

## 6. Qu'est-ce qu'une queue et à quoi ça sert ?
Une queue (file d'attente) est une structure de données où les messages sont stockés et traités dans un ordre spécifique. Elle est utilisée pour gérer les tâches asynchrones, la distribution de messages entre services.

## 7. Qu'est-ce que RabbitMQ ?
RabbitMQ est un broker de messages open source qui permet de gérer les queues pour l'échange de messages entre applications distribuées.

## 8. Qu'est-ce qu'un Dockerfile ?
Un Dockerfile est un fichier texte contenant les instructions pour construire une image Docker, spécifiant les étapes nécessaires pour créer un container à partir d'une image de base.

## 9. Explique les instructions utilisées dans un Dockerfile.
- **FROM** : spécifie l'image de base.
- **RUN** : exécute une commande.
- **COPY** : copie des fichiers dans l'image.
- **WORKDIR** : définit le répertoire de travail.
- **CMD** : définit la commande à exécuter au lancement du container.
- **EXPOSE** : expose un port pour l'accès extérieur.

## 10. Qu'est-ce qu'un volume Docker ?
Un volume Docker est un mécanisme pour persister les données indépendamment des containers. Il permet de stocker des données en dehors des containers.

## 11. Pourquoi utilisons-nous les volumes Docker ?
Pour persister les données même après l'arrêt ou la suppression des containers, et pour partager des données entre containers.

## 12. Qu'est-ce qu'un réseau Docker ?
Un réseau Docker est un gestionnaire qui permet la connexion entre conteneurs.

## 13. Pourquoi utilisons-nous le réseau Docker ?
Pour permettre la communication sécurisée entre les containers et isoler leur trafic réseau, tout en facilitant la gestion des connexions.

## 14. Qu'est-ce qu'une image Docker ?
Une image Docker est un modèle qui contient tout le nécessaire pour exécuter une application.

## 15. Pourquoi utilisons-nous les images Docker ?
Les images Docker permettent de créer des containers reproductibles et portables, facilitant le déploiement d'applications dans n'importe quel environnement.