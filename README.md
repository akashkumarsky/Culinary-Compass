# Culinary Compass 🧭

A full-stack web application designed to simplify meal planning and recipe discovery. Built with a Spring Boot backend and a React.js frontend, Culinary Compass allows users to search for recipes, plan their weekly meals on an interactive calendar, and automatically generate a shopping list.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Live Demo (Placeholder)
**[Link to Deployed Application]**

---



## ✨ Features

* **Secure User Authentication**: JWT-based registration and login system.
* **Dynamic Recipe Search**: Search thousands of recipes via the Spoonacular API with a modern, user-friendly interface.
* **Personal Recipe Collection**: Users can save their favorite recipes to a personal collection and view them anytime.
* **Interactive Meal Planner**: A weekly calendar view where users can add recipes to specific meal slots (Breakfast, Lunch, Dinner).
* **Automatic Shopping List**: Generate a consolidated shopping list for the week based on the planned meals, aggregating ingredient quantities.
* **Detailed Recipe View**: Click on any recipe to see a full page with its summary, ingredients, and instructions.
* **Premium & Responsive UI**: A polished interface built with Tailwind CSS, featuring skeleton loaders, hover animations, and a fully responsive design for all screen sizes.
* **Public Homepage**: An engaging landing page for new visitors explaining the project's features.

## 🛠️ Tech Stack

### Backend
* **Java 17** & **Spring Boot 3**
* **Spring Security** (JWT for token-based authentication)
* **Spring Data JPA** (Hibernate)
* **PostgreSQL**
* **Maven**

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** for styling
* **React Router** for page navigation
* **React Context API** for global state management
* **Axios** for API communication
* **date-fns** for date manipulation

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Java JDK 17 or later
* Maven
* Node.js and npm
* PostgreSQL

### Backend Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/culinarycompass.git](https://github.com/your-username/culinarycompass.git)
    cd culinarycompass/backend
    ```
2.  **Configure the database**
    Open `src/main/resources/application.properties` and update the following properties with your PostgreSQL credentials:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
3.  **Run the application**
    ```sh
    mvn spring-boot:run
    ```
    The backend server will start on `http://localhost:8088`.

### Frontend Setup

1.  **Navigate to the frontend directory**
    ```sh
    cd ../frontend 
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Add your API Key**
    Create a file named `.env.local` in the `frontend` root directory and add your Spoonacular API key:
    ```
    VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

---

## 🌟 Future Enhancements

This project has a solid foundation with many possibilities for future development:
* **Nutritional Analysis**: Track daily macronutrient intake against user goals.
* **Pantry Management**: Suggest recipes based on ingredients the user already has.
* **AI-Powered Suggestions**: Use Spring AI to provide recipe ideas based on natural language prompts.
* **Real-time Shopping List**: Use WebSockets to sync a shopping list between multiple users in real-time.

---

## 🙏 Acknowledgements
* Recipe data is provided by the [Spoonacular API](https://spoonacular.com/food-api).

---

## 📧 Contact
Your Name – [your.email@example.com](mailto:akash220701@gmail.com)

Project Link: [https://github.com/your-username/culinarycompass](https://github.com/akashkumarsky/culinarycompass)
