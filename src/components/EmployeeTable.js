import React from 'react';
import Table from 'react-bootstrap/Table'

function EmployeeTable(props) {
  return (
    <div>
      <Table className="table table-hover table-striped table-light">
      {/* Table of Users */}
      
        {/* Table Headers and Buttons for sorting and filtering data */}
        <thead className="thead-light">
          <tr>
            <th> Employee </th>
            <th> Name </th>
            <th><button onClick={props.sortEmployeeAge}> Age </button></th>
            <th><button onClick={props.filter}> Gender </button></th>
            <th> Email </th>
            <th> Cell Phone </th>
            <th> Address </th>
          </tr>
        </thead>

        <tbody>
          {/* For every user in the results, map through the array and get info */}
          {props.employees.map(({employees, name, picture, gender, email, location, cell, dob}) => {
            return(
              <tr key={employees}>
                <td><img src={picture.medium} alt="Employee Photo" /></td>
                <td> {name.first} {name.last} </td>
                <td> {dob.age}</td>
                <td> {gender}</td>
                <td> {email} </td>
                <td> {cell} </td>
                <td> {location.street.number} {location.street.name}, {location.city}, {location.state} {location.postcode} </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;