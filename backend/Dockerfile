# Stage de build
FROM python:3.12-slim-bullseye AS builder

WORKDIR /app

# Installation des dépendances de build
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copie et installation des dépendances
COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt

# Stage final
FROM python:3.12-slim-bullseye

WORKDIR /app

# Variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

# Installation des dépendances runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copie des wheels du stage de build
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 8000

# Scripts de démarrage
COPY ./scripts/entrypoint.sh /entrypoint.sh
COPY ./scripts/start-dev.sh /start-dev.sh
COPY ./scripts/start-prod.sh /start-prod.sh

RUN chmod +x /entrypoint.sh /start-dev.sh /start-prod.sh

ENTRYPOINT ["/entrypoint.sh"]

# Commande par défaut (sera remplacée dans docker-compose)
CMD ["/start-dev.sh"]