const seatingArrangement = [
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 1, 1, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1],
  [0, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1],
];

const container = document.querySelector('.container');
const seats = [];

// Generate seats based on the arrangement array
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

    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
      updateSelectedCount();
      calculateTotalPrice();
    });

    seatRow.appendChild(seat);
    seats.push(seat);
  });

  container.appendChild(seatRow);
});

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const selectedSeatsCount = selectedSeats.length - 1;

  document.querySelector('#count').innerText = selectedSeatsCount;
};

// Calculate the total price of selected seats
const calculateTotalPrice = () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const selectedSeatsCount = selectedSeats.length - 1;

  const ticketPrice = movie.value;
  const totalPrice = selectedSeatsCount * ticketPrice;

  document.querySelector('#total').innerText = totalPrice;
};

updateSelectedCount();
calculateTotalPrice();
