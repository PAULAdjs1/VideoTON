const API_URL = "http://localhost:8080/movies";
let movies = [];
let deleteId = null;

//getMovies();
window.addEventListener('DOMContentLoaded',()=> { 
getMovies();
})

function getMovies() {
  fetch("http://localhost:8080/movies")
    .then((response) => response.json())
    .catch((error) => {
      alertManager("error", 'Ocurió un problema al cargar las peliculas');
    })
    .then((data) => {
      movies = data.data;
      printMovies(data);
    });
}



const moviesList = document.querySelector("#moviesList");

function printMovies(data) {
  let moviesList = document.getElementById("main");

  let ulElement = document.createElement("div");

  moviesList.appendChild(ulElement);
  let listHTML = ""; 
  data.forEach((movie) => {
    listHTML += 
    `
    <div class = "card">
    <div> title: ${movie.title}</div>
    <div> image: ${movie.coverImage}</div>
    <div> director: ${movie.director}</div>
    <div> year: ${movie.year}</div>
    <div> synopsis: ${movie.synopsis}</div>
    <div> book: ${movie.book}</div>
    <div> renter: ${movie.renter}</div>
    <div> rating: ${movie.rating}</div>
    <div class= "options">
        <button type = "button" onclick="editMovie(${movie.id})">Editar</button>
        <button type = "button" onclick="deleteMovie(${movie.id})">Eliminar</button>  
    </div>
    </div>
    `
    
  });
  moviesList.innerHTML = listHTML;
}


const formMovie = document.querySelector("#formAdd");
formMovie.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formMovie);
  if (
    !formData.get("title").length ||
    !formData.get("coverImage") ||
    !formData.get("director") ||
    !formData.get("year") ||
    !formData.get("synopsis")
  ) {
    console.log("You should fill in all the form");
    document.querySelector('#msgFormAdd').innerHTML = 'You should fill in all the form';
        return;
  }

  const movie = {
    title: formData.get("title"),
    coverImage: formData.get("coverImage"),
    director: formData.get("director"),
    year: parseInt(formData.get("year")),
    synopsis: formData.get("synopsis"),
    book: false,
    renter: null,
    rating: 0
  };
  console.log(movie);

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      alertManager("error", error);
      document.querySelector("#formAdd").reset();
    })

    .then((response) => {
      alertManager("success", response.mensaje);
      getMovies();
    });
});


const createMovie = () => {
  const formData = new FormData(document.querySelector("#formAdd"));
  console.log(formData);
};

const editMovie = (id) => {
  let movie = {};
  movies.filter((mov) => {
    if (mov.id == id) {
      movie = mov
    }
  });

  document.querySelector("#formEdit #Id").value = movie.id;
  document.querySelector("#formEdit #title").value = movie.title;
  document.querySelector("#formEdit #coverImage").value = movie.coverImage;
  document.querySelector("#formEdit #director").value = movie.director;
  document.querySelector("#formEdit #year").value = movie.year;
  document.querySelector("#formEdit #synopsis").value = movie.synopsis;
  document.querySelector("#formEdit #book").value = movie.book;
  document.querySelector("#formEdit #renter").value = movie.renter;
  document.querySelector("#formEdit #rating").value = movie.rating;

  console.log(movie);
  openModalEdit();
};

const updateMovie = () => {
  const movie = {
    title: document.querySelector("#formEdit #title").value,
    coverImage: document.querySelector("#formEdit #coverimage").value,
    director: document.querySelector("#formEdit #director").value,
    year: document.querySelector("#formEdit #year").value,
    synopsis: document.querySelector("#formEdit #synopsis").value,
    book: document.querySelector("#formEdit #book").value,
    renter: document.querySelector("#formEdit #renter").value,
    rating: document.querySelector("#formEdit #rating").value,
    id: document.querySelector("#formEdit #id").value
  };
  if (
    !movie.title ||
    !movie.coverImage ||
    !movie.director ||
    !movie.year ||
    !movie.synopsis||
    !movie.book||
    !movie.renter||
    !movie.rating

  ) {
    document.querySelector("#msgFormEdit").innerHTML =
      "You should fill in all the spaces";
    return;
  }

  document.querySelector("#msgFormEdit").innerHTML = "";

  fetch(API_URL, {
    method: "PUT",
    body: JSONs.stringify(movie),
    headers: {
      'Content-Type': "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      alertManager("error", error);
    })
    .then((response) => {
      alertManager("success", response.mensaje);
      getMovies();
    });
  document.querySelector("#formEdit").reset();
};

const deleteMovie = (id) => {
  fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      alertManager("error", error);
    })
    .then((response) => {
      alertManager("success", response.mensaje);
      closeModalCofirm();
      getMovies();
      deleteId = null;
    });
};

const confirmDelete = (res) => {
  if (res) {
    deleteMovie(deleteId);
  } else {
    closeModalCofirm();
  }
};



/**Modal Add Manager */

const btnAdd = document.querySelector("#btnAdd");
const modalAdd = document.querySelector("#modalAdd");

btnAdd.onclick = () => openModalAdd();

window.onclick = function (event) {
  if (event.target == modalAdd) {
  }
};

const closeModalAdd = () => {
  modalAdd.style.display = "none";
};

const openModalAdd = () => {
  modalAdd.style.display = "block";
};

/**Modal Edit Manager */
const btnEdit = document.querySelector("#editMovie"); /*Añadido*/
const modalEdit = document.querySelector("#modalEdit");
const openModalEdit = () => {
  modalEdit.style.display = "block";
};
const closeModalEdit = () => {
  modalAdd.display.display = "none";
};

// Modal confirm Manager

const modalConfirm = document.getElementById("#modalConfirm");

window.onclick = function (event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  }
};

const closeModalCofirm = () => {
  modalConfirm.style.display = "none";
};

const openModalCofirm = (id) => {
  deleteId = id;
  //idForDelete = id;
  modalConfirm.style.display = "block";
};

/**Alert*/
const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert");

  alert.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3000);
};