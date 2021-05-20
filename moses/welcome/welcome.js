// Functions declarations
function greet() {
  const date = new Date();
  const hour = date.getHours();
  let text = 'Morning';

  if (hour >= 16) {
    text = 'Evening';
  } else if (hour >= 12) {
    text = 'Afternoon';
  }

  $('#greetingsText').text(`Good ${text}!`);
}

function getColors(isAll) {
  const cards = $(isAll ? '.color-card' : '.color-card.selected-color');
  const colors = [];

  for (const c of cards) {
    const card = $(c);
    const color = card.attr('id').substr('card-'.length);

    colors.push(color);
  }

  return colors;
}

function onColorChange(id) {
  const selectedColors = getColors();
  const newColor = id.substr('card-'.length);

  if (selectedColors.includes(newColor)) {
    $(`#${id}`).removeClass('selected-color');
  } else if (selectedColors.length == 2) {
    toggleErrorMsg('Cannot select more than 2 colors');
  } else {
    $(`#${id}`).addClass('selected-color');
  }
}

function toggleErrorMsg(msg, duration) {
  $('#errorMsg').text(msg);

  if (msg !== '') {
    setTimeout(() => {
      $('#errorMsg').text('');
    }, duration || 4000);
  }
}

$('#openGameBtn').click(() => {
  const playType = $('input[name=playTypeSelection]:checked').val();

  if (playType === 'human') {
    $('#player2Label').text('Name of player2');

    $('#player2Input').val('');
    $('#player2Input').prop('disabled', false);
  } else {
    $('#player2Label').text('Computer name');

    $('#player2Input').val('Computer');
    $('#player2Input').prop('disabled', true);
  }

  $('#gameSetupModal').modal('show');
});

console.log('mos5es'.match(/[&?]/));

$('#startGameBtn').click(() => {
  toggleErrorMsg('');

  const selectedColors = getColors();
  if (selectedColors.length != 2) {
    toggleErrorMsg('Two colors must be selected before starting this game');
    return;
  }

  const player1 = $('#player1Input').val();
  const player2 = $('#player2Input').val();

  if (!player1 || !player2) {
    toggleErrorMsg('Both player names must be privided to play this game');
    return;
  }

  if (player1 === player2) {
    toggleErrorMsg('Both player names cannot be same');
    return;
  }

  if (player1.match(/[&?,]/) || player2.match(/[&?]/)) {
    toggleErrorMsg('Player name contains invalid character(s)');
    return;
  }

  const playType = $('input[name=playTypeSelection]:checked').val();

  // save config in localstorage
  const config = {
    playerNames: [player1, player2],
    type: playType,
    selectedColors,
    allColors: getColors(true),
  }

  localStorage.setItem('game_config', JSON.stringify(config));

  // route to game play screen
  window.location.href = '../board/board.html';
});

// Functions executions
greet();
