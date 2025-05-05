# 🎨 Museos y Obras de Arte

Aplicación web desarrollada con **Node.js**, **Express**, **EJS** y **PostgreSQL**, que permite gestionar museos y sus obras de arte asociadas.

## 🚀 Funcionalidades

- Crear, editar y eliminar museos
- Crear, editar y eliminar obras de arte
- Asociar una obra de arte a un museo
- Validación para evitar eliminar museos con obras asociadas
- Subida de imágenes con Multer
- Renderizado de vistas con EJS y Bootstrap

## 🛠 Tecnologías

- Node.js + Express
- Sequelize (ORM)
- PostgreSQL
- EJS (vistas)
- Multer (subida de imágenes)
- Bootstrap 5

## ⚙️ Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con las siguientes variables:

   ```
   DB_USER=...
   DB_PASSWORD=...
   DB_NAME=...
   DB_HOST=...
   DB_PORT=5432
   PORT=3000
   ```

4. Ejecuta el proyecto:

   ```bash
   node index.js
   ```

## ☁️ Despliegue en Render

Este proyecto está listo para ser desplegado en https://crud-museo.onrender.com . Asegúrate de configurar las variables de entorno en el panel de tu servicio.

---

Desarrollado como práctica de integración de CRUD, ORM y despliegue en la nube.
