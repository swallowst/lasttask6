async function fetchImage() {
  const response = await fetch(
    `https://fakerapi.it/api/v1/images?_quantity=1&_type=any&_height=300&_width=300`
  );
  const json = await response.json();
  return json.data[0].url;
}