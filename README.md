# 4News Frontend

This is the frontend for the News Management application. It is built using React.js and uses the Volt React Dashboard. The application supports CRUD operations for news articles, categories, and users, with image upload functionality.

## Table of Contents

- [4News Frontend](#4news-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Features

- User authentication (login and register)
- CRUD operations for news articles
- CRUD operations for categories
- CRUD operations for users
- Image uploads for news and user profiles

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/M-Julius/4News-Frontend.git
    cd 4News-Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Configuration

Update a `config.js` file in the `src/constant/config.js` directory and update the following environment variables:

```env
const BASE_URL='http://localhost:5000'
const BASE_API='http://localhost:5000/api'
