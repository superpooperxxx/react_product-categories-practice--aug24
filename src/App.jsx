/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import { PRODUCTS as products, COLUMNS as columns } from './mocks';
import { ProductsList } from './components/ProductsList';
import { getFilteredProducts } from './utils/getFilteredProducts';

const initialSort = {
  column: null,
  direction: 'asc',
};

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesIds, setCategoriesIds] = useState([]);
  const [sort, setSort] = useState(initialSort);

  const filteredProducts = getFilteredProducts(products, {
    selectedUserId,
    searchQuery,
    categoriesIds,
    sort,
  });

  const handleResetAll = () => {
    setSelectedUserId(null);
    setSearchQuery('');
    setCategoriesIds([]);
  };

  const handleChangeCategory = id => {
    setCategoriesIds(current => {
      if (current.includes(id)) {
        return current.filter(catId => catId !== id);
      }

      return [...current, id];
    });
  };

  const handleSort = column => {
    setSort(currentState => {
      if (currentState.direction === 'desc' && currentState.column === column) {
        return initialSort;
      }

      if (currentState.column === column) {
        return {
          ...currentState,
          direction: 'desc',
        };
      }

      return {
        column,
        direction: 'asc',
      };
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setSelectedUserId(null)}
                className={cn({ 'is-active': !selectedUserId })}
              >
                All
              </a>

              {usersFromServer.map(({ id, name }) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={id}
                  className={cn({ 'is-active': selectedUserId === id })}
                  onClick={() => setSelectedUserId(id)}
                >
                  {name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={({ target }) =>
                    setSearchQuery(target.value.trimStart())
                  }
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined':
                    categoriesIds.length &&
                    categoriesIds.length !== categoriesFromServer.length,
                })}
              >
                All
              </a>

              {categoriesFromServer.map(({ title, id }) => (
                <a
                  key={id}
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': categoriesIds.includes(id),
                  })}
                  href="#/"
                  onClick={() => handleChangeCategory(id)}
                >
                  {title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleResetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length > 0 ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columns.map(column => {
                    const isColumnSelected = sort.column === column;

                    return (
                      <th key={column}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {column}
                          <a href="#/" onClick={() => handleSort(column)}>
                            <span className="icon">
                              <i
                                data-cy="SortIcon"
                                className={cn('fas', {
                                  'fa-sort-down':
                                    isColumnSelected &&
                                    sort.direction === 'asc',
                                  'fa-sort-up':
                                    isColumnSelected &&
                                    sort.direction === 'desc',
                                  'fa-sort': !isColumnSelected,
                                })} //  fa-sort-down fa-sort-up
                              />
                            </span>
                          </a>
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <ProductsList products={filteredProducts} />
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
