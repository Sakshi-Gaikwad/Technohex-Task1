const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertedAmountInput = document.getElementById('convertedAmount');
function populateCurrencies() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.innerText = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.innerText = currency;
                toCurrencySelect.appendChild(option2);
            });
        });
}

// Convert currency
function convert() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            convertedAmountInput.value = convertedAmount;
        });
}

populateCurrencies();