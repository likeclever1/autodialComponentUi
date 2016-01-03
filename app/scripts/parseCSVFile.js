"use strict";
class addCSVList {
    constructor(options) {
        /**
         * Dom elements
         */
        this._componentRoot = options.componentRoot,
        this._btnFile = options.btnFile;
        this._btnSubmit = options.btnSubmit;
        this._btnRenderTable = options.btnRenderTable;

        /**
         * Input data typeFields
         * @type {inst.typeFields|*}
         * @private
         */
        this._typeFields = options.typeFields;

        this._inputData = [];
        this._correctData = [];

        /**
         * Event Listeners
         */
        this._btnFile.addEventListener('change', this._parseCSV.bind(this));
        this._btnSubmit.addEventListener('click', this._submitData.bind(this));
        this._btnRenderTable.addEventListener('click', this._renderTable.bind(this));

        /**
         * Config
         *
         * @type {{url: string, delimiterStr: string}}
         * @private
         */
        this._config = {
            url: "server.jpx",
            delimiterStr: "\n",
            delimiterChar: ","

        }
    }

    _parseCSV(event) {
        /**
         * This method must validate type file
         * work with exeption
         */
        var csv;
        var files = event.target.files;
        var fileObject = new FileReader();

        fileObject.readAsText(files[0]);

        fileObject.onload = function(file) {
            csv = file.target.result;

            for(var i = 0; i < csv.split(this._config.delimiterStr).length; ++i) {
                let str = csv.split(this._config.delimiterStr)[i];
                let item = [];

                for(var j = 0; j < str.split(this._config.delimiterChar).length; ++j) {
                    item.push(str.split(this._config.delimiterChar)[j]);
                }

                this._inputData.push(item);
            }
        }.bind(this);

        fileObject.onloadend = function() {
            this._renderListFields();
        }.bind(this);
    }

    _renderListFields(){
        var self = this;
        var tpl = document.getElementById("title-list").innerHTML.trim();
        var titleList = _.template(tpl);

        this._componentRoot
            .insertAdjacentHTML('beforeEnd', titleList({items: self._typeFields, options: self._inputData[0]}));
    }
    /**
     * Render table with data from csv file
     */
    _renderTable(event){
        var self = this;
        var tpl = document.getElementById("table-list").innerHTML.trim();
        var tableList = _.template(tpl);


        self._updateData();

        if(self._componentRoot.querySelector("#customUserTableFromCSV")) {

            self._componentRoot.querySelector("#customUserTableFromCSV")
                .parentNode
                    .removeChild(self._componentRoot.querySelector("#customUserTableFromCSV"))
            ;
        }

        self._componentRoot
            .insertAdjacentHTML("beforeEnd", tableList({title: self._userDataStyle, data: self._correctData}));

    }

    _updateData(){
        this._setUserDataStyle();
    }

    /**
     * Create data style, from user selection
     */
    _setUserDataStyle() {
        this._userDataStyle = [];

        let userSelections = this._componentRoot.querySelectorAll(".field-select");

        for(let i = 0; i < userSelections.length; i++ ) {
            var optionSelected = userSelections[i].children[userSelections[i].selectedIndex];

            if(!optionSelected.dataset.index) continue;
                this._userDataStyle.push({
                    index: optionSelected.dataset.index,
                    id: userSelections[i].dataset.field,
                    title: userSelections[i].dataset.title
                });
        }

        if(Object.keys(this._userDataStyle).length) {
            this._prepareData();
        } else {
            this._correctData = [];
        }
    }

    /**
     * Improve data according to user selection, [{}, {}, ..., {}]
     */
    _prepareData() {

        this._correctData = [];

        for(let i = 0; i < this._inputData.length; i++) {
            var item = {};
            for(let j = 0; j < this._inputData[i].length; j++) {
                for(var k = 0; k < this._userDataStyle.length; k++) {
                    if(j === +this._userDataStyle[k].index) {
                        item.index = j;
                        item[this._userDataStyle[k].id] = this._inputData[i][j];
                    }
                }
            }
            if(Object.keys(item).length) {
                this._correctData.push(item);
            }
        }
        console.log(this._correctData);
    }

    /**
     * Submit data to server
     */
    _submitData(event) {
        let xhr = new XMLHttpRequest();
        let data = {data: JSON.stringify(this._correctData)};

        xhr.open("POST", this._config.url, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // ajax handler
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            alert( this.responseText );
        };

        xhr.send(data);
    }
}
