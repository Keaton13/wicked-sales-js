import React from 'react';
import CartSummaryItem from './cartSummaryItem';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton(page, params) {
    this.props.setView(page, params);
  }

  render() {
    const cards = this.props.cart;
    let total = 0;
    for (let i = 0; i < cards.length; i++) {
      total = total + cards[i].price;
    }
    total = total / 100;
    return (
      <div className="container">
        <div className="row mt-3">
          <button className='btn btn-outline-primary btn-sm align-top mr-5' onClick={() => this.handleBackButton()}>
                        Back
          </button>
        </div>
        <div className="card-deck">
          {cards.length !== 0 ? cards.map(product =>
            <CartSummaryItem key={product.productId}
              value={product} setView={this.props.setView} />
          ) : <h1 className="text-center m-auto">Your Cart is empty</h1>}
        </div>
        <div className="row mt-4">
          <h3 className="text-center m-auto">Total = {total.toFixed(2)}</h3>
        </div>
      </div>
    );
  }
}

export default CartSummary;
