let data; // Move the data variable to a higher scope

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = `https://open.er-api.com/v6/latest/USD`; // Fetching latest rates for USD

    // Make the API request using fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(apiData => {
            // Log all currency rates
            console.log(apiData);
            data = apiData; // Assign the data variable
            if (!data || !data.rates) {
                console.error('No rates found in the API response');
                return;
            }
            // Update the content of the source and target currency dropdowns
            const sourceSelect = document.getElementById('initial-currency');
            const targetSelect = document.getElementById('target-currency');
            for (const currencyCode in data.rates) {
                sourceSelect.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`;
                targetSelect.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`;
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
        });
});

function convertCurrency() {
     const amount = parseFloat(document.getElementById('value-input').value);
     const sourceCurrency = document.getElementById('initial-currency').value;
     const targetCurrency = document.getElementById('target-currency').value;
 
     // Check for valid input
     if (isNaN(amount) || !sourceCurrency || !targetCurrency) {
         alert('Please enter a valid amount and select both currencies');
         return;
     }
 
     // Perform the conversion using the exchange rates
     const exchangeRateValue = exchangeRate(sourceCurrency, targetCurrency);
     if (!exchangeRateValue) {
         alert('Error calculating exchange rate');
         return;
     }
     const convertedAmount = amount * exchangeRateValue;
 
     // Display the result with better wording
     document.getElementById('value-output').innerText = 
         `${amount.toFixed(2)} ${sourceCurrency} is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}`;
 }
 

function exchangeRate(sourceCurrency, targetCurrency) {
    // Make sure data and rates exist
    if (!data || !data.rates || !data.rates[sourceCurrency] || !data.rates[targetCurrency]) {
        console.error('Invalid currency rates');
        return null;
    }
    // Conversion logic
    return data.rates[targetCurrency] / data.rates[sourceCurrency];
}

// Fix event listeners typo: 'click' instead of 'clcik'
document.getElementById('convert-button').addEventListener('click', convertCurrency);
document.getElementById('clear-button').addEventListener('click', function () {
    document.getElementById('value-input').value = '';
    document.getElementById('value-output').innerText = '';
});