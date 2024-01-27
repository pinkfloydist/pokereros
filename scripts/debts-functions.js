function simplifyDebts() {
    if (!confirm("Estás seguro mostro? Mirá que no hay vuelta atrás")) {
        return;
    }

    let creditors = []; // Players who owe money
    let debtors = []; // Players who are owed money

    // Separate players into creditors and debtors
    for (let playerName in players) {
        if (players[playerName].chips < 0) {
            creditors.push({ name: playerName, amount: Math.abs(players[playerName].chips) });
        } else if (players[playerName].chips > 0) {
            debtors.push({ name: playerName, amount: players[playerName].chips });
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

        updateLog(`${debtor.name} le debe ${settledAmount} a ${creditor.name}`);

        if (creditor.amount === 0) {
            creditors.shift(); // Remove the creditor who has settled their debt
        }
        if (debtor.amount === 0) {
            debtors.shift(); // Remove the debtor who has been fully paid
        }
    }
}
