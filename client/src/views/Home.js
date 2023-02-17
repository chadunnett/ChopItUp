import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from '../components/ProfileCard';

import food1 from '../img/3EDEC311-EBC4-4F55-9682-DB210CA63C69.jpg';
import food2 from '../img/6FA04A8E-0F58-4DA0-88B8-849852574B4C.jpg';

// const profiles = await fetch('/api/profiles');

const profiles = [
  {
    name: "Derek Helgoe",
    comment: "Love It",
    image: food1,
    rating: 5,
  },
  {
    name: "Charlie Dunnet",
    comment: "Can I try?",
    image: food1,
    rating: 3
  },
  {
    name: "Carlos Smith",
    comment: "OMG",
    image: food2,
    rating: 5
  },
  {
    name: "Katey Redford",
    comment: "Oh yeeeeaaah",
    image: food2,
    rating: 5
  }

];

const profileItems = profiles.map((item) =>
  <Col><ProfileCard name={item.name} comment={item.comment} image={item.image} /></Col>
);

class Home extends React.Component {

  render() {
    return (
      <Container>
        <Row xs={3} md={3} lg={3}>
          {profileItems}
        </Row>
      </Container>
    )
  }
}

export default Home;
