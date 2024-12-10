import React, { useEffect, useState } from "react";
import api from "../api.js";
import AddFruitForm from "./AddFruitForm.jsx";

const FruitList = () => {
  const [fruits, setFruits] = useState([]);

  const featchFruits = async () => {
    try {
      const response = await api.get("/fruits");
      console.log(response);
      setFruits(response.data.fruits);
    } catch (error) {
      console.error("Error fetching fruits", error);
    }
  };

  const addFruit = async (fruitName) => {
    try {
      await api.post("/fruits", { name: fruitName });
      featchFruits();
    } catch (error) {
      console.error("Error adding fruit", error);
    }
  };

  useEffect(() => {
    featchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit.name}</li>
        ))}
      </ul>
      <AddFruitForm addFruit={addFruit} />
    </div>
  );
};

export default FruitList;
