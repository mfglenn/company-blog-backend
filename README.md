# MERN Stack Experimentation

## Objective: 
Create a company blog web application that utilizes the MERN stack and deploy the application to AWS.  

## Application Purpose:
Provide a blog web application that allows a company post blog posts and articles and allow users to 
post comments and vote on the posts. These features showcase the core functionality of both the front-end
and back-end frameworks that are being leveraged.

## Methods:

### Front-End Development: 
This web application was developed using the Create React App project made available from React.js.
This was selected to gain familiarity with the latest development tools and methodologies available 
for React development.

#### Features:
* Navigation Bar
  * Provides routing using react-router.
* Pages 
  * Blog Page
    * Basic Text Component
    * Dynamic List Component
  * Articles Page
    * Dynamic List Component
  * Article Page
    * API Consumption (GET)
  * Commenting Capability
    * Allows for the addition of comments on the Article pages.
    * API Consumption (POST)
  * Voting Capability
    * Allows for the addition of comments on the Article pages.
    * API Consumption (POST)
* About Page
    * Basic Text Component
* Not Found Page

### Back-End Development: 
This web application was developed using the Express framework which is running on Node.js.
This was selected to gain familiarity with the Express framework and Node.js, and experiment
with a non-Django framework.

#### Features:
* Babel Compatibility
  * Supports ES6
* Server Configuration 
  * Web API
    * Allows the user to get article information, add comments, and vote on articles.
    * API Endpoints (GET, POST)
    * Utilizes JSON parser
  * Database Layer
    * Connected to a MongoDB instance to allow for NoSQL storage of comment and voting information.
    * Performs queries and updates to the MongoDB files.
