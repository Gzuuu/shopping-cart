import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function productGenerator() {
  const produtos = await fetchProductsList('computador');
  produtos.forEach((produto) => {
    const pai = document.querySelector('.products');
    const obj = {
      id: produto.id,
      title: produto.title,
      thumbnail: produto.thumbnail,
      price: produto.price,
    };
    pai.appendChild(createProductElement(obj));
  });
}

productGenerator();
