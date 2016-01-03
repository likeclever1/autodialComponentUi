/**
 * Component tableCustom create table from data
 * Set handlers event to table cells and component buttons
 * Update data
 * Send data to define url
 */

"use strict";
class TableCustom {

    constructor(options) {
        this.options = options;

        this._defineElements();
        this._setEvents();

        window.tableCustom = this;
    }

    /**
     * Define component dom elements
     * @private
     */
    _defineElements() {
        this.elements = {};
        this.elements.root = document.querySelector('[data-component="table-custom"]');
        this.elements.tbody = this.elements.root.querySelector('tbody');
        this.elements.btnEdit = document.querySelectorAll('[data-table-custom="edit-row"]');
        this.elements.btnDelete = document.querySelectorAll('[data-table-custom="delete-row"]');

    }

    _setEvents() {
        this.elements.root.addEventListener("dblclick", this._toggleEditableCell.bind(this));
        this.elements.root.addEventListener("blur", this._disableEditableCell.bind(this), true);

        this.elements.root.addEventListener("click", this._removeRow.bind(this));
    }

    /**
     * Toggle available edit for cell
     * @private
     */
    _toggleEditableCell(event) {

        if(event.target.tagName.toUpperCase() === "TD")  {

            if(event.target.hasAttribute("contenteditable")) {
                event.target.removeAttribute("contenteditable");
                event.target.classList.remove("editable");
            } else {
                event.target.setAttribute("contenteditable", "true");
                event.target.classList.add("editable");
            }
        }
    }

    /**
     * Disable editable for all cell inside table
     * @param event
     * @private
     */
    _disableEditableCell(event) {
        var cells = this.elements.root.querySelectorAll(".editable");

        for(var i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("contenteditable");
            cells[i].classList.remove("editable");
        }
    }

    /**
     * Remove table string with data UI.
     * @private
     */

    _removeRow(event) {

        if(event.target.dataset.tableCustom !== "delete-row") return;

            var row = event.target.closest("tr");
            console.log(row);
            row.parentNode.removeChild(row);

        // update data-index attribute for row
        this._updateRowIndex();
    }

    /**
     * add row to table
     * @param data array objects
     * data[item] - it's table row
     * example of data - [{name: 'Yuriy', surName: "Berezovskiy"}]
     */
    addRow(data) {
        // validate data

        var tpl = document.getElementById("table-row").innerHTML.trim();
        var tableRow = _.template(tpl);

        this.elements.tbody
            .insertAdjacentHTML("beforeEnd", tableRow({data: data}));

        this._updateRowIndex();
    }

    getDataRow(el) {
        var rowData = [];
        var theadElements = this.elements.root.querySelectorAll("thead th");
        var rowElements = el.closest("tr").querySelectorAll("td");

        for(var i = 0; i < theadElements.length - 1; i++) {
            var item = {};
            item[theadElements[i].innerHTML] = rowElements[i].innerHTML;

            rowData.push(item);
        }

        return rowData;
    }

    /**
     * Update row index for custom table
     * @private
     */
    _updateRowIndex() {
        for(var i = 0, len = this.elements.tbody.querySelectorAll("tr").length; i < len; i++ ) {
            this.elements.tbody.querySelectorAll("tr")[i].dataset.index = i;
        }
    }
}
