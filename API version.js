const apiKey = "9a42f0cc879a94dfdf42677dc55e9e90";
const container = document.getElementById("movies");
let movies = [];

// Function to fetch movie data from TMDB API
function fetchMovies() {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=4`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      movies = data.results;
      filterMovies("all");
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

// Function to filter and display movies based on the selected category
function filterMovies(category) {
  // Clear the existing movies in the container
  container.innerHTML = "";

  // Filter the movies based on the selected category
  let filteredMovies = [];

  if (category === "all") {
    filteredMovies = movies; // Show all movies
  } else if (category === "trending") {
    filteredMovies = movies.filter((movie) => movie.popularity > 1000);
  } else if (category === "oldies") {
    filteredMovies = movies.filter(
      (movie) => movie.release_date < "2000-01-01"
    );
  } else if (category === "top-rated") {
    filteredMovies = movies.filter((movie) => movie.vote_average >= 8.0);
  } else if (category === "new") {
    filteredMovies = movies.filter(
      (movie) => movie.release_date >= "2023-01-01"
    );
  }

  // Render the filtered movies
  filteredMovies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });
}

// Helper function to create a movie card element
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  const posterWrapper = document.createElement("div");
  posterWrapper.classList.add("poster-wrapper");

  const poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
  posterWrapper.appendChild(poster);

  const title = document.createElement("h2");
  title.textContent = movie.original_title;
  card.appendChild(posterWrapper);
  card.appendChild(title);

  // Add hover effect to show the title
  card.addEventListener("mouseenter", () => {
    title.style.opacity = "1";
  });

  card.addEventListener("mouseleave", () => {
    title.style.opacity = "0";
  });

  return card;
}

// Add event listeners to the filter buttons
const filterButtons = document.querySelectorAll(".filter-buttons button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.id.replace("filter-", ""); // Extract the filter category from the button ID
    filterMovies(filter);
    highlightButton(button);
  });
});

// Helper function to highlight the active button
function highlightButton(activeButton) {
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");
}

// Fetch movies and start the filtering process
fetchMovies();
