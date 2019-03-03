import React from 'react';

const List = ({ category, createProduct, destroyCat, destroyProduct}) => {

    return (
        <li className="list-group-item">
            <div class="d-flex justify-content-between">
                {category.title}
                <div>
                    <button className="btn btn-primary" onClick={() => createProduct(category.id)}>+</button>
                    <button className="btn btn-danger"onClick={() => destroyCat(category.id)}>-</button>
                </div>
            </div>
            <ul>
            {category.products.map((product) => (
                <li className="list-group-item" key={product.id}>
                    <div class ="d-flex justify-content-between">
                        {product.title}
                        <button class="btn btn-danger" onClick={() => destroyProduct(product.id, category.id)}>-</button>
                    </div>
                </li>
            ))}
            </ul>
        </li>
    )
}

export default List;

