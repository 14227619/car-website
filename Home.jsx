import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { motion } from "framer-motion";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cars_data") || "[]");
    setCars(data);
  }, []);

  const filteredCars = cars.filter(car =>
    (!filterBrand || car.company.toLowerCase().includes(filterBrand.toLowerCase())) &&
    (!filterModel || car.model.toLowerCase().includes(filterModel.toLowerCase())) &&
    (!filterMaxPrice || car.price <= Number(filterMaxPrice))
  );

  // Featured cars: pick top 3 expensive cars
  const featuredCars = [...cars].sort((a,b)=>b.price - a.price).slice(0,3);

  return (
    <div>
      <Navbar />

      {/* Featured Swiper */}
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-2">Featured Cars</h2>
        {featuredCars.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded"
          >
            {featuredCars.map(car => (
              <SwiperSlide key={car.id}>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-xl rounded overflow-hidden cursor-pointer">
                  <img src={car.image} className="w-full h-64 object-cover" alt={car.model}/>
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{car.model}</h4>
                    <p className="text-gray-500">{car.company}</p>
                    <p className="text-gray-700">${car.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500">No featured cars available</p>
        )}
      </section>

      {/* Filters */}
      <section className="p-4 flex gap-2 flex-wrap bg-gray-200 rounded m-4">
        <input type="text" placeholder="Filter by brand" value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="p-2 border rounded"/>
        <input type="text" placeholder="Filter by model" value={filterModel} onChange={e => setFilterModel(e.target.value)} className="p-2 border rounded"/>
        <input type="number" placeholder="Max price" value={filterMaxPrice} onChange={e => setFilterMaxPrice(e.target.value)} className="p-2 border rounded"/>
        <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={()=>{setFilterBrand(""); setFilterModel(""); setFilterMaxPrice("");}}>Reset</button>
      </section>

      {/* Car Grid */}
      <section className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No cars found</p>
        ) : (
          filteredCars.map(car => <CarCard key={car.id} car={car} />)
        )}
      </section>
    </div>
  );
}
