/**
 * =========================================================
 * DataTable
 * =========================================================
 *
 * Componente reutilizable para generar tablas HTML
 * a partir de:
 *
 * 1. Una configuración de columnas.
 * 2. Un arreglo de objetos como fuente de datos.
 *
 * No depende de ningún framework.
 */

/**
 * Clase principal del componente.
 */
export class DataTable {
  /**
   * Constructor.
   *
   * @param {string|HTMLElement} selector
   * Elemento donde será renderizada la tabla.
   *
   * @param {Object} options
   * Configuración del componente.
   *
   * @param {Array} options.columns
   * Definición de las columnas.
   *
   * @param {Array} options.data
   * Datos que serán mostrados.
   */
  constructor(selector, options = {}) {
    this.container = this.resolveContainer(selector);
    this.columns = options.columns ?? [];
    this.data = options.data ?? [];
    this.validateConfiguration();
    this.render();
  }

  /** 
   *  Obtiene el elemento HTML donde será renderizada la tabla.
   */
  resolveContainer(selector) {

    if (selector instanceof HTMLElement) {
      return selector;
    }

    if (typeof selector !== "string") {
      throw new TypeError(
        "El selector debe ser un string " + "o un elemento HTML.",
      );
    }

    const element = document.querySelector(selector);
    // Si no existe, detenemos la ejecución.
    if (!element) {
      throw new Error(`No se encontró el elemento: ${selector}`);
    }

    return element;
  }

  /** 
   * Valida la configuración recibida. 
  */
  validateConfiguration() {
    
    if (!Array.isArray(this.columns) || this.columns.length === 0) {
      throw new TypeError("La propiedad 'columns' debe ser " + "un arreglo no vacío.");
    }

    // Validamos cada definición de columna.
    const invalidColumn = this.columns.some(
      (column) =>
        !column ||
        typeof column.key !== "string" ||
        column.key.trim() === "" ||
        typeof column.label !== "string",
    );

    if (invalidColumn) {
      throw new TypeError(
        "Cada columna debe contener las " + "propiedades 'key' y 'label'.",
      );
    }
    
    if (!Array.isArray(this.data)) {
      throw new TypeError("La propiedad 'data' debe ser un arreglo.");
    }
  }

  /** 
  * Construye y muestra la tabla. 
   */
  render() {
    this.container.replaceChildren();
    const table = document.createElement("table");
    table.className = "data-table";
    table.appendChild(this.createHeader());
    table.appendChild(this.createBody());
    this.container.appendChild(table);
  }

  /**
   * Construye <thead>.
   */
  createHeader() {
    const thead = document.createElement("thead");

    const row = document.createElement("tr");

    for (const column of this.columns) {
      const header = document.createElement("th");
      header.scope = "col";
      header.textContent = column.label;
      row.appendChild(header);
    }

    thead.appendChild(row);

    return thead;
  }

  /** 
   * Construye <tbody>. 
   */
  createBody() {
    const tbody = document.createElement("tbody");

    //Si no existen registros
    if (this.data.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.className = "empty-cell";
      cell.colSpan = this.columns.length;
      cell.textContent = "No hay datos disponibles.";
      row.appendChild(cell);
      tbody.appendChild(row);

      return tbody;
    }

    for (const item of this.data) {
      tbody.appendChild(this.createRow(item));
    }

    return tbody;
  }

  /** * Construye una fila <tr>.*/
  createRow(item) {
    const row = document.createElement("tr");

    for (const column of this.columns) {
      const cell = document.createElement("td");
      const value = item?.[column.key];
      cell.textContent = this.formatValue(value);
      if (column.key === "status") {
        this.applyStatusStyle(cell, value);
      }

      row.appendChild(cell);
    }

    return row;
  }

  /**
   * Normaliza los valores que serán
   * mostrados en la tabla.
   */
  formatValue(value) {

    if (value === null || value === undefined) {
      return "—";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  }

  /**
   * Aplica estilos visuales al estado.
   */
  applyStatusStyle(cell, value) {
    const normalizedValue = String(value ?? "").toLowerCase();

    if (normalizedValue === "activo") {
      cell.replaceChildren();
      const badge = document.createElement("span");
      badge.className = "status status-active";
      badge.textContent = "Activo";
      cell.appendChild(badge);
    }

    if (normalizedValue === "inactivo") {
      cell.replaceChildren();
      const badge = document.createElement("span");
      badge.className = "status status-inactive";
      badge.textContent = "Inactivo";
      cell.appendChild(badge);
    }
  }
}
