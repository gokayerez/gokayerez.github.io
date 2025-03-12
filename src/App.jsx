import { useState } from "react"
import Clock from "./Components/Clock/Clock"
import Dropdown from "./Components/Dropdown/Dropdown";

function App() {
  const [timeZone, setTimeZone] = useState("");
  const [clocks, setClocks] = useState([]);
  const [id, setId] = useState(0);
  
  function handleTimeAdd() {
    setClocks([...clocks, {timeZone: timeZone, id: id}]);
    setId(id + 1);
  }

  function handleCallback(childData) {
    setTimeZone(childData)
  }

  return(
    <>
      <Dropdown parentCallback = {handleCallback}/>
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
