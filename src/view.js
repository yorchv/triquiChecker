/**
 * View
 * - Show the current state of the ttt
 * - Mark when the user options
 * - Mark the recent play
 * - Show when there is a winner
 * - Show the errors
 * - show the scoreboard
 */

var view = function() {

  var values = ['-', 'X', '0'],

    header = '  | 0 | 1 | 2 |',

    drawLine = function drawLine(content) {
      console.log(content);
    },

    drawHeader = function drawHeader() {
      drawLine(header);
    },

    showMatrix = function showMatrix(matrix) {
      drawHeader();
      matrix.forEach(function(row, key) {
        var rowNumber = key + ' | ',
          line = row.map(function(val) {
            return values[val] + ' | ';
          });
        line.unshift(rowNumber);
        drawLine(line.join(''));
      });
    };

  return Object.create({
    show: showMatrix
  });
};

module.exports = function() {
  return view();
};