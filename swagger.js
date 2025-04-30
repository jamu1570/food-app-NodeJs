import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  basePath: "/",
  paths: { }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js']; // your main file

swaggerAutogen()(outputFile, endpointsFiles);
