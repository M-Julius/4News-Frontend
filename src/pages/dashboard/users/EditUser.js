import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Form,
    Button,
    Card,
    Col,
    Row,
    Image,
    Breadcrumb,
} from "@themesberg/react-bootstrap";
import axiosInstance from "../../../services/axiosIntance";
import { Routes } from "../../../routes";
import { BASE_URL } from "../../../constant/config";

const EditUser = () => {
    const { id } = useParams();
    const history = useHistory();
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image_profile: null,
        role: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/users/${id}`);
                setFormData({
                    ...response.data,
                    password: "",
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [id]);

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
        if (formData.password) {
            data.append("password", formData.password);
        }
        if (formData.image_profile) {
            data.append("image_profile", formData.image_profile);
        }
        data.append("role", formData.role);

        try {
            const response = await axiosInstance.put(`/users/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const currentUser = JSON.parse(localStorage.getItem("user"));

            if (parseInt(currentUser.id) === parseInt(id)) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            history.push(Routes.Users.path);
        } catch (error) {
            console.error("Error updating user:", error);
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
            <div className="d-block mb-4 mb-md-0">
                <Breadcrumb
                    className="d-none d-md-inline-block"
                    listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Users</Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Edit Users</h4>
                <p className="mb-20">Your web analytics dashboard template.</p>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Update User</Card.Title>
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
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter a new password (leave blank to keep current password)"
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
                            <Col md={6}>
                                <Form.Group controlId="formImageProfile">
                                    <Form.Label>Profile Image</Form.Label>
                                    {!imagePreview ?
                                        <Image style={{ marginBottom: 20 }} src={`${BASE_URL}/uploads/users/${formData.image_profile}`} rounded />
                                        :
                                        <Image style={{ marginBottom: 20 }} src={imagePreview} rounded />}
                                    <Form.Control
                                        type="file"
                                        name="image_profile"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Col style={{ marginTop: 20 }}>
                            <Button variant="primary" type="submit">
                                Update User
                            </Button>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditUser;
