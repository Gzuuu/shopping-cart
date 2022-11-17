import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Testes para fetchProduct', () => {
  it('testa se fetchProduct é uma função', () => {
    const expected = typeof fetchProduct
    expect(expected).toBe('function')
  });

  it('verifica se fetch foi chamado ao executar a função', () => {
    const product = 'MLB1405519561';
    fetchProduct(product);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("verifica se ao chamar a função com o parametro 'MLB1405519561' é utilizado o endpoint correto", async () => {
    const product = 'MLB1405519561';
    expect(await fetchProduct(product)).toHaveProperty('id', 'MLB1405519561')
  });

  it('testa se o retorno da função fetchProduct com o parametro MLB1405519561 é retornado uma estrutura de dados igual ao product', async () => {
    const selectedProduct = 'MLB1405519561';
    expect(await fetchProduct(selectedProduct)).toEqual(product)
  });

  it('testa se ao chamar a função sem parametros é retornado um erro com a mensagem "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrowError('ID não informado');
  });
});
