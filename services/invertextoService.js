export async function getHolidays(year) {
  try {
    const res = await fetch(
      `https://api.invertexto.com/v1/holidays/${year}?token=21937|fErxUZOd6fyXDUsnY7qJLah5V3EIXC6r`
    );
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
