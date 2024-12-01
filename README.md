# Task Manager Application

This project is a **Task Manager Application**, designed to help users manage their daily tasks efficiently. The application allows users to create, view, update, and delete tasks with additional features like user authentication, task categorization, and task due date management. The project was initially built using **React.js** and has been migrated to **Vite** with **TypeScript** for better performance, developer experience, and maintainability.

---

## Features

### User Authentication:
- Supports user registration and login.
- Authenticates users using Firebase Authentication.

### Task Management:
- Add tasks with details such as title, description, and due date.
- Mark tasks as completed or undo completion.
- Delete tasks individually.

### Task Organization:
- Segregates tasks into "Active" and "Completed" categories.
- Allows users to toggle visibility of completed tasks.

### Account Management:
- Users can delete their accounts, which removes all associated tasks from Firebase.

### User Interface:
- Responsive and clean UI.
- Uses Material Icons for visual appeal.

---

## Technology Stack

### Frontend:
- **React.js**
- **TypeScript**
- **CSS** for custom styling

### Build Tool:
- **Vite** for faster builds and hot module replacement.

### Backend:
- **Firebase Realtime Database** for task storage.
- **Firebase Authentication** for user authentication.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
