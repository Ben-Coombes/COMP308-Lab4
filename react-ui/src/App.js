import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, Card, Table } from 'react-bootstrap';
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
          console.log('result.data:', result.data)
          setData(result.data)
          setShowLoading(false)
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();
  }, []);

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
