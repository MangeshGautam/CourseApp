import React from "react";
import "./404Page.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
        <section className="page_404">
          <div className="page_404_bg">
            <h1 className="header_main ">404</h1>
          </div>

          <div className="content_box_404">
            <h3 className="content_header">Look like you're lost</h3>
            <p>The page you are looking for not avaible!</p>
            <Link to="/dashboard" className="link_404">
              Go to Home
            </Link>
          </div>
        </section>
    </div>
  );
}

export default PageNotFound;
