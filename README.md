# Redes y Marketing — Página Web

Landing page de marketing digital de alto impacto para la marca **Redes y Marketing**.
Construida con **Next.js 14 (App Router) + Tailwind CSS**, con **SEO optimizado** (SSR, metadatos, sitemap, robots.txt y datos estructurados JSON-LD).

## Paleta y tipografía

| Elemento | Valor |
|---|---|
| Fondo principal | `#020202` (negro profundo) |
| Acento | `#f7651c` (naranja vibrante) |
| Acento 2 | `#ffec01` (amarillo energético) |
| Texto | `#fefcfd` (blanco) |
| Títulos | Space Grotesk (geométrico moderno) |
| Cuerpo | Inter (sans-serif limpia) |

## Estructura de la página

- **Hero**: logotipo, H1 "POTENCIAMOS TU PRESENCIA DIGITAL CON DISEÑO Y ESTRATEGIA", collage animado flotante de cards sociales, flyers y notificaciones, CTA "Quiero escalar mi marca".
- **¿QUÉ HACEMOS?**: dos columnas con iconos (Desarrollo Web y Gestión de Redes) y CTA "Ver Portafolio".
- **Adaptable a tu Nicho**: sistema de pestañas interactivas (Postres, Dojos & Gimnasios, Real Estate, Talleres Automotrices) que cambia las imágenes, el feed mockup y la estética en tiempo real.
- **SOBRE MÍ**: foto del creador en marco geométrico asimétrico + isologo circular.
- **Footer / CTA masivo**: "¿LISTO PARA DOMINAR TU MERCADO DIGITAL?" con botón gigante de gradiente "INICIAR ASESORÍA INMEDIATA" y enlaces sociales.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (http://localhost:3000)
npm run build     # build de producción
npm start         # servir el build de producción
```

## Imágenes

Todas las imágenes viven en `public/` y se referencian desde el código con `/nombre.jpg`. Para reemplazar una imagen, solo reemplaza el archivo en `public/` con el mismo nombre.

## Despliegue

### 1. Crear el repositorio en GitHub

1. Inicia sesión en **https://github.com**.
2. Clic en **+** (esquina superior derecha) → **New repository**.
3. Nombre del repositorio: **`WebRyM`** (o el que prefieras). Déjalo en **Public**.
4. NO marques "Add a README file" ni ".gitignore" (ya están en el proyecto).
5. Clic en **Create repository**.

Luego, desde la carpeta del proyecto, conecta el repositorio local (ya inicializado):

```bash
git remote add origin https://github.com/redesymarketting-web/WebRyM.git
git branch -M main
git push -u origin main
```

> Si pide credenciales: usa **Git Credential Manager**, que abrirá el navegador para iniciar sesión en GitHub. Alternativa: genera un token en GitHub → Settings → Developer settings → **Personal access tokens** → *Generate new token* (y úsalo como contraseña).

### 2. Desplegar en Vercel (desde el navegador, sin instalar nada)

1. Entra a **https://vercel.com** e inicia sesión (puedes usar tu cuenta de GitHub).
2. Clic en **Add New… → Project**.
3. Conecta/importa el repositorio **redesymarketting-web/WebRyM**.
4. Vercel detectará automáticamente **Next.js** (no cambies nada en Framework Preset).
5. Clic en **Deploy**.
6. Al terminar te dará una URL pública. La de este proyecto es: `https://web-ry-m.vercel.app`.

### Actualizar la URL en el SEO (importante)

La `SITE_URL` del proyecto ya apunta a `https://web-ry-m.vercel.app`.
Si alguna vez cambias la URL (dominio propio, etc.), actualiza estas ubicaciones:

- `app/layout.js` → `const SITE_URL = "https://TU-URL.vercel.app";`
- `app/sitemap.js` → `const SITE_URL = "https://TU-URL.vercel.app";`
- `app/robots.txt` → la línea de `Sitemap:`

Luego `git add . && git commit -m "update site url" && git push`, y Vercel se redesplegará solo.

### 3. (Opcional) Desplegar con Vercel CLI

```bash
npm i -g vercel
vercel login
vercel        # primer deploy (preview)
vercel --prod # producción
```

## Contacto del proyecto

- Marca: **@redesymarketting**
- Creador: Alan Flores (ver sección "Sobre mí" en la web)