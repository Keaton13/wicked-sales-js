import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row maxHeightHeader">
          <div className="col-9 bg-dark text-white maxHeightHeader">
            <h4 className="mt-2">$WickedSales</h4>
          </div>
          <div className="col-3 bg-dark text-white maxHeightHeader">
            <img onClick={() => this.props.setView('cart')} src="../images/download.png" className="headerImageHeight mt-1 float-left" />
            <h6 key={this.props.cart} className="float-left mt-2">{this.props.cart}</h6>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
