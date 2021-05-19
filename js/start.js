function rollDice() {
    return new Promise((resolve) => {
        const dice = [...document.querySelectorAll(".die-list")];
        const values = [];

        for (const die of dice) {
            toggleClasses(die);
            die.dataset.roll = getRandomNumber(1, 6);

            values.push(die.dataset.roll);
        }

        setTimeout(() => {
            resolve(values);
        }, 1500);
    });
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", async function() {
    const values = await rollDice();

    console.log(`Do whatever you want to do with me: ${values}`);
});



