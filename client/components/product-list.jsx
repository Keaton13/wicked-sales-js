import React from 'react';
import ProductListItem from './product-list-ltem';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      data: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const response = await fetch('http://wickedsales.keatonkrieger.com/api/products');
    const json = await response.json();
    this.setState({ products: json });
  }

  render() {
    const cards = this.state.products;
    return (
      <div className="container">
        <div className="card-deck">
          {cards.map(product =>
            <ProductListItem key={product.productId}
              value={product} setView={this.props.setView}/>
          )}
        </div>
      </div>
    );
  }
}

export default ProductList;
