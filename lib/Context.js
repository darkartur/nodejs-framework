var Class = require('./Class.js');

module.exports = new Class({

    constructor: function() {
        this.request = null;
        this.response = null;
    },

    setRequest: function(value) {
        this.request = value;
    },

    setResponse: function(value) {
        this.response = value;
    },

    execute: function() {

    }


});