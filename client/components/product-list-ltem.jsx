import React from 'react';

function ProductListItem(props) {
  const card = props.value;
  return (
    <div className='card cardWidth'>
      <img src={card.image} className='cardImg' alt='Image' />
      <div className='card-body'>
        <h5 className='card-title'>{card.name}</h5>
        <p>{card.price}</p>
        <p className='card-text'>{card.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
