import React from 'react';
import Image from '../../server/public/images/snuggie.jpg';

function ProductListItem() {
  return (
    <div className="card cardWidth">
      <img src={Image} className="card-img-top" alt="Image" />
      <div className="card-body">
        <h5 className="card-title">Snuggie</h5>
        <p>$ 29.00</p>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
      </div>
    </div>
  );
}

export default ProductListItem;
