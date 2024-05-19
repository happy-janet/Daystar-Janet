document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", function(event) {
    let isValid = true;
    let errorMessage = "";

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const location = document.getElementById("location").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const gender = document.getElementById("gender").value;
    const nextOfKin = document.getElementById("nextOfKin").value.trim();
    const nin = document.getElementById("nin").value.trim();
    const recommender = document.getElementById("recommender").value.trim();
    const educationLevel = document.getElementById("educationLevel").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const sittersNumber = document.getElementById("sittersNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!firstName) {
      isValid = false;
      errorMessage += "First Name is required.\n";
    }

    if (!lastName) {
      isValid = false;
      errorMessage += "Last Name is required.\n";
    }

    if (!location) {
      isValid = false;
      errorMessage += "Location is required.\n";
    }

    if (!dob) {
      isValid = false;
      errorMessage += "Date of Birth is required.\n";
    }

    if (!gender) {
      isValid = false;
      errorMessage += "Gender is required.\n";
    }

    if (!nextOfKin) {
      isValid = false;
      errorMessage += "Next of Kin is required.\n";
    }

    if (!nin) {
      isValid = false;
      errorMessage += "National Identification Number (NIN) is required.\n";
    }

    if (!recommender) {
      isValid = false;
      errorMessage += "Recommender's Name is required.\n";
    }

    if (!educationLevel) {
      isValid = false;
      errorMessage += "Level of Education is required.\n";
    }

    if (!contact) {
      isValid = false;
      errorMessage += "Contact is required.\n";
    }

    if (!sittersNumber) {
      isValid = false;
      errorMessage += "Babysitter's Number is required.\n";
    }

    if (!email) {
      isValid = false;
      errorMessage += "Email is required.\n";
    } else if (!emailPattern.test(email)) {
      isValid = false;
      errorMessage += "Invalid email format.\n";
    }

    if (!isValid) {
      alert(errorMessage);
      event.preventDefault();
    }
  });
});
