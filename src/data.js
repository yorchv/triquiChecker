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