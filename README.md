# Kodigo Bootcamps (Frontend con React + Firebase)

Este proyecto es una aplicación web desarrollada en **React** que consume datos desde **Firebase** (Authentication + Firestore).  
Fue creado como parte de una práctica para implementar autenticación, manejo de roles y CRUD básico.

---

## 🚀 Funcionalidades principales

- **Página de inicio (Home):** muestra los bootcamps disponibles de manera pública.  
- **Autenticación:** los usuarios pueden:
  - Crear una nueva cuenta.
  - Iniciar sesión con email y contraseña.
- **Dashboard:** cada usuario puede acceder a los bootcamps activos.  
- **Administrador:** solo el usuario administrador puede:
  - Crear bootcamps.
  - Editar y eliminar bootcamps existentes.
  - Activar o desactivar bootcamps para que se muestren (o no) al público.

---

## 👤 Usuario administrador

- **Correo admin:** `cristart.hernandezf@gmail.com`  
- **Contraseña:** `123456`  
- Este usuario tiene permisos exclusivos para agregar, editar y borrar bootcamps.  
- Otros usuarios registrados solo pueden ver los cursos activos.

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/) con Vite  
- [Firebase Authentication](https://firebase.google.com/)  
- [Cloud Firestore](https://firebase.google.com/docs/firestore)  
- [React Router](https://reactrouter.com/)  
- [React Hook Form](https://react-hook-form.com/)