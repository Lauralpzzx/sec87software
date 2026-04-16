# 📘 Guía de Desarrollo - Dashboard SEP

¡Bienvenido a la nueva arquitectura base del proyecto! Con el fin de hacer este software escalable, organizado y fácil de mantener, hemos estructurado los archivos separando el código común (estilos, configuraciones y scripts) del código específico de cada vista.

---

## 📁 Estructura de Directorios

La estructura actual del proyecto está diseñada de la siguiente manera:

```text
c:\sec87software\
├── assets/                  # 🎨 Archivos estáticos y globales compartidos
│   ├── css/
│   │   └── style.css        # Estilos personalizados (clases específicas, animaciones, scrollbars)
│   └── js/
│       ├── tailwind-config.js # Variables y colores oficiales de Tailwind (Guinda, Dorado, tipografías)
│       └── main.js          # Scripts lógicos globales (Sidebar móvil, inicialización de gráficos)
├── pages/                   # 📄 Vistas y pantallas secundarias del sistema
│   ├── asistencias.html     # Módulo de pase de lista y escaneo QR
│   ├── busqueda.html        # Expedientes, reportes y motor de búsqueda
│   └── reportes.html        # Analytics, PDF y Tablero Cívico
├── index.html               # 🏠 Pantalla de entrada principal (Dashboard general)
└── GUIA_DESARROLLO.md       # Este archivo
```

---

## ⚙️ ¿Cómo funciona ahora?

Anteriormente, cada archivo `.html` tenía copiado en su interior toda la configuración de Tailwind, el código del menú lateral (sidebar) y los estilos de la barra de desplazamiento. **Ahora todo está unificado.**

1. **Configuración de Tailwind (`tailwind-config.js`)**
   Aquí residen los colores oficiales (`sepBurgundy`, `sepGold`, etc.) y las animaciones premium (`fade-in-up`, sombras `glow`). Si en el futuro deseas cambiar el tono de rojo, **solo lo cambias aquí** y se actualizará en TODAS las pantallas automáticamente.

2. **Estilos Globales (`style.css`)**
   Contiene todo el CSS puro y animaciones puntuales (como el láser del escáner en *asistencias* o las marcas de agua en impresión).

3. **Scripts Base (`main.js`)**
   Controla de forma global el comportamiento del menú lateral y de la barra superior. Solo tienes que asegurarte de enlazar este script al final del `<body>` de tus nuevos HTML.

---

## 🚀 ¿Cómo crear una nueva pantalla?

Si deseas agregar una nueva pantalla al sistema (por ejemplo: `calificaciones.html`), sigue estos pasos para asegurar que mantenga el diseño Premium:

1. **Crea un archivo nuevo** dentro de la carpeta `/pages/` (ej: `pages/calificaciones.html`).
2. **Copia la estructura base** de cualquiera de las páginas existentes (como `reportes.html`).
3. **Mantén las siguientes líneas** en la parte superior dentro del `<head>`:
   ```html
   <!-- Tailwind CSS CDN -->
   <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
   
   <!-- Enlaces a los Assets Globales -->
   <script src="../assets/js/tailwind-config.js"></script>
   <link rel="stylesheet" href="../assets/css/style.css">
   ```
4. **Mantén el enlace al script principal** justo antes de cerrar `</body>`:
   ```html
   <script src="../assets/js/main.js"></script>
   ```
5. ¡Diseña el área de contenido principal (`<main>`) usando las clases de Tailwind pre-configuradas!

### 📌 Sobre los Enlaces (`href`) relativos

Dado que tus plantillas secundarias viven en `/pages/`, si necesitas hacer un botón que regrese al Inicio, su enlace debe salir de la carpeta actual utilizando `../`:
- Desde `/pages/busqueda.html` al Inicio `index.html`: **`<a href="../index.html">`**
- Desde `/pages/busqueda.html` a `reportes.html`: **`<a href="reportes.html">`** (están en la misma carpeta)
- Desde el Inicio `index.html` a `busqueda.html`: **`<a href="pages/busqueda.html">`**

---

## 🌟 Clases Pre-diseñadas Listas Para Usar

Hemos configurado nombres de colores muy útiles e institucionales:
* `text-sepBurgundy` / `bg-sepBurgundy` (Color Guinda oficial).
* `text-sepGold` / `bg-sepGold` (Color Dorado oficial).
* `font-heading` (Fuente Outfit para títulos elegantes).
* `font-sans` (Fuente Inter para lectura de tablas y datos).
* `shadow-soft` (Sombra flotante suavizada, mejor que el estándar).
* `animate-fade-in-up` (Clase mágica que hace que los paneles aparezcan deslizándose suavemente hacia arriba al entrar).

¡Estás listo para continuar desarrollando módulos adicionales a nivel profesional!
