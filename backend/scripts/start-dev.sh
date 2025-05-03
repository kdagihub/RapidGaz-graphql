#!/bin/bash

# Démarrer Daphne en mode développement
echo "Démarrage de Daphne en mode développement..."
daphne -b 0.0.0.0 -p 8000 config.asgi:application