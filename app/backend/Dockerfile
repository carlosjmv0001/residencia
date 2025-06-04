FROM node:18-alpine AS development
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
#COPY env.template .env
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=development /app/package*.json ./
COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/next.config.ts ./

# Script para substituir variáveis de ambiente em runtime
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'envsubst < env.template > .env' >> /docker-entrypoint.sh && \
    echo 'exec "$@"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]