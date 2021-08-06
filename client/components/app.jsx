import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './productDetails';
import CartSummary from './cartSummary';
import CartDetails from './cartDetails';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      shoppingCart: []
    };

    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems(param) {
    fetch('/api/cart')
      .then(res => {
        return res.json();
      }).then(cartItems => {
        if (param === 1) {
          this.setState({
            shoppingCart:
              cartItems
          });
        } else {
          this.setState({
            shoppingCart: [
              ...this.state.shoppingCart,
              ...cartItems
            ]
          });
        }
      }).catch(err => {
        console.error(err.message);
      });
  }

  addItemToCart(product) {
    const body = JSON.stringify({ productId: product });
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({
        shoppingCart: [
          ...this.state.shoppingCart,
          data
        ]
      });
    }).catch(err => {
      console.error(err.message);
    });
  }

  removeItemFromCart(productId) {
    const body = JSON.stringify({ productId });
    fetch('/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }).then(res => {
      return res.json();
    }).catch(err => {
      console.error(err.message);
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Testing connections...</h1>;
    } else {
      let view;
      if (this.state.view.name === 'details') {
        view = <ProductDetails params={this.state.view.params} setview={this.setView} addItemToCart={this.addItemToCart} />;
      } else if (this.state.view.name === 'cart') {
        view = <CartSummary cart={this.state.shoppingCart} setView={this.setView} />;
      } else if (this.state.view.name === 'cartDetails') {
        view = <CartDetails params={this.state.view.params} setview={this.setView} removeItemFromCart={this.removeItemFromCart} getCartItems={this.getCartItems} />;
      } else {
        view = <ProductList setView={this.setView} />;
      }
      return (
        <div>
          <Header setView={this.setView} cart={this.state.shoppingCart.length} />
          {view}
        </div>
      );
    }
  }
}
