document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("checkinForm");
  
    form.addEventListener("submit", function(event) {
      let isValid = true;
      let errorMessage = "";
  
      const babyName = document.querySelector("[name='babyName']").value.trim();
      const babyGender = document.querySelector("[name='babyGender']").value;
      const babyAge = document.querySelector("[name='babyAge']").value.trim();
      const babyLocation = document.querySelector("[name='babyLocation']").value.trim();
      const guardianName = document.querySelector("[name='guardianName']").value.trim();
      const arrivalTime = document.querySelector("[name='arrivalTime']").value.trim();
      const parentsNames = document.querySelector("[name='parentsNames']").value.trim();
      const stayDuration = document.querySelector("[name='stayDuration']").value.trim();
      const amount = document.querySelector("[name='amount']").value;
      const sitter = document.querySelector("[name='sitter']").value;
      const babyNumber = document.querySelector("[name='babyNumber']").value.trim();
  
      if (!babyName) {
        isValid = false;
        errorMessage += "Baby Name is required.\n";
      }
  
      if (!babyGender) {
        isValid = false;
        errorMessage += "Gender is required.\n";
      }
  
      if (!babyAge || isNaN(babyAge) || babyAge <= 0) {
        isValid = false;
        errorMessage += "Valid Age is required.\n";
      }
  
      if (!babyLocation) {
        isValid = false;
        errorMessage += "Location is required.\n";
      }
  
      if (!guardianName) {
        isValid = false;
        errorMessage += "Guardian's Name is required.\n";
      }
  
      if (!arrivalTime) {
        isValid = false;
        errorMessage += "Arrival Time is required.\n";
      }
  
      if (!parentsNames) {
        isValid = false;
        errorMessage += "Parents' Names are required.\n";
      }
  
      if (!stayDuration || isNaN(stayDuration) || stayDuration <= 0) {
        isValid = false;
        errorMessage += "Valid Stay Duration is required.\n";
      }
  
      if (!amount) {
        isValid = false;
        errorMessage += "Amount is required.\n";
      }
  
      if (!sitter) {
        isValid = false;
        errorMessage += "Sitter selection is required.\n";
      }
  
      if (!babyNumber) {
        isValid = false;
        errorMessage += "Baby Number is required.\n";
      }
  
      if (!isValid) {
        alert(errorMessage);
        event.preventDefault();
      }
    });
  });
  