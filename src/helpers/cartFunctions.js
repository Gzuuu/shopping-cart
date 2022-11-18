import { fetchProduct } from './fetchFunctions';

export function sumPrices(operator, value) {
  const totalValue = document.querySelector('.total-price');
  let finalValue;
  if (operator === 'sum') {
    finalValue = Number(totalValue.innerHTML) + Number(value);
    localStorage.setItem('calcPrices', JSON.stringify(finalValue));
    totalValue.innerHTML = finalValue;
  } else {
    finalValue = Number(totalValue.innerHTML) - Number(value);
    localStorage.setItem('calcPrices', JSON.stringify(finalValue));
    totalValue.innerHTML = finalValue;
  }
  return totalValue.innerHTML;
}

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  const product = await fetchProduct(id);
  sumPrices('sub', product.price);
};
