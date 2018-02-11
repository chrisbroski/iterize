function iterize(definition) {
    "use strict";

    // Polyfill from MDN for IE
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
    var parsed, iterator = [], startAndStep, iStep;

    function isStringInteger(s) {
        var n = Math.floor(Number(s));
        return n !== Infinity && String(n) === s;
    }

    function generateArray(start, end, step) {
        var ii, a = [];
        for (ii = start; ii < end; ii += step) {
            a.push(ii);
        }
        return a;
    }

    if (!definition) {
        return iterator;
    }

    // Accept single integer argument
    if (Number.isInteger(definition) && definition > 0) {
        return generateArray(0, definition, 1);
    }

    if (typeof definition !== 'string') {
        return [];
    }

    // Remove spaces
    definition = definition.replace(/\s/g, "");

    parsed = definition.split("...");

    // A single integer string is also OK
    if (parsed.length === 1) {
        if (parseInt(parsed[0], 10)) {
            return generateArray(0, parseInt(parsed[0], 10), 1);
        }
    }

    // Two integers
    if (parsed[0].indexOf(",") < 0) {
        if (isStringInteger(parsed[0]) && isStringInteger(parsed[1])) {
            iStep = 1;
            if (parseInt(parsed[0], 10) < parseInt(parsed[0], 10)) {
                iStep = -1;
            }
            return generateArray(parseInt(parsed[0], 10), parseInt(parsed[0], 10) + 1, iStep);
        }
    } else {
        // Two integers and a comma
        startAndStep = parsed[0].split(",");
        if (!isStringInteger(startAndStep[0]) || !isStringInteger(startAndStep[1])) {
            return [];
        }
        iStep = 1;
        if (parseInt(startAndStep[0], 10) < parseInt(parsed[0], 10)) {
            iStep = -1;
        }
        if (parseInt(parsed[1], 10)) {
            return generateArray(parseInt(parsed[0], 10), parseInt(parsed[0], 10) + 1, iStep);
        }
    }

    // If nothing catches it by now, then it didn't parse.
    return [];
}
