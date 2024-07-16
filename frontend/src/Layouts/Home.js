import React from "react";
import Collections from "../pages/home/Collections";
import Carousel from "../pages/home/Carousel";
import ToastMessage from "../pages/home/ToastMessage";
import HotDeals from "../pages/home/HotDeals";
import Widgets from "../pages/home/Widgets";
import NewsLetter from "../pages/home/NewsLetter";
function Home(props) {
  return (
    <div>
      <Collections />
      <ToastMessage />
      <Carousel title="New Products" id="1" />
      <HotDeals />
      <Carousel
        title="Top Selling"
        id="2"
        showQuickView={props.showQuickView}
      />
      <Widgets />
      <NewsLetter />
    </div>
  );
}
export default Home;
