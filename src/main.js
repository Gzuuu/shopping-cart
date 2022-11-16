import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const father = document.querySelector('.products');

function createLoading() {
  const text = document.createElement('h1');
  text.setAttribute('class', 'loading');
  text.innerText = 'carregando...';
  father.appendChild(text);
}

function removeLoading() {
  const text = document.querySelector('.loading');
  text.remove(father);
}

async function createProducts() {
  createLoading();
  const produtos = await fetchProductsList('computador');
  removeLoading();
  produtos.forEach((produto) => {
    const obj = {
      id: produto.id,
      title: produto.title,
      thumbnail: produto.thumbnail,
      price: produto.price,
    };
    father.appendChild(createProductElement(obj));
  });
}

createProducts();
