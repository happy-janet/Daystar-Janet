// Function to handle check-in
function checkIn() {
    // Get the current time
    const currentTime = new Date().toLocaleTimeString();
    
    // Get the sitter's name (replace 'sitterName' with the actual variable holding the name)
    const sitterName = "Janet Aballo";
    
    // Construct the check-in message
    const checkInMessage = `Checked in at ${currentTime} - ${sitterName}`;

    // Display check-in message on the page
    const checkInMessageElement = document.getElementById("check-in-message");
    checkInMessageElement.textContent = checkInMessage;

    // Log check-in message to the console
    console.log(checkInMessage);
}

// Add event listener to the check-in button
document.getElementById("check-in-button").addEventListener("click", checkIn);
