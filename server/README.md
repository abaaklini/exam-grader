# Server - Corrige Provas

This directory contains the backend server for the "Corrige Provas" (Grade Exams) application. The server is responsible for handling API requests, processing exam data, and interacting with the Google Gemini API for automated grading.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

Follow these instructions to get the server up and running on your local machine for development and testing.

### 1. Installation

First, navigate to the server directory and install the necessary dependencies.

```sh
cd server
npm install
```

### 2. Environment Configuration

The server requires an API key for the Gemini service to function.

1.  Create a `.env` file by copying the example file:
    ```sh
    cp .env.example .env
    ```

2.  Open the newly created `.env` file and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### 3. Running the Server

To start the server in development mode, run:

```sh
npm run dev
```

The server should now be running and listening for incoming requests.