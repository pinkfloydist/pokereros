let players = {}; // Object to store player info

class Player {
	constructor(name, chips) {
		this.name = name;
		this.chips = chips;
	}

	addChips(amount) {
		if (amount > 0) {
			this.chips += ammount;
		} else {
			alert("La cantidad de fichas debe ser positiva");
			console.error("La cantidad de fichas debe ser positiva");
		}
	}

	withdrawChips(amount) {
		if (amount >= 0) {
			this.chips -= ammount;
		} else {
			alert("No se puede retirar con menos de cero fichas");
			console.error("No se puede retirar con menos de cero fichas");
		}
	}
}

class Seat {
	constructor(id) {
		this.id = id;
		this.isTaken = false;
		this.takenBy = null
	}

	takeBy(player) {
		this.takenBy = player;
		this.isTaken = true;
	}

	clearOccupant() {
		this.takenBy = null;
		this.isTaken = false;
	}
}

document.addEventListener("DOMContentLoaded", function() {
    const seatElements = document.querySelectorAll('.seat');

    seatElements.forEach((seatElement, index) => {
		seats.push(new Seat(index));
        seatElement.addEventListener('click', function() {
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

function takeSeat(seatElement, seatIndex) {
	const playerName = prompt("Nombre del jugador:");
	const buyInAmount = parseInt(prompt("Buy-in ($):"), 10);

	if (playerName && !isNaN(buyInAmount)) {
        const player = new Player(playerName, buyInAmount);
        players[playerName] = player; // Store player in the players object
        seats[seatIndex].takeBy(player); // Update the seat object

        seatElement.innerHTML = `<p>${playerName}<br>$${buyInAmount}</p>`;
        seatElement.classList.add('taken');
        updateLog(`${playerName} entró a la mesa con $${buyInAmount}`);
        updatePlayersList();
    }
}


function manageTakenSeat(seatElement, seatIndex) {
    const seat = seats[seatIndex];
    if (!seat.isTaken) return;

    const player = seat.takenBy;
    const action = prompt(`Elegí que hacer con ${player.name}:\n1. Rebuy/Add-on\n2. Retirarse`, "1");

    if (action === "1") {
        rebuyAddOn(player);
    } else if (action === "2") {
        leaveTable(player);
        seat.clearOccupant(); // Clear the seat
        seatElement.innerHTML = '';
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

function rebuyAddOn(player) {
    const additionalAmount = parseInt(prompt(`Elegí cuanta guita agrega ${player.name}:`), 10);

    if (!isNaN(additionalAmount)) {
        player.addChips(additionalAmount);
        updateLog(`${player.name} agregó $${additionalAmount}`);
        updatePlayersList();
    } else {
        alert("Invalid amount.");
    }
}


function leaveTable(player) {
    const cashOutAmount = parseInt(prompt(`Con cuanto se retira ${player.name}:`), 10);

    if (!isNaN(cashOutAmount)) {
        player.withdrawChips(cashOutAmount);
        updateLog(`${player.name} se retiró con $${cashOutAmount}`);
        updatePlayersList();
    } else {
        alert("Invalid amount.");
    }
}
