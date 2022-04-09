import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import app from "./firebase.init";
import { useState } from "react";


const auth = getAuth(app)
function App() {

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }


  const handleFormSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
      })
      .catch(error => {
        console.error(error);
      })
    event.preventDefault();
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email send')
      })
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('forget email send')
    })
}

return (
  <div>
    <div className="registration w-50 mx-auto mt-4">
      <h2 className="text-primary">Please Register!!</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid E-mail.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button onClick={handlePasswordReset} variant="link">forget password</Button>
        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  </div>
);
}

export default App;
