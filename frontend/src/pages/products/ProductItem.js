import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class ProductItem extends Component {
  handleWishlist = (e) => {
    const { product } = this.props;
    if (!localStorage.getItem("token")) {
      this.props.showLogin();
    } else {
      axios
        .post(
          "http://localhost:8000/api/product/wishlist",
          {
            productId: product.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.props.updateWishlistCount(response.data);
            this.props.showToast("Added to wishlist!");
          }
        })
        .catch((error) => {
          this.props.showToast("Product is already in the wishlist!");
        });
    }
  };
  handleAddCart = (e) => {
    //make a button to add to cart
    const { product } = this.props;
    const stockId = product.id; // assuming the stock ID is the same as the product ID
    const quantity = 1; // default quantity is 1

    if (!localStorage.getItem("token")) {
      this.props.showLogin();
    } else {
      axios
        .post(
          "http://localhost:8000/api/product/cart-list",
          {
            stockId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.props.updateCartCount(response.data);
            this.props.showToast("Added to cart!");
          }
        })
        .catch((error) => {
          this.props.showToast("Error adding to cart!");
        });
    }
  };

  handleClick = (e) => {
    const { product } = this.props;
    const id = product.id;
    if (
      e.target.className === "add-to-cart-btn" ||
      e.target.className.includes("fa-shopping-cart")
    ) {
      const stockId = JSON.parse(
        this.props.products.find((p) => p.id === parseInt(id)).photo
      )[0];
      const quantity = 1;
      this.handleAddToCart(id, stockId, quantity);
    } else if (
      e.target.className === "quick-view" ||
      e.target.className === "fa fa-eye"
    ) {
      this.props.showQuickView(id);
    } else {
      e.preventDefault();
      this.getProducts(id);
      this.setState({ currentCategory: id });
    }
  };

  render() {
    const { product } = this.props;
    return (
      <div className="product" style={{ marginBottom: "60px" }}>
        <div className="product-img">
          <img
            src={`../../img/${JSON.parse(product.photo)[0]}`}
            alt={product.name}
          />
          <div className="product-label">
            <span className="new">NEW</span>
          </div>
        </div>
        <div className="product-body">
          <p className="product-category">{product.category.name}</p>
          <h3 className="product-name">
            <a href="#">{product.name}</a>
          </h3>
          <h4 className="product-price">${product.price}</h4>
          <div className="product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="product-btns">
            <button className="add-to-wishlist" onClick={this.handleWishlist}>
              <i className="fa fa-heart-o"></i>
              <span className="tooltipp">add to wishlist</span>
            </button>
            <button className="add-to-compare">
              <i className="fa fa-exchange"></i>
              <span className="tooltipp">add to compare</span>
            </button>
            <button className="quick-view" onClick={this.handleClick}>
              <i className="fa fa-eye"></i>
              <span className="tooltipp">quick view</span>
            </button>
          </div>
        </div>
        <div className="add-to-cart">
          <button className="add-to-cart-btn" onClick={this.handleAddCart}>
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productId: state.product_id,
  showModal: state.show_modal,
});

const mapDispatchToProps = (dispatch) => ({
  showQuickView: (id) => dispatch({ type: "QUICKVIEW_CONTROL", value: id }),
  showLogin: () => dispatch({ type: "LOGIN_CONTROL", value: true }),
  updateWishlistCount: (count) =>
    dispatch({ type: "WISHLIST_COUNT", value: count }),
  showToast: (msg) => dispatch({ type: "SHOW_TOAST", value: msg }),
  updateCartCount: (count) => dispatch({ type: "CART_COUNT", value: count }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
