/*
 *
 * Controllers
 * - Receive user input data and send it to the logic
 * - Set and get interactions
 * - Conection between the view and the logic model
 */

var control = function contol() {

}



// TODO / ADD DOCUMENTATION
var Triqui = function() {
  'use stric';

  var

    // Starter game matrix
    matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],

    // Returns the permutations of all the possible coordinates for a play
    getAnalogMatrix = function (){
      return [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    },

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
    },

    // Returns if one of the values in an array is contained in another array
    some = function(obj, pred) {
      var contains = function(val) { return pred.indexOf(val) !== -1; };
      return obj.some(contains);
    },

    // return array without the passed attrs or array
    filter = function(obj, pred) {
      return obj.filter(function(value) {
        return value !== pred;
      });
    },

    permutate = function(array) {
      // Do the actual permuation work on array[], starting at index
      var p = function(array, index) {
        var i, count,
          // Swap elements i1 and i2 in array a[]
          swap = function(a, i1, i2) {
          var t = a[i1];
          a[i1] = a[i2];
          a[i2] = t;
        };

        if (index === array.length - 1) {
          return 1;
        } else {
          count = p(array, index + 1);
          for (i = index + 1; i < array.length; i++) {
            swap(array, i, index);
            count += p(array, index + 1);
            swap(array, i, index);
          }
          return count;
        }
      };

      if (!array || array.length === 0) {
        return 0;
      }
      return p(array, 0);
    },

    // permute = function(input) {
    //   var permArr = [],
    //     usedChars = [],
    //     perm;

    //   perm = function(input) {
    //     var i, ch;
    //     for (i = 0; i < input.length; i++) {
    //       ch = input.splice(i, 1)[0];
    //       usedChars.push(ch);
    //       if (input.length === 0) {
    //         permArr.push(usedChars.slice());
    //       }
    //       perm(input);
    //       input.splice(i, 0, ch);
    //       usedChars.pop();
    //     }
    //     return permArr;
    //   };

    //   perm(input);

    //   return permArr;
    // },

    // Set of all
    played = [];

  return {

    matrix: cloneArr(matrix),

    _matrix: cloneArr(matrix),

    _winningTimes: 0,

    ui: {
      log: 'log'
    },

    reset: function() {
      played = [];
      this.matrix = cloneArr(this._matrix);
      //return 'Triqui Restarted';
    },

    set: function(row, column) {
      // var rw = this.validate(Number(row)),
      //   col = this.validate(Number(column));

      // if (col === null || rw === null) {
      //   return 'Use numbers from 0 to 2';
      // } else

      if (this.matrix[row][column] === 1) {
        return false; //'Already played row '+ row + ', column ' + column;
      }

      this.matrix[row][column] = 1;
      //played.push(parseInt(rw, 10), parseInt(col, 10));
      //this.ink();

      return this.checkWinner();
      // if (this.checkWinner()) {
      //   return true;
      //   //return 'You have WON! / ' + this._winningTimes + ' times';
      // } else {
      //   return false;
      // }

      //return 'You played: row '+ row + ', column ' + column;
    },

    autoPlay: function() {
      // var opts = [], i, e, hasPlayed, keys = Object.keys(winnersMatrix);
      // // get available options
      // for (i = 0; i < keys; i++) {
      //   opts = winnersMatrix[keys[i]];
      //   for (e = 0; e < opts.length; e++) {
      //     hasPlayed = some(opts[e], played);
      //     if (!hasPlayed) {
      //      // todo
      //     }
      //   }
      // }
      // console.log(hasPlayed);

      var sequence = [1,2,3,4,5,6,7,8,9],
        permutatedSequence = permutate(sequence),
        psLength = permutatedSequence.length,
        i;

      debugger;
      // Set ui element
      this.ui.log = document.getElementById(this.ui.log);

      console.log(permutatedSequence);
      // for (i = 0; i < psLength; i ++) {
      //   this.autoPlaySequence(permutedSequence[i]);
      // }

      // Revisar cuales han sido las jugadas realizadas
      // Escoger las opciones que tengan menos jugadas realizadas en las opciones ganadoras
      // De los que tienen las menores opciones jugadas, escoger una 1 usar la primera opcion disponible
      // Marcar la opcion
      // Si no hay opciones ganadoras, buscar dentro de las opciones la que quede disponible
      //
    },

    /**
     * @params {Array} sequence
     */
    autoPlaySequence: function(sequence) {
      var analog = getAnalogMatrix(),
        seqLength = sequence.length,
        i, isEven, coord, p;

      isEven = function(number) {
        return number % 2 === 0 || number === 0;
      };

      for (i = 0; i < seqLength; i++) {
        if (isEven(i)) {
          coord = analog[i];
          if (this.set.apply(this, coord)) {
            this._winningTimes++;

            this.ui.log.removeChild(this.ui.log.firstChild);

            p = document.createElement('p');
            p.appendChild(
              document.createTextNode('You have won '+ this._winningTimes + ' times'));
            this.ui.log.appendChild(p);

            this.reset();
            return;
          }
        }
      }
    },

    validate: function(number) {
      var max = this._matrix.length,
        min = 0;

      return number <= max && number >= min ? number : null;
    },

    ink: function() {
      //Show the triqui on the console
      var i, e, output = [], mtx = this.matrix, length = mtx.length, p;
      output.push('  | 0 | 1 | 2 |<br>');
      for (i = 0; i < length; i++) {
        output.push(i + ' | ');
        for (e = 0; e < mtx[i].length; e++) {
          e && output.push(' ');
          output.push(mtx[i][e] ? 'X |' : '- |');
        }
        output.push('<br>');
      }

      p = document.createElement('div');
      p.appendChild(document.createTextNode(output.join('')));
      this.ui.log.appendChild(p);
    },

    checkWinner: function () {
      var key, matrix = this.matrix, winners = winnersMatrix, opt, total = 0,
        perm, coor, val, i, e, optLength, permLength;

      for (key in winners) {
        if (winners.hasOwnProperty(key)) {
          opt = winners[key];
          optLength = opt.length;
          for (i = 0; i < optLength; i++) {
            perm = opt[i];
            permLength = permLength;
            total = 0;
            for (e = 0; e < permLength; e++) {
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