import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

const PostForm = () => {
  const [postText, setText] = useState('');
  
  const [addPost, { error }] = useMutation(ADD_POST, {
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

    const { posts} = cache.readQuery({ query: QUERY_POSTS});
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
      await addPost({
        variables: { postText },
      });

      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
