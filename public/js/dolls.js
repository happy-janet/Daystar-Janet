document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("dollForm");

  form.addEventListener("submit", function(event) {
    let isValid = true;
    let errorMessage = "";

    const dollName = document.querySelector("[name='dollName']").value.trim();
    const price = document.querySelector("[name='price']").value.trim();
    const number = document.querySelector("[name='number']").value.trim();

    if (!dollName) {
      isValid = false;
      errorMessage += "Doll Name is required.\n";
    }

    if (!price || isNaN(price) || price <= 0) {
      isValid = false;
      errorMessage += "Valid Price is required.\n";
    }

    if (!number || isNaN(number) || number <= 0) {
      isValid = false;
      errorMessage += "Valid Number is required.\n";
    }

    if (!isValid) {
      alert(errorMessage);
      event.preventDefault();
    }
  });
});
