import { useState, useEffect } from "react"

export default function Clock(props) {
    const [offset, setOffset] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        let timeZone = encodeURIComponent(props.timeZone);

        fetch(`https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`)
        .then(response => response.json())
        .then(json =>  {
            const apiTime = new Date(json.dateTime);
            const localTime = new Date();
            setOffset(apiTime.getTime() - localTime.getTime());
        })
        .catch(error => console.error(error));
    }, []); 

    useEffect(() => {
        if (!offset) return; // Wait until offset is set

        // Calculate delay until the next full second
        const now = Date.now();
        const delay = 1000 - (now % 1000);

        // Wait until the next full second, then start ticking every 1000ms
        const timeout = setTimeout(() => {
            setDate(new Date(Date.now() + offset));

            const interval = setInterval(() => {
                setDate(new Date(Date.now() + offset));
            }, 1000);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [offset]);

    if (!date) return <p>Loading...</p>

/*     function formatTime() {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        return (`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`);
    } */

/*     function padZero(time) {
        if (time < 10) {
        return(`0${time}`);
        } else {
        return(time);
        }
    } */

    return (
        <div>
        <p>{props.timeZone} - {date.toLocaleString('el-GR', {timeStyle: "medium", hour12: false})}</p>
        </div>
    )
}