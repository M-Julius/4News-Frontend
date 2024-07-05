/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEllipsisH,
    faEye,
    faSearch,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Form,
    Button,
    ButtonGroup,
    Breadcrumb,
    InputGroup,
    Dropdown,
    Card,
    Table,
    Nav,
    Pagination,
} from "react-bootstrap";

import { Routes } from "../../../routes";
import axiosInstance from "../../../services/axiosIntance";
import useDebounce from "../../../hooks/useDebounce";

export const UserTable = ({ history, keyword }) => {
    const [users, setUsers] = useState([]);
    const [usersTemp, setUsersTemp] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedKeyword = useDebounce(keyword, 500);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (debouncedKeyword) {
            fetchUsers(1, debouncedKeyword);
        }
    }, [debouncedKeyword])

    const fetchUsers = async (page, search = '') => {
        try {
            const response = await axiosInstance(`/users?page=${page}&keyword=${search}`);
            setUsers(response.data.users);
            setUsersTemp(response.data.users);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // delete user
    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/users/${id}`);
            fetchUsers(currentPage);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const TableRow = (props) => {
        const { id, name, email, role, createdAt } = props;
        const statusVariant =
            role === "admin" ? "success" : role === "user" ? "warning" : "primary";

        return (
            <tr>
                <td>
                    <span className="fw-normal">
                        {id}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">{name}</span>
                </td>
                <td>
                    <span className="fw-normal">{email}</span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>{role}</span>
                </td>
                <td>
                    <span className="fw-normal">{createdAt}</span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                            as={Button}
                            split
                            variant="link"
                            className="text-dark m-0 p-0"
                        >
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    history.push(Routes.DetailUser.path.replace(":id", id));
                                }}
                            >
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    history.push(Routes.EditUser.path.replace(":id", id));
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => deleteUser(id)}
                                className="text-danger"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    };

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                        <tr>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">Name</th>
                            <th className="border-bottom">Email</th>
                            <th className="border-bottom">Role</th>
                            <th className="border-bottom">Created At</th>
                            <th className="border-bottom">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTemp.map((t) => (
                            <TableRow key={`news-${t.id}`} {...t} />
                        ))}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev
                                onClick={() =>
                                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                                }
                            >
                                Previous
                            </Pagination.Prev>
                            {[...Array(totalPages).keys()].map((page) => (
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === currentPage}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() =>
                                    handlePageChange(
                                        currentPage < totalPages ? currentPage + 1 : totalPages
                                    )
                                }
                            >
                                Next
                            </Pagination.Next>
                        </Pagination>
                    </Nav>
                    <small className="fw-bold">
                        Showing <b>{users.length}</b> out of <b>{totalItems}</b> entries
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ({ history }) => {
    const [keyword, setKeyword] = useState('');

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                    >
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Users</h4>
                    <p className="mb-0">Your web analytics dashboard template.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button
                            onClick={() => {
                                history.push(Routes.CreateUser.path);
                            }}
                            variant="primary"
                            size="sm"
                        >
                            + Add New User
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <UserTable history={history} keyword={keyword} />
        </>
    );
};
