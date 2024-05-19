function validateForm(event) {
    const email = document.forms["loginform"]["email"].value;
    const password = document.forms["loginform"]["password"].value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      alert("Email must be filled out");
      event.preventDefault();
      return false;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      event.preventDefault();
      return false;
    }

    if (!password) {
      alert("Password must be filled out");
      event.preventDefault();
      return false;
    }

    return true;
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginform").addEventListener("submit", validateForm);
  });