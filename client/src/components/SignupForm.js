import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';


function SignupForm()  {
    const [userFormData, setUserFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
  
    const [addUser, { error }] = useMutation(ADD_USER);
  
    useEffect(() => {
      if (error) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }, [error,showAlert]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });
        console.log(data);
        Auth.login(data.addUser.token);
      } catch (err) {
        console.error(err);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                name="password"
                required
                onChange={handleInputChange}
              />
              {/* <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>
        </Row>
        {/* <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row> */}
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
  
  export default SignupForm;