const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.getElementById("add-movie-btn");
const movieList = document.getElementById("movie-list");
const backdrop = document.getElementById("backdrop");
const cancelMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovie = cancelMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;

  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  const deleteMovieModal = document.getElementById("delete-modal");
  deleteMovieModal.classList.remove("visible");
};

const startDeleteMovieHandler = (id) => {
  const deleteMovieModal = document.getElementById("delete-modal");
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");

  confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));
  confirmDeleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);

  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeleteMovieBtn.addEventListener(
    "click",
    deleteMovieHandler.bind(null, id)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
        <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element_info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        </div>
    `;
  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearUserInputs();
};

const clearUserInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

startAddMovieButton.addEventListener("click", showMovieModal);
cancelMovieButton.addEventListener("click", cancelAddMovieHandler);
backdrop.addEventListener("click", backdropClickHandler);

const addMovieHandler = () => {
  const titleVal = userInputs[0].value;
  const imageUrlVal = userInputs[1].value;
  const ratingVal = userInputs[2].value;

  if (titleVal.trim() === "" || imageUrlVal.trim() === "" || +ratingVal < 1) {
    alert("Please enter valid inputs!");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleVal,
    image: imageUrlVal,
    rating: ratingVal,
  };

  movies.push(newMovie);
  console.log(movies);
  showMovieModal();
  clearUserInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

confirmAddMovie.addEventListener("click", addMovieHandler);
