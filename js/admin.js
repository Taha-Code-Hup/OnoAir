// Handle flight management
const flights = JSON.parse(localStorage.getItem('flights')) || [];
const destinations = JSON.parse(localStorage.getItem('destinations')) || [];

document.getElementById('addFlightForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const flightNo = event.target.flightNo.value;
    const origin = event.target.origin.value;
    const destination = event.target.destination.value;
    const date = event.target.date.value;

    const newFlight = { flightNo, origin, destination, date };
    flights.push(newFlight);
    localStorage.setItem('flights', JSON.stringify(flights));
    displayFlights();
    event.target.reset();
});

document.getElementById('addDestinationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const code = event.target.code.value;

    const newDestination = { name, code };
    destinations.push(newDestination);
    localStorage.setItem('destinations', JSON.stringify(destinations));
    displayDestinations();
    event.target.reset();
});

// Display flights
function displayFlights() {
    const tableBody = document.querySelector('#flightsTable tbody');
    tableBody.innerHTML = '';
    flights.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flightNo}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Display destinations
function displayDestinations() {
    const destinationsList = document.querySelector('#destinationsList');
    destinationsList.innerHTML = '';
    destinations.forEach(destination => {
        const li = document.createElement('li');
        li.textContent = `${destination.name} (${destination.code})`;
        destinationsList.appendChild(li);
    });
}

// Display content on page load
window.onload = function() {
    displayFlights();
    displayDestinations();
};
