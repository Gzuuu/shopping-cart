export const fetchProduct = async (productID) => {
  if (!productID) {
    throw new Error('ID não informado');
  }
  const productInfo = await fetch(`https://api.mercadolibre.com/items/${productID}`);
  const productData = await productInfo.json();
  return productData;
};

export const fetchProductsList = async (product) => {
  if (!product) {
    throw new Error('Termo de busca não informado');
  }
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await result.json();
  const arrayOfProduct = [...data.results];
  return arrayOfProduct;
};
