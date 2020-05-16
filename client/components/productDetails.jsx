import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: true
    };
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  async componentDidMount() {
    const productId = this.props.params.productId;
    fetch(`http://localhost:3000/api/products/${productId}`)
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
    this.props.setview('catalog');
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className='container'>
          <div className='card mt-4'>
            <div className='card-body'>
              <div className='row'>
                <div className="col">
                  <button className='btn btn-outline-primary btn-sm align-top' onClick={this.handleBackButton}>
                  Back
                  </button>
                  <img src={this.state.product.image} className='cardImg' alt='Image' />
                </div>
                <div className="col">
                  <h5 className='card-title'>{this.state.product.name}</h5>
                  <h6>{this.state.product.price / 100}</h6>
                  <p className='card-text'>{this.state.product.shortDescription}</p>
                </div>
              </div>
              <div className="row">
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

export default ProductDetails;
