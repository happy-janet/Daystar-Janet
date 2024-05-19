document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
  
    searchForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        // Redirect to search results page or perform AJAX request to fetch results
        window.location.href = "/search?q=" + encodeURIComponent(query);
      }
    });
  });
  