# Vainitas Cool — versión funcional

## Qué incluye
- Login privado con contraseña.
- Dashboard interactivo.
- Navegación real entre Dashboard, Productos, Flete y costos, Escenarios y Configuración.
- Agregar, editar y eliminar productos.
- Buscar y filtrar catálogo.
- Simulador de ventas.
- Configuración editable de capital, flete y otros gastos.
- Cálculos automáticos.
- Persistencia local en el navegador.

## Importante para Vercel
Antes de usar el login, crea una variable de entorno:

ADMIN_PASSWORD = la contraseña que quieras usar

En Vercel:
Project → Settings → Environment Variables → Add New

Luego redeploy.

## Persistencia
Esta versión guarda productos y configuración en localStorage del navegador.
Eso significa que funciona sin base de datos, pero los cambios no se comparten entre distintos dispositivos.
