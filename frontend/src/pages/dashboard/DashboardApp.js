import React from "react";
import MainDashboard from "./MainDashboard";
import Sidebar from "./container/Sidebar";
import Footer from "./container/Footer";
import "../../../src/assets/sass/dashboard.scss";
import TopBar from "./container/TopBar";
import ToastMessage from "../home/ToastMessage";
const DashboardApp = () => (
  <div className="dashboard-app">
    <ToastMessage />
    <TopBar />
    <div className="d-flex">
      <Sidebar />
      {/* <!-- Content Wrapper --> */}
      <div id="content-wrapper" className="flex-grow-1">
        <MainDashboard />
      </div>
    </div>
    <Footer />
  </div>
);

export default DashboardApp;
