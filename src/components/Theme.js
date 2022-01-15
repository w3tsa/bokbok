const Theme = (props) => {
  return (
    <div className="App" data-theme={props.darkMode ? "dark" : null}>
      {props.children}
    </div>
  );
};

export default Theme;
