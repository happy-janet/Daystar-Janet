document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Collect form data
    let formData = new FormData(this);
  
    // Convert FormData to JSON
    let jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
  
    // Basic validation
    if (!jsonData["firstName"] || !jsonData["lastName"] || !jsonData["location"] || !jsonData["dob"] || !jsonData["gender"] || !jsonData["nextOfKin"] || !jsonData["nin"] || !jsonData["recommender"] || !jsonData["educationLevel"] || !jsonData["contact"] || !jsonData["sittersNumber"]) {
      alert("Please fill in all fields.");
      return;
    }
  
  
    // Display collected data 
    console.log(jsonData);
    alert("Registration successful!"); 
  });
  