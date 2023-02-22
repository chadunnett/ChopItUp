import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from '../components/ProfileCard';

import { useQuery, gql } from '@apollo/client';

const POST_QUERY = gql`
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

  },
  {
    _id: 7,
    userName: "Akon Abazary",
    comment: "coolio",
    image: food6,


  }
`;


];

const profileItems = profiles.map((item) =>
  <Col key={item._id} ><ProfileCard key={item.userName}name={item.userName} comment={item.comment} image={item.image} /></Col>
);

const Home = () => {


  const { data } = useQuery(POST_QUERY);

  return (
    <Container>
      {data && (
        <Row xs={3} md={3} lg={3}>
          {data.map((item) => (
            <Col key={item._id}>
              <ProfileCard key={item.name} name={item.username} comment={item.postText} image={item.image} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
