import React from "react";
import Hero from "../Components/Heros/Hero";
import WoSection from "../Components/HomeSection/WomenSection/WoSection";
import MenSection from "../Components/HomeSection/MensSection/MenSection";
import KidSection from "../Components/HomeSection/Kids/KidSection";
import Navbar from "../Components/Navbar/Navbar";
const Home = () => {
  return (
    <>
    <Navbar/>
        {/* <Hero /> */}
        <WoSection />
        <MenSection />
        <KidSection />
      </>
  );
};

export default Home;
