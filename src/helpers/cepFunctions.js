export const getAddress = async (postalCode) => {
  const awesomeApi = fetch(`https://cep.awesomeapi.com.br/json/${postalCode}`);
  const brasilApi = fetch(`https://brasilapi.com.br/api/cep/v2/${postalCode}`);
  const response = await Promise.any([awesomeApi, brasilApi]);
  const data = await response.json();
  return data;
};

export const searchCep = async () => {
  const cepInput = document.querySelector('.cep-input');
  const cepMessageImput = document.querySelector('.cart__address');
  if (cepInput.value === '00000000') {
    cepMessageImput.innerHTML = 'CEP não encontrado';
    return;
  }
  const cep = await getAddress(cepInput.value);
  if (cep.city === undefined) {
    cepMessageImput.innerHTML = 'CEP não encontrado';
  } else {
    const { city, state, district, address } = cep;
    cepMessageImput.innerHTML = `${address} - ${district} - ${city} - ${state}`;
  }
};
