import React from "react";


import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";

const Employees = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      {/* HEADER */}
      <Header category="Page" title="Employees" />
    </div>
  );
};

export default Employees;
