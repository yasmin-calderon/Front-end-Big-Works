const movies = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input');
const videoHL = document.querySelector('.highlight__video');
const titleHL = document.querySelector('.highlight__title');
const ratingHL = document.querySelector('.highlight__rating');
const genresHL = document.querySelector('.highlight__genres');
const launchHL = document.querySelector('.highlight__launch');
const descriptionHL = document.querySelector('.highlight__description');
const videoLinkHL = document.querySelector('.highlight__video-link');
const modal = document.querySelector('.modal');
const titleModal = document.querySelector('.modal__title');
const imgModal = document.querySelector('.modal__img');
const descriptionModal = document.querySelector('.modal__description');
const averageModal = document.querySelector('.modal__average');
const genresModal = document.querySelector('.modal__genres');
const closeModal = document.querySelector('.modal__close');
const body = document.querySelector('body');
const btnTheme = document.querySelector('.btn-theme');

btnTheme.addEventListener('click', function () {
  btnTheme.src = btnTheme.src.includes('light') ? './assets/dark-mode.svg' : './assets/light-mode.svg';

  function mudarTema(valor, cor1, cor2) {
    const novaCor = body.style.getPropertyValue(valor) === cor1 ? cor2 : cor1;
    body.style.setProperty(valor, novaCor);
  }

  function mudarTemaBtn(btn, img1, img2) {
    btn.src = body.style.getPropertyValue('--cor-de-fundo') === '#242424' ? btn.src = img1 : btn.src = img2;
  }

  mudarTema('--cor-de-fundo', '#242424', '#FFFFFF');
  mudarTema('--cor-de-texto', '#FFFFFF', '#000000');
  mudarTemaBtn(btnPrev, './assets/seta-esquerda-branca.svg', './assets/seta-esquerda-preta.svg');
  mudarTemaBtn(btnNext, './assets/seta-direita-branca.svg', './assets/seta-direita-preta.svg');
  mudarTema('--cor-de-input', '#FFFFFF', '#979797', '#FFFFFF');
  mudarTema('--cor-de-sombra-movie', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.8)');
  mudarTema('--cor-de-sombra-hl', 'rgba(255, 255, 255, 0.15)', 'rgba(0, 0, 0, 0.15)');
  mudarTema('--cor-de-fundo-hl', '#454545', '#FFFFFF');
  mudarTema('--cor-de-genre-hl', 'rgba(255, 255, 255, 0.7)', 'rgba(0, 0, 0, 0.7)');
  mudarTema('--cor-de-descripton-hl', 'rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)');
});

const endpointFilmes = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR';
const endpointBusca = 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=';
let indexStart = 0;
let indexEnd = 4;

function carregarFilmes(endpoint) {
  fetch(endpoint).then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
      body.results.forEach(function (filme) {
        const divMovie = document.createElement('div');
        divMovie.classList.add('movie');
        divMovie.id = filme.id;
        divMovie.style.backgroundImage = `url(${filme.poster_path})`;

        const divInfo = document.createElement('div');
        divInfo.classList.add('movie__info');

        const spanTitle = document.createElement('span');
        spanTitle.classList.add('movie__title');
        spanTitle.textContent = filme.title.length > 10 ? filme.title.slice(0, 10) + "..." : filme.title;

        const spanRating = document.createElement('span');
        spanRating.classList.add('movie__rating');
        spanRating.textContent = filme.vote_average;

        const spanImg = document.createElement('img');
        spanImg.src = './assets/estrela.svg';
        spanImg.alt = 'Estrela';

        spanRating.append(spanImg);
        divInfo.append(spanTitle, spanRating);
        divMovie.append(divInfo);
        movies.append(divMovie);

      });
    }).then(function () {
      const divMovies = document.querySelectorAll('.movie');

      atualizarFilmes(divMovies);

      divMovies.forEach(function (movie) {
        movie.addEventListener('click', function (event) {
          imgModal.src = '';
          genresModal.innerHTML = '';
          const movieId = event.target.id;

          fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieId}?language=pt-BR`).then(function (resposta) {
            const promiseBody = resposta.json();

            promiseBody.then(function (body) {
              titleModal.textContent = body.title;
              imgModal.src = body.backdrop_path;
              descriptionModal.textContent = body.overview;
              averageModal.textContent = body.vote_average;

              body.genres.forEach(genero => {
                const spanGenero = document.createElement('span');
                spanGenero.classList.add('modal__genre');
                spanGenero.textContent = genero.name;

                genresModal.append(spanGenero);
                modal.classList.remove('hidden');
              });
            });
          });
        });
      });
    });
  });
}

carregarFilmes(endpointFilmes);

function atualizarFilmes (divMovies) {
  divMovies.forEach(function (movie, index) {
    if (index < indexStart || index > indexEnd) {
      movie.classList.add('hidden');
    } else {
      movie.classList.remove('hidden');
    }
  });
}

btnNext.addEventListener('click', function () {
  const divMovies = document.querySelectorAll('.movie');

  if (indexStart === 15) {
    indexStart = 0;
    indexEnd = 4;
    atualizarFilmes(divMovies);
  } else {
    indexStart += 5;
    indexEnd += 5;
    atualizarFilmes(divMovies);
  }
});

btnPrev.addEventListener('click', function () {
  const divMovies = document.querySelectorAll('.movie');

  if (indexStart === 0) {
    indexStart = 15;
    indexEnd = 19;
    atualizarFilmes(divMovies);
  } else {
    indexStart -= 5;
    indexEnd -= 5;
    atualizarFilmes(divMovies);
  }
});

input.addEventListener('keydown', function (event) {
  if (event.key !== 'Enter') return;
  indexStart = 0;
  indexEnd = 4;

  if (input.value === '') {
    movies.innerHTML = "";
    carregarFilmes(endpointFilmes);
  } else {
    movies.innerHTML = "";
    carregarFilmes(endpointBusca + input.value);
  }
  input.value = '';
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
  const promiseBody = resposta.json();

  promiseBody.then(function (body) {

    const generos = [];
    body.genres.forEach(genero => {
      generos.push(genero.name);
    });

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const date = new Date(body.release_date);
    const dateFormat = `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;

    videoHL.style.backgroundImage = `url(${body.backdrop_path})`;
    titleHL.textContent = body.title;
    ratingHL.textContent = body.vote_average;
    genresHL.textContent = generos.join(", ");
    launchHL.textContent = dateFormat;
    descriptionHL.textContent = body.overview;
  });
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
  const promiseBody = resposta.json();

  promiseBody.then(function (body) {
    videoLinkHL.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;
  });
});

modal.addEventListener('click', function () {
  modal.classList.add('hidden');
});

closeModal.addEventListener('click', function (event) {
  event.stopPropagation();
  modal.classList.add('hidden');
})