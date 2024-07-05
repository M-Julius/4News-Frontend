
import React, { useEffect, useState } from "react";
import { faCashRegister, faChartLine, faNewspaper, faTools, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

import { CounterWidget, SalesValueWidgetPhone } from "../../components/Widgets";
import axiosInstance from "../../services/axiosIntance";

export default () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchInfoDashbaord();
  }, []);

  const fetchInfoDashbaord = () => {
    axiosInstance.get('/users/dashboard').then((response) => {
      setInfo(response.data);
    }).catch((error) => {
      console.error("Error fetching dashboard info:", error);
    });
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Users"
            title={`${info?.totalUsers ?? 0} Users`}
            icon={faUser}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="News"
            title={`${info?.totalNews ?? 0} News`}
            icon={faNewspaper}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Category"
            title={`${info?.totalCategories ?? 0} Categories`}
            icon={faTools}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>

    </>
  );
};
