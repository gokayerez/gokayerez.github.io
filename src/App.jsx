import { useState } from "react"
import Clock from "./Components/Clock/Clock"
import Dropdown from "./Components/Dropdown/Dropdown";

function App() {
  const [timeZone, setTimeZone] = useState("");
  const [clocks, setClocks] = useState([]);
  const [id, setId] = useState(1);
  
  function handleTimeAdd() {
    if (timeZone !== "") {
      setClocks([...clocks, {timeZone: timeZone, id: id}]);
      setId(id + 1);
    }

    else {
      alert("Please select a time zone.")
    }
  }

  function handleCallback(childData) {
    setTimeZone(childData)
  }

  return(
    <>
      <Dropdown parentCallback = {handleCallback}/>
      <button onClick={handleTimeAdd}>Add time</button>
      <ul>
        <li key={0}> <Clock timeZone="Turkey" /> </li>
        {clocks.map(clock => (
          <li onClick={() => setClocks(clocks.filter(c => c.id !== clock.id))} key={clock.id}> <Clock timeZone={clock.timeZone}/> </li>
        ))}
      </ul>
    </>
  );
}

export default App
