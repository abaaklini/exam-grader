# Corrige Provas - Fiap Hackathon Project

This is the main repository for the "Corrige Provas" (Grade Exams) project. This application leverages the Google Gemini API to automatically grade student exams, providing a fast and efficient way for educators to assess their students.

## Project Overview

The goal of this project is to streamline the exam grading process. It consists of a web interface where educators can input exam questions and student answers, and a backend service that communicates with Google's Gemini AI to perform the grading.

## Project Structure

The project is organized into two main directories:

*   `corrige-provas/`: Contains the React frontend application (the client).
*   `server/`: Contains the Node.js backend server (the API).

## Getting Started

To get the full application running locally, you will need to set up both the client and the server.

### Prerequisites

*   Node.js installed on your machine.
*   A Google Gemini API Key.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd hackaton
    ```

2.  **Set up the Server:**
    Follow the instructions in the server's README file to install dependencies and configure your environment.
    For details, see the `server/README.md` file.
    ```sh
    cd server
    npm install
    ```

3.  **Set up the Client:**
    In a new terminal, navigate to the client directory and install its dependencies. For details, see the `corrige-provas/README.md` file.
    ```sh
    cd corrige-provas
    npm install
    ```

## Running the Application

To run the entire application, you will likely need to start both the backend and frontend servers.

*   **Start the server:**
    ```sh
    cd server
    npm run dev
    ```

*   **Start the client:**
    In your second terminal:
    ```sh
    cd corrige-provas
    npm start
    ```