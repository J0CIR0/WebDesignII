# WebDesignII

Plataforma web de subastas desarrollada con React en el frontend y Node.js con Express en el backend. El sistema permite registrar usuarios, iniciar sesion, administrar productos, crear subastas y realizar pujas.

## Contenido

- Descripcion general
- Caracteristicas
- Tecnologias
- Estructura del proyecto
- Requisitos previos
- Configuracion del entorno
- Configuracion de la base de datos
- Instalacion y ejecucion
- Variables de entorno
- Endpoints de la API
- Flujo de uso
- Solucion de problemas

## Descripcion general

WebDesignII es una aplicacion full stack orientada a subastas. El frontend consume una API REST y maneja autenticacion con token JWT almacenado en el navegador. El backend expone rutas para usuarios, productos y subastas, y se conecta a MySQL usando mysql2.

## Caracteristicas

- Registro e inicio de sesion de usuarios
- Autenticacion con JWT
- Perfil con saldo de GanaCoins
- CRUD de productos
- Creacion y visualizacion de subastas
- Realizacion de pujas
- Proteccion de rutas en el frontend

## Tecnologias

### Backend
- Node.js
- Express
- MySQL
- mysql2
- jsonwebtoken
- bcryptjs
- dotenv
- cors

### Frontend
- React
- React Router
- Axios
- React Scripts

## Estructura del proyecto

```text
WebDesignII/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── src/config/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

## Requisitos previos

- Node.js 18 o superior
- npm
- MySQL 8 o superior
- Git opcional para clonar el repositorio

## Configuracion del entorno

El proyecto se divide en dos aplicaciones independientes:

- `backend/` para la API
- `frontend/` para la interfaz web

Debes abrir dos terminales durante el desarrollo, una para cada parte.

## Configuracion de la base de datos

Crea una base de datos llamada `proyectodb` y luego ejecuta el siguiente SQL en MySQL Workbench, phpMyAdmin o tu cliente SQL favorito.

```sql
CREATE DATABASE IF NOT EXISTS proyectodb;
USE proyectodb;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    saldo_ganacoins INT DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_fijo DECIMAL(10, 2),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subastas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    precio_inicial DECIMAL(10, 2) NOT NULL,
    precio_minimo DECIMAL(10, 2),
    oferta_actual DECIMAL(10, 2),
    duracion_horas INT,
    tiempo_extra_minutos INT DEFAULT 5,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    activa BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ofertas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subasta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subasta_id) REFERENCES subastas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

## Instalacion y ejecucion

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Configurar el archivo de entorno del backend

Crea o edita `backend/.env` con estos valores:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=proyectodb
JWT_SECRET=una_clave_secreta_segura
NODE_ENV=development
```

Notas importantes:
- `JWT_SECRET` no debe quedar vacio.
- Evita dejar espacios despues del signo igual.
- `DB_NAME` debe coincidir con la base de datos que creaste.

### 3. Iniciar el backend

```bash
cd backend
npm run dev
```

El servidor debe quedar disponible en:

```text
http://localhost:5000
```

### 4. Instalar dependencias del frontend

Abre otra terminal y ejecuta:

```bash
cd frontend
npm install
```

### 5. Iniciar el frontend

```bash
cd frontend
npm start
```

La aplicacion debe abrirse en:

```text
http://localhost:3000
```

## Variables de entorno

### Backend

| Variable | Descripcion | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto del backend | `5000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contrasena de MySQL | `tu_contraseña` |
| `DB_NAME` | Nombre de la base de datos | `proyectodb` |
| `JWT_SECRET` | Clave para firmar tokens | `una_clave_secreta_segura` |
| `NODE_ENV` | Entorno de ejecucion | `development` |

### Frontend

El frontend usa `frontend/package.json` con proxy a la API:

```json
"proxy": "http://localhost:5000"
```

## Endpoints de la API

### Usuarios

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| `POST` | `/api/usuarios/registro` | No | Registra un nuevo usuario |
| `POST` | `/api/usuarios/login` | No | Inicia sesion y devuelve un token |
| `GET` | `/api/usuarios/saldo` | Si | Obtiene el saldo del usuario autenticado |

### Productos

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| `GET` | `/api/productos` | Si | Lista los productos del usuario autenticado |
| `POST` | `/api/productos` | Si | Crea un producto nuevo |
| `PUT` | `/api/productos/:id` | Si | Actualiza un producto |
| `DELETE` | `/api/productos/:id` | Si | Elimina un producto |

### Subastas

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| `GET` | `/api/subastas` | No | Lista las subastas activas |
| `GET` | `/api/subastas/:id` | No | Obtiene el detalle de una subasta |
| `POST` | `/api/subastas` | Si | Crea una subasta |
| `POST` | `/api/subastas/:id/pujar` | Si | Realiza una puja |

## Flujo de uso

1. Ejecuta MySQL.
2. Inicia el backend con `npm run dev` dentro de `backend/`.
3. Inicia el frontend con `npm start` dentro de `frontend/`.
4. Abre `http://localhost:3000`.
5. Registra un usuario nuevo o inicia sesion.
6. Crea productos desde la seccion de productos.
7. Crea subastas para tus productos.
8. Participa en subastas y realiza pujas.

## Solucion de problemas

### El backend no inicia

- Verifica que el archivo `backend/.env` exista.
- Verifica que MySQL este ejecutandose.
- Verifica que `DB_NAME` exista en la base de datos.
- Verifica que `JWT_SECRET` tenga un valor valido.

### El frontend muestra error de conexion

- Verifica que el backend este corriendo en `http://localhost:5000`.
- Verifica que el proxy del frontend apunte al backend.
- Abre la consola del navegador y revisa errores de red.

### Error de autenticacion

- Borra el token y el usuario guardados en `localStorage`.
- Vuelve a iniciar sesion.
- Revisa que el token JWT no haya expirado.

### Error de MySQL

- Confirma que el usuario de MySQL tenga permisos sobre `proyectodb`.
- Verifica que las tablas se hayan creado correctamente.
- Revisa que el host, usuario y contrasena sean correctos.

## Notas de desarrollo

- El backend usa autenticacion basada en JWT.
- El frontend protege rutas privadas con contexto de autenticacion.
- La API se consume desde el frontend usando Axios.
- El proyecto esta preparado para correr localmente en dos terminales separadas.

## Autor

Proyecto desarrollado por Papu.

## Licencia

Uso libre para fines educativos y de desarrollo local.
