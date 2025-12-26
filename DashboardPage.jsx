import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AdminPanel from "../components/AdminPanel";

export default function DashboardPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cars_data") || "[]");
    setCars(data);
  }, []);

  const companies = [...new Set(cars.map(car => car.company))];

  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
      {companies.map(company => (
        <div key={company} className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{company}</h3>
          <AdminPanel cars={cars.filter(c => c.company === company)} setCars={setCars} />
        </div>
      ))}
    </div>
  );
}
