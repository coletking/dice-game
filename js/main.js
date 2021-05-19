const selectedColors = [];
const allColors = [
    'red',
    'blue',
    'green',
    'yello'
];

const dice =[]



$('.colour-card').click((evt) => {
    const classlist = evt.target.className.split(' ');
    const color = classlist.find(c => c.startsWith('box-')).substr(4);


    const index = selectedColors.indexOf(color);
    if (index >= 0) {
        $(`.box-${color}`).removeClass('box-colour');
        selectedColors.splice(index, 1);
    } else if (selectedColors.length >= 2) {
        alert('Cannot select more than 2 colors');
    } else {
        $(`.box-${color}`).addClass('box-colour');
        selectedColors.push(color);
    }

   
});

$('#startGame').click(() => {
    if (selectedColors.length == 2) {
          // close modal
        $('#staticBackdrop').modal('hide');

        window.location.href = `start.html?colors=${selectedColors.join(',')}`;
    } else {
        alert('Two collors must be selected');
    }
});

