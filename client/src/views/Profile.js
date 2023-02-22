import { QUERY_USER, QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  console.log("helloooo", props)
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });
    const Test = useQuery (QUERY_ME)
    console.log (Test)
      const user = data?.me || data?.user || {};
    console.log(user)
      // navigate to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
      }
    
      if (loading) {
        return <div>Loading...</div>;
      }

      if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        );
      }
      return (
        <div>
          <div className="flex-row mb-3">
            <h2 className="bg-dark text-secondary p-3 display-inline-block">
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </h2>
          </div>
          <div className="flex-row justify-space-between mb-3">
            <div className="col-12 mb-3 col-lg-8">
            <div>
      <h3>{props.title}</h3>
      {props.posts &&
        props.posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{' '}
              post on {post.createdAt}
            </p>
          </div>
        ))}
    </div>
            </div>
    
          </div>
        </div>
      );
    };
    
    export default Profile;
        