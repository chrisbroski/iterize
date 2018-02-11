/*jslint regexp: true */

function iterize(definition) {
    "use strict";

    var validIntegerRegex = /^([+\-]?[1-9]\d*|0)(,[+\-]?[1-9]\d*|0)?...([+\-]?[1-9]\d*|0)$/,
        validLetterRegex = /^([^\s])(,[^\s])?...([^\s])$/;

    // Polyfill from MDN for IE
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

    function isStringInteger(s) {
        var n = Math.floor(Number(s));
        return n !== Infinity && String(n) === s;
    }

    function incrAwayFromStart(num, step) {
        if (step < 0) {
            return num - 1;
        }
        return num + 1;
    }

    function charOrInt(val, character) {
        if (character) {
            return String.fromCharCode(val);
        }
        return val;
    }

    function intFrom(val, character) {
        if (character) {
            return val.charCodeAt(0);
        }
        return parseInt(val, 10);
    }

    function generateArray(start, end, step, character) {
        var ii, a = [];
        for (ii = start; (step < 0 && ii > end) || (step > 0 && ii < end); ii += step) {
            a.push(charOrInt(ii, character));
        }
        return a;
    }

    function isValidDef(def) {
        /*
        def can be:
            a single, non-zero integer
            a string with the following properties:
                evaluates to a single, non-zero integer "5"
                - or -
                two integers separated by an ellipses "1...5"
                - or -
                three integers - separated first by a comma, then an ellipses "1,3...7"
        */

        // Accept single integer argument
        if (def === 0) {
            throw "iterize description, if a single integer, must be non-zero.";
        }
        if (Number.isInteger(def)) {
            return true;
        }

        // If it isn't an integer, it better be a string
        if (typeof def !== 'string') {
            throw "iterize description must be a string or single integer.";
        }

        // Remove spaces
        def = def.replace(/\s/g, "");

        // A single non-zero integer string is also OK
        if (def === "0") {
            throw "iterize description, if a single integer, must be non-zero.";
        }
        if (isStringInteger(def)) {
            return true;
        }

        // Run regex validation
        if (validIntegerRegex.test(def) || validLetterRegex.test(def)) {
            return true;
        }

        throw "iterize description string invalid.";
    }

    function extractParams(def, character) {
        var startAndEnd, startAndStep, start = 0, end = 0, step = 1;

        startAndEnd = def.split("...");
        // Two characters separated by ellipses
        if (startAndEnd[0].indexOf(",") < 0) {
            start = intFrom(startAndEnd[0], character);
            if (intFrom(startAndEnd[1], character) < start) {
                step = -1;
            }
            end = incrAwayFromStart(intFrom(startAndEnd[1], character), step);
        } else {
            // integer, comma, integer, ellipses, integer
            startAndStep = startAndEnd[0].split(",");
            start = intFrom(startAndStep[0], character);
            step = intFrom(startAndStep[1], character) - start;
            end = incrAwayFromStart(intFrom(startAndEnd[1], character), step);

            // do the three make sense?
            if (step > 1 && end < start) {
                throw "iterize step does not approach end.";
            }
            if (step < 1 && end > start) {
                throw "iterize step does not approach end.";
            }
        }

        return generateArray(start, end, step, character);
    }

    function createIterable(def) {
        var end = 0, step = 1;

        if (!def && def !== 0) {
            return [];
        }

        isValidDef(def);

        if (Number.isInteger(def) || isStringInteger(def)) {
            end = parseInt(def, 10);
            if (end < 0) {
                step = -1;
            }
            return generateArray(0, end, step);
        }

        def = def.replace(/\s/g, "");

        if (validIntegerRegex.test(def)) {
            return extractParams(def);
        }
        return extractParams(def, true);
    }

    return createIterable(definition);
}
