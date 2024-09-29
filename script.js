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


    storedNumbers = numbers;   // Store valid numbers for calculation
    performCalculation(selectedCalculation);   // Perform the calculation
}




// ** Function to perform the calculation based on the selected type ** //
function performCalculation(calculationType) {


    // Determine which calculation to perform based on the user's selection
    switch (calculationType) {


        // If the selected calculation type is "mean"
        case "mean":
            calculateMean(storedNumbers);    // Call the function to calculate the mean
            break;    // Exit the switch statement


        // If the selected calculation type is "median"
        case "median":
            calculateMedian(storedNumbers);    // Call the function to calculate the median
            break;


        // If the selected calculation type is "range"
        case "range":
            calculateRange(storedNumbers);    // Call the function to calculate the range
            break;


        // If the selected calculation type is "standard-deviation"
        case "standard-deviation":
            calculateStandardDeviation(storedNumbers);    // Call the function to calculate standard deviation
            break;


        // If the selected calculation type is "sample-variance"
        case "sample-variance":
            calculateSampleVariance(storedNumbers);    // Call the function to calculate sample variance
            break;



        // If none of the above cases match, handle the unknown calculation type
        default:
            displayResult("Error", "Unknown calculation selected.", ''); // Show error message
            break; // Exit the switch statement
    }
}



// ** Function to call the backend and calculate the mean ** //
function calculateMean(numbers) {

    // Fetch request to the backend API to calculate the mean of the given numbers
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/mean', {
        // Updated URL to fetch from backend host, not local host 8080 for testing

        method: 'POST', // Specify the request method as POST

        headers: {
            'Content-Type': 'application/json' // Indicate the type of content being sent
        },


        // Convert the numbers array into a JSON string to send in the request body
        body: JSON.stringify(numbers)
    })

        // Handle the response from the server
        .then(response => {


            // Check if the response is not ok (e.g., 404, 500 errors)
            if (!response.ok) throw new Error("Network response was not ok.");


            // Parse the JSON response from the server
            return response.json();
        })


        // Process the JSON data received from the server
        .then(data => {


            // Step 4: Format the calculation steps received in the response
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>") // Replace newline characters with HTML line breaks
                .replace(/(Step \d+:)/g, "<strong>$1</strong>") // Make step labels bold
                .replace(/(Result:)/g, "<strong>$1</strong>"); // Make result label bold



            // Step 5: Display results with formatted calculation steps
            displayResult("Mean", data.result, data.explanation, formattedSteps); // Show the mean result and explanation

            displaySteps(formattedSteps); // Display the formatted calculation steps
        })

        // Catch any errors that occur during the fetch operation
        .catch(error =>
            displayResult("Error", `Error: ${error.message}`, '')); // Show an error message if fetching fails
}




// ** Function to call the backend and calculate the median ** //

function calculateMedian(numbers) {

    // Fetch request to the backend API to calculate the median of the given numbers
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/median', {

        method: 'POST', // Specify the request method as POST

        headers: {
            'Content-Type': 'application/json' // Indicate the type of content being sent
        },

        // Convert the numbers array into a JSON string to send in the request body
        body: JSON.stringify(numbers)
    })

        // Handle the response from the server
        .then(response => {


            // Check if the response is not ok (e.g., 404, 500 errors)
            if (!response.ok) throw new Error("Network response was not ok.");


            // Parse the JSON response from the server
            return response.json();
        })


        // Process the JSON data received from the server
        .then(data => {


            // Format the calculation steps received in the response
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>") // Replace newline characters with HTML line breaks
                .replace(/(Step \d+:)/g, "<strong>$1</strong>") // Make step labels bold
                .replace(/(Result:)/g, "<strong>$1</strong>"); // Make result label bold


            // Display results with formatted calculation steps

            displayResult("Median", data.result, data.explanation, formattedSteps); // Show the median result and explanation

            displaySteps(formattedSteps); // Display the formatted calculation steps
        })

        // Catch any errors that occur during the fetch operation
        .catch(error =>
            displayResult("Error", `Error: ${error.message}`, '')); // Show an error message if fetching fails
}





// ** Function to call the backend and calculate the range ** //
function calculateRange(numbers) {

    // Send a POST request to the backend API to calculate the range of the given numbers
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/range', {

        method: 'POST', // Specify the request method as POST

        headers: {
            'Content-Type': 'application/json' // Indicate that the content type is JSON
        },



        // Convert the numbers array into a JSON string to send in the request body
        body: JSON.stringify(numbers)
    })



        // Handle the response from the server
        .then(response => {



            // Check if the response is ok; if not, throw an error
            if (!response.ok) throw new Error("Network response was not ok.");


            // Convert the response to JSON format
            return response.json();
        })


        // Process the JSON data received from the server
        .then(data => {


            // Format the calculation steps for display
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>") // Replace newline characters with HTML line breaks
                .replace(/(Step \d+:)/g, "<strong>$1</strong>") // Make step labels bold
                .replace(/(Result:)/g, "<strong>$1</strong>"); // Make result label bold



            // Display results with formatted calculation steps

            displayResult("Range", data.result, data.explanation, formattedSteps); // Show the range result and explanation

            displaySteps(formattedSteps); // Display the formatted calculation steps
        })

        // Catch and handle any errors that occur during the fetch operation
        .catch(error => displayResult("Error", `Error: ${error.message}`, '')); // Show an error message if fetching fails
}





// ** Function to call the backend and calculate standard deviation ** //
function calculateStandardDeviation(numbers) {

    // Send a POST request to the backend API to calculate the standard deviation of the given numbers
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/standard-deviation', {

        method: 'POST', // Specify the request method as POST

        headers: {
            'Content-Type': 'application/json' // Indicate that the content type is JSON
        },


        // Convert the numbers array into a JSON string to send in the request body
        body: JSON.stringify(numbers)
    })

        // Handle the response from the server
        .then(response => {


            // Check if the response is ok; if not, throw an error
            if (!response.ok) throw new Error("Network response was not ok.");


            // Convert the response to JSON format
            return response.json();
        })



        // Process the JSON data received from the server
        .then(data => {


            // Format the calculation steps for display
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>") // Replace newline characters with HTML line breaks
                .replace(/(Step \d+:)/g, "<strong>$1</strong>") // Make step labels bold
                .replace(/(Result:)/g, "<strong>$1</strong>"); // Make result label bold



            // Display results with formatted calculation steps
            displayResult("Standard Deviation", data.result, data.explanation, formattedSteps); // Show the std deviation result and explanation

            displaySteps(formattedSteps); // Display the formatted calculation steps
        })

        // Catch and handle any errors that occur during the fetch operation
        .catch(error => displayResult("Error", `Error: ${error.message}`, '')); // Show an error message if fetching fails
}





// ** Function to call the backend and calculate sample variance ** //
function calculateSampleVariance(numbers) {

    // Send a POST request to the backend API to calculate the sample variance of the given numbers
    fetch('https://statscalculator-30af3b97b04a.herokuapp.com/api/statistics/sample-variance', {

        method: 'POST', // Specify the request method as POST

        headers: {
            'Content-Type': 'application/json' // Indicate that the content type is JSON
        },


        // Convert the numbers array into a JSON string to send in the request body
        body: JSON.stringify(numbers)
    })

        // Handle the response from the server
        .then(response => {


            // Check if the response is ok; if not, throw an error
            if (!response.ok) throw new Error("Network response was not ok.");


            // Convert the response to JSON format
            return response.json();
        })


        // Process the JSON data received from the server
        .then(data => {

            // Format the calculation steps for display
            const formattedSteps = data.calculationSteps

                .replace(/\n/g, "<br>") // Replace newline characters with HTML line breaks
                .replace(/(Step \d+:)/g, "<strong>$1</strong>") // Make step labels bold
                .replace(/(Result:)/g, "<strong>$1</strong>"); // Make result label bold



            // Display results with formatted calculation steps
            displayResult("Sample Variance", data.result, data.explanation, formattedSteps); // Show the sample variance result and explanation

            displaySteps(formattedSteps); // Display the formatted calculation steps
        })

        // Catch and handle any errors that occur during the fetch operation
        .catch(error => displayResult("Error", `Error: ${error.message}`, '')); // Show an error message if fetching fails
}





// ** Function to display the result with proper formatting ** //
function displayResult(title, result, explanation) {


    // Get the HTML element with ID "result" to display results
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = '';   // Clear any previous results displayed


    // Create a div to hold the result and explanation
    const resultDiv = document.createElement('div'); // Create a new div element

    resultDiv.style.textAlign = 'center';     // Center-align the content


    // Create and append the title and result
    const titleElement = document.createElement('h2'); // Create an h2 element for the title

    titleElement.innerHTML = `${result}`;    // Set the inner HTML to display the title and calculated result


    // Create and append the explanation
    const explanationElement = document.createElement('p'); // Create a paragraph for the explanation

    explanationElement.innerHTML = `${explanation}`;    // Set the inner HTML to display the explanation



    // Append title and explanation to the result div
    resultDiv.appendChild(titleElement); // Add title to the result div
    resultDiv.appendChild(explanationElement); // Add explanation to the result div



    // Append the result div to the result element
    resultElement.appendChild(resultDiv); // Add the complete result div to the main result element
}




// ** Function to display the steps in the right section ** //
function displaySteps(steps) {


    // Get the HTML element for steps to display the calculation steps
    const stepsElement = document.getElementById("stepsDisplay");

    stepsElement.innerHTML = '';   // Clear any previous steps displayed


    // Create a paragraph for the steps
    const stepsParagraph = document.createElement('p');

    stepsParagraph.innerHTML = `${steps}`;    // Set the inner HTML to display the calculation steps


    // Append the steps paragraph to the steps display element
    stepsElement.appendChild(stepsParagraph); // Add steps to the right section
}



// ** Event listener for the calculate button ** //
document.getElementById("calculate").addEventListener("click", calculateStatistics); // Call the calculate function on button click


// ** Event listener for the dropdown change to automatically recalculate ** //
document.getElementById("calculation").addEventListener("change", (event) => {

    const selectedType = event.target.value; // Get the selected calculation type

    // Check if there are stored numbers before performing calculation
    if (storedNumbers.length > 0) {
        performCalculation(selectedType);    // Automatically perform calculation if numbers exist
    }
});

// Start the calculator
greetUser();   // Call function to greet the user when the application starts
