"use strict"

/**
 * Component Dialog
 *
 */


class Dialog {
    constructor(options) {
        this.options = options;

        this._eventHandler();
    }

    /**
     * eventHandler
     */

    _eventHandler() {

        document.addEventListener("click", this._dialogHandler.bind(this));
    }

    _dialogHandler(event) {
        if(event.target.getAttribute("data-component") === "dialog") {
            this.render();
        }

        if(event.target.closest("button")) {
            if(event.target.closest("button").getAttribute("data-dialog") === "close") {
                this.destruct();
            }
        }
    }

    render() {
        var self = this;
        var dialog = '<div class="dialog is-open">' +
            '<div class="dialog__container">' +
            '<button data-dialog="close" class="dialog__close" type="button" title="Close">' +
            '<span class="hidden">×</span>' +
            '<i class="fa fa-times"></i>' +
            '</button>' +
            '<div data-dialog="content" class="dialog__content">' +
            '</div>' +
            '</div>' +
            '</div>';

        var tpl = document.getElementById(self.options.templateId).innerHTML.trim();
        var dialogContent = _.template(tpl);

        document.body.classList.add("has-dialog");

        var data = customTbl.getDataRow(event.target);

        document.body
            .insertAdjacentHTML("beforeEnd", dialog);

        document.querySelector(".dialog__content")
            .insertAdjacentHTML("beforeEnd", dialogContent({data: data, index: event.target.closest("tr").dataset.index}));
    }

    destruct() {
        document.body.classList.remove("has-dialog");
        document
        console.log("destruct");
    }
}
