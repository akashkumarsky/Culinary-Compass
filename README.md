Culinary Compass 🧭
A full-stack web application designed to simplify meal planning and recipe discovery. Built with a Spring Boot backend and a React.js frontend, Culinary Compass allows users to search for recipes, save their favorites, plan their weekly meals on an interactive calendar, and automatically generate a shopping list.

Live Demo: culinary-compass-recipe.netlify.app

✨ Features
Secure User Authentication: Full JWT-based registration and login system with password hashing.

Dynamic Recipe Search: Search thousands of recipes via the Spoonacular API with a premium, user-friendly interface.

Personal Recipe Collection: Users can save their favorite recipes to a personal collection and view or remove them at any time.

Interactive Meal Planner: A weekly calendar view where users can add/remove recipes to specific meal slots (Breakfast, Lunch, Dinner).

Automatic Shopping List: Generate a consolidated shopping list for the week based on planned meals, aggregating ingredient quantities.

Detailed Recipe View: Click on any recipe to see a full page with its summary, ingredients, and instructions.

Premium & Responsive UI: A polished interface built with Tailwind CSS, featuring skeleton loaders, hover animations, and a fully responsive design for all screen sizes.

Professional Landing Page: An engaging public homepage for new visitors explaining the project's features.

🛠️ Tech Stack
Backend
Java 17 & Spring Boot 3

Spring Security (JWT for token-based authentication)

Spring Data JPA (Hibernate)

PostgreSQL (Hosted on Neon)

Maven

Docker for containerization

Frontend
React.js (Vite)

Tailwind CSS for styling

React Router for page navigation

React Context API for global state management (Authentication)

Axios for API communication

date-fns for date manipulation

Deployment
Backend: Deployed as a Docker container on Render.

Database: Serverless PostgreSQL hosted on Neon.

Frontend: Deployed on Netlify.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have the following installed on your machine:

Java JDK 17 or later

Maven

Node.js and npm

PostgreSQL

Backend Setup
Clone the repository

git clone [https://github.com/akashkumarsky/Culinary-Compass.git](https://github.com/akashkumarsky/Culinary-Compass.git)
cd Culinary-Compass/backend

Configure the database
Open src/main/resources/application.properties. The file is already configured to use your local PostgreSQL database with default credentials (postgres/root). Create a database named culinarycompass or update the credentials to match your local setup.

Run the application

mvn spring-boot:run

The backend server will start on http://localhost:8088.

Frontend Setup
Navigate to the frontend directory

cd ../frentend 

Install NPM packages

npm install

Add your API Key
Create a file named .env.local in the frentend root directory and add your Spoonacular API key:

VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here

Run the development server

npm run dev

The frontend will be available at http://localhost:5173.

🌟 Future Enhancements
This project has a solid foundation with many possibilities for future development:

Nutritional Analysis: Track daily macronutrient intake against user goals.

Pantry Management: Suggest recipes based on ingredients the user already has.

AI-Powered Suggestions: Use Spring AI to provide recipe ideas based on natural language prompts.

Real-time Shopping List: Use WebSockets to sync a shopping list between multiple users in real-time.

🙏 Acknowledgements
Recipe data is provided by the Spoonacular API.

Hosting provided by Render, Neon, and Netlify.

📧 Contact
Akash Kumar – akash220701@gmail.com

Project Link: https://github.com/akashkumarsky/Culinary-Compass
