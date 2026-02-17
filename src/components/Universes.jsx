import React from "react";
import thesImage from "/src/assets/images/Image (Thés).png";
import cafesImage from "/src/assets/images/Image (Cafés).png";
import accessoiresImage from "/src/assets/images/Image (Accessoires).png";
import "../styles/Home.css";

const universes = [
  {
    name: "Thés",
    image: thesImage,
    count: "24 Variétés",
  },
  {
    name: "Cafés",
    image: cafesImage,
    count: "18 Origines",
  },
  {
    name: "Accessoires",
    image: accessoiresImage,
    count: "32 Pièces",
  },
];

const Universes = () => {
  return (
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "#E8E2D9",
      }}
    >
      <p className="univers-text">COLLECTIONS</p>
      <h2
        style={{ fontSize: "72px", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Explorez nos univers
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {universes.map((universe, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={universe.image}
              alt={universe.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <p>{universe.count}</p>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {universe.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Universes;
