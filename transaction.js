document.addEventListener('DOMContentLoaded', function() {
    var productName = localStorage.getItem('productName');
    var price = localStorage.getItem('price');
    var productNameElement = document.getElementById('product-name');
    var priceElement = document.getElementById('price');
    var amountElement = document.getElementById('amount');
    var paymentForm = document.getElementById('payment-form');

    if (productName && price && productNameElement && priceElement && amountElement && paymentForm) {
        productNameElement.innerText = productName;
        priceElement.innerText = price;
        amountElement.innerText = '₱ ' + price;

        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            var name = document.getElementById('name').value;
            var location = document.getElementById('location').value;
            
            if (name && location) {
                localStorage.setItem('transactionCount', parseInt(localStorage.getItem('transactionCount') || 0) + 1);
                var transactionIndex = localStorage.getItem('transactionCount');
                localStorage.setItem('transactionName_' + transactionIndex, name);
                localStorage.setItem('transactionProduct_' + transactionIndex, productName);
                localStorage.setItem('transactionPrice_' + transactionIndex, price);
                localStorage.setItem('transactionLocation_' + transactionIndex, location);
                
                var confirmation = document.createElement('div');
                confirmation.className = 'confirmation';
                confirmation.innerHTML = '<p>Payment successful! Thank you for your purchase, ' + name + '!</p>';
                document.body.appendChild(confirmation);
                
                // Remove confirmation after 3 seconds
                setTimeout(function() {
                    confirmation.remove();
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                console.error("Name or location is missing.");
            }
        });

        var previewForm = document.getElementById('preview-form');
        if (previewForm) {
            previewForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                var name = document.getElementById('name').value;
                var location = document.getElementById('location').value;
                
                if (name && location) {
                    document.getElementById('preview-name').innerText = name;
                    document.getElementById('preview-product').innerText = productName;
                    document.getElementById('preview-price').innerText = price;
                    document.getElementById('preview-amount').innerText = location;
                    document.getElementById('transaction-preview').style.display = 'block';
                } else {
                    console.error("Name or location is missing.");
                }
            });
        } else {
            console.error("Preview form element not found.");
        }
    } else {
        console.error("Product details or form elements are missing.");
    }
});
