import java from './images/java.jpeg';
import python from './images/python_logo.jpg';
import nodeJS from './images/nodeExpress.jpg';
import mongoDB from './images/mongo_db.jpg';

// enhancement 2

const articles = [
  {
    name: "mongodb",
    title: "MongoDB",
    image: mongoDB,
    content: [
      "I am currently using and learning MongoDB, and I am excited to share my progress and insights as I learn this powerful NoSQL database. Despite not being a programming language, SQL drove me to learn MongoDB.",
      "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents instead of traditional rows and columns.",
      "Key features include: flexible schema design, horizontal scalability, high performance for read and write operations, and built-in replication.",
      "Example:\nconst user = {\n  name: 'John',\n  age: 25,\n  hobbies: ['coding', 'reading']\n};\nawait db.collection('users').insertOne(user);"
    ]
  },
  {
    name: "node-and-expressjs",
    title: "Node and ExpressJS",
    image: nodeJS,
    content: [
      "I am currently using NodeJS and ExpressJS for my team and I's capstone project, running on JavaScript, Node and Express will be used for the backend development of our project!",
      "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows developers to run JavaScript on the server side.",
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.",
      "Example:\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000);"
    ]
  },
  {
    name: "python",
    title: "Python",
    image: python,
    content: [
      "I am currently using Python to structure my data in order to create the machine learning predictive model for our capstone project.",
      "Python is a high-level, interpreted programming language known for its simplicity, readability, and versatility across many domains.",
      "Python is widely used in data science, machine learning, web development, automation, and scientific computing.",
      "Example:\nimport pandas as pd\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)"
    ]
  },
  {
    name: "java",
    title: "JAVA",
    image: java,
    content: [
      "Java is the first programming language I learned, and it is the language that sparked my interest in programming. I completed school projects using Java and it is certainly the backbone of my programming journey.",
      "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
      "Java follows the 'Write Once, Run Anywhere' principle, meaning compiled Java code can run on all platforms that support Java without recompilation.",
      "Example:\npublic class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}"
    ]
  }
];

export default articles;