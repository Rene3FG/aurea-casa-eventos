# AUREA — Casa de Eventos

Sitio estático (HTML + CSS + JS, sin frameworks ni build step) para el venue de bodas
AUREA, frente al Templo de Santo Domingo de Guzmán en Oaxaca.

Peso total del sitio: **~5.2 MB** (el ZIP original pesaba 89 MB).

## Estructura

```
index.html          página única, bilingüe (ES/EN)
css/style.css        estilos (basados en el diseño original, con @font-face reales en vez de base64)
js/i18n.js            diccionario de traducciones ES/EN
js/main.js            menú móvil, acordeón FAQ, filtro y lightbox de galería, envío de formulario, toggle de idioma
assets/               imágenes en WebP optimizadas + video comprimido
fonts/                Cardo (regular/bold/italic) en woff2
robots.txt, sitemap.xml
```

## Cómo probarlo en local

No requiere instalar nada. Desde esta carpeta:

```bash
python3 -m http.server 8080
```

y abre http://localhost:8080 en el navegador.

## Pendientes que requieren tus cuentas (no se pueden hacer desde aquí)

1. **Dominio**: registrar el dominio elegido (ej. en Cloudflare Registrar o Namecheap).
   El `index.html` tiene referencias a `https://www.aureaoaxaca.com/` como placeholder
   (canonical, Open Graph, JSON-LD, sitemap.xml, robots.txt) — reemplázalas por el
   dominio real una vez decidido.

2. **Hosting**: subir esta carpeta a **Cloudflare Pages** o **Vercel** (ambos gratis
   para este tamaño de sitio):
   - Sube esta carpeta a un repositorio de GitHub.
   - En Cloudflare Pages / Vercel: "Import project" → selecciona el repo →
     Framework preset: "None" / "Other" (es HTML estático, no hay build command,
     el output directory es la raíz `/`).
   - Conecta el dominio propio desde el panel del hosting una vez registrado.

3. **Formulario de contacto (FormSubmit)**: el formulario ya apunta a
   `https://formsubmit.co/aurea.casadeeventos@gmail.com`. La **primera vez** que
   alguien lo envíe (puedes hacerlo tú mismo de prueba), FormSubmit manda un correo
   de confirmación a `aurea.casadeeventos@gmail.com` — hay que abrirlo y confirmar
   una vez para que el formulario quede activo. Antes de esa confirmación, los
   envíos no llegarán.

4. **Analítica** (opcional pero recomendado): activa **Cloudflare Web Analytics**
   (gratis, sin cookies, no requiere banner de consentimiento) desde el panel de
   Cloudflare una vez el sitio esté ahí, o Google Analytics 4 si prefieres ese
   ecosistema.

5. **Google Business Profile**: crear/reclamar la ficha de "AUREA Casa de Eventos"
   en Google Maps con la misma dirección, teléfono y horario — ayuda mucho al SEO
   local y es gratis.

## Qué cambió respecto al ZIP original

- Imágenes convertidas a WebP con tamaños razonables: de 89 MB → 5.2 MB totales.
- `hero-mobile.jpg` (era de 3723×5584 px, 20 MB) redimensionada a un tamaño real de
  hero móvil.
- Los dos videos duplicados e idénticos (`film.mp4` / `AUREA PRINCIPAL 2.mp4`,
  19 MB cada uno) se comprimieron a un solo archivo de ~4 MB.
- Se eliminó la foto cruda sin usar (`IMG_7496.jpg`, 20 MB).
- El formulario de contacto ahora sí envía correo (antes no tenía `action`).
- Se agregó `<title>`, meta description, Open Graph, favicon, JSON-LD
  (`EventVenue`), `robots.txt` y `sitemap.xml` — nada de esto existía antes.
- El toggle ES/EN ahora traduce todo el contenido de verdad (antes era decorativo).
- Se eliminó la dependencia del runtime de React/Claude Design; es HTML/CSS/JS
  plano, cargable en cualquier hosting está́tico sin build step.

## Editar contenido

- Textos: edita `js/i18n.js` (hay un bloque `es` y uno `en`; las claves son las
  mismas en ambos).
- Imágenes de la galería: reemplaza los archivos en `assets/zona1-*.webp` /
  `zona2-*.webp` manteniendo el mismo nombre, o agrega nuevas y sus
  `<button class="gallery-card">` correspondientes en `index.html`.
