export async function listUfs() {
  try {
    const res = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    return res.json();
  } catch (error) {
    throw error;
  }
}
