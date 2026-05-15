# MelaniApp — Backend

API REST para MelaniApp, plataforma SaaS de gestión para entrenadores personales.

## Stack
- **NestJS** + Express
- **Prisma ORM** + MySQL
- **JWT** (access token 15 min + refresh token 7 días)
- **class-validator** para DTOs

## Roles
| Rol     | Capacidades                                         |
|---------|-----------------------------------------------------|
| ADMIN   | Crear/gestionar trainers, ver toda la plataforma    |
| TRAINER | Gestionar sus alumnas, rutinas y logs               |
| CLIENT  | Registrar y ver sus propios datos                   |

---

## Instalación local

### 1. Requisitos previos
- Node.js >= 18
- MySQL corriendo localmente:
  - **XAMPP** (gratis): incluye MySQL + phpMyAdmin en localhost
  - **MySQL Community Server** (gratis): [mysql.com/downloads](https://dev.mysql.com/downloads/)

### 2. Clonar e instalar dependencias
```bash
git clone <repo-url>
cd melaniapp-backend
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env`:
```env
# XAMPP sin contraseña:
DATABASE_URL="mysql://root:@localhost:3306/melaniapp"

# MySQL con contraseña:
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/melaniapp"

JWT_SECRET="genera-un-string-aleatorio-largo"
JWT_REFRESH_SECRET="otro-string-aleatorio-diferente"
```

### 4. Crear la base de datos
En phpMyAdmin (XAMPP) o MySQL Workbench:
```sql
CREATE DATABASE melaniapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Ejecutar migraciones
```bash
npx prisma migrate dev --name init
```

### 6. Cargar datos de prueba (seed)
```bash
npm run prisma:seed
```

Usuarios creados:
| Rol     | Email                  | Password    |
|---------|------------------------|-------------|
| ADMIN   | admin@melaniapp.com    | Admin123!   |
| TRAINER | melani@trainer.com     | Melani123!  |
| CLIENT  | laura@gmail.com        | Laura123!   |
| CLIENT  | sofia@gmail.com        | Sofia123!   |

### 7. Iniciar servidor de desarrollo
```bash
npm run start:dev
```

API disponible en `http://localhost:3000`

---

## Endpoints

### AUTH `POST /auth/login`
```json
{ "email": "melani@trainer.com", "password": "Melani123!" }
```
Responde: `{ accessToken, refreshToken, user }`

> Si el trainer está inactivo (`active: false`), responde **403**.

| Método | Ruta            | Descripción                        |
|--------|-----------------|------------------------------------|
| POST   | /auth/login     | Login → tokens                     |
| POST   | /auth/refresh   | Renovar access token               |
| POST   | /auth/logout    | Revocar refresh token              |
| GET    | /auth/me        | Usuario autenticado (Bearer)       |

### USERS — Admin
| Método | Ruta                               | Descripción              |
|--------|------------------------------------|--------------------------|
| GET    | /users/trainers                    | Listar trainers          |
| POST   | /users/trainers                    | Crear trainer            |
| GET    | /users/trainers/:id                | Detalle + stats          |
| PATCH  | /users/trainers/:id/toggle-active  | Activar/desactivar       |
| GET    | /users/trainers/:id/clients        | Alumnas del trainer      |

### USERS — Trainer
| Método | Ruta               | Descripción             |
|--------|--------------------|-------------------------|
| GET    | /users/clients     | Mis alumnas             |
| POST   | /users/clients     | Crear alumna            |
| GET    | /users/clients/:id | Detalle de alumna       |

### ROUTINES — Trainer
| Método | Ruta                    | Descripción                         |
|--------|-------------------------|-------------------------------------|
| GET    | /routines               | Rutinas de todas mis alumnas        |
| GET    | /routines/client/:id    | Rutinas de una alumna               |
| POST   | /routines               | Crear rutina                        |
| DELETE | /routines/:id           | Eliminar rutina                     |
| POST   | /routines/:id/copy      | Copiar a otras alumnas              |

### WEIGHT LOGS — Trainer
| Método | Ruta                    | Descripción                  |
|--------|-------------------------|------------------------------|
| GET    | /weight-logs/:clientId  | Historial de peso (ASC)      |
| POST   | /weight-logs            | Registrar peso               |
| DELETE | /weight-logs/:id        | Eliminar registro            |

### WORKOUT LOGS — Trainer
| Método | Ruta                                  | Descripción                  |
|--------|---------------------------------------|------------------------------|
| GET    | /workout-logs/:clientId               | Historial de entrenos (DESC) |
| GET    | /workout-logs/:clientId/:date/:rId    | Log de un día específico     |
| PUT    | /workout-logs                         | Upsert log de entreno        |

---

## Comandos útiles

```bash
npx prisma studio          # Explorador visual de la BD
npx prisma migrate dev     # Nueva migración en dev
npx prisma generate        # Regenerar Prisma Client
npx prisma db push         # Push schema sin migración
npm run start:dev          # Servidor con hot-reload
```

## Probar la API
Instala la extensión **REST Client** en VSCode y abre `requests.http`.  
Cada bloque tiene un botón "Send Request" para ejecutar directamente.
