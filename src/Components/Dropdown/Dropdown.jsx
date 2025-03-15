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

const getTimeZones = async () => {
    const response = await fetch("https://timeapi.io/api/timezone/availabletimezones");
    return await response.json()
}

// cosmetics for the react-select component
const selectStyles = {
    control: (provided) => ({...provided}),
    option: (provided) => ({...provided, color: 'grey'})
}

export default function Dropdown({ handleZoneSelect }) {
    const {data, isPending} = useDropdownQuery();

    return(
        <>
            <Select options={data} 
                onChange={e => {
                    handleZoneSelect(e ? e.value : null)
                }} 
                isLoading={isPending} 
                isClearable 
                placeholder="Select a time zone..." 
                styles={selectStyles}
            />
        </> 
    );
}
