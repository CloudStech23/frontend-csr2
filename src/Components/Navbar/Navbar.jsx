import React, { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
 } from "mdb-react-ui-kit";
import Logo from "../Images/caro-img/Metrozone-logo.png"
// import { Link } from "react-router-dom";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <MDBNavbar light bgColor="transparent" style={{ zIndex: 2 }}>
        <MDBContainer
          fluid
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "0rem 1rem" : "1rem 13rem",
            position: "relative",
            marginTop: "1rem",
          }}
        >
          <a 
            href="http://metrozonegroup.com/"
            style={{
              margin: "0",
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
              textDecoration: "none",
            }}
            className="text-white tg-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Logo}
              style={{ height: "40px", marginRight: '10px' }}
              alt="Metrozone Logo"
              loading="lazy"
            />
            <span className="text-white fs-4" style={{fontFamily:"Lato, sans-serif"}}>METROZONE Group</span>
          </a>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Navbar;
