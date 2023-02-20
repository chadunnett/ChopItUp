import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PostForm = () => {
  const [postText, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {

      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (e) {
        console.warn("First post insertion by user!")
      }

      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      console.log(posts)
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    }
  })

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);

    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = fetch("/image-upload", {
        method: "POST",
        body: {
          image: selectedImage
        }
      });
      console.log(response);

      setImageUrl(response.url);

      await addPost({
        variables: { postText, imageUrl },
      });

      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload your image</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Here's a new thought..."
            value={postText}
            className="form-input col-12 col-md-9"
            onChange={handleChange} />
        </Form.Group>

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </div >
  );
};

export default PostForm;
