document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("procurementForm");
  
    form.addEventListener("submit", function(event) {
      let isValid = true;
      let errorMessage = "";
  
      const item = document.getElementById("item").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const price = document.getElementById("price").value.trim();
      const supplier = document.getElementById("supplier").value.trim();
  
      if (!item) {
        isValid = false;
        errorMessage += "Item is required.\n";
      }
  
      if (!quantity || isNaN(quantity) || quantity <= 0) {
        isValid = false;
        errorMessage += "Valid quantity is required.\n";
      }
  
      if (!price || isNaN(price) || price <= 0) {
        isValid = false;
        errorMessage += "Valid price is required.\n";
      }
  
      if (!supplier) {
        isValid = false;
        errorMessage += "Supplier is required.\n";
      }
  
      if (!isValid) {
        alert(errorMessage);
        event.preventDefault();
      }
    });
  });
  