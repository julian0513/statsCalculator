let storedNumbers = []; // Global variable to store the input values

// ** Function to greet the user ** //
function greetUser() {
    alert("Welcome to the Statistics Calculator!");
}

// ** Function to call the backend Java code (Spring Boot) and calculate the statistics ** //
function calculateStatistics() {
    console.log("Calculate button clicked.");   // Log when the button is clicked
    const selectedCalculation = document.getElementById("calculation").value; // Gets the selected calculation type from the dropdown
    console.log(`Selected Calculation: ${selectedCalculation}`); // Log selected calculation
    const userInput = document.getElementById("numbers").value;
    console.log(`User Input: ${userInput}`); // Log user input
    const numbers = userInput.split(",").map(Number); // Convert input to an array of numbers
    console.log(numbers); // Check the contents of the numbers array

    if (numbers.some(isNaN)) { // Check if the input is valid (is Not A Number)
        displayResult("Error", "Please enter valid numbers separated by commas.", ''); // Show error message
        return;
    }

    storedNumbers = numbers; // Store valid numbers for calculation
    performCalculation(selectedCalculation); // Perform the calculation
}

// ** Function to perform the calculation based on the selected type ** //
function performCalculation(calculationType) {
    switch (calculationType) {
        case "mean":
            calculateMean(storedNumbers);
            break;
        case "median":
            calculateMedian(storedNumbers);
            break;
        case "range":
            calculateRange(storedNumbers);
            break;
        case "standard-deviation":
            calculateStandardDeviation(storedNumbers);
            break;
        case "sample-variance":
            calculateSampleVariance(storedNumbers);
            break;
        default:
            displayResult("Error", "Unknown calculation selected.", '');
            break;
    }
}

// ** Function to call the backend and calculate the mean ** //
function calculateMean(numbers) {
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/mean', { // Updated URL to fetch from backend host, not local host 8080 for testing
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers) // Sends the numbers array as JSON to the server
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json(); // Converts the response to JSON format
        })
        .then(data => {
            // Step 4: Format the calculation steps
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>")
                .replace(/(Step \d+:)/g, "<strong>$1</strong>")
                .replace(/(Result:)/g, "<strong>$1</strong>");

            // Step 5: Display results with formatted steps
            displayResult("Mean", data.result, data.explanation, formattedSteps); // Display mean and explanation
            displaySteps(formattedSteps); // Display calculation steps with formatted line breaks
        })
        .catch(error => displayResult("Error", `Error: ${error.message}`, '')); // Handle any fetch errors
}

// ** Function to call the backend and calculate the median ** //
function calculateMedian(numbers) {
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/median', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers)
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json();
        })
        .then(data => {
            // Format the calculation steps
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>")
                .replace(/(Step \d+:)/g, "<strong>$1</strong>")
                .replace(/(Result:)/g, "<strong>$1</strong>");


            displayResult("Median", data.result, data.explanation, formattedSteps); // Display median and explanation
            displaySteps(formattedSteps); // Display calculation steps with formatted line breaks
        })
        .catch(error => displayResult("Error", `Error: ${error.message}`, ''));
}

// ** Function to call the backend and calculate the range ** //
function calculateRange(numbers) {
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/range', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers)
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json();
        })
        .then(data => {
            // Format the calculation steps
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>")
                .replace(/(Step \d+:)/g, "<strong>$1</strong>")
                .replace(/(Result:)/g, "<strong>$1</strong>");

            displayResult("Range", data.result, data.explanation, formattedSteps); // Display range and explanation
            displaySteps(formattedSteps); // Display calculation steps with formatted line breaks
        })
        .catch(error => displayResult("Error", `Error: ${error.message}`, ''));
}

// ** Function to call the backend and calculate standard deviation ** //
function calculateStandardDeviation(numbers) {
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/standard-deviation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers)
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json();
        })
        .then(data => {
            // Format the calculation steps
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>")
                .replace(/(Step \d+:)/g, "<strong>$1</strong>")
                .replace(/(Result:)/g, "<strong>$1</strong>");


            displayResult("Standard Deviation", data.result, data.explanation, formattedSteps); // Display std deviation and explanation
            displaySteps(formattedSteps); // Display calculation steps with formatted line breaks
        })
        .catch(error => displayResult("Error", `Error: ${error.message}`, ''));
}

// ** Function to call the backend and calculate sample variance ** //
function calculateSampleVariance(numbers) {
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/sample-variance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers)
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json();
        })
        .then(data => {
            // Format the calculation steps
            const formattedSteps = data.calculationSteps


                .replace(/\n/g, "<br>")
                .replace(/(Step \d+:)/g, "<strong>$1</strong>")
                .replace(/(Result:)/g, "<strong>$1</strong>");



            displayResult("Sample Variance", data.result, data.explanation, formattedSteps); // Display sample variance and explanation
            displaySteps(formattedSteps); // Display calculation steps with formatted line breaks
        })
        .catch(error => displayResult("Error", `Error: ${error.message}`, ''));
}

// ** Function to display the result with proper formatting ** //
function displayResult(title, result, explanation) {
    const resultElement = document.getElementById("result"); // Get the HTML element with ID "result"
    resultElement.innerHTML = ''; // Clear any previous results displayed

    // Create a div to hold the result and explanation
    const resultDiv = document.createElement('div'); // Create a new div element
    resultDiv.style.textAlign = 'center'; // Center-align the content

    // Create and append the title and result
    const titleElement = document.createElement('h2'); // Create an h2 element for the title
    titleElement.innerHTML = `${result}`; // Set the inner HTML to display the title and calculated result

    // Create and append the explanation
    const explanationElement = document.createElement('p'); // Create a paragraph for the explanation
    explanationElement.innerHTML = `${explanation}`; // Set the inner HTML to display the explanation

    // Append title and explanation to the result div
    resultDiv.appendChild(titleElement); // Add title to the result div
    resultDiv.appendChild(explanationElement); // Add explanation to the result div

    // Append the result div to the result element
    resultElement.appendChild(resultDiv); // Add the complete result div to the main result element
}

// ** Function to display the steps in the right section ** //
function displaySteps(steps) {
    const stepsElement = document.getElementById("stepsDisplay"); // Get the HTML element for steps
    stepsElement.innerHTML = ''; // Clear any previous steps displayed

    // Create a paragraph for the steps
    const stepsParagraph = document.createElement('p');
    stepsParagraph.innerHTML = `${steps}`; // Set the inner HTML to display the calculation steps

    // Append the steps paragraph to the steps display element
    stepsElement.appendChild(stepsParagraph); // Add steps to the right section
}

// ** Event listener for the calculate button ** //
document.getElementById("calculate").addEventListener("click", calculateStatistics); // Call the calculate function on button click

// ** Event listener for the dropdown change to automatically recalculate ** //
document.getElementById("calculation").addEventListener("change", (event) => {
    const selectedType = event.target.value; // Get selected calculation type
    if (storedNumbers.length > 0) { // Check if there are stored numbers
        performCalculation(selectedType); // Automatically perform calculation
    }
});

// Start the calculator
greetUser(); // Call function to greet the user when the application starts
