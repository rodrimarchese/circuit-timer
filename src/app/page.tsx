// pages/index.js
"use client";
import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [workTime, setWorkTime] = useState(10); // Tiempo de cada bloque de ejercicio en segundos
  const [modules, setModules] = useState(3); // Número de módulos (grupos de ejercicios)
  const [exercisesPerModule, setExercisesPerModule] = useState(3); // Ejercicios por módulo
  const [blocksPerExercise, setBlocksPerExercise] = useState(6); // Bloques por ejercicio
  const [currentSecond, setCurrentSecond] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);
  const [currentModule, setCurrentModule] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(1);

  const exerciseChangeSound = useRef<HTMLAudioElement | null>(null);
  const moduleChangeSound = useRef<HTMLAudioElement | null>(null);
  const startSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    exerciseChangeSound.current = new Audio("/Tiempo.mp3");
    moduleChangeSound.current = new Audio("/CambioDeCircuito.mp3");
    startSound.current = new Audio("/Va.mp3");
    let interval = null;

    if (activeTimer) {
      interval = setInterval(() => {
        setCurrentSecond(currentSecond + 1);
        if (currentSecond >= workTime - 1) {
          exerciseChangeSound.current?.play(); // Sonido al final de cada bloque
          setCurrentSecond(0);
          setCurrentBlock(currentBlock + 1);
          if (currentBlock >= blocksPerExercise) {
            setCurrentBlock(1);
            setCurrentExercise(currentExercise + 1);
            if (currentExercise >= exercisesPerModule) {
              setCurrentExercise(1);
              setCurrentModule(currentModule + 1);
              if (currentModule > modules) {
                setActiveTimer(false);
                alert("Entrenamiento completado!");
                setCurrentModule(1);
              } else {
                moduleChangeSound.current?.play(); // Sonido de cambio de módulo al cambiar de circuito
              }
            }
          }
        }
      }, 1000);
    } else {
      clearInterval(interval || 0);
    }

    return () => clearInterval(interval || 0);
  }, [
    activeTimer,
    currentSecond,
    workTime,
    modules,
    exercisesPerModule,
    blocksPerExercise,
    currentModule,
    currentExercise,
    currentBlock,
  ]);

  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center p-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Cronómetro de Circuito</h1>
        <div>
          <label className="block text-white text-lg font-bold mb-2">
            Tiempo de trabajo (seg):
          </label>
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-white text-lg font-bold mb-2">
            Cantidad de módulos:
          </label>
          <input
            type="number"
            value={modules}
            onChange={(e) => setModules(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-white text-lg font-bold mb-2">
            Ejercicios por módulo:
          </label>
          <input
            type="number"
            value={exercisesPerModule}
            onChange={(e) => setExercisesPerModule(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-white text-lg font-bold mb-2">
            Bloques por ejercicio:
          </label>
          <input
            type="number"
            value={blocksPerExercise}
            onChange={(e) => setBlocksPerExercise(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => {
              if (
                !activeTimer &&
                currentSecond === 0 &&
                currentModule === 1 &&
                currentExercise === 1 &&
                currentBlock === 1
              ) {
                startSound.current?.play();
              }
              setActiveTimer(!activeTimer);
            }}
            className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex-grow"
          >
            {activeTimer ? "Pausar" : "Iniciar"}
          </button>
          <button
            onClick={() => {
              setActiveTimer(false);
              setCurrentSecond(0);
              setCurrentModule(1);
              setCurrentExercise(1);
              setCurrentBlock(1);
            }}
            className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex-grow"
          >
            Resetear
          </button>
        </div>
        <div className="text-center text-xl">
          <h2>
            Circuito/módulo actual: {currentModule}/{modules}, Ejercicio actual:{" "}
            {currentExercise}/{exercisesPerModule}, Bloque de ej actual:{" "}
            {currentBlock}/{blocksPerExercise}
          </h2>
          <h2>Tiempo: {currentSecond} segundos</h2>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Timer />
    </div>
  );
}
