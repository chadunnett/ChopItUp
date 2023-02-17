import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Rating from 'react-rating';

class ProfileCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>
                        {this.props.name}
                    </Card.Title>
                    <Card.Text>
                        {this.props.comment}
                    </Card.Text>
                    <Card.Text>
                        <Rating
                            initialRating={this.props.rating}
                            emptySymbol="fa-regular fa-star"
                            fullSymbol="fa-solid fa-star"
                        />
                    </Card.Text>
                    <Button as={Link} to="profile" variant="primary">See More</Button>
                </Card.Body>
            </Card >
        )
    }
}

export default ProfileCard;