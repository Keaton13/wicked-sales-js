import React from 'react';

function ProductListItem(props) {
  const card = props.value;
  const id = props.value.productId;
  const params = {
    productId: id
  };
  let price = card.price / 100;
  price = price.toFixed(2);
  const handleClick = () => props.setView('details', params);
  return (
    <div className='card cardWidth' onClick={handleClick}>
      <img src={card.image} className='cardImg' alt='Image' />
      <div className='card-body'>
        <h5 className='card-title'>{card.name}</h5>
        <p> {price}</p>
        <p className='card-text'>{card.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
