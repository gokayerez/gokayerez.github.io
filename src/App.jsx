import { useState } from "react"
import Clock from "./Components/Clock/Clock"
import Dropdown from "./Components/Dropdown/Dropdown";

function App() {
  const [timeZone, setTimeZone] = useState("");
  const [clocks, setClocks] = useState([]);
  const [id, setId] = useState(0);
  
  function handleTimeAdd() {
    if (timeZone !== "") {
      setClocks([...clocks, {timeZone: timeZone, id: id}]);
      setId(id + 1);
    }

    else {
      alert("Please select a time zone.")
    }
  }

  function handleZoneSelect(childData) {
    setTimeZone(childData)
  }

  return(
    <>
      <Dropdown handleZoneSelect = {handleZoneSelect}/>
      <button onClick={handleTimeAdd}>Add time</button>
      <ul>
        {clocks.map(clock => (
          <li onClick={() => setClocks(clocks.filter(c => c.id !== clock.id))} key={clock.id}> <Clock timeZone={clock.timeZone}/> </li>
        ))}
      </ul>
    </>
  );
}

export default App
