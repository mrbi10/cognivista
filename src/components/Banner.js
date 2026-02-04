import banner from "../assets/images/banner.jpeg";

function Banner() {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2vw 0",
        background: "#0a0f1c"
      }}
    >
      <img
        src={banner}
        alt="Event Banner"
        style={{
          width: "90vw",
          maxWidth: "1400px",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          transition: "transform 0.4s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </section>
  );
}

export default Banner;
