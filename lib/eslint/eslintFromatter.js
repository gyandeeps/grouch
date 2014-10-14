/**
 * @fileoverview Formatter for eslint object
 * @author Gyandeep Singh
 */

"use strict";

var path = require("path");

var html = "<!doctype html>" +
    "<html>" +
        "<head>" +
            "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>" +
            "<title>Eslint Report</title>" +
            "<link  rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>" +
            "<script type='text/javascript' src='https://code.jquery.com/jquery-1.11.1.min.js'></script>" +
            "<script type='text/javascript' src='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>" +
        "</head>" +
        "<body>" +
        "{{content}}" +
        "</body>" +
    "</html>";

/**
 * This function determines the message type and returns the corresponding string.
 * @param {Object} message The message produced from eslintOutput
 * @return {string} The string rendition of the message type
 **/
function getMessageType(message){
    if(message.fatal || message.severity === 2){
        return "Error";
    }
    else{
        return "Warning";
    }
}

/**
 * This function is exported as the HTMl output formatter for the esLint results.
 * @param {Object} results The results object generated from the ESLint run
 * @return {String} HTML for the generated page
 **/
module.exports = function(results){
    var output = "";
    var total = 0;
    var fileCount = 0;

    output += "<div class='panel-group' id='accordion'>";
    results.results.forEach(function(result){
        var messages = result.messages;
        var messageType;

        fileCount += 1;
        total += messages.length;

        output += "<div class='panel panel-default'>";
        output += "<div class='panel-heading'>";
        output += "<h4 class='panel-title'>";
        output += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + fileCount + "'>" + path.basename(result.filePath) + " <span class='text-muted'><small> (" + messages.length + " Problems)</small></span></a>";
        output += "</h4>";
        output += "</div>";
        output += "<div id='collapse" + fileCount + "' class='panel-collapse collapse'>";
        output += "<div class='panel-body'>";
        output += "<table class = 'table table-condensed table-hover'>";
        output += "<thead><tr><th>Line</th><th>Column</th><th>Type</th><th>Message</th><th>Rule</th></tr></thead>";
        messages.forEach(function(message){
            messageType = getMessageType(message);

            output += "<tr class='" + (messageType === "Error" ? "danger" : "warning") + "'>";
            output += "<td>" + (message.line || 0) + "</td>";
            output += "<td>" + (message.column || 0) + "</td>";
            output += "<td>" + messageType + "</td>";
            output += "<td>" + message.message + "</td>";
            output += "<td>" + (message.ruleId ? " (" + message.ruleId + ")" : "") + "</td>";
            output += "</tr>";
        });
        output += "</table>";
        output += "</div>";
        output += "</div>";
        output += "</div>";
    });
    output += "</div>";

    if(total > 0){
        output += "<div class='alert alert-danger' role='alert'>" + total + " problem" + (total !== 1 ? "s" : "") + "</div>";
    }
    else{
        output += "<div class='alert alert-success' role='alert'>Well Done!!!</div>";
    }

    return html.replace("{{content}}", output);
};
