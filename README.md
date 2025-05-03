# RapidGaz - Documentation du Projet

## Présentation

RapidGaz est une application web et mobile pour la commande et la livraison de gaz. Elle permet aux clients de commander des produits de gaz auprès de différents vendeurs et de suivre leurs commandes en temps réel.

## Architecture du Projet

Le projet est structuré en deux parties principales :

### Backend (Django)
- Framework Django 5.0.2
- API GraphQL avec Graphene
- WebSockets avec Django Channels
- Tâches asynchrones avec Celery et Redis
- Base de données PostgreSQL

### Frontend (React Native avec Expo)
- Application mobile et web avec React Native et Expo
- Interface utilisateur responsive
- Communication en temps réel avec le backend

## Prérequis

- Docker et Docker Compose
- Git

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet pour le développement avec les variables suivantes :

```
# Base de données
DB_NAME=rapidgaz
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_HOST=db
DB_PORT=5432

# Django
SECRET_KEY=votre_cle_secrete
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
```

Pour la production, créez un fichier `.env.prod` avec des valeurs appropriées et `DEBUG=False`.

### Scripts de génération de de secret key:
python -c "import secrets; print('django-insecure-' + ''.join([secrets.choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50)]))"

## Démarrage du Projet

### Développement

1. Clonez le dépôt et accédez au répertoire du projet :

```bash
git clone <url_du_depot>
cd BOLT
```

2. Lancez les conteneurs Docker :

```bash
# Sur Windows (PowerShell)
$env:COMPOSE_BAKE="true"
docker-compose up -d

# Sur Windows (CMD)
set COMPOSE_BAKE=true
docker-compose up -d

```

3. Accédez à l'application :
   - Backend : http://localhost:8000
   - Frontend web : http://localhost:19006
   - Application mobile : Utilisez l'application Expo Go sur votre appareil mobile et scannez le QR code affiché dans la console

### Production

1. Lancez les conteneurs Docker en mode production :

```bash
docker-compose -f docker-compose.prod.yml up -d
```

2. Accédez à l'application :
   - Application web : http://votre-domaine.com
   - API : http://votre-domaine.com/graphql/

## Structure des Services Docker

### Développement (`docker-compose.yml`)

- **db** : Base de données PostgreSQL
- **redis** : Serveur Redis pour les WebSockets et les tâches Celery
- **backend** : Serveur Django utilisant Daphne pour gérer les requêtes HTTP et WebSockets
- **celery** : Worker Celery pour les tâches asynchrones
- **celery-beat** : Planificateur de tâches Celery
- **frontend** : Serveur de développement Expo pour l'application React Native

### Production (`docker-compose.prod.yml`)

- **db** : Base de données PostgreSQL
- **redis** : Serveur Redis
- **backend** : Serveur Django avec Daphne optimisé pour la production
- **celery** : Worker Celery
- **celery-beat** : Planificateur de tâches Celery
- **nginx** : Serveur web pour servir les fichiers statiques et faire office de proxy inverse

## Fonctionnalités Principales

- **Authentification utilisateur** : Inscription et connexion des clients et vendeurs
- **Catalogue de produits** : Affichage des produits de gaz disponibles par vendeur
- **Commandes** : Création et suivi des commandes
- **Notifications en temps réel** : Mises à jour instantanées des statuts de commande via WebSockets
- **Tâches planifiées** : Exécution de tâches récurrentes avec Celery Beat

## Développement

### Backend

Le backend est développé avec Django et utilise :
- GraphQL pour l'API (via Graphene-Django)
- Django Channels pour les WebSockets
- Daphne comme serveur ASGI
- Celery pour les tâches asynchrones

### Frontend

Le frontend est développé avec React Native et Expo, permettant de cibler à la fois les plateformes mobiles (iOS/Android) et web avec une base de code unique.

## Maintenance

### Logs

Pour consulter les logs des conteneurs :

```bash
# Tous les services
docker-compose logs

# Un service spécifique
docker-compose logs backend
```

### Migrations de base de données

Pour appliquer les migrations :

```bash
docker-compose exec backend python manage.py migrate
```

### Collecte des fichiers statiques

```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

## Déploiement

Le projet est configuré pour être déployé facilement en production à l'aide de Docker Compose. Utilisez le fichier `docker-compose.prod.yml` pour le déploiement en production.

        Too many current requests. Your queue position is 1. Please wait for a while or switch to other models for a smoother experience.


## Déploiment docker hub

Voici les commandes Docker à utiliser pour builder et pousser les images du backend et du frontend sur votre repository Docker Hub (remplacez `tagname` par le tag souhaité, par exemple `latest` ou `v1.0.0`) :

1. **Se placer à la racine du projet (BOLT)**

2. **Build de l’image backend :**
```bash
docker build -t djecker/rgaz-backend:latest ./backend
```

3. **Build de l’image frontend :**
```bash
docker build -t djecker/rgaz-frontend:latest ./frontend
```

4. **Connexion à Docker Hub (si ce n’est pas déjà fait) :**
```bash
docker login
```

5. **Push des images sur Docker Hub :**
```bash
docker push djecker/rgaz-backend:latest
```
```bash
docker push djecker/rgaz-frontend:latest
```

**Résumé :**
- Remplacez `tagname` par le tag désiré (ex : `latest`, `prod`, `v1.0.0`, etc.).
- Répétez ces étapes à chaque nouvelle version à publier.
- Assurez-vous d’être connecté à Docker Hub avant de pousser.

Si vous souhaitez builder et pousser en une seule commande pour chaque image :
```bash
docker build -t djecker/rgaz-backend:latest ./backend && docker push djecker/rgaz-backend:latest
```
```bash
docker build -t djecker/rgaz-frontend:latest ./frontend && docker push djecker/rgaz-frontend:latest
```

N’hésitez pas si vous souhaitez un script automatisé ou des conseils pour taguer vos images !

        