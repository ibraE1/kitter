import logo from "../assets/logo.svg";
import altlogo from "../assets/altlogo.svg";

function Logo({ size }) {
  return (
    <img
      src={logo}
      onMouseEnter={(e) => {
        e.currentTarget.src = altlogo;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.src = logo;
      }}
      width={size}
    />
  );
}

export default Logo;
