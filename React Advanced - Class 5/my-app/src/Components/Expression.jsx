function Expression() {

    // Expressions are any valid set of literals, variables, operators, and expressions that evaluate to a single value.
    // JSX allows you to embed any JavaScript expression in curly braces within your JSX code.
    function kwtohp(kw) {
      return kw * 1.36;
    }

    const x = 5;
    const y = 10;

      const myStyle = {
        color: "lightgray",
        backgroundColor: "green",
        padding: "10px",
        borderRadius: "5px"
      };

    return (
      <div style={myStyle} className="App">
        <h1>This is a third child Component</h1>
        <h1>The sum of {x} and {y} is {x + y}</h1>
        <h1>{x} kilowatts is equal to {kwtohp(x)} horsepower</h1>
      </div>
    );
  }

export default Expression;