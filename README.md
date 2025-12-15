# Note App (React + JSON Server)

Aplicación de notas con CRUD, búsqueda, filtros, gráficos y persistencia simulada en JSON Server.

Características
- CRUD completo (crear, leer, actualizar, eliminar)
- Marcar notas como importantes
- Búsqueda por texto (título y contenido)
- Filtros (todas / importantes)
- Gráficos estadísticos (notas totales vs importantes)
- Validación de formularios
- Persistencia usando `json-server` (archivo `db.json`)

Requisitos
- Node.js 18+ y npm

Instalación
```bash
git clone <tu-repo> && cd note-app
npm install
```

Ejecución (desarrollo)
```bash
npm run start
# O en dos terminales separados:
# npm run server   # arranca json-server en http://localhost:3001
# npm run dev      # arranca Vite en http://localhost:5173
```

Modo oscuro
- Usa el botón de tema (icono en la esquina superior derecha) para alternar entre claro y oscuro. La preferencia se guarda en `localStorage`.


Notas
- Si no quieres usar `concurrently`, ejecuta `npm run server` y `npm run dev` por separado.
- La API de ejemplo está en `db.json` y las rutas son `/notes`.

Estructura relevante
- `src/` componentes y lógica de app
- `db.json` datos simulados para `json-server`


Características adicionales
- Filtros dinámicos: selector de periodo (últimos 7/30/90 días) y filtro de importantes.
- Modal de detalles: clic sobre una nota abre un modal con contenido completo y acciones (editar, eliminar, marcar importante).
- Validaciones mejoradas: título obligatorio (max 100 caracteres), contenido (mín 5, max 1000), errores accesibles con `aria-describedby`.
- Tests: Vitest + Testing Library incluidos; ejecuta `npm test`.
