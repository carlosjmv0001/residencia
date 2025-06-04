FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=development /app/package*.json ./
COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/next.config.ts ./

# Script para substituir variáveis de ambiente
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]