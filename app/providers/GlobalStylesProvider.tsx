"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const GlobalStylesProvider = ({ children }: Props) => {
  return <div className="h-full flex p-10 gap-10">{children}</div>;
};

export default GlobalStylesProvider;
