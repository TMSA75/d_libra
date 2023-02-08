import React, { useEffect } from "react";
import { useSelector } from "react-redux";




const ThemeContorller = ({ children }) => {
  const theme = useSelector((state) => state.theme.state);


  // useEffect(() => {
    // localStorage.setItem("globalTheme", theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [theme]);


  return (
      <div className={theme ? `theme--light` : 'theme--dark'}>{children}</div>
  );
};

export default ThemeContorller;

