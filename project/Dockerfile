# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Stage final
FROM node:18-alpine

WORKDIR /app

# Copie des fichiers du stage de build
COPY --from=builder /app /app

# Exposition des ports
EXPOSE 19000
EXPOSE 19006

# Commande de démarrage
CMD ["npm", "run", "dev"]