/*fetch(localhots:8080/movies)
.then(Response => Response.json() )
.then(commits =>alert (commits[0].author.login));

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies (localhots:8080/movies)

async function getMovies(localhots:8080/movies){
    const res = await fetch (localhots:8080/movies)
    const data = await res.json()
    console.log(data)
    showMovies(data)
}

async function getMoviesSearch(url, searchterm){
    const res = await fetch (localhots:8080/movies)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowercase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)

}*/

const API_URL = 'http://localhost:8080/movies';
let movies = [];

window.addEventListener('DOMContentLoaded',()=>{
    getMovies();
})

const getMovies = () => {
    fetch(API_URL)
    .then(Response=> Response.json())
    .catch(error=>{
        alertManager('error', 'Ocurrio un error al cargar las peliculas');
    })
    .then(data =>{
        movies = data.data;
        console.log(data.data)
        renderResult(movies);
    })
}

const moviesList = document.querySelector('#moviesList');

const renderResult = (movies) => {
    let listHtml = "";
    movies.forEach(movie => {
        listHtml += `
        <div class = "Pelicula">
            <div> Title: ${movies.title}</div>
            <div> Imaje: ${movies.coverimage}</div>
            <div> Director: ${movies.director}</div>
            <div> Year: ${movies.year}</div>
            <div> Sinopsis: ${movies.sinopsis}</div>
            <div class= "options">
                <button type = "button" onclick="editMovie(${movie.id})">Editar</button>
                <button type = "button">Eliminar</button>  
            </div>
        </div>
        `
    })
    
    moviesList.innerHTML = listHtml;
}

const createMovie = () => {
    const formData = new FormData(document.querySelector(''/*poner ide del formulario*/));
        if(!formData.get('title').length ||!formData.get('coverImage') ||!formData.get('director') ||!formData.get('year') ||!formData.get('sinopsis'))) {
        document.querySelector('#msgFormAdd /*Cambiar por el mombre del formulario*/').innerHTML = 'You should fill in all the form';
        return;
        }
    
    document.querySelector('#msgFormAdd').innerHTML = '';

    const movie = {
        Nombre : formData.get('title'),
        CoverImage : formData.get('coverImage'),
        Derector : formData.get('director'),
        Year : formData.get('year'),
        Sinopsis : formData.get('sinopsis'),
    }
    console.log(movie)

    fetch(API_URL, {
        method: 'POST', 
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'aplication/JSON'
        }
    })
        .then(res => res.json())
        .catch(arror => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();  
        })

        .then(response => {
           alertManager('seccess', response.mensaje)
           getMovies();
        })
}
    
const editMovie = (id) => {
    let movie = {};
    movies.filter(mov => {
        if(mov.Id == id){
            movie = mov
        }
    })

    document.querySelector('#formEdit #ID').value = movie.Id;
    document.querySelector('#formEdit #title').value = movie.Title;
    document.querySelector('#formEdit #coverimage').value = movie.Coverimage;
    document.querySelector('#formEdit #director').value = movie.Director;
    document.querySelector('#formEdit #year').value = movie.Year;
    document.querySelector('#formEdit #sinopsis').value = movie.Sinopsis;

    console.log(movie);
    openModalEdit();
}

const updateMovies = () => {
    const movie = {
        Titel: document.querySelector('#formEdit #title').value,
        Coverimage: document.querySelector('#formEdit #coverimage').value,
        Director: document.querySelector('#formEdit #director').value,
        Year: document.querySelector('#formEdit #year').value,
        Sinopsis: document.querySelector('#formEdit #sinopsis').value,
        Id: document.querySelector(#'formEdit #ID').value,
    }
    if(!movie.Title ||!movie.CoverImage ||!movie.Director ||!movie.Year ||!movie.Sinopsis) {
        document.querySelector('#msgFormEdit /*Cambiar por el mombre del formulario*/').innerHTML = 'You should fill in all the spaces';
        return;
        }
    
    document.querySelector('#msgFormAdd').innerHTML = '';

    fetch(API_URL,{
        method: 'PUT',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => {
        alertManager('error', error);
    })
    .then(response => {
        alertManager('success', response.mensaje);
        getMovies ()
    })
}



/**Modal Add Manager */

const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('modalAdd');

btnAdd.onclick = () =>openModalAdd();

window.onclick = function(event){
    if(event.target == modalAdd){

    }
}

const closeModalAdd = () => {
    modalAdd.getElementsByClassName.display = 'none';
}

const openModalAdd = () => {
    modalAdd.getElementsByClassName.display = 'block';
}

/**Modal Edit Manager */

const modalEdit = document.querySelector(#modalEdit);
const openModalEdit = () => {
    modalEdit.style.display = 'block';
}
const closeModalEdit = () => {
    modalAdd.getElementsByClassName.display = 'none';
}


// Modal confirm Manager

const modalConfirm = document.getElementById('modalConfirm');

window.onclick = function (event) {
    if (event.target == modalConfirm){
        modalConfirm.style.display = "none";
    }
}

const closeModalCofirm = () => {
    modalConfirm.style.display = 'none';
}

const openModalCofirm = (id) => {
    idForDelete = id;
    modalConfirm.style.display = 'none';
}


/**Alert*/

const alertManager = (type, message) => {
    const alert = document.querySelector('alert');
    alert.innerHtML  = message || 'Changed';
    alert.classList.add(typeMsg);
    alert.getElementsByClassName.display = 'block';

    setTimeout(() => {
        alert.getElementsByClassName.display = 'nome';
        alert.classList.remove(typeMsg);
    }, 3500);
}
