import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';

const EmployeeTable = () => {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const employeesList = await axios.get('http://localhost:8080/api/employees')
        setEmployees(employeesList.data.data.employees)
    }

    const deleteEmployee = async (employeeId) => {
        await axios.delete(`http://localhost:8080/api/employee/${employeeId}`)
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

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
                                <td><Button variant='warning' size='sm'>Update</Button></td>
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