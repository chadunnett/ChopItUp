const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cloudinary = require("cloudinary").v2;
const streamifier = require('streamifier');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const bodyParser = require('body-parser');
const multer = require('multer')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// //image upload API
// app.get("/", (request, response) => {
//   console.log(request);
//   response.json({ message: "Hey! This is your server response!" });
// });

const fileUpload = multer();

// image upload API
app.post("/image-upload", fileUpload.single('image'), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    streamUpload(req)
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
  }

  upload(req);
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