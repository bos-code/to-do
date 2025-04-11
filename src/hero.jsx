// import image from "./assets/mac.png";
import vid from "./assets/vid.mp4";
function Hero() {
  return (
    <video
      className="absolute inset-0 object-cover w-4 h-full"
      preload="auto"
      src={vid}
      autoPlay
      loop
      muted
      playsInline
      style={{ width: "100%", height: "auto", objectFit: "cover" }}
    />
  );
}

export default Hero;
