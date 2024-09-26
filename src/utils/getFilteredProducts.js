export const getFilteredProducts = (
  products,
  { selectedUserId, searchQuery, categoriesIds, sort },
) => {
  let filteredProducts = [...products];

  // Filter by user
  if (selectedUserId) {
    filteredProducts = filteredProducts.filter(
      product => product.user.id === selectedUserId,
    );
  }

  // Filter by search query
  const normalizedSearchQuery = searchQuery.trim().toLowerCase(); // ''

  if (normalizedSearchQuery) {
    filteredProducts = filteredProducts.filter(({ name }) => {
      const normalizedProductName = name.toLowerCase();

      return normalizedProductName.includes(normalizedSearchQuery);
    });
  }

  if (categoriesIds.length) {
    filteredProducts = filteredProducts.filter(product =>
      categoriesIds.includes(product.category.id),
    );
  }

  // Sort
  if (sort.column) {
    filteredProducts.sort((first, second) => {
      switch (sort.column) {
        case 'ID':
          return first.id - second.id;

        case 'Product':
          return first.name.localeCompare(second.name);

        case 'Category':
          return first.category.title.localeCompare(second.category.title);
        case 'User':
          return first.user.name.localeCompare(second.user.name);

        default:
          return 0;
      }
    });
  }

  if (sort.direction === 'desc') {
    filteredProducts.reverse();
  }

  return filteredProducts;
};
