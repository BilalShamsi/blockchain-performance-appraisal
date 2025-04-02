// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PerformanceAppraisal {
    struct Employee {
        uint id;
        string name;
        uint score;
        address ratedBy;
    }

    struct Transaction {
        uint id;
        uint newScore;
        address ratedBy;
        uint256 timestamp;
    }

    Employee[] public employees;
    Transaction[] public transactions;
    uint public employeeCount;

    event EmployeeAdded(uint indexed id, string name, uint score);
    event RatingSubmitted(uint indexed id, uint newScore, address ratedBy, uint256 timestamp);

    // ✅ Add an employee
    function addEmployee(string memory _name) public {
        employees.push(Employee(employeeCount, _name, 0, msg.sender));
        emit EmployeeAdded(employeeCount, _name, 0);
        employeeCount++;
    }

    // ✅ Rate an employee (now updates transactions too)
    function rateEmployee(uint _id, uint _newScore) public {
        require(_id < employees.length, "Employee does not exist");
        require(_newScore <= 100, "Score must be between 0 and 100");

        employees[_id].score = _newScore;
        employees[_id].ratedBy = msg.sender;
        
        transactions.push(Transaction(_id, _newScore, msg.sender, block.timestamp));

        emit RatingSubmitted(_id, _newScore, msg.sender, block.timestamp);
    }

    // ✅ Get employee details by ID
    function getEmployee(uint _id) public view returns (string memory, uint, address) {
        require(_id < employees.length, "Employee does not exist");
        Employee memory emp = employees[_id];
        return (emp.name, emp.score, emp.ratedBy);
    }

    // ✅ Get total number of employees
    function getEmployeeCount() public view returns (uint) {
        return employeeCount;
    }

    // ✅ Get total transaction count
    function transactionCount() public view returns (uint) {
        return transactions.length;
    }
}
