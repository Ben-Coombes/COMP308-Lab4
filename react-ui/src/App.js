import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//
function App() {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/run";

  //runs once after the first rendering of page
  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          //console.log('result.data:', result.data)
          setData(result.data)
          setShowLoading(false)
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();

  }, []);

  const updateTests = (e) => {
    const data = [{
      "sepal_length": document.getElementById("sepal_length_1").value,
      "sepal_width": document.getElementById("sepal_width_1").value,
      "petal_length": document.getElementById("petal_length_1").value,
      "petal_width": document.getElementById("petal_width_1").value,
      "species": document.getElementById("species_1").value
    },
    {
      "sepal_length": document.getElementById("sepal_length_2").value,
      "sepal_width": document.getElementById("sepal_width_2").value,
      "petal_length": document.getElementById("petal_length_2").value,
      "petal_width": document.getElementById("petal_width_2").value,
      "species": document.getElementById("species_2").value
    },
    {
      "sepal_length": document.getElementById("sepal_length_3").value,
      "sepal_width": document.getElementById("sepal_width_3").value,
      "petal_length": document.getElementById("petal_length_3").value,
      "petal_width": document.getElementById("petal_width_3").value,
      "species": document.getElementById("species_3").value
    }];
    console.log(data);
    axios.put("http://localhost:3000/tests", { data })
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          setData(result.data)
          setShowLoading(false)
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();

  };

  return (
    <div>
      {showLoading === false
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}

          <Container>
            <Card border='secondary' bg='dark' text='light' style={{ marginTop: '20px' }}>
              <Row className='justify-content-md-center mb-2'>
                <Col sm={12}>
                  <Card.Title as='h1' className='text-center' style={{ paddingTop: '15px' }}>Prediction Results</Card.Title>
                </Col>
              </Row>
              <Card.Body>
                <Row className='justify-content-md-center'>
                <Col sm={3} className='text-center' style={{marginTop: "40px"}} >
                  <Row className='justify-content-md-center'>
                    <Col sm={12}>
                      <p>Sepal Length:</p>
                      </Col>
                  </Row>
                  <Row className='justify-content-md-center' style={{marginTop: "12px"}}>
                    <Col sm={12}>
                      <p>Sepal Width:</p>
                      </Col>
                  </Row>
                  <Row className='justify-content-md-center' style={{marginTop: "12px"}}>
                    <Col sm={12}>
                      <p>Petal Length:</p>
                      </Col>
                  </Row>
                  <Row className='justify-content-md-center' style={{marginTop: "12px"}}>
                    <Col sm={12}>
                      <p>Petal Width:</p>
                      </Col>
                  </Row>
                  <Row className='justify-content-md-center' style={{marginTop: "12px"}}>
                    <Col sm={12}>
                      <p>Species:</p>
                      </Col>
                  </Row>
                  </Col>
                  <Col sm={3} className='text-center'>
                    <Form>
                      <Form.Group className='mb-3'>
                        <Form.Label>Test 1</Form.Label>
                        <Form.Control type="number" step={0.1} defaultValue={5.4} placeholder="Enter sepal length" className='mb-3' id="sepal_length_1" />
                        <Form.Control type="number" step={0.1} defaultValue={3.9} placeholder="Enter sepal width" className='mb-3' id="sepal_width_1" />
                        <Form.Control type="number" step={0.1} defaultValue={1.7} placeholder="Enter petal length" className='mb-3' id="petal_length_1" />
                        <Form.Control type="number" step={0.1} defaultValue={0.4} placeholder="Enter petal width" className='mb-3' id="petal_width_1" />
                        <Form.Control as="select" defaultValue="setosa" id="species_1">
                          <option value="setosa">Setosa</option>
                          <option value="virginica">Virginica</option>
                          <option value="versicolor">Versicolor</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={3} className='text-center'>
                    <Form>
                      <Form.Group className='mb-3'>
                        <Form.Label>Test 2</Form.Label>
                        <Form.Control type="number" step={0.1} defaultValue={5.9} placeholder="Enter sepal length" className='mb-3' id="sepal_length_2" />
                        <Form.Control type="number" step={0.1} defaultValue={3} placeholder="Enter sepal width" className='mb-3' id="sepal_width_2" />
                        <Form.Control type="number" step={0.1} defaultValue={5.1} placeholder="Enter petal length" className='mb-3' id="petal_length_2" />
                        <Form.Control type="number" step={0.1} defaultValue={1.8} placeholder="Enter petal width" className='mb-3' id="petal_width_2" />
                        <Form.Control as="select" defaultValue="virginica" id="species_2">
                          <option value="setosa">Setosa</option>
                          <option value="virginica">Virginica</option>
                          <option value="versicolor">Versicolor</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={3} className='text-center'>
                    <Form>
                      <Form.Group className='mb-3'>
                        <Form.Label>Test 3</Form.Label>
                        <Form.Control type="number" step={0.1} defaultValue={5.7} placeholder="Enter sepal length" className='mb-3' id="sepal_length_3" />
                        <Form.Control type="number" step={0.1} defaultValue={2.9} placeholder="Enter sepal width" className='mb-3' id="sepal_width_3" />
                        <Form.Control type="number" step={0.1} defaultValue={4.2} placeholder="Enter petal length" className='mb-3' id="petal_length_3" />
                        <Form.Control type="number" step={0.1} defaultValue={1.3} placeholder="Enter petal width" className='mb-3' id="petal_width_3" />
                        <Form.Control as="select" defaultValue="versicolor" id="species_3">
                          <option value="setosa">Setosa</option>
                          <option value="virginica">Virginica</option>
                          <option value="versicolor">Versicolor</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Button variant="primary" type="submit" onClick={updateTests}>
                    Submit
                  </Button>
                </Row>
                <h3 className='text-center'> Flower Species Values:</h3>

                <Table className='mt-3 text-center' striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th width="33%">Setosa</th>
                      <th width="33%">Virginica</th>
                      <th width="33%">Versicolor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>1</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>0</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
                <Table className='mt-3' striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Test 1</th>
                      <th>Test 2</th>
                      <th>Test 3</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="App-td">
                        {data.row1.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>
                      <td className="App-td">
                        {data.row2.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>
                      <td className="App-td">
                        {data.row3.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>

                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>






        </div>
        :
        < div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner>}
        </div>

      }
    </div>

  );
}
//
export default App;
