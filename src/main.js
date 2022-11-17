import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
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

async function verifyFetch() {
  try {
    const produtos = await fetchProductsList('computador');
    return produtos;
  } catch (e) {
    const text = 'Algum erro ocorreu, recarregue a página e tente novamente';
    const child = document.createElement('h1');
    child.setAttribute('class', 'error');
    child.innerText = text;
    father.appendChild(child);
  }
}

async function createProducts() {
  createLoading();
  const produtos = await verifyFetch();
  removeLoading();
  produtos.forEach((produto) => {
    const produtoProperty = {
      id: produto.id,
      title: produto.title,
      thumbnail: produto.thumbnail,
      price: produto.price,
    };
    father.appendChild(createProductElement(produtoProperty));
  });
}

const storageFather = document.querySelector('.cart__products');

async function setID() {
  await createProducts();
  const allProducts = document.querySelectorAll('.product');
  allProducts.forEach((product, index) => {
    const addToCartButton = document.querySelectorAll('.product__add');
    addToCartButton[index].addEventListener('click', async () => {
      const productID = product.firstChild.innerText;
      saveCartID(productID);
      const addToStorage = createCartProductElement(await fetchProduct(productID));
      storageFather.appendChild(addToStorage);
    });
  });
}

setID();
