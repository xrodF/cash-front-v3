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

- [theme.tsx](./src/components/layout/theme.tsx)
