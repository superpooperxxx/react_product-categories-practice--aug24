import cn from 'classnames';

export const ProductsList = ({ products }) => {
  return (
    <tbody>
      {products.map(({ id, name, category, user }) => (
        <tr data-cy="Product" key={id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {id}
          </td>

          <td data-cy="ProductName">{name}</td>
          <td data-cy="ProductCategory">
            {category.icon} - {category.title}
          </td>

          <td
            data-cy="ProductUser"
            className={cn('has-text-link', {
              'has-text-danger': user.sex === 'f',
            })}
          >
            {user.name}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
