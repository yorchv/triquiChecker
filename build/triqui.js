(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @triqui.js
 *
 * Tic Tac Toe on the Console. Play against the computer
 *
 * @autor Jorge Vivas
 * @copyright Jorge Vivas
 * @license MIT: You are free to use and modify this code for any use,
 *          on the condition that this copyright notice remains.
 */

var dataFactory = require('./src/data.js');
var viewFactory = require('./src/view.js');

(function(ctx) {

  var data = dataFactory(),
    view = viewFactory(),
    triquiFactory = function() {
      return {
        start: function start() {
          var game = data.game.get();
          view.show(game.matrix);
        },

        set: function set(x, y) {
          data.user.set('user', x, y);
          view.show(data.game.get().matrix);
        },

        score: function score() {
          return data.score.get;
        }
      };
    };

  ctx.triqui = Object.create(triquiFactory());

})(window);
},{"./src/data.js":2,"./src/view.js":3}],2:[function(require,module,exports){
/**
 *  * Data
 * - Store ttt state
 * - Store players state
 * - Store the score
 */
var data = function data () {

    /**
     * Matrix Factory
     * @return {Object}
     */
    var matrix = function matrix() {
      var mtx = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      set = function set (x, y) {
        this.matrix[y][x] = 1;
        return this.matrix;
      },
      get = function get (x, y) {
        return this.matrix[y][x];
      },
      clear = function clear() {
        this.matrix = clone();
        return this.matrix;
      },
      clone = function clone () {
        return mtx.map(function(i) { return i.slice(); });
      };

      return Object.create({
        matrix: clone(),
        get: get,
        set: set,
        clear: clear
      });
    },

    active = null,

    users = {},

    score = {},

    /**
     * Return matrix factory
     * @return {Object} Matrix Duplicate
     */
    duplicateMatrix = function duplicateMatrix() {
      return matrix();
    },

    /**
     * Gets the current game active matrix
     * @return {[type]} [description]
     */
    getMatrix = function getMatrix() {
      active = active || duplicateMatrix();
      return active;
    },

    /**
     * Gets the current user played game
     * @param  {String} user
     * @return {Matrix}
     */
    getUser = function getUserMatrix(user) {
      users[user] = users[user] || duplicateMatrix();
      return users[user];
    },

    /**
     * Sets the play into the active matrix
     * @param {Number} x
     * @param {Number} y
     */
    setPlay = function setPlay(x, y) {
      getMatrix().set(x, y);
      return getMatrix();
    },

    /**
     * Sets the play into the active matrix
     * @param {Number} x
     * @param {Number} y
     */
    setUser = function setUserPlay(user, x, y) {
      var uMatrix = getUser(user);
      uMatrix.set(x, y);
      setPlay(x, y);
      return uMatrix;
    },

    /**
     * Adds to the score
     * @param {String} user
     */
    addScore = function addScore(user) {
      score[user]++;
      return score;
    },

    /**
     * Clears the active matrix and the users matrixes
     * @return {Object} New cleared matrix
     */
    clearMatrix = function clearMatrix() {
      users.forEach(function(user) { user.clear(); });
      active = null;
      return getMatrix();
    },

    clearScore = function clearScore() {
      score = {};
      return score;
    };

    return Object.create({
      game: {
        get: getMatrix,
        clear: clearMatrix
      },
      user: {
        set: setUser,
        get: getUser
      },
      score: {
        get: score,
        add: addScore,
        clear: clearScore
      }
    });
  };

module.exports = function() {
  return data();
};
},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
