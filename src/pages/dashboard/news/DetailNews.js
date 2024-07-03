import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Image } from '@themesberg/react-bootstrap';
import axiosInstance from '../../../services/axiosIntance';
import { BASE_URL } from '../../../constant/config';
import { Breadcrumb } from 'react-bootstrap';

const DetailNews = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosInstance.get(`/news/${id}`);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news details:', error);
            }
        };

        fetchNews();
    }, [id]);

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-block mb-4 mb-md-0">
                <Breadcrumb
                    className="d-none d-md-inline-block"
                    listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>News</Breadcrumb.Item>
                    <Breadcrumb.Item active>Detail</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Detail News</h4>
                <p className="mb-20">Your web analytics dashboard template.</p>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>{news.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            {news.image_content && (
                                <Image src={`${BASE_URL}/uploads/news/${news.image_content}`} rounded />
                            )}
                        </Col>
                        <Col md={8}>
                            <h4>Category: {news.category?.title ?? ''}</h4>
                            <p>{news.content}</p>
                            <p><strong>Created By:</strong> {news.created_by}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetailNews;
