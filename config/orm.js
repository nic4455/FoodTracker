var connection = require("./connection.js");

function printQuestionMarks(number) {
    var array = [];

    for (var i = 0; i < number; i++) {
        array.push("?");
    }

    return array.toString();
}

function objectToSql(object) {
    var array = [];

    for (var key in object) {
        var value = object[key];

        if (Object.hasOwnProperty.call(object, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";

            }

            array.push(key + "=" + value);
        }
    }

    return array.toString();
}

var orm = {
    all: function (tableInput, callback) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    },

    update: function (tableInput, id, callback) {
        var queryString = ("UPDATE " + tableInput + " SET devoured=true WHERE id = (?) ;");
        console.log(queryString);
        connection.query(queryString, [id], function (error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    },

    create: function (tableInput, columns, nameValues, calorieValues, callback) {
        var queryString = "INSERT INTO " + tableInput;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(nameValues.length) + " , " + printQuestionMarks(calorieValues.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, nameValues, calorieValues, function(error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    }
};

module.exports = orm;