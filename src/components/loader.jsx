import "../css/loader.css"; // Make sure this file exists

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="wrapper">
        {[...Array(6)].map((_, i) => (
          <div className="loader" key={i}>
            <div className="dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
