import logo from "../assets/logo.svg";
import altlogo from "../assets/altlogo.svg";

function Logo({ styles }) {
  return (
    <img
      src={logo}
      alt="logo"
      onMouseEnter={(e) => {
        e.currentTarget.src = altlogo;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.src = logo;
      }}
      className={styles}
    />
  );
}

export default Logo;
