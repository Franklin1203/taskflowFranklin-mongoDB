
# ---------- Etapa 1: compilar ----------

FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN  npm install
COPY . .

# Inyecta la url del backend para que quede en el codigo de react
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build


# ---------- Etapa 2: servir estáticos con Nginx ----------
#Usamos nginx como servidor web ligero para entregar el html y js al navegador
FROM nginx:1.27-alpine

# Configuraciones para garantizar compatibilidad y estabilidad con react
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos la carpeta dist que contiene el proyecto para ser usado
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80