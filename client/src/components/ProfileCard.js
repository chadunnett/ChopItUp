import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

class ProfileCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>
                        {this.props.userName}
                    </Card.Title>
                    <Card.Text>
                        {this.props.comment}
                    </Card.Text>
                    <Button as={Link} to={this.props.link} variant="primary">See More</Button>
                </Card.Body>
            </Card >
        )
    }
}

export default ProfileCard;