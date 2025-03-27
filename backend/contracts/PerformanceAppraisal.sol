// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PerformanceAppraisal {
    struct Employee {
        uint id;
        string name;
        uint score;
        address ratedBy;
    }

    mapping(uint => Employee) public employees;
    uint public employeeCount;

    event EmployeeAdded(uint indexed id, string name, uint score);
    event EmployeeRated(uint indexed id, uint newScore, address ratedBy);

    // Function to add a new employee
    function addEmployee(string memory _name, uint _score) public {
        require(_score <= 100, "Score must be between 0 and 100");
        employees[employeeCount] = Employee(employeeCount, _name, _score, msg.sender);
        emit EmployeeAdded(employeeCount, _name, _score);
        employeeCount++;
    }

    // Function to rate an employee (update score)
    function rateEmployee(uint _id, uint _newScore) public {
        require(_id < employeeCount, "Employee does not exist");
        require(_newScore <= 100, "Score must be between 0 and 100");
        employees[_id].score = _newScore;
        employees[_id].ratedBy = msg.sender;
        emit EmployeeRated(_id, _newScore, msg.sender);
    }

    // Function to get employee details
    function getEmployee(uint _id) public view returns (string memory, uint, address) {
        require(_id < employeeCount, "Employee does not exist");
        Employee memory emp = employees[_id];
        return (emp.name, emp.score, emp.ratedBy);
    }
}
