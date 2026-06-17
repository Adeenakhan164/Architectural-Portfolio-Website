import { useState, useEffect, useRef, use } from 'react';

function UseRefComponent() {
    const [inputValue, setInputValue] = useState("");
    const count = useRef(0); // Create a ref to store the input element
    const inputElementRef = useRef()
    const previousInputValue = useRef(""); // Create a ref to store the previous input value

    useEffect(() => {
        count.current =  count.current + 1; // Increment the count on every render
        console.log(`Component has rendered ${count.current} times`);
    }); // No dependency array, so it runs after every render

    useEffect(() => {
        previousInputValue.current = inputValue; // Update the previous input value after every render
    }, [inputValue]); // Dependency array with inputValue, so it runs whenever inputValue changes

    const focusInput = () => {
        inputElementRef.current.focus(); // Focus the input element using the ref
    }

    return (
        <div>
            <h1>Input field to get User Input</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputElementRef} // Attach the ref to the input element
            />
            <p>You entered: {inputValue}</p>
            <p>Component has rendered {count.current} times</p>
            <button onClick={focusInput}>Focus Input</button>
            <p>Previous input value: {previousInputValue.current}</p>
        </div>
    );
}

export default UseRefComponent;

// The useRef Hook is a built-in Hook in React that allows you to create a mutable reference that persists across renders. 
// It can be used to store a reference to a DOM element, a value that does not trigger a re-render when it changes, or any other mutable value that you want to persist across renders.