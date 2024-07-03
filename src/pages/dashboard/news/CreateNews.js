import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Col, Row, Breadcrumb, Image } from '@themesberg/react-bootstrap';
import axiosInstance from '../../../services/axiosIntance';
import { Routes } from '../../../routes';
import { Alert } from 'react-bootstrap';

const CreateNews = ({ history }) => {
    const [categories, setCategories] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '', show: false });
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        content: '',
        created_by: '',
        image_content: null
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category');
                setCategories(response?.data?.categories ?? []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setFormData({
            ...formData,
            image_content: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category_id', formData.category_id);
        data.append('content', formData.content);
        data.append('created_by', formData.created_by);
        data.append('image_content', formData.image_content);

        try {
            await axiosInstance.post('/news', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            history.push(Routes.News.path);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Create news failed!', show: true });
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
                    <Breadcrumb.Item>News</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create</Breadcrumb.Item>
                </Breadcrumb>
                <h4>News</h4>
                <p className="mb-20">Your web analytics dashboard template.</p>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Create News</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter news title"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        required
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Pilih Kategori
                                        </option>
                                        {categories?.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        )) ?? null}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        required
                                        rows={5}
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="Enter news content"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formCreatedBy">
                                    <Form.Label>Created By</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="created_by"
                                        value={formData.created_by}
                                        onChange={handleChange}
                                        placeholder="Enter author name"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formImageContent">
                                    <Form.Label>Content Image</Form.Label>
                                    {imagePreview &&
                                        <Image style={{ marginBottom: 20 }} src={imagePreview} rounded />}
                                    <Form.Control
                                        type="file"
                                        required
                                        name="image_content"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button style={{ marginTop: 20 }} variant="primary" type="submit">
                            Create News
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateNews;
