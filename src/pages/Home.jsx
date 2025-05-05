import React from "react";

import "./Home.css";
import GetSlider from "./slider/Getslider";
import Department from "./department/Department";
import BestProducts from "./Product/BestProduct";
import AddSlider from "./add-slider/Add-slider";
import Offers from "./offer/Offer";
import Ads from "./Ad/Ad";
import TabsDepartment from "./tabs/TabsDepartment";
import Product from "./NewProduct/BestProduct";
import Services from "./Services/service";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <GetSlider />

      <Department />

      <BestProducts />
      <Services/>
      
      <Offers />
    
      
      
    </div>
  );
};

export default Home;
