import React, { useState } from 'react';
import { Form, Button, Card, Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { Routes } from '../../../routes';
import axiosInstance from '../../../services/axiosIntance';
import { Alert } from 'react-bootstrap';

const CreateCategory = ({ history }) => {
    const [alert, setAlert] = useState({ type: '', message: '', show: false });
    const [formData, setFormData] = useState({
        title: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/category', formData);
            history.push(Routes.Category.path);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Create category failed!', show: true });
        }
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
                    <Breadcrumb.Item >Category</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Category</h4>
                <p className="mb-0">Your web analytics dashboard template.</p>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>Create Category</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter category title"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button style={{ marginTop: 20 }} variant="primary" type="submit">
                            Create Category
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateCategory;
