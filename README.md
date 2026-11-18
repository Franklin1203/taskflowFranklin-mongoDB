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



