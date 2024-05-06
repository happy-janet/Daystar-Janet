// Dummy data for demonstration
const scheduleData = [
    { sitterName: "Sitter 1", babies: [
        { name: "Baby 1", gender: "Male", age: "6 months", arrivalTime: "09:00 AM" },
        { name: "Baby 2", gender: "Female", age: "8 months", arrivalTime: "10:00 AM" }
    ] },
    { sitterName: "Sitter 2", babies: [
        { name: "Baby 3", gender: "Male", age: "10 months", arrivalTime: "11:00 AM" },
        { name: "Baby 4", gender: "Female", age: "7 months", arrivalTime: "12:00 PM" },
        { name: "Baby 5", gender: "Male", age: "9 months", arrivalTime: "01:00 PM" }
    ] }
    // Add more sitter and baby data as needed
];

// Function to display sitters and their assigned babies
function displaySchedule() {
    const scheduleTableBody = document.getElementById("schedule-table-body");

    // Clear previous rows
    scheduleTableBody.innerHTML = "";

    // Loop through schedule data and create HTML for each row
    scheduleData.forEach(sitter => {
        sitter.babies.forEach(baby => {
            const row = document.createElement("tr");
            if (sitter.babies.indexOf(baby) === 0) {
                row.innerHTML = `
                    <td rowspan="${sitter.babies.length}">${sitter.sitterName}</td>
                    <td>${baby.name}</td>
                    <td>${baby.gender}</td>
                    <td>${baby.age}</td>
                    <td>${baby.arrivalTime}</td>
                `;
            } else {
                row.innerHTML = `
                    <td>${baby.name}</td>
                    <td>${baby.gender}</td>
                    <td>${baby.age}</td>
                    <td>${baby.arrivalTime}</td>
                `;
            }
            scheduleTableBody.appendChild(row);
        });
    });
}

// Call the function to display schedule when the page loads
window.onload = function() {
    displaySchedule();
};
