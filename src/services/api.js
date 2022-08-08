export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await result.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId !== '' && query === '') url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  else if (categoryId === '' && query !== '') url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  else if (categoryId !== '' && query !== '') url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(url);
  const response = await result.json();
  return response;
}
