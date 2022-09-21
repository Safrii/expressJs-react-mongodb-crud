import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { employeeList } from '../recoil/employeeAtom';
import { selectedEmployeeAtom } from '../recoil/selectedEmployeeAtom';

const EmployeeTable = () => {

    const [employees, setEmployees] = useRecoilState(employeeList);
    const [_, setSelectedEmployee] = useRecoilState(selectedEmployeeAtom);

    const fetchEmployees = async () => {
        const employeesList = await axios.get('http://localhost:8080/api/employees');
        setEmployees(employeesList.data.data.employees);
    }

    const deleteEmployee = async (employeeId) => {
        const deletedEmployee = await axios.delete(`http://localhost:8080/api/employee/${employeeId}`);
        let filteredArray = employees.filter(item => item._id !== deletedEmployee.data.data.deletedEmployee._id);
        setEmployees(filteredArray);
    }

    const selectEmployeeForUpdate = (selectedEmployee) => {
        setSelectedEmployee(selectedEmployee);
    }

    useEffect(() => {
        fetchEmployees()
    }, [employees])

    return (
        <>
            {!employees?.length ?
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    Is your backend running ? Check mongodb in docker 😥
                    Or simply create new employee 😁
                </Placeholder>
                :
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td><Button disabled='true' variant='warning' size='sm' onClick={() => selectEmployeeForUpdate(employee)}>Update</Button></td>
                                <td><Button variant='danger' size='sm' onClick={() => deleteEmployee(employee._id)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    );
}

export default EmployeeTable;