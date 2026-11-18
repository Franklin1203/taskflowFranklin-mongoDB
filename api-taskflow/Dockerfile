
# ---------- Etapa 1: dependencias de producción ----------

# Para indicar la version de imagen base    
FROM node:22-alpine AS deps 
WORKDIR /app

# Para hacer copia del package para reutilizar en caso de que no cambie
COPY package*.json ./ 

# Para que instale unicamente las dependencias necesarios para su funcionamiento
RUN npm ci --omit=dev && npm cache clean --force

# ---------- Etapa 2: imagen final ----------

FROM node:22-alpine

# Definimos el entorno de produccion
ENV NODE_ENV=production
WORKDIR /app

# para copiar el node modules de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# para copiar todo el codigo fuente de la api, respetando el .dockerignore 
COPY --chown=node:node . .

# para que la imagen oficial de node use usuario "node" en vez de "root" 
USER node

# para documentar el puerto del contenedor
EXPOSE 3008

# para que se ejecute cada vez que arranque el contenedor
CMD ["node", "src/server.js"]