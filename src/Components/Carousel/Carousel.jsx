import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import Navbar from "../Navbar/Navbar";
import img2 from "../Images/caro-img/GOC 31SA.jpeg";
import img3 from "../Images/caro-img/Stationary Distribution at Western Laddakh Schools 2016.jpeg";
import img1 from "../Images/caro-img/UP GOVT FELICITATION.jpeg";

function Carousel() {
  const images = [
    {
      src: img1,
      caption:
        "The Uttar Pradesh government honors outstanding individuals and organizations with the Recognition for Social Impact award. This initiative celebrates significant contributions in education, healthcare, and poverty alleviation, inspiring community engagement through monetary grants for continued impact.",
      title: "Jan-Kalyan Award by the UP Government",
      tag: "Social",
    },
    {
      src: img2,
      caption:
        "The Maternal Health Initiative in Kashmir provides essential healthcare services to expectant mothers. Offering prenatal care, nutritional support, and education on maternal health, this program aims to reduce maternal and infant mortality rates while empowering women through increased knowledge and resources.",
      title: "Maternal Health Initiative in Kashmir",
      tag: "",
    },
    {
      src: img3,
      caption:
        "The Educational Resource Distribution program enhances access for underprivileged children by providing free textbooks and learning materials. This initiative removes educational barriers, fostering a love for learning while including workshops for parents and teachers to promote community engagement.",
      title: "Educational Resource Distribution for Children",
      tag: "Education",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hhieght, setHhieght] = useState("9rem");

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setHhieght("0rem");
    } else {
      setHhieght("9rem");
    }
  };

  const goToPrevious = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 700);
  };

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 700);
  };

  useEffect(() => {
    // Check screen size initially
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFade(true);
        }, 500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <div
      className="bg-CSR"
      style={{ minHeight: "600px", position: "relative" }}
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      <Navbar />
      <div
        className="clear captionP"
        style={{ paddingTop: "150px", clear: "both" }}
      />
      <div className="container" style={{ maxWidth: "1210px", width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "620px",
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={images[currentIndex].src}
            alt="Carousel Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: fade ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              objectPosition: "top",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "620px",
              background: "rgb(0 0 0 / 50%)",
              zIndex: 1,
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: `${hhieght}`,
          }}
        >
          <div
            className="captionPL"
            style={{ paddingLeft: "15px", color: "white" }}
          >
            <div
              className="bannerT topP20"
              style={{
                paddingTop: "40px",
                fontFamily: "Lato, sans-serif",
                fontWeight: "700",
                fontSize: "43px",
                lineHeight: "40px",
                letterSpacing: "-0.78px",
                color: "rgb(255, 255, 255)",
              }}
            >
              {images[currentIndex].title}
            </div>
          </div>
          <div
            className="containerIn topP2515"
            style={{
              margin: "0px auto",
              maxWidth: "1045px",
              paddingTop: "25px",
            }}
          >
            <div
              className="bannerTextF"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                color: "rgb(255, 255, 255)",
                lineHeight: "22px",
                maxWidth: "620px",
                paddingLeft: "15px",
                borderLeft: "6px solid rgb(255, 255, 255)",
              }}
            >
              {images[currentIndex].caption}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            gap: "20px",
            zIndex: 3, // Make sure buttons are on top
          }}
          className="d-xl-block d-none"
        >
          <button
            onClick={goToPrevious}
            style={{
              padding: "10px 15px",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
              cursor: "pointer",
              margin: "8px",
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <button
            onClick={goToNext}
            style={{
              padding: "10px 15px",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
