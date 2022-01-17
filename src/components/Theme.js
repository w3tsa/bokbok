const Theme = (props) => {
  return (
    <div className="App" data-theme={props.darkMode ? "dark" : "light"}>
      {props.children}
    </div>
  );
};

export default Theme;
