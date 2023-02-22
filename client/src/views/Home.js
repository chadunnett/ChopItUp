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
    _id: 1,
    userName: "Derek Helgoe",
    comment: "Love It",
    image: food1
  },
  {
    _id: 2,
    userName: "Charlie Dunnet",
    comment: "Can I try?",
    image: food2
  },
  {
    _id: 3,
    userName: "Carlos Smith",
    comment: "OMG",
    image: food3
  },
  {
    _id: 4,
    userName: "Katie Redford",
    comment: "Oh yeeeeaaah",
    image: food4
  },

  {
    _id: 5,
    userName: "Nathan Darter ",
    comment: "woow",
    image: food5
  },
  {
    _id: 6,
    userName: "Akon abazary",
    comment: "coolio",
    image: food6
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
