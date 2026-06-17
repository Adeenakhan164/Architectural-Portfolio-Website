import { clear } from "@testing-library/user-event/dist/clear";
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  //Fetch data from an public API
  useEffect(() => {
    const response = fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => setData(data));

      return () => {
        console.log("Cleaning up...");
        setData(null);
      }

  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {      
      console.log("Cleaning up...");
      clearTimeout(timer);
    }
  }, [data]); 

    return (
        <div>
            <h1>I've rendered {count} times!</h1>
            {data && <p>{data.title} {data.completed.toString()} {data.userId} {data.id}</p>}
        </div>
    );
}

export default Timer;