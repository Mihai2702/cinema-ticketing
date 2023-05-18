let price;
const container = document.querySelector('.container');

// Update the count number of the seats
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const selectedSeatsCount = selectedSeats.length - 1;

  document.querySelector('#count').innerText = selectedSeatsCount;
};

// Calculate the total price of selected seats
const calculateTotalPrice = () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const selectedSeatsCount = selectedSeats.length - 1;

  const ticketPrice = price;
  const totalPrice = selectedSeatsCount * ticketPrice;

  document.querySelector('#total').innerText = totalPrice;
};

const fetchJsonData = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const seatingArrangement = data.arrangement;
      price = data.price;
      generateSeats(seatingArrangement);
      calculateTotalPrice();
    });
};

const handleMovieSelection = () => {
  const movieSelect = document.getElementById('movie');
  const selectedMovieValue = movieSelect.value;
  let url;

  switch (selectedMovieValue) {
    case '1':
      url = 'proiectii/1.json';
      break;
    case '2':
      url = 'proiectii/2.json';
      break;
    case '3':
      url = 'proiectii/3.json';
      break;
  }
  fetchJsonData(url);
};

const generateSeats = seatingArrangement => {
  container.innerHTML = ''; // Clear existing seats

  seatingArrangement.forEach((row, rowIndex) => {
    const seatRow = document.createElement('div');
    seatRow.classList.add('row');

    row.forEach((seatType, seatIndex) => {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.classList.add(`seat-${seatIndex + 1}`);

      if (seatType === 1) {
        seat.classList.add('occupied');
      } else if (seatType === 2) {
        seat.classList.add('corridor');
      }
      if (seatType === 0) {
        seat.addEventListener('click', () => {
          seat.classList.toggle('selected');
          updateSelectedCount();
          calculateTotalPrice();
        });
      }
      seatRow.appendChild(seat);
    });

    container.appendChild(seatRow);
  });
};

const movieSelect = document.getElementById('movie');
movieSelect.addEventListener('change', handleMovieSelection);

handleMovieSelection();
