import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const Search = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, []);
  //const location = useLocation();
  return <h1>Search page</h1>;
};
