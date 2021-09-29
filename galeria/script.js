const menuLateralSpans = document.querySelectorAll('.menu-lateral__button__span');
const menuLateralSpan = document.querySelector('.menu-lateral__button__span');
const menuButtonOpen = document.querySelector('.menu-lateral__button--open');
const menuButtonOpenImg = document.querySelector('.menu-lateral__button--open img');
const imagens = document.querySelectorAll('.item__img');
const imagemModal = document.querySelector('.modal__imagem');
const modal = document.querySelector('.modal');
const botaoFechar = document.querySelector('.modal__fechar');
const botaoVoltar = document.querySelector('.modal__voltar');
const botaoProximo = document.querySelector('.modal__proximo');
const likeModal = document.querySelector('.modal__like');
const likeItem = document.querySelectorAll('.item__like');

let ImagemModalAtual = 0;
const imagensLike = [];

function updateBtn() {
  if (dataImagemModalAtual === 1) {
    botaoVoltar.classList.add('hidden');
  } else {
    botaoVoltar.classList.remove('hidden');
  }
  if (dataImagemModalAtual === imagens.length) {
    botaoProximo.classList.add('hidden');
  } else {
    botaoProximo.classList.remove('hidden');
  }
}

function updateLike(data) {
  if (!imagensLike.includes(data)) {
    likeModal.classList.add('hidden');
  } else {
    likeModal.classList.remove('hidden');
  }
}

menuButtonOpen.addEventListener('click', function () {
  menuLateralSpans.forEach(function (span) {
    span.classList.toggle('hidden');
    span.classList.contains('hidden') ? menuButtonOpenImg.src = "assets/closed-menu.svg" : menuButtonOpenImg.src = "assets/open-menu.svg";
  });
});

imagens.forEach(function (imagem) {
  imagem.addEventListener('click', function (event) {
    imagemModal.src = event.target.src;
    modal.classList.remove('hidden');

    dataImagemModalAtual = Number(event.target.dataset.index);
    updateBtn();
    updateLike(dataImagemModalAtual);
  });
});

modal.addEventListener('click', function () {
  modal.classList.add('hidden');
});

imagemModal.addEventListener('click', function (event) {
  event.stopPropagation();
});

botaoProximo.addEventListener('click', function (event) {
  event.stopPropagation();
  dataImagemModalAtual += 1;
  imagemModal.src = `assets/gallery/image ${String(dataImagemModalAtual)}.png`;
  
  updateBtn();
  updateLike(dataImagemModalAtual);
});

botaoVoltar.addEventListener('click', function (event) {
  event.stopPropagation();
  dataImagemModalAtual -= 1;
  imagemModal.src = `assets/gallery/image ${String(dataImagemModalAtual)}.png`;
  updateBtn();
  updateLike(dataImagemModalAtual);
});

imagemModal.addEventListener('dblclick', function (event) {
  if (!imagensLike.includes(dataImagemModalAtual)) {
    imagensLike.push(dataImagemModalAtual);
    likeModal.classList.remove('hidden');
    likeItem[dataImagemModalAtual - 1].classList.remove('hidden');
  } else {
    const indice = imagensLike.indexOf(dataImagemModalAtual);
    imagensLike.splice(indice, 1);
    likeModal.classList.add('hidden');
    likeItem[dataImagemModalAtual - 1].classList.add('hidden');
  }
});

botaoFechar.addEventListener('click', function () {
  modal.classList.add('hidden');
});