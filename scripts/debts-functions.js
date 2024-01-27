function simplifyDebts() {
    if (!confirm("Estás seguro mostro? Mirá que no hay vuelta atrás")) {
        return;
    }

    let creditors = []; // Players who owe money
    let debtors = []; // Players who are owed money

    // Separate players into creditors and debtors
    for (let playerName in players) {
        const player = players[playerName];
        if (player.chips < 0) {
            creditors.push({ player: player, amount: Math.abs(player.chips) });
        } else if (player.chips > 0) {
            debtors.push({ player: player, amount: player.chips });
        }
    }

    // Sort both arrays by amount in descending order
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    // Simplify debts
    while (creditors.length > 0 && debtors.length > 0) {
        let creditor = creditors[0];
        let debtor = debtors[0];

        let settledAmount = Math.min(creditor.amount, debtor.amount);
        creditor.amount -= settledAmount;
        debtor.amount -= settledAmount;

        updateLog(`${debtor.player.name} le debe ${settledAmount} a ${creditor.player.name}`);

        if (creditor.amount === 0) {
            creditors.shift(); // Remove the creditor who has settled their debt
        }
        if (debtor.amount === 0) {
            debtors.shift(); // Remove the debtor who has been fully paid
        }
    }

    // Update the players list and UI elements as needed
    updatePlayersList();
}
