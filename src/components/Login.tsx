import { useState } from "react";
import { Button, Form } from "react-bootstrap"

export const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <Form validated>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    id="email"
                    minLength={6}
                    maxLength={50}
                    value={inputs.email}
                    onChange={handleChange} />
                <Form.Text>Please enter your email address.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    minLength={8}
                    maxLength={12}
                    value={inputs.password}
                    onChange={handleChange} />
                <Form.Text>Please enter your password.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
                <Form.Check
                    type="checkbox"
                    id="rememberUser"
                    label="Remember me"
                />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Log in</Button>
        </Form>
    )
}