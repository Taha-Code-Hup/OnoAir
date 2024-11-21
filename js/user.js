// Load bookings from localStorage
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
const flights = JSON.parse(localStorage.getItem('flights')) || [];

document.getElementById('bookingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const passport = event.target.passport.value;
    const flightNo = event.target.flightNo.value;
    const newBooking = { name, passport, flightNo };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert(`Booking confirmed for ${name}, Passport Number: ${passport}, Flight: ${flightNo}`);
    event.target.reset();
});

// Display My Bookings
window.onload = function() {
    if (document.getElementById('bookingsTable')) {
        const tableBody = document.querySelector('#bookingsTable tbody');
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.passport}</td>
                <td>${booking.flightNo}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Display available destinations in Search Flights
    if (document.getElementById('origin')) {
        const originSelect = document.getElementById('origin');
        const destinationSelect = document.getElementById('destination');
        destinations.forEach(destination => {
            let option = document.createElement('option');
            option.value = destination.code;
            option.textContent = destination.name;
            originSelect.appendChild(option);
            destinationSelect.appendChild(option.cloneNode(true));
        });
    }

    // Display available flights when searching
    if (document.getElementById('searchForm')) {
        const searchForm = document.getElementById('searchForm');
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const origin = event.target.origin.value;
            const destination = event.target.destination.value;

            const availableFlights = flights.filter(flight =>
                flight.origin === origin && flight.destination === destination);
            const flightList = document.getElementById('flightList');
            flightList.innerHTML = '';
            availableFlights.forEach(flight => {
                let li = document.createElement('li');
                li.textContent = `${flight.flightNo} from ${flight.origin} to ${flight.destination} on ${flight.date}`;
                flightList.appendChild(li);
            });
        });
    }
};
