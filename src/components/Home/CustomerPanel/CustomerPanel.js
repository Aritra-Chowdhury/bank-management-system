import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import classes from './CustomerPanel.module.css';

const CustomerPanel = (props) => {

    const userDetails = useSelector(state=>state.auth.userDetails);

    return (
        <Card className={
            classes['card_home']
        }>
            <Row>
                <Col xs={4}>
                    <Row>
                        <Col>
                            <b>Name
                            </b>: {
                            userDetails.personalDetails.name
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Email</b>
                            : {
                            userDetails.personalDetails.email
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Contact Number</b>
                            : {
                            userDetails.personalDetails.contactNumber
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Date of birth</b>
                            : {
                             userDetails.personalDetails.dateOfBirth
                        }</Col>
                    </Row>
                </Col>
                <Col xs={4}>

                    <Row>
                        <Col>
                            <b>Street</b>
                            : {
                             userDetails.address.street
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>State</b>
                            : {
                             userDetails.address.state
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>City</b>
                            : {
                             userDetails.address.city
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Zip code</b>
                            : {
                             userDetails.address.zipcode
                        }</Col>
                    </Row>
                </Col>
                <Col xs={4}>

                    <Row>
                        <Col>
                            <b>Account Number</b>
                            : {
                             userDetails.accountInformation.accountNumber
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Branch Name</b>
                            : {
                             userDetails.accountInformation.branchName
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Current Balance</b>
                            : Rs. {
                             userDetails.accountInformation.balance
                        }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Indentity Number</b>
                            : {
                             userDetails.accountInformation.indentityProofNumber
                        }</Col>
                    </Row>
                </Col>
                
            </Row>
        </Card>
    )
}

export default CustomerPanel;
