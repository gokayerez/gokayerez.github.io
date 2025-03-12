import { useQuery } from "@tanstack/react-query";

export default function Dropdown(props) {
    const {data, isPending} = useQuery({
        queryKey: ['timeZones'],
        queryFn: getTimeZones,
    })

    function handleSelect(selectedZone) {
        props.parentCallback(selectedZone);
    }
    
    return(
        <>
            <select onChange={e => handleSelect(e.target.value)}>
                <option value={""} key={0}>Select a timezone.</option>
                {isPending ? "" :
                data.map(timeZone => (
                    <option value={timeZone} key={timeZone}>{timeZone}</option>
                ))}
            </select>
        </> 
    );
}

const getTimeZones = async () => {
    const response = await fetch("https://timeapi.io/api/timezone/availabletimezones");
    return await response.json()
}