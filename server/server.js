const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const { config, uploader } = require("cloudinary").v2;
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  config({
    cloud_name: process.env.CLOUDINARY_URL,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//image upload API
app.get("/", (request, response) => {
  console.log (request);
  response.json({ message: "Hey! This is your server response!" });
});

// image upload API
app.post("/image-upload", (request, response) => {
    // collected image from a user
    const data = {
      image: request.body.image,
    }

    // upload image here
    cloudinary.uploader.upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
    
});

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
startApolloServer(typeDefs, resolvers);