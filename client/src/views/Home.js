import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from '../components/ProfileCard';

import { useQuery, gql } from '@apollo/client';

const POST_QUERY = gql`
  {
    posts {
      _id
      username
      postText
      image
    }
  }
`;

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
