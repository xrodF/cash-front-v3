# Caja V3 - Frontend

> **Versión:** 1.0.0

Guía de primeros pasos y configuraciones para levantar el proyecto y personalizarlo según las necesidades del cliente.

---

## 🚀 Instalación y ejecución

```sh
# Instalar pnpm globalmente (en caso de no tenerlo)
npm install -g pnpm

# Instalar dependencias del proyecto
pnpm install

# Iniciar el proyecto en entorno local
pnpm dev
```

## ⚙️ Variables de entorno

En la raíz del proyecto encontrarás un archivo de plantilla para las variables de entorno:

- [.env.template](./.env.template)
  → Debes copiarlo y renombrarlo como [.env](./.env)
- Luego remplaza los valores de las variables por los que corresponden

## 🖼️ Logo del cliente

Para usar un logo personalizado, guarda el archivo en la carpeta [public](./public) con el nombre:

> `logo.svg`

Si el archivo no está en formato `.svg`, debes modificar las importaciones en los siguientes archivos:

- [Navbar](./src/components/layout/components/Navbar.tsx)
- [Login](./src/pages/login/index.tsx)

Ejemplo de cambio:

```ts
/* Antes */
import logo from "/logo.svg";

/* Después */
import logo from "/logo.png";
```

## 🎨 Tema global

Si deseas modificar los estilos globales de la aplicación, puedes hacerlo en el archivo:

- [Theme](./src/components/layout/theme.tsx)

## 📲 PWA y sus iconos

### PWA

Para personalizar nombre de la PWA debe modificar los campos respectivos en el archivo [Manifest](./public/manifest.json)

```json
{
  "name": "Nombre PWA",
  "short_name": "Nombre corto PWA",
  ...
}
```

### Iconos

Para usar un icono personalizado, debe remplazar los archivo en la carpeta [public](./public) conservando sus respectivos tamaños y nombres:

> `pwa-192x192.png` > `pwa-192x192.png`

Si el archivo no está en formato `.png` y/o tiene otro nombre, debes modificar las importaciones/referencias en los siguientes archivos:

- [Manifest](./public/manifest.json)
- [Service Worker](./src/sw.js)
