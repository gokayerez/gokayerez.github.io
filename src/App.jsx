import { useState } from "react"
import Clock from "./Components/Clock/Clock"

function App() {
  const [timeZone, setTimeZone] = useState("");
  const [clocks, setClocks] = useState([]);
  
  function handleTimeAdd() {
    setClocks([...clocks, {timeZone: timeZone}]);
    setTimeZone("");
    console.log(clocks)
  }

  function handleTimeRemove() {
    
  }
  
  return(
    <>
      <input name="timeZoneInput" 
            placeholder="Select a time zone." 
            value={timeZone}
            onChange={e => setTimeZone(e.target.value)}/>
      <button onClick={handleTimeAdd}>Add time</button>
      <ul>
        {clocks.map(clock => (
          <li key={clock.id}> <Clock timeZone={clock.timeZone}/> </li>
        ))}
      </ul>
    </>
  );
}

export default App
