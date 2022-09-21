import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { employeeList } from '../recoil/employeeAtom';
import { selectedEmployeeAtom } from '../recoil/selectedEmployeeAtom';

const EmployeeForm = () => {

    const addNewEmployee = useSetRecoilState(employeeList);
    const selectedEmployee = useRecoilValue(selectedEmployeeAtom);

    const createEmplyee = async (employee) => {
        const newEmployee = await axios.post(`http://localhost:8080/api/employee`, {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email
        });
        addNewEmployee(newEmployee);
    };

    const updateEmployee = async () => {
        console.log(selectedEmployee._id)
        await axios.put(`http://localhost:8080/api/employee/${selectedEmployee._id}`, {
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            email: selectedEmployee.email
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            email: selectedEmployee.email
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Too short!')
                .max(50, 'Too Long!')
                .required('Required'),
            lastName: Yup.string()
                .min(3, 'Too short!')
                .max(50, 'Too Long!')
                .required('Required'),
            email: Yup.string().email('Invalid Email').required('Required')
        }),
        onSubmit: (values) => {
            if (Object.keys(selectedEmployee).length === 0) {
                createEmplyee(values)
                console.log('create')
            } else {
                updateEmployee();
                console.log('update')
            }
            formik.resetForm({
                values: { firstName: '', lastName: '', email: '' }
            });
        },
    });

    return (
        <>
            <Card style={{ padding: '2rem' }}>
                <Card.Title style={{ paddingBottom: '1rem' }}>Create / Update employee</Card.Title>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                        {formik.touched.firstName && formik.errors.firstName ? (<div style={{ color: 'red' }}>{formik.errors.firstName}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
                        {formik.touched.lastName && formik.errors.lastName ? (<div style={{ color: 'red' }}>{formik.errors.lastName}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? (<div style={{ color: 'red' }}>{formik.errors.email}</div>) : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    );
}

export default EmployeeForm;