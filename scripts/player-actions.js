let players = {}; // Object to store player info

document.addEventListener("DOMContentLoaded", function() {
    const seats = document.querySelectorAll('.seat');

    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            if (this.classList.contains('taken')) {
                manageTakenSeat(this);
            } else {
                takeSeat(this);
            }
        });
    });
    const simplifyDebtsButton = document.getElementById('simplifyDebtsBtn');
    simplifyDebtsButton.addEventListener('click', simplifyDebts);
});

function takeSeat(seatElement) {
    if (seatElement.classList.contains('taken')) {
        manageTakenSeat(seatElement);
    } else {
		const playerName = prompt("Nombre del jugador:");
		const buyInAmount = parseInt(prompt("Buy-in ($):"), 10);

        if (playerName && !isNaN(buyInAmount)) {
            seatElement.innerHTML = `<p>${playerName}<br>$${buyInAmount}</p>`;
            seatElement.classList.add('taken');
            seatElement.dataset.playerName = playerName;

            addPlayer(playerName, buyInAmount);
            updateLog(`${playerName} entró a la mesa con $${buyInAmount}`);
        }
    }
}


function manageTakenSeat(seatElement) {
    const playerName = seatElement.dataset.playerName;
    const action = prompt("Elegí que hacer con " + playerName + ":\n1. Rebuy/Add-on\n2. Retirarse", "1");

    if (action === "1") {
        rebuyAddOn(playerName);
    } else if (action === "2") {
        leaveTable(playerName);
        seatElement.innerHTML = ''; // Clear the seat
        seatElement.classList.remove('taken');
    }
}

function addPlayer(name, amount) {
    if (!players[name]) {
        players[name] = { chips: 0 };
    }
    players[name].chips += amount;
    updatePlayersList();
}

function rebuyAddOn(playerName) {
    const additionalAmount = parseInt(prompt(`Elegí cuanta guita agrega ${playerName}:`), 10);

    if (!isNaN(additionalAmount)) {
        if (players[playerName]) {
            players[playerName].chips += additionalAmount;
            updatePlayersList();
            updateLog(`${playerName} agregó $${additionalAmount}`);
            updateSeatDisplay(playerName, players[playerName].chips);
        } else {
            alert("Player not found.");
        }
    } else {
        alert("Invalid amount.");
    }
}

function leaveTable(playerName) {
    const cashOutAmount = parseInt(prompt(`Con cuanto se retira el mostro ${playerName}:`), 10);

    if (!isNaN(cashOutAmount)) {
        if (players[playerName]) {
            players[playerName].chips -= cashOutAmount;
            updatePlayersList();
            updateLog(`${playerName} se retiró con $${cashOutAmount}`);
            const seats = document.querySelectorAll('.seat');
            seats.forEach(seat => {
                if (seat.dataset.playerName === playerName) {
                    seat.innerHTML = '<button class="take-seat-btn">Agregar jugador</button>';
                    seat.classList.remove('taken');
                    delete seat.dataset.playerName;
                }
            });
        } else {
            alert("Player not found.");
        }
    } else {
        alert("Invalid amount.");
    }
}
