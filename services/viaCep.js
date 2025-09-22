export async function getAddressByZipCode(zip_code) {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${zip_code}/json/`);
    return res.json();
  } catch (e) {
    throw e;
  }
}
