

# Ejecutar

1. Clonar el repositorio
2. Instalar las dependencias `npm install `
3. Clonar el archivo `.env.example` y renombrarlo a `.env` y completar las variables de entorno en .env
4. Levantamos la base de datos ` docker compose up -d `
5. Generar el prisma client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`