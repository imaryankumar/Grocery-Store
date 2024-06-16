"use client";
import { useSelector } from "react-redux";

const DarkModeProvider = ({ children }) => {
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <div className={`w-full h-full ${mode ? "dark-mode" : "light-mode"}`}>
      {children}
    </div>
  );
};

export default DarkModeProvider;
