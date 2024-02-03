import { React, useState, useEffect } from "react";
import ChartRace from "./ChartRace.js";
import './App.css';

import jsondata from "./data/2023Bahrain.json"

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  function getData(index) {
    return jsondata.data[index].data;
  }

  function getLap(index) {
    return jsondata.data[index].lap;
  }

  // read data function
  

  function handleChange() {
    setTimeout(() => {
      setIndex(index + 1);
    }, 200

    )
    const data = getData(index);

    setData([...data]);
  }

  useEffect(() => {
    const data = getData(0);

    setData([...data]);
  }, []);

  return (
    <div class='inner_div'>
      <button onClick={handleChange}>Click Me!</button>
      <h1>{getLap(index)}</h1>

      <ChartRace
        data={data}
        backgroundColor="#000"
        width={760}
        padding={12}
        itemHeight={20}
        gap={12}
        titleStyle={{ font: "normal 400 13px Arial", color: "#fff" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "rgba(255,255,255, 0.42)"
        }}
      />

    </div>
  );
}

export default App;
