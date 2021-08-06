import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const id = this.props.value.productId;
    const params = {
      productId: id
    };
    this.props.setView('cartDetails', params);
  }

  render() {
    const card = this.props.value;
    let price = card.price / 100;
    price = price.toFixed(2);
    return (
      <div className='card cardWidth' onClick={this.handleClick}>
        <img src={card.image} className='cardImg' alt='Image' />
        <div className='card-body'>
          <h5 className='card-title'>{card.name}</h5>
          <p> {price}</p>
          <p className='card-text'>{card.shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
