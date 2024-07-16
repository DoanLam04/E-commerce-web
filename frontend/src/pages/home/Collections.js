import React from "react";
const Collections = () => (
  <div className="section">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="../../img/shop01.png" alt="" />
            </div>
            <div className="shop-body">
              <h3>
                Laptop
                <br />{" "}
              </h3>
              <a href="#" className="cta-btn">
                Mua ngay <i className="fa fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="../../img/shop03.png" alt="" />
            </div>
            <div className="shop-body">
              <h3>
                Phụ kiện
                <br />
              </h3>
              <a href="#" className="cta-btn">
                Mua ngay <i className="fa fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="../../img/shop02.png" alt="" />
            </div>
            <div className="shop-body">
              <h3>
                Điện thoại
                <br />{" "}
              </h3>
              <a href="#" className="cta-btn">
                Mua ngay <i className="fa fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Collections;
