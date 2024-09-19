"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(60);

  function incrementCount() {
    if (timer === 0) return;

    setCount(prevCount => prevCount + 1);
  }

  function countDown() {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return countdown; // Return the interval ID
  }

  useEffect(() => {
    const countdown = countDown(); // Store the interval ID
    return () => clearInterval(countdown); // Clear the correct interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Count: {count}</h1>

      <h2 className="text-2xl mb-6">Timer: {timer}</h2>

      <button
        onClick={incrementCount}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        disabled={timer === 0}
      >
        +
      </button>
    </div>
  );
}