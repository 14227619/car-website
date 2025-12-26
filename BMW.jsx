import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";

export default function BMW() {
  const [cars, setCars] = useState([]);
  const [filterModel, setFilterModel] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cars_data") || "[]");
    setCars(data.filter(car => car.company.toLowerCase() === "bmw"));
  }, []);

  const filteredCars = cars.filter(car =>
    (!filterModel || car.model.toLowerCase().includes(filterModel.toLowerCase())) &&
    (!filterMaxPrice || car.price <= Number(filterMaxPrice))
  );

  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold p-4">BMW Cars</h2>

      <section className="p-4 flex gap-2 flex-wrap bg-gray-200 rounded m-4">
        <input 
          type="text" placeholder="Filter by model" value={filterModel}
          onChange={e => setFilterModel(e.target.value)}
          className="p-2 border rounded"
        />
        <input 
          type="number" placeholder="Max price" value={filterMaxPrice}
          onChange={e => setFilterMaxPrice(e.target.value)}
          className="p-2 border rounded"
        />
        <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={()=>{
          setFilterModel(""); setFilterMaxPrice("");
        }}>Reset</button>
      </section>

      <section className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCars.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No BMW cars found</p>
        ) : (
          filteredCars.map(car => <CarCard key={car.id} car={car} />)
        )}
      </section>
    </div>
  );
}
