// What Can State Hold?
// State can hold any type of data, including:
// Primitive data types (strings, numbers, booleans)
// Arrays  
// Objects
// Functions
// React elements   
// State can also hold more complex data structures, such as nested objects or arrays of objects.
// The type of data that state holds can vary depending on the needs of the application and the specific use case. 
// It is important to choose the appropriate data structure for state based on how it will be used and manipulated within the component.

// Updating Objects and Arrays in State
// When updating state that holds an object or an array, it is important to create a new copy of the object or array rather than modifying the existing one directly.
// This is because state updates in React are asynchronous and can lead to unexpected behavior if the existing state is modified directly. What is asynchronous in React?
// Asynchronous in React refers to the fact that certain operations, such as state updates and rendering, do not happen immediately but are instead scheduled to occur at a later time. 
// This allows React to optimize performance and ensure that the user interface remains responsive. 
// When a state update is triggered, React batches multiple updates together and processes them in a single render cycle, which can lead to improved efficiency and smoother user experiences. 
// However, it also means that developers need to be mindful of how they handle state updates and ensure that they are not relying on immediate changes to state when writing their code.

// React useEffect Hooks
// The React useEffect Hook allows us to perform side effects in function components.

// Side effects are operations that can affect other components and cannot be done during rendering, such as fetching data, directly updating the DOM, and timers.

//useEffect accepts two arguments. The second argument is optional.

// useEffect(<function>, <dependency>)

// The first argument is the function that contains the side effect code. This function will run after the render is committed to the screen.

// The second argument is an array of dependencies that determine when the effect should be re-run. 
// If any of the dependencies change, the effect will be re-run. 
// If the array is empty, the effect will only run once after the initial render. 
// If the second argument is not provided, the effect will run after every render.

// example of useEffect without a dependency array:
// useEffect(() => {
//   console.log("This will run after every render");
// });  

// example of useEffect with an empty dependency array:
// useEffect(() => {
//   console.log("This will run only once after the initial render");
// }, []);

// example of useEffect with dependencies:
// const [count, setCount] = useState(0);       
// useEffect(() => {
//   console.log("This will run after the initial render and every time count changes");
// }, [count]); 

import { useState, useEffect } from "react";

function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000);
    }, []); // The effect will run after the intial render

    return (
        <div>
            <h1>I've rendered {count} times!</h1>
        </div>
    );
}

// In this example, we have a Timer component that uses the useState Hook to track the count of how many times the component has rendered.

// We also use the useEffect Hook to set up a timer that increments the count every second. 
// The effect will run only once after the initial render because we have provided an empty dependency array. 
// This means that the timer will start when the component is first rendered and will continue to increment the count every second, causing the component to re-render and display the updated count.

// Effect Cleanup
// Sometimes, we need to clean up after an effect to prevent memory leaks or unwanted behavior.
// To do this, we can return a function from the effect that will be called when the component unmounts or before the effect runs again. 
// This cleanup function can be used to cancel timers, remove event listeners, or perform any necessary cleanup tasks.  

// example of useEffect with cleanup:
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("This will run after 1 second");
  }, 1000);
  return () => {
    clearTimeout(timer);
  };
});

// In this example, we set up a timer that logs a message after 1 second. 
// We also return a cleanup function that clears the timer when the component unmounts or before the effect runs again. 
// This ensures that we do not have any lingering timers that could cause memory leaks or unwanted behavior in our application.

// React useContext Hook
// The React useContext Hook allows us to access the context value from a parent component without having to pass it down through props.

// Context provides a way to share values between components without having to explicitly pass a prop through every level of the tree. 
// This can be useful for things like theming, user authentication, or any other data that needs to be accessed by multiple components in an application.

// To use the useContext Hook, we first need to create a context using the createContext function from React.
import { createContext } from "react";

const MyContext = createContext();  
// This creates a new context object that we can use to provide and consume values in our component tree.

// We can then use the MyContext.Provider component to provide a value to the context. 
// Any component that is a descendant of the Provider can access the context value using the useContext Hook.
import { useContext } from "react";

function MyComponent() {
    const value = useContext(MyContext); // Accessing the context value in MyComponent
    return (
        <div>
            <h1>The context value is: {value}</h1>
        </div>
    );
}

// In this example, we have a MyComponent that uses the useContext Hook to access the value provided by MyContext.Provider.
// We can wrap our component tree with MyContext.Provider and provide a value to the context, which will then be accessible to any descendant components that use the useContext Hook to consume the context value.

// In summary, the useContext Hook allows us to easily access context values in our components without having to pass them down through props, making it easier to manage and share data across our component tree.


// UserContext is a powerful tool for managing state and sharing data across components in a React application. 
// It allows us to create a global state that can be accessed by any component in the component tree, without having to pass props down through multiple levels of components. 
// This can help to simplify our code and make it easier to manage state in larger applications. 
// By using UserContext, we can avoid prop drilling and make our components more reusable and maintainable.

// useContex to send more than one state value
// We can also use the useContext Hook to send more than one state value by creating an object that contains multiple values and providing that object as the context value. 
// For example: 
const MyContext1 = createContext();

function MyProvider({ children }) {
    const [value1, setValue1] = useState("Value 1");
    const [value2, setValue2] = useState("Value 2");    
    const contextValue = { value1, value2 }; // Creating an object to hold multiple values

    return (
        <MyContext1.Provider value={contextValue}>
            {children}
        </MyContext1.Provider>
    );
}

// In this example, we have a MyProvider component that uses the useState Hook to track two state values, value1 and value2. 
// We then create an object called contextValue that contains both of these values and provide it to the MyContext1.Provider. 
// Any component that consumes this context will have access to both value1 and value2 through the context value. 
// This allows us to easily share multiple pieces of state across our component tree without having to pass them down through props.

// useRef Hook
// The React useRef Hook allows us to create a mutable reference that persists across renders. 
// It can be used to access DOM elements directly or to store any mutable value that we want to persist without causing a re-render when it changes. 
// The useRef Hook returns a ref object with a current property that can be used to access the referenced value or DOM element. 
// For example, we can use useRef to access an input element and focus it when a button is clicked:

import { useRef } from "react";

function MyComponent() {
    const inputRef = useRef(); // Create a ref to store the input element   
    const focusInput = () => {
        inputRef.current.focus(); // Focus the input element using the ref
    }   
    return (
        <div>
            <input type="text" ref={inputRef} /> {/* Attach the ref to the input element */}
            <button onClick={focusInput}>Focus Input</button>

        </div>
    );
}

// In this example, we create a ref called inputRef using the useRef Hook and attach it to the input element. 
// We then define a function called focusInput that uses the current property of the ref to call the focus method on the input element when the button is clicked. 
// This allows us to directly interact with the DOM element without having to use state or cause a re-render of the component. 
// The useRef Hook can also be used to store any mutable value that we want to persist across renders without causing a re-render when it changes, such as a timer ID or a previous value of state.