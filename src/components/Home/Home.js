import React from "react";
import { Col, Row } from "react-bootstrap";
import Offer from "./Offer";
import CustomerPanel from "./CustomerPanel/CustomerPanel";
import { Outlet } from "react-router-dom";

const Home = (props)=>{

    return(
        <React.Fragment>
            <CustomerPanel></CustomerPanel>
            <Row>
                <Col xs={8}>
                    <Outlet></Outlet>
                </Col>
                <Col xs={4}>
                    <Offer></Offer>
                </Col>
            </Row>
           
        </React.Fragment>
    );
}

export default Home;