# Todo list using React + TypeScript

## How to run

1. Install dependencies:
```bash
npm install
```
2. Create .env using .env.template:
```bash
cp .env.template .env
```
3. Start the development server:
```bash
npm run dev
```
3. Run the backend:
```bash
npm run back
```

Project structure:
```
|   .env
|   .env.template
|   .gitignore
|   eslint.config.js
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   structure.txt
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|   
|           
+---backend
|       index.js
|       
|           
+---public
\---src
    |   App.tsx
    |   index.css
    |   main.tsx
    |   vite-env.d.ts
    |   
    +---components
    |       CreateTaskModal.tsx
    |       CustomSelect.tsx
    |       Task.tsx
    |       
    \---todo
            Todo.tsx
            

```