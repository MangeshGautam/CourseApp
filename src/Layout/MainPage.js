import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex-grow">
       
        {/* add pt-16 to push content below sticky NavBar */}
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
