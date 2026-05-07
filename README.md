# Proyecto de Diseño Web II
Desarrollado por Josue Claros, Jose Manuel Callecusi, Fabricio Zeballos y Juan Pablo Medina.

# WebDesignII

WebDesignII es una plataforma web de subastas construida con React en el frontend y Node.js con Express y MySQL en el backend. El sistema permite registrar usuarios, administrar productos, crear subastas, pujar por productos de otros usuarios, recargar GanaCoins y consultar un perfil con saldo.

## Resumen funcional

La aplicación incluye estas funciones principales:

- Registro e inicio de sesión con JWT.
- Perfil de usuario con datos personales y saldo de GanaCoins.
- Recarga manual de saldo para pruebas.
- CRUD de productos.
- Creación de subastas asociadas a un producto.
- Duraciones de subasta en horas y minutos, permitiendo `0` horas y solo minutos.
- Pujas con validación de saldo suficiente.
- Extensión automática de la subasta cuando alguien puja al final del tiempo.
- Finalización automática de subastas con cobro al ganador y abono al vendedor.
- Eliminación de productos junto con sus subastas y ofertas relacionadas.
- Protección de rutas privadas en el frontend.

## Tecnologias

### Backend

- Node.js
- Express
- MySQL
- mysql2
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- nodemon para desarrollo

### Frontend

- React
- React Router
- Axios
- react-scripts

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

- Node.js 18 o superior.
- npm.
- MySQL 8 o superior.
- Un editor como VS Code.

## Instalacion

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd WebDesignII
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

En otra terminal:

```bash
cd frontend
npm install
```

## Variables de entorno

### Backend

Crear el archivo `backend/.env` con este contenido base:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=proyectodb
JWT_SECRET=una_clave_secreta_segura
NODE_ENV=development
```

### Recomendaciones

- No subas archivos `.env` al repositorio.
- Usa una clave JWT fuerte.
- Verifica que `DB_NAME` exista en MySQL antes de iniciar el backend.

## Base de datos

La base de datos contiene cuatro tablas principales:

- `usuarios`
- `productos`
- `subastas`
- `ofertas`

### Script base

```sql
CREATE DATABASE IF NOT EXISTS proyectodb;
USE proyectodb;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    saldo_ganacoins INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_fijo DECIMAL(10, 2),
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

### Migracion importante

Si tu tabla `productos` todavia tiene `stock`, eliminalo:

```sql
ALTER TABLE productos DROP COLUMN stock;
```

## Como funciona

### Autenticacion

- El usuario se registra o inicia sesion.
- El backend genera un token JWT.
- El frontend guarda el token y lo usa en cada peticion protegida.

### Productos

- Cada usuario gestiona sus propios productos.
- Se pueden crear, editar y eliminar productos.
- Al eliminar un producto, el backend elimina primero sus subastas y ofertas asociadas para evitar conflictos.

### Subastas

- El usuario selecciona un producto propio.
- Define precio inicial, precio minimo, duracion y extension automatica.
- La duracion puede configurarse con horas y minutos.
- Se permiten subastas de menos de una hora usando `0` horas y solo minutos.

### Pujas

- El usuario ingresa manualmente el monto.
- El sistema verifica que la puja sea mayor que la oferta actual.
- El sistema verifica que el usuario tenga saldo suficiente.
- Si alguien puja en los ultimos segundos, la subasta se extiende automaticamente.

### Cierre automatico

- Un proceso interno revisa subastas vencidas cada pocos segundos.
- Si existe ganador, se descuenta el saldo al comprador ganador.
- El mismo monto se acredita al vendedor del producto.
- La subasta se marca como inactiva.

### Perfil y saldo

- La opcion `Perfil` en el nav muestra los datos del usuario.
- Tambien muestra el saldo de GanaCoins.
- Desde ahi se puede recargar saldo de pruebas.

## Ejecucion en desarrollo

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

### URLs locales

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Build de produccion

### Frontend

```bash
cd frontend
npm run build
```

El backend esta configurado para servir el build del frontend desde `frontend/build`.

## Endpoints principales

### Usuarios

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| POST | `/api/usuarios/registro` | No | Registra un usuario nuevo |
| POST | `/api/usuarios/login` | No | Inicia sesion y devuelve JWT |
| GET | `/api/usuarios/saldo` | Si | Obtiene el saldo actual |
| POST | `/api/usuarios/saldo/agregar` | Si | Suma saldo al usuario autenticado |

### Productos

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| GET | `/api/productos` | Si | Lista los productos del usuario |
| POST | `/api/productos` | Si | Crea un producto |
| PUT | `/api/productos/:id` | Si | Actualiza un producto |
| DELETE | `/api/productos/:id` | Si | Elimina un producto |

### Subastas

| Metodo | Ruta | Proteccion | Descripcion |
| --- | --- | --- | --- |
| GET | `/api/subastas` | No | Lista subastas activas |
| GET | `/api/subastas/:id` | No | Obtiene el detalle de una subasta |
| POST | `/api/subastas` | Si | Crea una subasta |
| POST | `/api/subastas/:id/pujar` | Si | Realiza una puja |

## Flujo recomendado de uso

1. Inicia MySQL.
2. Crea la base de datos y tablas.
3. Configura `backend/.env`.
4. Ejecuta el backend.
5. Ejecuta el frontend.
6. Registra un usuario o inicia sesion.
7. Entra a `Perfil` para revisar o recargar GanaCoins.
8. Crea productos.
9. Crea subastas con duracion en horas o minutos.
10. Pujas desde el detalle de la subasta.

## Seguridad y buenas practicas

- No subas `backend/.env` ni `frontend/.env`.
- No publiques claves JWT ni credenciales de MySQL.
- Verifica que los archivos compilados del frontend no se modifiquen manualmente.
- Mantén separados los datos de desarrollo y produccion.

## Solucion de problemas

### El backend no inicia

- Verifica que MySQL este activo.
- Verifica que `JWT_SECRET` exista.
- Verifica que el puerto `5000` este libre.
- Revisa que las credenciales de MySQL sean correctas.

### El frontend no conecta

- Verifica que el backend este corriendo.
- Revisa el proxy en `frontend/package.json`.
- Abre la consola del navegador para ver errores de red.

### No aparecen cambios en produccion

- Ejecuta `npm run build` en `frontend`.
- Reinicia el backend.
- Confirma que el backend sirva `frontend/build`.

## Mantenimiento

Este proyecto ya no usa archivos de ejemplo de Create React App como tests base o Web Vitals, y se enfoca en la funcionalidad principal de subastas y billetera virtual.

## Autor

Proyecto de Diseño Web II desarrollado por Josue Claros, Jose Manuel Callecusi, Fabricio Zeballos y Juan Pablo Medina.
