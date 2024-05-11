document.addEventListener('DOMContentLoaded', function () {
    // Initial summary values
    let totalAvailable = 0;
    let totalSold = 0;
  
    // Function to update summary
    function updateSummary() {
      document.getElementById('totalAvailable').innerText = totalAvailable;
      document.getElementById('totalSold').innerText = totalSold;
    }
  
    // Function to render available dolls table
    function renderAvailableDolls(dolls) {
      const tableBody = document.getElementById('availableDollsBody');
      tableBody.innerHTML = ''; // Clear table body first
      dolls.forEach(doll => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${doll.number}</td>
          <td><button class="sell-button" data-doll-id="${doll.id}">Sell Now</button></td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    // Function to render sold dolls table
    function renderSoldDolls(dolls) {
      const tableBody = document.getElementById('soldDollsBody');
      tableBody.innerHTML = ''; // Clear table body first
      dolls.forEach(doll => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${doll.number}</td>`;
        tableBody.appendChild(row);
      });
    }
  
    // Sample data (replace with your actual doll data)
    const availableDolls = [
      { id: 1, number: 'Doll 1' },
      { id: 2, number: 'Doll 2' },
      { id: 3, number: 'Doll 3' }
    ];
  
    const soldDolls = [
      { id: 4, number: 'Doll 4' },
      { id: 5, number: 'Doll 5' }
    ];
  
    // Initial render
    renderAvailableDolls(availableDolls);
    renderSoldDolls(soldDolls);
    updateSummary();
  
    // Event listener for sell button
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('sell-button')) {
        const dollId = parseInt(event.target.dataset.dollId);
        // Implement logic to sell the doll with dollId
        // Here, you can remove the doll from availableDolls and add it to soldDolls
        // Update totalAvailable and totalSold accordingly
        totalAvailable--; // For example, decrement totalAvailable
        totalSold++; // For example, increment totalSold
        updateSummary();
        // Re-render tables
        renderAvailableDolls(availableDolls);
        renderSoldDolls(soldDolls);
      }
    });
  });
  