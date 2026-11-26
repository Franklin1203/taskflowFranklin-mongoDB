# TaskFlow - Despliegue con Docker

<p>
Taskflow es una aplicación full stack para la gestión eficiente de tareas
</p>

### Requisitos previos

>Instalar Docker Desktop 

### Para levantar proyecto

>Clonar repositorio

```
git clone <URL_DE_TU_REPOSITORIO>
cd taskflowFranklin-mongoDB
```

>Reemplaza credenciales de archivo .env.example con las tuyas


### Construir y Levantar los Contenedores

```
docker compose up -d --build
```

### Verificar la Salud de los Servicios

```
docker compose ps
```

### Puertos y URLs para probarlo

```
Aplicación Web (Frontend): http://localhost:8080
```

```
Estado de la API (Healthcheck): http://localhost:3008/api/health
```

```
Conexión a MongoDB: mongodb://localhost:27017
```


### Comando para detener contenedores y borrar datos 

>Para apagar contenedor

```
docker compose down
```

>Para apagar contenedor y borrar datos

```
docker compose down -v
```
### Pipeline de CI/CD

>Integración Continua (CI) - En cada Pull Request hacia main

```
API (api-taskflow): instalación de dependencias, lint y tests
Frontend (frontend): instalación de dependencias, lint, tests y build
Docker: validación de construcción de imágenes 
Protección de rama: si algún check falla, se bloquea el merge a main
```

>Despliegue Continuo (CD) - Al hacer merge a main o crear un tag de versión

```
Construye y publica automáticamente las imágenes en paralelo (api y web)
En merge a main genera los tags: sha-<commit> y latest
Con un tag de Git (ej. v1.0.0) genera los tags de versión: 1.0.0 y 1.0
```

>Publicación de imágenes en GitHub Container Registry (GHCR)

```
API: ghcr.io/franklin1203/taskflow-api
Frontend: ghcr.io/franklin1203/taskflow-web
```

>Levantar el proyecto usando las imágenes publicadas en GHCR

```
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```


