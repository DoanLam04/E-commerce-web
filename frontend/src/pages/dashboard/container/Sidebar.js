// import React from "react";

// const Sidebar = () => (
//
// );

// export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        {/* <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div> */}
        <img width="180px" src="/img/dashboard-logo.png" alt="logo" />
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Ecommerce Managment</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="/dashboard/products"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cube"></i>
          <span>Products</span>
        </Link>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/dashboard/products">
              All Products
            </Link>
            <Link className="collapse-item" to="/dashboard/new-product">
              New Product
            </Link>
            <Link className="collapse-item" to="/dashboard/categories">
              Categories
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="/dashboard/new-product"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <i className="fas fa-fw fa-list-alt"></i>
          <span>New Product</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="/dashboard/categories"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Categories</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="/dashboard/orders"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Orders</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      {/* <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
          </div> */}
    </ul>
  );
}
