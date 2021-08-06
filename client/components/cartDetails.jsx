import React from 'react';

class CartDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: true
    };
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  async componentDidMount() {
    const productId = this.props.params.productId;
    fetch(`http://wickedsales.keatonkrieger.com/api/products/${productId}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          product: json,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleBackButton() {
    this.props.setview('cart');
  }

  handlePriceLogic() {
    let price = this.state.product.price / 100;
    price = price.toFixed(2);
    return price;
  }

  handleRemoveFromCart() {
    const productId = this.state.product.productId;
    this.props.removeItemFromCart(productId);
    this.props.getCartItems(1);
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else {
      let price = this.state.product.price / 100;
      price = price.toFixed(2);
      return (
        <div className='container'>
          <div className='card mt-4'>
            <div className='card-body'>
              <div className='row'>
                <div className="col">
                  <button className='btn btn-outline-primary btn-sm align-top mr-5' onClick={this.handleBackButton}>
                                        Back
                  </button>
                  <img src={this.state.product.image} className='cardImg' alt='Image' />
                </div>
                <div className="col">
                  <div className="row">
                    <h5 className='card-title'>{this.state.product.name}</h5>
                    <h5 className="ml-3">{price}</h5>
                    <p className='card-text'>{this.state.product.shortDescription}</p>
                  </div>
                  <div className="row mt-4">
                    <button className="btn btn-outline-danger m-auto" onClick={this.handleRemoveFromCart}>Remove From Cart</button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  {this.state.product.longDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CartDetails;
