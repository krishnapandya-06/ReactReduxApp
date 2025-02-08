React-Redux LogIn app App

Overview

This is a full-stack React-Redux application that includes authentication, a counter feature, and a to-do list. The app is built using modern frontend technologies such as React, Redux Toolkit, Tailwind CSS, and React Router.

Features

Authentication: Users can sign up and log in using a combined AuthPage.jsx.

Counter: A simple counter with increment, decrement, and add 5 functionalities.

To-Do List: Users can add, toggle, and remove tasks.

State Management: Implemented with Redux Toolkit for global state management.

Routing: Managed via React Router to navigate between authenticated routes.

Responsive UI: Styled with Tailwind CSS for a sleek and modern design.

Tech Stack

React (Frontend framework)

Redux Toolkit (State management)

React Router (Routing)

Tailwind CSS (Styling)

Lucide React (Icons)

Installation & Setup

Follow these steps to set up the project locally:

1. Clone the Repository

git clone https://github.com/your-repo-name.git
cd your-repo-name

2. Install Dependencies

npm install

3. Run the Development Server

npm start

The app will be available at http://localhost:3000/.

Folder Structure

├── src
│   ├── components
│   │   ├── AuthPage.jsx
│   │   ├── Counter.jsx  
│   │   ├── Todo.jsx
│   ├── store
│   │   ├── slices
│   │   │   ├── authSlice.js
│   │   │   ├── counterSlice.js
│   │   │   ├── todoSlice.js
│   │   ├── store.js
│   ├── App.jsx
│   ├── index.js
├── package.json
├── README.md

Redux Store & State Management

The application uses Redux Toolkit to manage authentication, counter, and to-do states efficiently.

1. Authentication (authSlice.js)

Manages user login, signup, and logout.

2. Counter (counterSlice.js)

Handles increment, decrement, and increment by 5 actions.

3. To-Do List (todoSlice.js)

Adds, toggles, and removes tasks.

Routing

The app uses React Router for navigation:

/auth → Login & Signup (AuthPage.jsx)

/counter → Counter Page

/todo → To-Do Page

Default (/) → Redirects to /auth

Screenshots

🚀 In Future I Will Add screenshots of your UI here

Contribution

Feel free to contribute! Fork the repo and submit a PR.

License

This project is open-source and available under the MIT License.

