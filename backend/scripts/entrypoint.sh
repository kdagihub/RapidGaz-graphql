#!/bin/bash

# Attendre que la base de données soit prête
echo "Attente de la base de données..."
sleep 5

# Appliquer les migrations
echo "Application des migrations..."
python manage.py migrate

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput

# Exécuter la commande fournie
exec "$@"