import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardImage, MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const cardData = [
  {
    title: "All Events",
    category: "fas fa-globe fa-2x",
    content: "This card provides additional details on a specific topic.",
    link: "#",
    color: "rgb(115 110 201)",
  },
  {
    title: "Health",
    category: "fas fa-heartbeat fa-2x",

    link: "#",
    color: "#3FCBA4",
  },
  {
    title: "Sports",
    category: "fas fa-trophy fa-2x",
    content: "Another example of card content with relevant information.",
    link: "#",
    color: "#A18870",
  },
  {
    title: "Education",
    category: "fas fa-graduation-cap fa-2x",
    content: "A different set of text describing what the card is about.",
    link: "#",
    color: "#FCA743",
  },
  {
    title: "Womens Empowerment",
    category: "fas fa-female fa-2x",
    content: "This card provides additional details on a specific topic.",
    link: "#",
    color: "#BA69AC",
  },
];

function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [cardwidth, setCardwidth] = useState("14rem");
  const [cardheight, setCardheight] = useState("17rem");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://backend-csr.onrender.com/api/events");
        const eventsList = response.data;
        // const eventsCollection = collection(db, "events");

        // // Order events by 'createdAt' field in descending order
        // const eventsQuery = query(
        //   eventsCollection,
        //   orderBy("eventDate", "desc")
        // );

        // const eventsSnapshot = await getDocs(eventsQuery);
        // const eventsList = eventsSnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));

        setEvents(eventsList); // Set the ordered events
      } catch (error) {
        setError("Error fetching events");
        alert("error occur", error);
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const updateCardDimensions = () => {
      if (window.innerWidth < 420) {
        setCardheight("12rem");
        setCardwidth("11.3rem");
      } else {
        setCardheight("17rem");
        setCardwidth("14rem");
      }
    };

    // Set initial dimensions
    updateCardDimensions();

    // Add a listener for window resize
    window.addEventListener("resize", updateCardDimensions);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateCardDimensions);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cardStyle = {
    width: "93%",
    height: "320px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden", // Ensures the zoom doesn't overflow the card
    borderRadius: "7px",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "7px",
    transition: "transform 0.3s ease", // Smooth zoom transition
    height: "320px",
  };

  const filteredEvents =
    activeFilter === "All Events"
      ? events
      : events.filter((event) => event.programType === activeFilter);

  return (
    <div>
      <h2
        className="text-primary pb-1 mb-4 "
        style={{ fontSize: "22px", borderBottom: "5px solid #2968da" }}
      >
        <p>Our Impactful Moments</p>

        <div>
          <div className="container   mt-4  ">
            <div className="row justify-content-center">
              {cardData.map((card, index) => (
                <div
                  className="col-lg-3 col-md-2 col-sm-10 mb-4"
                  style={{
                    height: cardheight,
                    width: cardwidth,
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => setActiveFilter(card.title)}
                >
                  <div
                    className="shadow h-100 position-relative"
                    style={{ borderRadius: "7px", background: `${card.color}` }}
                  >
                    <span
                      className="position-absolute top-0 end-0 p-3 text-white"
                      style={{ fontWeight: "bold" }}
                    >
                      <i className={card.category}></i>
                    </span>

                    <div className="d-flex flex-column justify-content-between p-4 rounded-3 text-white">
                      <h5 className="fw-bold position-absolute bottom-0 start-0 p-3 mb-0">
                        {card.title}
                      </h5>
                      <i className="bi bi-arrow-right fs-4 text-white"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </h2>
      <MDBRow className="">
        {loading ? (
          [...Array(3)].map((_, index) => (
            <SkeletonTheme baseColor="#ddd" highlightColor="#ccc" key={index}>
              <MDBCol lg="4" md="6" sm="12" className="mb-4">
                <MDBCard
                  style={{
                    height: "340px",
                    position: "relative",
                    borderRadius: "7px",
                    width: "24rem",
                  }}
                >
                  <div
                    className="image-container"
                    style={{ overflow: "hidden" }}
                  >
                    <Skeleton height={200} style={{ borderRadius: "7px" }} />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "7px",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "#fff",
                      // backgroundColor: "rgba(0, 0, 0, 0.7)",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontSize: "12px",
                    }}
                  >
                    <Skeleton width={80} height={20} />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      color: "#fff",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      <Skeleton width={200} height={20} />
                    </h4>
                    <span style={{ margin: "3px 0" }}>
                      <Skeleton width={150} height={15} />
                    </span>
                    <span style={{ margin: "3px 0", display: "block" }}>
                      <Skeleton width={80} height={15} />
                    </span>
                    <i className="bi bi-arrow-right fs-4 text-white"></i>
                  </div>
                </MDBCard>
              </MDBCol>
            </SkeletonTheme>
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event,index) => (
            <MDBCol lg="4" md="6" sm="12" className="mb-4" key={index}>
              {/* <Link to={`/Events-details/${event.id}`}> */}
              <MDBCard style={cardStyle}>
                <div
                  className="image-container"
                  style={{
                    overflow: "hidden", // Ensures zoom effect doesn't break the layout
                  }}
                >
                  <MDBCardImage
                    src={event.mainImage}
                    position="top"
                    alt={event.title}
                    style={imageStyle}
                    className="event-image"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    } // Zoom on hover
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    } // Reset zoom
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "7px",
                  }}
                ></div>

                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                  }}
                >
                  {event.programType}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    color: "#fff",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{event.title}</h4>
                  <span style={{ margin: "3px 0" }}>{event.eventVenue}</span>
                  <span style={{ margin: "3px 0", display: "block" }}>
                    {new Date(event.eventDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <i className="bi bi-arrow-right fs-4 text-white"></i>
                </div>
              </MDBCard>
              {/* </Link> */}
            </MDBCol>
          ))
        ) : (
          <div className="col-12 text-center mt-4">
            <h4 style={{ color: "#666" }}>
              No events available in {activeFilter} category
            </h4>
            <p style={{ color: "#888" }}>
              Please check back later or select a different category.
            </p>
          </div>
        )}
      </MDBRow>
    </div>
  );
}

export default Event;
