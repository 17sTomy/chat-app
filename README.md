# ChatApp - Real Time Chat Application with Django Rest Framework and React.js

## Description
This is a real-time chat application that allows users to engage in instant individual conversations with different users.

![ChatApp Preview](frontend\src\assets\chat-preview.jpeg)

## Installation
Follow these steps to set up the ChatApp on your local machine:

1. Clone the repository:
   ```
   git clone https://github.com/17sTomy/chat-app.git
   ```
2. Install the required dependencies using npm:
   ```
   npm install
   ``` 
3. Set up the Django backend. Create a virtual environment and activate it:
    ```
   python -m venv .venv
   .venv/scripts/activate
   ``` 
4. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Apply migrations to set up the database:
   ```
   cd backend
   python manage.py migrate
   ```
6. Run the development server:
   ```
   python manage.py runserver
   ```
7. In a separate terminal, navigate to the frontend directory:
   ```
   cd frontend
   npm run dev
   ```