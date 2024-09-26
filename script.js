document.getElementById('calculationType').addEventListener('change', function() {
    const selectedCalculation = this.value;
    const inputFields = document.getElementById('inputFields');

    // Show input fields if a calculation is selected
    inputFields.style.display = selectedCalculation ? 'block' : 'none';
});

document.getElementById('calculateBtn').addEventListener('click', function() {
    const calculationType = document.getElementById('calculationType').value;
    const numbersInput = document.getElementById('numbers').value;
    const numbers = numbersInput.split(',').map(num => parseFloat(num.trim()));

    if (calculationType && numbers.length > 0) {
        // Make a fetch request to your backend API
        fetch(`http://localhost:8080/calculate/${calculationType}?numbers=${numbers}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = data.result; // Assuming the API returns a result field
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').innerText = 'An error occurred.';
            });
    } else {
        document.getElementById('result').innerText = 'Please select a calculation and enter numbers.';
    }
});
