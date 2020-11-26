import React, { Component } from 'react';
import Table from './EmployeeTable';
import API from '../utils/API';
import '../index.css';

class SearchResultsContainer extends Component {
  // create a state that will hold the response data from axios call
  state = {
    result: [],
    filter: '',
    filterResultMale: [],
    filterResultFemale: [],
    showResult: [],
    showAgeResult: [],
    age: false,
  }

  // add a function to make a query to https://randomuser.me/api/
  getEmployees = () => {
    API.search()
      .then(res => {
        this.setState({result: res.data.results});
        this.setState({filterResultMale: res.data.results});
        this.setState({filterResultFemale: res.data.results});
        this.setState({showAgeResult: res.data.results});
        this.setState({showResult: res.data.results});
      })
      .catch(err => console.log(err));
  }

  sortEmployeeAge = () => { // Sorts by age
      let age = [];
      age[0] = this.state.showAgeResult[0];
      for(let i = 1; i < 20; i++){
        for(let j = 0; j < age.length; j++){
          if(this.state.showAgeResult[i].dob.age < age[j].dob.age){
            age.splice(j,0,this.state.showAgeResult[i]);
            break;
          }
          if(j === age.length - 1){
            age.push(this.state.showAgeResult[[i]]);
            break;
          }
      }
      this.setState({showResult: age});
    }
  };

  // filter array for male employees
  filterMale = () => {
    const filterEmployees = this.state.filterResultMale;
    const filteredMale = filterEmployees.filter(employee => employee.gender === "male");
    this.setState({showResult: filteredMale});
  }

  // filter array for female employees
  filterFemale = () => {
    const filterEmployees = this.state.filterResultFemale;
    const filteredFemale = filterEmployees.filter(employee => employee.gender === "female");
    this.setState({showResult: filteredFemale});
  }

  // the filter function (will cycle through male, female, and all employees)
  
  // if the state is male, run the filterMale function
  // if the state is female, run the filterFemale function
  filter = () => {
    // create a state to track whether to show just male, female, or all employees
    const currentFilter = this.state.filter;
    
    // if the currentFilter state is empty (showing all employees), then filter employees
    // by male employees
    if(currentFilter === ''){
      // filter by male users
      this.filterMale();
      this.setState({filter: 'male'});

    // if the currentFilter state is 'male' (showing all male employees), then filter employees
    // by female employees
    } else if(currentFilter === 'male') {
      // filter by female users
      this.filterFemale();
      this.setState({filter: 'female'});

    // if the currentFilter state is 'female' (showing all female employees), then show all employees
    } else {
      this.setState({showResult: this.state.result});
      this.setState({filter: ''});
    }
  }
  

  // will show all users on the homepage
  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="header">
        {/* User data will go in the component as props */}
        <Table 
          employees={this.state.showResult}
          sortEmployeeAge={this.sortEmployeeAge}
          filterMale={this.filterMale}
          filter={this.filter}
        />
      </div> 
    );
  }
}

export default SearchResultsContainer;