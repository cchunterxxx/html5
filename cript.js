const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');

let turn = 'X';

function handleSquareClick(event) {
  const square = event.target;
  if (square.textContent !== '') {
    return;
  }
  square.classList.add(turn.toLowerCase());
  square.textContent = turn;
  checkWin();
  turn = turn === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winningCombos = [    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    const sq1 = document.getElementById(a);
    const sq2 = document.getElementById(b);
    const sq3 = document.getElementById(c);
    if (
      sq1.textContent !== '' &&
      sq1.textContent === sq2.textContent &&
      sq2.textContent === sq3.textContent
    ) {
      alert(`${turn} wins!`);
      reset();
      return;
    }
  }
}

function reset() {
  for (const square of squares) {
    square.classList.remove('x', 'o');
    square.textContent = '';
  }
  turn = 'X';
}

for (const square of squares) {
  square.addEventListener('click', handleSquareClick);
}

resetButton.addEventListener('click', reset);



var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

