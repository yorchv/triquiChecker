var tick = {
  a: [0, 0, 0],
  b: [0, 0, 0],
  c: [0, 0, 0]
};

var resetTick = function () {
  tick = {
    a: [0, 0, 0],
    b: [0, 0, 0],
    c: [0, 0, 0]
  };
  return 'reseted';
};

var makeMove = function (line, col) {
  var l = tick[line],
    c = Number.parseInt(col) - 1,
    checkWinner = function (tick) {
      var winners = {
        row: [
          ['a0', 'a1', 'a2'],
          ['b0', 'b1', 'b2'],
          ['c0', 'c1', 'c2']
        ],
        col: [
          ['a0', 'b0', 'c0'],
          ['a1', 'b1', 'c1'],
          ['a2', 'b2', 'c2']
        ],
        crs: [
          ['a0', 'b1', 'c2'],
          ['a2', 'b1', 'c0']
        ]
      }, opt, total = 0,
        perm, coor, val;

      for (var key in winners) {
        opt = winners[key];
        for (var i = 0; i < opt.length; i++) {
          perm = opt[i];
          total = 0;
          for (var e = 0; e < perm.length; e++) {
            coor = perm[e].split('');
            val = tick[coor[0]][coor[1]];
            total += val;
          }
          if (total === 3) {
            return true;
          }
        }
      }

      return false;
    };

  if (!l[c]) {
    l[c] = 1;
  }

  return checkWinner(tick);
};