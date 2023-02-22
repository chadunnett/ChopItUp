import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from '../components/ProfileCard';

import food1 from '../img/pic1.jpg';
import food2 from '../img/pic2.jpg';
import food3 from '../img/pic3.jpg';
import food4 from '../img/pic4.jpg';
import food5 from '../img/pic5.jpg';
import food6 from '../img/pic6.jpg';




// const profiles = await fetch('/api/profiles');

const profiles = [
  {
    name: "Derek Helgoe",
    comment: "Love It",
    image: food1,
    rating: 5,
    id: 1
  },
  {
    name: "Charlie Dunnet",
    comment: "Can I try?",
    image: food2,
    rating: 3,
    id: 2
  },
  {
    name: "Carlos Smith",
    comment: "OMG",
    image: food3,
    rating: 5,
    id: 3
  },
  {
    name: "Katie Redford",
    comment: "Oh yeeeeaaah",
    image: food4,
    rating: 5,
    id: 4

  },

  {
    name: "Nathan Darter ",
    comment: "woow",
    image: food5,
    rating: 4,
    id: 5
  },
  {
    name: "Akon Abazary",
    comment: "coolio",
    image: food6,
    rating: 5,
    id: 6
  }

];

const profileItems = profiles.map((item) =>
  <Col key={item._id} ><ProfileCard key={item.name}name={item.name} comment={item.comment} image={item.image} /></Col>
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
