  // JavaScript code for setting current time when clocking in
  document.getElementById("clockInForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get current time
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    
    // Set clock in time input value
    document.getElementById("clockInTime").value = formattedTime;
});