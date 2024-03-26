document.addEventListener('DOMContentLoaded', function() {
    var transactionCount = localStorage.getItem('transactionCount') || 0;
    var transactionHistoryHTML = '';
    var historyTable = document.getElementById('transaction-history');

    for (var i = 1; i <= transactionCount; i++) {
        var transactionName = localStorage.getItem('transactionName_' + i);
        var transactionProduct = localStorage.getItem('transactionProduct_' + i);
        var transactionPrice = localStorage.getItem('transactionPrice_' + i);
        var transactionLocation = localStorage.getItem('transactionLocation_' + i);

        if (transactionName && transactionProduct && transactionPrice && transactionLocation) {
            transactionHistoryHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${transactionName}</td>
                    <td>${transactionProduct}</td>
                    <td>${transactionPrice}</td>
                    <td>${transactionLocation}</td>
                </tr>
            `;
        } else {
            // If any data is missing, remove the corresponding entry from localStorage
            localStorage.removeItem('transactionName_' + i);
            localStorage.removeItem('transactionProduct_' + i);
            localStorage.removeItem('transactionPrice_' + i);
            localStorage.removeItem('transactionLocation_' + i);
        }
    }

    if (historyTable) {
        historyTable.innerHTML = transactionHistoryHTML;
        // Add fade-in animation to the table
        historyTable.classList.add('fade-in');
    } else {
        console.error("Transaction history table element not found.");
    }
});

// JavaScript for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
