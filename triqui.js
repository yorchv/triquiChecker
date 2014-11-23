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