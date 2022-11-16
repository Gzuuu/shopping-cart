import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    const expected = typeof fetchProductsList;
    const result = 'function'
    expect(expected).toBe(result)
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    const result = fetch('');
    expect(fetchProductsList('computador')).toEqual(result)
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const fet = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const data = await fet.json();
    const expected = await data.results;
    expect(expected).toEqual(await fetchProductsList('computador'))
  });

  it('testa se chamada a função fetchProductList com o argumento computador o resultado é igual ao objeto computadorSearch', async ()=> {
    const expected = await fetchProductsList('computador')
    expect(expected).toEqual(computadorSearch)
  })

  it('Testa se ao chamar a função fetchProductsList sem parametros é retornado um erro', async () => {
    await expect(fetchProductsList()).resolves.toEqual('Termo de busca não informado')
  });
});
