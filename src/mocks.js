import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const findCategoryById = id =>
  categoriesFromServer.find(category => category.id === id);

const findUserById = id => usersFromServer.find(user => user.id === id);

export const PRODUCTS = productsFromServer.map(product => {
  const category = findCategoryById(product.categoryId) || null;

  const user = findUserById(category.ownerId) || null;

  return {
    ...product,
    category,
    user,
  };
});

export const COLUMNS = ['ID', 'Product', 'Category', 'User'];
