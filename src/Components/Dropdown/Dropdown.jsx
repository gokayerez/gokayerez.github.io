import { useQuery } from "@tanstack/react-query";
import Select from 'react-select'

const useDropdownQuery = () => {
    return useQuery({
        queryKey: ['timeZones'],
        queryFn: getTimeZones,
        // data transformation
        select: (data) => {
            return data.map(zone => ({value: zone, label: zone}))
        }
    })
}

// cosmetics for the react-select component
const selectStyles = {
    control: (provided) => ({...provided}),
    option: (provided) => ({...provided, color: 'grey'})
}

export default function Dropdown(props) {
    const {data, isPending} = useDropdownQuery();

    // sends selected timezone to parent
    function handleSelect(selectedZone) {
        props.parentCallback(selectedZone);
    }

    return(
        <>
            {/* <select onChange={e => handleSelect(e.target.value)}>
                <option value={""} key={0}>Select a timezone.</option>
                {isPending ? "" :
                data.map(timeZone => (
                    <option value={timeZone} key={timeZone}>{timeZone}</option>
                ))}
            </select> */}
            <Select options={data} 
                onSelect={e => handleSelect(e.value)} 
                isLoading={isPending} 
                isClearable 
                placeholder="Select a time zone..." 
                styles={selectStyles}
            />
        </> 
    );
}

const getTimeZones = async () => {
    const response = await fetch("https://timeapi.io/api/timezone/availabletimezones");
    return await response.json()
}