/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2014 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Utility functions for dealing with Arrays.
*
* @class Phaser.ArrayUtils
* @static
*/
Phaser.ArrayUtils = {

    /**
    * Fetch a random entry from the given array.
    * Will return null if random selection is missing, or array has no entries.
    *
    * @method
    * @param {any[]} objects - An array of objects.
    * @param {integer} startIndex - Optional offset off the front of the array. Default value is 0, or the beginning of the array.
    * @param {integer} length - Optional restriction on the number of values you want to randomly select from.
    * @return {object} The random object that was selected.
    */
    getRandomItem: function (objects, startIndex, length) {

        if (objects == null) { // undefined or null
            return null;
        }

        if (typeof startIndex === 'undefined') { startIndex = 0; }
        if (typeof length === 'undefined') { length = objects.length; }

        var randomIndex = startIndex + Math.floor(Math.random() * length);
        return objects[randomIndex] || null;

    },

    /**
    * Removes a random object from the given array and returns it.
    * Will return null if random selection is missing, or array has no entries.
    *
    * @method
    * @param {any[]} objects - An array of objects.
    * @param {integer} startIndex - Optional offset off the front of the array. Default value is 0, or the beginning of the array.
    * @param {integer} length - Optional restriction on the number of values you want to randomly select from.
    * @return {object} The random object that was removed.
    */
    removeRandomItem: function (objects, startIndex, length) {

        if (objects == null) { // undefined or null
            return null;
        }

        if (typeof startIndex === 'undefined') { startIndex = 0; }
        if (typeof length === 'undefined') { length = objects.length; }

        var randomIndex = startIndex + Math.floor(Math.random() * length);
        if (randomIndex < objects.length)
        {
            var removed = objects.splice(randomIndex, 1);
            return removed[0];
        }
        else
        {
            return null;
        }

    },

    /**
    * A standard Fisher-Yates Array shuffle implementation which modifies the array in place.
    *
    * @method
    * @param {array} array - The array to shuffle.
    * @return {array} The original array, now shuffled.
    */
    shuffle: function (array) {

        for (var i = array.length - 1; i > 0; i--)
        {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;

    },

    /**
    * Transposes the elements of the given Array.
    *
    * @method
    * @param {array} array - The array to transpose.
    * @return {array} The transposed array.
    */
    transposeMatrix: function (array) {

        var result = new Array(array[0].length);

        for (var i = 0; i < array[0].length; i++)
        {
            result[i] = new Array(array.length - 1);

            for (var j = array.length - 1; j > -1; j--)
            {
                result[i][j] = array[j][i];
            }
        }

        return result;

    },

    /**
    * Rotates the given array.
    * Based on the routine from http://jsfiddle.net/MrPolywhirl/NH42z/
    *
    * @method
    * @param {array} matrix - The array to rotate.
    * @param {number|string} direction - The amount to rotate. Either a number: 90, -90, 270, -270, 180 or a string: 'rotateLeft', 'rotateRight' or 'rotate180'
    * @return {array} The rotated array
    */
    rotateMatrix: function (matrix, direction) {

        if (typeof direction !== 'string')
        {
            direction = ((direction % 360) + 360) % 360;
        }

        if (direction === 90 || direction === -270 || direction === 'rotateLeft')
        {
            matrix = Phaser.ArrayUtils.transposeMatrix(matrix);
            matrix = matrix.reverse();
        }
        else if (direction === -90 || direction === 270 || direction === 'rotateRight')
        {
            matrix = matrix.reverse();
            matrix = Phaser.ArrayUtils.transposeMatrix(matrix);
        }
        else if (Math.abs(direction) === 180 || direction === 'rotate180')
        {
            for (var i = 0; i < matrix.length; i++)
            {
                matrix[i].reverse();
            }

            matrix = matrix.reverse();
        }

        return matrix;

    },

    /**
    * Snaps a value to the nearest value in an array.
    * The result will always be in the range `[first_value, last_value]`.
    *
    * @method
    * @param {number} value - The search value
    * @param {number[]} arr - The input array which _must_ be sorted.
    * @return {number} The nearest value found.
    */
    findClosest: function (value, arr) {

        if (!arr.length)
        {
            return NaN;
        }
        else if (arr.length === 1 || value < arr[0])
        {
            return arr[0];
        }

        var i = 1;
        while (arr[i] < value) {
            i++;
        }

        var low = arr[i - 1];
        var high = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

        return ((high - value) <= (value - low)) ? high : low;

    },

    /**
    * Moves the element from the start of the array to the end, shifting all items in the process.
    * The "rotation" happens to the left.
    *
    * @method Phaser.ArrayUtils.rotate
    * @param {any[]} array - The array to shift/rotate. The array is modified.
    * @return {any} The shifted value.
    */
    rotate: function (array) {

        var s = array.shift();
        array.push(s);

        return s;

    },

    /**
    * Create an array representing the inclusive range of numbers (usually integers) in `[start, end]`.
    * This is equivalent to `numberArrayStep(start, end, 1)`.
    *
    * @method Phaser.Math#numberArray
    * @param {number} start - The minimum value the array starts with.
    * @param {number} end - The maximum value the array contains.
    * @return {array} The array of number values.
    */
    numberArray: function (start, end) {

        var result = [];

        for (var i = start; i <= end; i++)
        {
            result.push(i);
        }

        return result;

    },

    /**
    * Create an array of numbers (positive and/or negative) progressing from `start`
    * up to but not including `end` by advancing by `step`.
    *
    * If `start` is less than `stop` a zero-length range is created unless a negative `step` is specified.
    *
    * Certain values for `start` and `end` (eg. NaN/undefined/null) are currently coerced to 0;
    * for forward compatibility make sure to pass in actual numbers.
    *
    * @method Phaser.Math#numberArrayStep
    * @param {number} start - The start of the range.
    * @param {number} end - The end of the range.
    * @param {number} [step=1] - The value to increment or decrement by.
    * @returns {Array} Returns the new array of numbers.
    * @example
    * Phaser.Math.numberArrayStep(4);
    * // => [0, 1, 2, 3]
    *
    * Phaser.Math.numberArrayStep(1, 5);
    * // => [1, 2, 3, 4]
    *
    * Phaser.Math.numberArrayStep(0, 20, 5);
    * // => [0, 5, 10, 15]
    *
    * Phaser.Math.numberArrayStep(0, -4, -1);
    * // => [0, -1, -2, -3]
    *
    * Phaser.Math.numberArrayStep(1, 4, 0);
    * // => [1, 1, 1]
    *
    * Phaser.Math.numberArrayStep(0);
    * // => []
    */
    numberArrayStep: function(start, end, step) {

        start = +start || 0;

        // enables use as a callback for functions like `_.map`
        var type = typeof end;

        if ((type === 'number' || type === 'string') && step && step[end] === start)
        {
            end = step = null;
        }

        step = step == null ? 1 : (+step || 0);

        if (end === null)
        {
            end = start;
            start = 0;
        }
        else
        {
            end = +end || 0;
        }

        // use `Array(length)` so engines like Chakra and V8 avoid slower modes
        // http://youtu.be/XAqIpGU8ZZk#t=17m25s
        var index = -1;
        var length = Math.max(Phaser.Math.roundAwayFromZero((end - start) / (step || 1)), 0);
        var result = new Array(length);

        while (++index < length)
        {
            result[index] = start;
            start += step;
        }

        return result;

    }

};
