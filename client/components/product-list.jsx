import React from 'react';
import ProductListItem from './product-list-ltem';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      data: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    const json = await response.json();
    this.setState({ products: json });
  }

  render(props) {
    const cards = this.state.products;
    return (
      <div className="container">
        <div className="card-deck">
          {cards.map(product =>
            <ProductListItem key={product.productId}
              value={product} />
          )}
        </div>
      </div>
    );
  }
}

export default ProductList;
