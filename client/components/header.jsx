import React from 'react';

function Header() {
  return (
    <div className="container">
      <div className="row maxHeightHeader">
        <div className="col-10 bg-dark text-white maxHeightHeader">
          <h4 className="mt-2">$WickedSales</h4>
        </div>
        <div className="col-2 bg-dark text-white maxHeightHeader">
          <img src="../images/download.png" className="headerImageHeight mt-1" />
        </div>
      </div>
    </div>
  );
}

export default Header;
