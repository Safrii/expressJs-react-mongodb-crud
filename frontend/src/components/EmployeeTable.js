import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const fetchEmployees = async () => {
    const empyloees = await axios.get('http://localhost:8080/api/employees')
    console.log(empyloees);
}

const renderTable = () => {
    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><Button variant='warning' size='sm' onClick={fetchEmployees}>Update</Button></td>
                        <td><Button variant='danger' size='sm'>Delete</Button></td>
                    </tr>

                </tbody>
            </Table>
        </>
    );
}

const EmployeeTable = () => {
    return (
        renderTable()
    );
}

export default EmployeeTable;