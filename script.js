const cont = document.querySelector('.container');
const seatingArea = document.getElementById('seating-area');

const arrangement = [
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 1, 1, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
  [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1],
  [0, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1],
];

for (let i = 0; i < arrangement.length; i++) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < arrangement[i].length; j++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');

    if (arrangement[i][j] === 1) {
      seat.classList.add('occupied');
    } else if (arrangement[i][j] === 2) {
      seat.classList.add('corridor');
    }

    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
    });

    row.appendChild(seat);
  }

  seatingArea.appendChild(row);
}

let selectedSeats = 0;

const seat = document.querySelectorAll('.seat:not(.occupied)');
seats.forEach(seat => {
  seat.addEventListener('click', () => {
    seat.classList.toggle('selected');
    console.info('selected');

    selectedSeats = document.querySelectorAll('.seat.selected').length;
  });
});

const cinemaSeats = document.getElementById('cinema-seats');
cinemaSeats.innerHTML = createSeats(seatsArrangement);

//seats selections
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

updateSelectedCount();
