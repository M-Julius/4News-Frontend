import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Image, Breadcrumb } from "@themesberg/react-bootstrap";
import axiosInstance from "../../../services/axiosIntance";
import { BASE_URL } from "../../../constant/config";

const DetailUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
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
          <Breadcrumb.Item>Users</Breadcrumb.Item>
          <Breadcrumb.Item active>Detail</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Detail Users</h4>
        <p className="mb-20">Your web analytics dashboard template.</p>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>User Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Image
                src={`${BASE_URL}/uploads/users/${user.image_profile}`}
                roundedCircle
              />
            </Col>
            <Col md={8}>
              <h4>{user.name}</h4>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailUser;
