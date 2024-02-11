import { React, useState, useEffect} from "react";
import Select from "react-select";
import ChartRace from "./ChartRace.js";
import './App.css';
import jsondata from "./data/data.json";
import { FaGithub, FaBookOpen } from "react-icons/fa";

const customStyles = {
      control: (provided) => ({
        ...provided,
        borderRadius: "7px",
        borderWidth: "2px",
        borderColor: "#18E7CF",
        height: "40px",
        textAlign: "center",
        fontFamily: 'Arial, sans-serif',
        fontSize: "15px", 
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
      <p style={{color:"#ffffff",fontFamily: 'Arial, sans-serif',fontSize:"2.5rem",margin:"0px"}}>🏎️ Formula1 Race Results <span style={{fontSize:"1rem",color:"#18E7CF"}}>0.1.1-beta</span></p>
      <div style={{margin:20, width:"8vw", minWidth:"100px"}}>
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
      <div style={{margin:20, width:"40vw",minWidth:"300px"}}>
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
      <div style={{border:"2px solid #18E7CF",margin:"auto",width:"95%"}}>
      
      <center>
      <div style={{margin:"20px"}}></div>
      <div style={{width:"90%"}}>
      <h1 style={{color:"#ffffff",fontFamily: 'Arial, sans-serif',display:'inline',fontSize:"1rem"}}>{circuit}</h1>
      </div>
      <div style={{margin:"10px"}}></div>
      <div style={{margin:"1rem",width:"90%"}}>
      <h1 style={{color:"#18E7CF",fontFamily: 'Arial, sans-serif',display:'inline',margin:"30px",fontSize:"1rem"}}>{lap.slice(0,3)!=='1 L' ? lap.slice(0,-8) : lap.slice(0,-10) }</h1>
      <button className="button-27" onClick={handleStart}>Start</button>
      <button className="button-27" onClick={handlePause}>Pause</button>
      <button className="button-27" onClick={handleReset}>Reset</button>
      </div>
      </center>
      
      <ChartRace
        data={data}
        backgroundColor="#000"
        width={0.75}
        padding={20}
        paddingy={0}
        paddingbar={1}
        itemHeight={20}
        gap={12}
        titleStyle={{ font: "normal 400 9px Arial", color: "#fff" }}
        valueStyle={{
          font: "normal 400 7px Arial",
          color: "rgba(255,255,255, 0.42)",
        }}
      />
      </div>
      <p style={{fontFamily: 'Arial, sans-serif',fontSize:"15px", color:"#999999",textAlign:"center"}}> This page is for desktop and laptop environments. For any bugs or reports, please send email : <span style={{color:"#18E7CF"}}>doryeon514@gm.gist.ac.kr</span> or <span style={{color:"#18E7CF"}}>doryeon514@gmail.com</span>. </p>
      <p style={{fontFamily: 'Arial, sans-serif',fontSize:"15px", color:"#999999",textAlign:"center",margin:"10px"}}> <a href='https://github.com/9tailwolf/f1_race_result' style={{color:"#18E7CF",textDecoration:"none"}}><FaGithub/> GitHub Repository</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://9tailwolf.com/playground/f1/raceresult' style={{color:"#18E7CF",textDecoration:"none"}}><FaBookOpen/> Project Description</a> </p>
      <div style={{margin:"20px"}}></div>
    </div>
    
  );
}
export default App;