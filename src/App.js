import React, { useState, useEffect } from "react";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  async function fetchData() {
    await fetch("https://covid19.mathdro.id/api/countries/KW", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        prepareTable(data);

        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }
  

  function prepareTable(data) {
    let headers = [];
    let rows = [];
    Object.entries(data).forEach(([key, value]) => {
      headers.push(key);
      rows.push(undefined !== value.value ? value.value : value);
    });

    setHeaders(headers);
    setRows(rows);

    console.log(headers);
    console.log(rows);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading)
    return (
      <div>
        <h1 className="text-center mt-4">COVID-19 Cases in Kuwait</h1>
        <table className="table table-dark table-striped text-center mt-2">
          <thead>
            <tr>
              {headers.map(header => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
               {rows.map(row => (
                <td>{row}</td>
              ))} 
            </tr>
          </tbody>
        </table>
      </div>
    );
  else return <div>Please wait...</div>;
}

export default App;
