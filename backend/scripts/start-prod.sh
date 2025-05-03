#!/bin/bash

# Démarrer Daphne en mode production
echo "Démarrage de Daphne en mode production..."
daphne -b 0.0.0.0 -p 8000 config.asgi:application --access-log - --proxy-headers