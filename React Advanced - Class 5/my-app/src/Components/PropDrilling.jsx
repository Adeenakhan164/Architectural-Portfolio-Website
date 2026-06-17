import { useState, createContext, useContext } from 'react';

const UserContext = createContext();


function ComponentA() {
  return (
    <div>
      <h2>Component A</h2>
      {/* <p>Data: {data}</p> */}
        <ComponentAChild />
    </div>
  );
}

function ComponentAChild() {
    const data = useContext(UserContext); // Accessing the context value in ComponentAChild
  return (
    <div>   
    <h3>Component A.1</h3>
    <p>Data: {data.data1}</p>
    <p>Data: {data.data2}</p>
    </div>
  );
}

function ComponentB() {
    const data = useContext(UserContext); // Accessing the context value in ComponentB
  return (
    <div>
      <h2>Component B</h2>
      <p>Data: {data.data1}</p>
      <p>Data: {data.data2}</p>
    </div>
  );
}   

function PropDrilling() {
// send data from parent to child component without prop drilling
  const [data1, setData1] = useState("Hello from Parent!");  
  const [data2, setData2] = useState("Another value from Parent!");

  const data = {data1, data2}; // Creating an object to hold multiple values

    return ( 
        <UserContext.Provider value={data}>   
            <div>
                <h1>Parent Component</h1>
                <ComponentA />  
                <ComponentB />
            </div>
        </UserContext.Provider>
     );
}

export default PropDrilling;

// In this example, we have a Parent component that holds the state data. 
// We pass this data down to ComponentA and ComponentB through props. 
// This is an example of prop drilling, where we have to pass props through multiple levels of components to reach the components that need the data. 
// In larger applications, prop drilling can become cumbersome and difficult to manage, which is why state management libraries like Redux or Context API are often used to avoid it.