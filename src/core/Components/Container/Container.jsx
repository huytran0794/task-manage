import clsx from "clsx";
import React from "react";

/* import local interface */


const Container = ({ className, children }) => {
  return (
    <div className={clsx("container mx-auto", className)}>{children}</div>
  );
};

export default Container;
