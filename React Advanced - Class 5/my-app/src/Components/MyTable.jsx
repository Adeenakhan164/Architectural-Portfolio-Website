function MyTable({names}) {

    const myTable = (
        <table>
        <tr>
        <th>Name</th>
        </tr>
        <tr>
        <td>{names[0]}</td>
        </tr>
        <tr>
        <td>{names[1]}</td>
        </tr>
        <tr>
        <td>{names[2]}</td>
        </tr>
    </table>
    )

      const myStyle = {
        color: "black",
        backgroundColor: "red",
        padding: "10px",
        borderRadius: "5px"
      };

  return (
    <div style={myStyle} className="App">
      <h1>This is a second child Component</h1>
      <h2>This is a Table Component</h2>
        {myTable}
    </div>
  );
}
    
export default MyTable;