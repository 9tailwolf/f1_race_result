import { React, useState, useEffect} from "react";
import Select from "react-select";
import ChartRace from "./ChartRace.js";
import './App.css';
import jsondata from "./data/data.json";
import { FaGithub } from "react-icons/fa";

const customStyles = {
      control: (provided) => ({
        ...provided,
        borderRadius: "7px",
        borderWidth: "2px",
        borderColor: "#18E7CF",
        height: "40px",
        textAlign: "center",
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'black',
        flexWrap: 'nowrap',
      }),
      option: (provided, {isFocused, isSelected}) => ({
        ...provided,
        display: 'block',
        backgroundColor:
        isSelected
        ? 'black'
        : isFocused
        ? '#18E7CF'
        : 'white',
        color:
        isSelected
        ? 'white'
        : isFocused
        ? 'black'
        : 'black',
        fontFamily: 'Arial, sans-serif',
      }),
      singleValue: provided => ({
        ...provided,
        color: 'white'
      }),
    };

function App() {
  const [data, setData] = useState(jsondata[2023][jsondata[2023]['circuits'][0]].data[0].data);
  const [lap, setLap] = useState(jsondata[2023][jsondata[2023]['circuits'][0]].data[0].lap);
  const [index, setIndex] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [absoluteActive, setAbsoluteActive] = useState(true);

  const [yearsOption, setYearsOption] = useState(jsondata.years_option);
  const [yearValue, setYearValue] = useState("2023");
  const [year, setYear] = useState(2023);

  const [circuitOption, setCircuitOption] = useState(jsondata[2023].circuits_option);
  const [circuitValue, setCircuitValue] = useState(jsondata[2023]['circuits'][0]);
  const [circuit, setCircuit] = useState(jsondata[2023]['circuits'][0])
  


  function getData(index) {
    return jsondata[year][circuit].data[index].data;
  }

  function getLap(index) {
    return jsondata[year][circuit].data[index].lap;
  }


  function handleChange() {
    setIndex(index + 1);
    const data = getData(index-1);
    const lap = getLap(index-1);
    setData([...data]);
    setLap(lap)
  }


  function yearChange(value) {
    setYearValue(value);
    setYear(value);
    setCircuitOption(jsondata[value].circuits_option);
  }


  function circuitChange(value) {
    handleReset();
    setCircuitValue(value);
    setCircuit(value);
  }

  useEffect(() => {
    setCircuitValue(jsondata[year]['circuits'][0]);
    setCircuit(jsondata[year]['circuits'][0]);
  }, [year]) 

  useEffect(() => {
    const data = getData(0);
    const lap = getLap(0);
    setData([...data]);
    setLap(lap)
    setIndex(1);
  }, [circuit]) 

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
    
    if(index === jsondata[year][circuit].end) {
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
    const data = getData(0);
    const lap = getLap(0);
    setData([...data]);
    setLap(lap)
    setIndex(1);
    setAbsoluteActive(true);
    setIsActive(false);
  };


  return (
    <div class='inner_div'>
      <center>
      <p style={{color:"#ffffff",fontFamily: 'Arial, sans-serif',fontSize:"50px"}}>🏎️ Formula1 Race Results</p>
      <div style={{margin:20, width:"8%",whiteSpace:"nowrap"}}>
      <Select 
        styles={customStyles}
          className="selectItem"
          onChange={(e) => yearChange(e.value)}
          options={yearsOption}
          placeholder=""
          value={yearsOption.filter(function (option) {
            return option.value === yearValue;
          })}
      /></div>
      <div style={{margin:20, width:"40%",whiteSpace:"nowrap"}}>
      <Select
          styles={customStyles}
          className="selectItem"
          onChange={(e) => {circuitChange(e.value);}}
          options={circuitOption}
          placeholder=""
          value={circuitOption.filter(function (option) {
            return option.value === circuitValue;
          })}
      />
      </div>
      </center>
      <div style={{margin:"20px"}}></div>
      <div style={{border:"2px solid #18E7CF",margin:"auto",width:"88%"}}>
      <center>
      <h1 style={{color:"#ffffff",fontFamily: 'Arial, sans-serif',display:'inline',margin:"10%"}}>{lap.slice(0,-8)}</h1>
      <button className="button-27" onClick={handleStart}>Start</button>
      <button className="button-27" onClick={handlePause}>Pause</button>
      <button className="button-27" onClick={handleReset}>Reset</button>
      </center>
      <ChartRace
        data={data}
        backgroundColor="#000"
        width={"100%"}
        padding={20}
        paddingy={0}
        paddingbar={4}
        itemHeight={20}
        gap={12}
        titleStyle={{ font: "normal 400 13px Arial", color: "#fff" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "rgba(255,255,255, 0.42)",
        }}
      />
      </div>
    </div>
    
  );
}

export default App;

