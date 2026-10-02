# TaskFlowAPI

<p>
API RESTful robusta para gestionar tareas de manera eficiente
</p>

### Para instalar y correr

>Instalar dependencias

```
npm install
```

>Correr proyecto

```
npm start
```

### Variables de entorno
```
MONGO_URI= MONGO_URI=mongodb://<DB_USER>:<DB_PASSWORD>@<CLUSTER_HOST_1>:27017,<CLUSTER_HOST_2>:27017,<CLUSTER_HOST_3>:27017/?ssl=true&replicaSet=<REPLICA_SET>&authSource=admin&appName=<APP_NAME>
MONGO_DB_NAME=tasksflow
MONGO_MAX_POOL_SIZE=10
PORT=3008
NODE_ENV=development
```



### Endpoints para manejar las tareas

>Para obtener todas las tareas
```
GET http://localhost:3008/api/tasks
```
>Para obtener tarea por id
```
GET http://localhost:3008/api/tasks/id
```
>Para crear tarea
```
POST http://localhost:3008/api/tasks
Body → raw → JSON:
{"titulo":"prueba","estado":"pendiente","prioridad":2,"dueDate":"2026-10-30","equipos":"id de equipo","asignado_a":"id de usuario a asignar" }'

```
>Para actualizar tarea
```
PUT  http://localhost:3008/api/tasks/id
Body → raw → JSON:
{"titulo":"prueba","estado":"en_progreso","prioridad":2,"dueDate":"2026-10-29","equipos":"id de equipo","asignado_a":"id de usuario a asignar"   }

```
>Para cambiar eliminar tarea
```
DELETE http://localhost:3008/api/tasks/id
```

### Endpoints para manejar los equipos

>Para obtener todos los equipos
```
GET http://localhost:3008/api/teams
```
>Para obtener equipo por id
```
GET http://localhost:3008/api/teams/id
```
>Para crear equipo
```
POST http://localhost:3001/order
Body → raw → JSON:
{ "nombre":"nuevo-equipo", "descripcion":"probando post de equipos" }

```

>Para actualizar equipo
```
PUT  http://localhost:3008/api/teams/id
Body → raw → JSON:
{"nombre":"nuevo-equipo2", "descripcion":"probando put de equipos"   }

```
>Para cambiar eliminar equipo
```
DELETE  http://localhost:3008/api/teams/id
```

### Endpoints para manejar los usuarios

>Para obtener todos los usuarios
```
GET http://localhost:3008/api/users
```
>Para obtener usuario por id
```
GET  http://localhost:3008/api/users/id
```
>Para crear usuario
```
POST http://localhost:3008/api/users
Body → raw → JSON:
{"nombre":"usuarioTest","email":"user@taskflow.com","teamId":"id de equipo a asignar","rol":"developer" }

```
>Para actualizar usuario
```
PUT http://localhost:3008/api/users/id
Body → raw → JSON:
{"nombre":"usuarioTest2","email":"user2@taskflow.com","teamId":"id de equipo a asignar","rol":"designer"   }

```
>Para cambiar eliminar usuario
```
DELETE  http://localhost:3008/api/users/id
```
