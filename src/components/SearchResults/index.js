import React from "react";
import "./style.css";

function SearchResults({employees}) {
  console.log("Props: "+JSON.stringify(employees));
  return (
    <ul className="list-group search-results">
      {employees.map(result => (
        <li key={result} className="list-group-item">
          <img alt="Employee" src={result.picture.large} className="img-fluid" />
          <h3>{result.name.first} {result.name.last}</h3>
          <h5>{result.email}</h5>
          <h6>{result.location.city}, {result.location.state}, {result.location.country}</h6>
        </li>
      
      ))}
    </ul>
  );
}

export default SearchResults;
