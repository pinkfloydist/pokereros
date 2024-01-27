function updateSeatDisplay(playerName, totalChips) {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        if (seat.dataset.playerName === playerName) {
            seat.innerHTML = `<p>${playerName}<br>$${totalChips}</p>`;
        }
    });
}


function updatePlayersList() {
    const playersList = document.getElementById("playersList");
    playersList.innerHTML = ''; // Clear the current list

    for (let name in players) {
        const player = players[name];
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: \$${player.chips}`;
        playersList.appendChild(listItem);
    }
}


function updateLog(message) {
    const log = document.querySelector('.log');
    log.textContent += message + '\n'; // Append new log entry
}
