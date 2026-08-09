/**
 * =========================================================
 * APP
 * =========================================================
 *
 * Punto de entrada de la aplicación.
 *
 * Aquí se define:
 *
 * - Qué columnas tendrá la tabla.
 * - Qué información será mostrada.
 * - Dónde se inicializa el componente.
 */


/*
 * Importamos el componente DataTable.
 */
import { DataTable } from "./components/DataTable.js";


/* =========================================================
   CONFIGURACIÓN DE COLUMNAS
   ========================================================= */

/*
 * Cada columna tiene:
 *
 * key   -> propiedad existente en el JSON.
 * label -> texto mostrado al usuario.
 */

const columns = [

    {
        key: "id",
        label: "ID"
    },

    {
        key: "name",
        label: "Nombre"
    },

    {
        key: "email",
        label: "Correo electrónico"
    },

    {
        key: "role",
        label: "Rol"
    },

    {
        key: "status",
        label: "Estado"
    }
];


/* =========================================================
   DATOS
   ========================================================= */

/*
 * En esta primera versión los datos
 * están definidos directamente en JavaScript.
 *
 * Posteriormente podrían provenir de:
 *
 * - una API REST
 * - un archivo JSON
 * - LocalStorage
 * - otro componente
 * - etc.
 */

const data = [

    {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        role: "Administrador",
        status: "Activo"
    },

    {
        id: 2,
        name: "María López",
        email: "maria.lopez@example.com",
        role: "Analista",
        status: "Activo"
    },

    {
        id: 3,
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@example.com",
        role: "Desarrollador",
        status: "Inactivo"
    },

    {
        id: 4,
        name: "Ana Martínez",
        email: "ana.martinez@example.com",
        role: "Diseñadora",
        status: "Activo"
    },

    {
        id: 5,
        name: "Laura Gómez",
        email: "laura.gomez@example.com",
        role: "Desarrolladora",
        status: "Activo"
    }
];


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

/*
 * Creamos una instancia del componente.
 *
 * DataTable se encargará de:
 *
 * 1. Encontrar #data-table.
 * 2. Validar columns.
 * 3. Validar data.
 * 4. Crear la tabla.
 * 5. Crear encabezados.
 * 6. Crear filas.
 * 7. Insertar la tabla en el DOM.
 */

new DataTable("#data-table", { columns,
    data
});