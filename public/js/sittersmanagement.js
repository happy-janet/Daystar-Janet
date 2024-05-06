// document.getElementById("happy").addEventListener("click", function () {
//     var overlay = document.createElement("div");
//     overlay.classList.add("overlay");
  
//     var formContainer = document.createElement("div");
//     formContainer.classList.add("overlay-content");
//     formContainer.innerHTML = `
//           <button id="closeBtn" class="btn-close" aria-label="Close"></button>
//           <div class="container">
//     <h2>Babysitter Registration Form</h2>
//     <form id="registrationForm" class="form">
//       <div class="form-group">
//         <label for="firstName">First Name:</label>
//         <input type="text" id="firstName" name="firstName" />
//       </div>
//       <div class="form-group">
//         <label for="lastName">Last Name:</label>
//         <input type="text" id="lastName" name="lastName" />
//       </div>
//       <div class="form-group">
//         <label for="location">Location:</label>
//         <input type="text" id="location" name="location" />
//       </div>
//       <div class="form-group">
//         <label for="dob">Date of Birth:</label>
//         <input type="date" id="dob" name="dob" />
//       </div>
//       <div class="form-group">
//         <label for="gender">Gender:</label>
//         <select id="gender" name="gender">
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
//       <div class="form-group">
//         <label for="nextOfKin">Next of Kin:</label>
//         <input type="text" id="nextOfKin" name="nextOfKin" />
//       </div>
//       <div class="form-group">
//         <label for="nin">NIN:</label>
//         <input type="text" id="nin" name="nin" required />
//       </div>
//       <div class="form-group">
//         <label for="recommender">Recommender's Name:</label>
//         <input type="text" id="recommender" name="recommender" />
//       </div>
//       <div class="form-group">
//         <label for="educationLevel">Education Level:</label>
//         <input type="text" id="educationLevel" name="educationLevel" />
//       </div>
//       <div class="form-group">
//         <label for="contact">Contact:</label>
//         <input type="text" id="contact" name="contact" />
//       </div>
//       <div class="form-group">
//         <label for="sittersNumber">Sitter Number:</label>
//         <input type="text" id="sittersNumber" name="sittersNumber" />
//       </div>
//       <div class="btn">
//         <input type="submit" value="Register" />
//       </div>
//     </form>
//   </div>
  
          
//       `;
  
//     overlay.appendChild(formContainer);
//     document.body.appendChild(overlay);
  
//     document.getElementById("closeBtn").addEventListener("click", function () {
//       overlay.remove();
//     });
//   });
  
  // Function to validate the date format (YYYY-MM-DD)
  function isValidDate(dateString) {
    // Check if the input string matches the YYYY-MM-DD format
    let regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
  
    // Check if the date is valid
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }
  
    return true;
  }
  
  // Function to validate the phone number format
  function isValidPhoneNumber(phoneNumber) {
    // Check if the input string matches the phone number format (10 digits)
    let regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  }
  
  // Function to validate the form inputs
  function validateForm(formData) {
    // Check if all required fields are filled
    if (
      !formData["firstName"] ||
      !formData["lastName"] ||
      !formData["location"] ||
      !formData["dob"] ||
      !formData["gender"] ||
      !formData["nextOfKin"] ||
      !formData["nin"] ||
      !formData["sittersNumber"]
    ) {
      return "Please fill in all required fields.";
    }
  
    // Validate date format
    if (!isValidDate(formData["dob"])) {
      return "Invalid date format. Please use YYYY-MM-DD.";
    }
  
    // Validate phone number format
    if (formData["contact"] && !isValidPhoneNumber(formData["contact"])) {
      return "Invalid phone number format. Please enter 10 digits.";
    }
  
    // Additional validation logic can be added for other fields if necessary
  
    return ""; // Form is valid
  }
  
  // Event listener for form submission
  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Collect form data
      let formData = new FormData(this);
  
      // Convert FormData to JSON
      let jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
  
      // Validate the form
      let errorMessage = validateForm(jsonData);
      if (errorMessage) {
        alert(errorMessage);
        return;
      }
  
      // If the form is valid, proceed with form submission
  
      // Create a new table row to display the sitter information
      let table = document.getElementById("sitters-list");
      let newRow = table.insertRow(-1); // Insert new row at the end of the table
  
      // Populate the new row with sitter information
      newRow.innerHTML = `
      <td>${jsonData["firstName"]} ${jsonData["lastName"]}</td>
      <td>${jsonData["location"]}</td>
      <td>${jsonData["dob"]}</td>
      <td>${jsonData["gender"]}</td>
      <td>${jsonData["nextOfKin"]}</td>
      <td>${jsonData["nin"]}</td>
      <td>${jsonData["recommender"] || ""}</td>
      <td>${jsonData["educationLevel"] || ""}</td>
      <td>${jsonData["contact"] || ""}</td>
      <td>${jsonData["sittersNumber"]}</td>
    `;
  
      // Clear the form fields after submission
      document.getElementById("registrationForm").reset();
    });
  
  // Add event listeners for edit and delete buttons
  let editBtn = newRow.querySelector(".edit-btn");
  editBtn.addEventListener("click", function () {
    // Implement edit functionality
    // You can populate the form with sitter's data for editing
    // and update the table row after editing
    console.log("Edit sitter: ", jsonData);
  });
  
  let deleteBtn = newRow.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    // Implement delete functionality
    // You can remove the table row from the DOM
    newRow.remove();
    console.log("Delete sitter: ", jsonData);
  });
  
  // Append the new row to the table
  document.getElementById("sitters-list").appendChild(newRow);
  
  // Clear the form fields after submission
  this.reset();
  