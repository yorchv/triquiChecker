/**
 * @triqui.js
 *
 * Tic Tac Toe on the Console. Play against the computer
 *
 * @autor Jorge Vivas
 * @copyright Jorge Vivas
 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
 */

// TODO / ADD DOCUMENTATION
var Triqui = function() {

  var

    // Starter game matrix
    matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],

    // Matrix of posible combinations winner
    winnersMatrix = {
      row: [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22']
      ],
      column: [
        ['00', '10', '20'],
        ['01', '11', '21'],
        ['02', '12', '22']
      ],
      cross: [
        ['00', '11', '22'],
        ['02', '11', '20']
      ]
    },

    // 2 Depth Array Cloning
    cloneArr = function(arr) {
      return arr.map(function(i) { return i.slice(); });
    };

  return {

    matrix: cloneArr(matrix),

    _matrix: cloneArr(matrix),

    reset: function() {
      this.matrix = cloneArr(this._matrix);
      return 'Triqui Restarted';
    },

    set: function(row, column) {
      var rw = this.validate(Number(row)),
        col = this.validate(Number(column));

      if (col === null || rw === null) {
        return 'Use numbers from 0 to 2';
      } else if (this.matrix[rw][col] === 1) {
        return 'Already played row '+ row + ', column ' + column;
      }

      this.matrix[rw][col] = 1;
      this.ink();

      if (this.checkWinner()) {
        return 'You have WON!';
      }

      return 'You played: row '+ row + ', column ' + column;
    },

    validate: function(number) {
      var max = this._matrix.length,
        min = 0;

      return number <= max && number >= min ? number : null;
    },

    ink: function() {
      //Show the triqui on the console
      var i, e, output = [], mtx = this.matrix, length = mtx.length;
      output.push('  | 0 | 1 | 2 |\n');
      for (i = 0; i < length; i++) {
        output.push(i + ' | ');
        for (e = 0; e < mtx[i].length; e++) {
          e && output.push(' ');
          output.push(mtx[i][e] ? 'X |' : '- |');
        }
        output.push('\n');
      }

      console.log(output.join(''));
    },

    checkWinner: function () {
      var key, matrix = this.matrix, winners = winnersMatrix, opt, total = 0,
        perm, coor, val, i, e;

      for (key in winners) {
        if (winners.hasOwnProperty(key)) {
          opt = winners[key];
          for (i = 0; i < opt.length; i++) {
            perm = opt[i];
            total = 0;
            for (e = 0; e < perm.length; e++) {
              coor = perm[e].split('');
              val = matrix[Number(coor[0])][Number(coor[1])];
              total += val;
            }
            if (total === 3) {
              return true;
            }
          }
        }
      }

      return false;
    }
  };
};

// TODO Closure
triqui = new Triqui();