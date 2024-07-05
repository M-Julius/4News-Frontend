import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Card, Col, Row, Breadcrumb } from 'react-bootstrap';
import axiosInstance from '../../../services/axiosIntance';
import { Routes } from '../../../routes';
import { Alert } from 'react-bootstrap';

const EditCategory = () => {
    const { id } = useParams();
    const history = useHistory();
    const [alert, setAlert] = useState({ type: '', message: '', show: false });
    const [formData, setFormData] = useState({
        title: ''
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosInstance.get(`/category/${id}`);
                setFormData({
                    title: response.data.title
                });
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategory();
    }, [id]);

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
            await axiosInstance.put(`/category/${id}`, formData);
            history.push(Routes.Category.path);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Update category failed!', show: true });
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
                    <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Category</h4>
                <p className="mb-0">Your web analytics dashboard template.</p>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>Edit Category</Card.Title>
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
                            Update Category
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditCategory;
