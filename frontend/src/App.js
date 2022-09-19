import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <EmployeeForm />
          </Col>
          <Col>
            <EmployeeTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
