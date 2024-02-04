import { React, useState, useEffect} from "react";
import ChartRace from "./ChartRace.js";
import './App.css';

import jsondata from "./data/2023Bahrain.json"

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [absoluteActive, setAbsoluteActive] = useState(true);
  

  function getData(index) {
    return jsondata.data[index].data;
  }

  function getLap(index) {
    return jsondata.data[index-1].lap;
  }

  function handleChange() {
    setIndex(index + 1);

    const data = getData(index);

    setData([...data]);
    
  }

  useEffect(() => {
    const data = getData(0);

    setData([...data]);
  }, []);

  useEffect(() => {
    let id;

    if (isActive && absoluteActive){
    id = setInterval(() => {
      handleChange();
    }, 300);
  }
    else{
      clearInterval(index);
    }
    
    if(index === jsondata.end - 1) {
      setAbsoluteActive(false);
    }
    return () => clearInterval(id);
  }, [isActive, index]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIndex(1);
    setAbsoluteActive(true);
    setIsActive(false);
  };

  return (

    <div class='inner_div'>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <h1>{getLap(index)}</h1>

      <ChartRace
        data={data}
        backgroundColor="#ffffff"
        width={760}
        padding={12}
        itemHeight={20}
        gap={12}
        titleStyle={{ font: "normal 400 13px Arial", color: "#000" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "rgba(0,0,0, 0.42)"
        }}
      />

    </div>
  );
}

export default App;
