Sistema de Gestión de Inventario

¡Bienvenido al repositorio del Sistema de Gestión de Inventario, una aplicación web diseñada para facilitar la administración de una tienda de ropa! Este proyecto utiliza tecnologías modernas para gestionar inventario, ventas, facturación y clientes de manera eficiente. La aplicación está desplegada y puede ser accedida en https://sistema-de-gestion.vercel.app/.

Descripción del Proyecto

Este sistema ha sido desarrollado como una solución integral para tiendas de ropa, permitiendo a los usuarios registrar productos (con detalles como tallas, colores y cantidades), procesar ventas, generar facturas, y gestionar información de clientes.

Con una interfaz intuitiva y un backend robusto, el proyecto está orientado a optimizar las operaciones diarias y ofrecer un control detallado del inventario. Incluye:

Autenticación segura

Páginas protegidas

Funcionalidades personalizables para adaptarse a las necesidades de la tienda


Tecnologías Utilizadas

Frontend: Next.js con TypeScript para una experiencia de desarrollo escalable y tipado seguro.

Estilos: CSS personalizado con soporte para Tailwind CSS (vía utilidades como cn.ts).

Backend: Supabase para la gestión de la base de datos, autenticación y almacenamiento de datos.

Despliegue: Vercel para alojar la aplicación de forma rápida y eficiente.


Estructura del Proyecto

1. Carpeta components

Contiene los componentes reutilizables que forman la interfaz de usuario:

componentes-cliente: Gestiona la información de clientes (registro, edición, listas).

componentes-facturación: Herramientas para generar y visualizar facturas con detalles de productos y totales.

componentes-inicio: Dashboard principal con resúmenes de inventario y ventas.

componentes-inventario: Administra el stock de ropa (agregar productos, actualizar cantidades, alertas de stock bajo).

componentes-ventas: Procesa transacciones, carritos de compra y historiales de ventas.

landing-page: Componentes para la página de bienvenida o marketing.

tutorial: Guías interactivas para los usuarios.

typography y ui: Estilos de texto y componentes de interfaz genéricos.

Archivos sueltos (ej. AddPlayerButton.tsx, dashboard-navbar.tsx): Botones, barras de navegación, etc.


2. Carpeta app

Organiza las páginas y la lógica de la aplicación:

(auth-pages): Páginas de autenticación (login, registro, recuperación).

auth: Lógica auxiliar para la autenticación.

countries: Datos o configuraciones relacionadas con envíos internacionales.

notes: Notas internas del desarrollador.

protected: Rutas protegidas (ej. inventario, reportes).

ui: Componentes de interfaz específicos de app.

actions.ts: Funciones del lado del servidor o cliente.

globals.css: Estilos globales de la aplicación.

layout.tsx: Estructura general de las páginas.

page.tsx: Página principal o de inicio.


3. Carpeta utils

Alberga utilidades reutilizables:

supabase: Configuración e interacciones con Supabase (base de datos, autenticación).

cn.ts: Utilidad para clases condicionales (Tailwind CSS).

utils.ts: Funciones generales (formateo, validaciones).


Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:



git clone https://github.com/carlos5845/tienda-ofi.git
cd tienda-ofi

2. Instala las dependencias: Asegúrate de tener Node.js instalado. Luego, ejecuta:



npm install

3. Configura las variables de entorno: Crea un archivo .env.local y agrega las claves necesarias para Supabase. Ejemplo:



NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anónima

4. Inicia el proyecto:



npm run dev

Abre tu navegador en http://localhost:3000 para ver la aplicación.

Uso

Autenticación: Regístrate o inicia sesión para acceder a las funcionalidades protegidas.

Gestión de Inventario: Agrega productos con detalles como tallas y colores, y monitorea el stock en tiempo real.

Procesamiento de Ventas: Usa el carrito de compras para registrar ventas y genera facturas automáticamente.

Reportes: Consulta el dashboard para obtener resúmenes de actividad.


Despliegue

El proyecto está desplegado en Vercel y accesible en https://sistema-de-gestion.vercel.app/.

Para desplegar tu propia versión:

1. Conecta el repositorio a Vercel.


2. Configura las variables de entorno en el panel de Vercel.


3. Despliega la aplicación con un solo clic.



Contribuciones

Si deseas contribuir, por favor abre un issue o envía un pull request con tus mejoras.

Agradecemos sugerencias para agregar funcionalidades como:

Reportes de ventas por temporada

Integraciones con pasarelas de pago



---

Gracias por tu interés en el proyecto.

