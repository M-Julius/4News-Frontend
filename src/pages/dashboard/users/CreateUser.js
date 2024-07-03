import React, { useState } from "react";
import {
    Form,
    Button,
    Card,
    Col,
    Row,
    Breadcrumb,
    Image,
} from "@themesberg/react-bootstrap";
import axiosInstance from "../../../services/axiosIntance";
import { Routes } from "../../../routes";
import { Alert } from "react-bootstrap";

const CreateUser = ({history}) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '', show: false });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image_profile: null,
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setFormData({
            ...formData,
            image_profile: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("image_profile", formData.image_profile);
        data.append("role", formData.role);

        try {
            await axiosInstance.post("/users/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            history.push(Routes.Users.path);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Create user failed!', show: true });
        }
    };
    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value
        });
    };

    return (
        <div>
            {alert.show && <Alert variant={alert.type}>{alert.message}</Alert>}
            <div className="d-block mb-4 mb-md-0">
                <Breadcrumb
                    className="d-none d-md-inline-block"
                    listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Users</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Create Users</h4>
                <p className="mb-20">Your web analytics dashboard template.</p>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>Create New User</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <div>
                                        <Form.Check
                                            key="admin"
                                            type="radio"
                                            label="Admin"
                                            name="role-admin"
                                            value="admin"
                                            checked={formData.role === 'admin'}
                                            onChange={handleRoleChange}
                                        />
                                        <Form.Check
                                            key="user"
                                            type="radio"
                                            label="User"
                                            name="role-user"
                                            value="user"
                                            checked={formData.role === 'user'}
                                            onChange={handleRoleChange}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formImageProfile">
                                    <Form.Label>Profile Image</Form.Label>
                                    {imagePreview &&
                                        <Image style={{ marginBottom: 20 }} src={imagePreview} rounded />}
                                    <Form.Control
                                        required
                                        type="file"
                                        name="image_profile"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button style={{ marginTop: 20 }} variant="primary" type="submit">
                            Create User
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateUser;
