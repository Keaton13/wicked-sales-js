import React from 'react';

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
    this.setState({ data: json });

  }

  render() {
    return (
      <div className="card-deck">
      </div>
    );
  }
}

export default ProductList;
