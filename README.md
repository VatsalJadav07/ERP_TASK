# ERP

The College ERP POC is a Node Express project with authentication, role management, and analytics. It manages staff, students, and department data, provides attendance tracking, and offers analytics on students and vacant seats based on specified parameters.

## Overview

The College ERP POC is designed to efficiently manage staff and student data, providing key analytics for effective management. The system incorporates an admin role for adding staff, students, and department data. Utilizing Node Express, the project includes robust REST endpoints for CRUD operations, ensuring data retrieval, insertion, update, and deletion. Role management and authentication mechanisms enhance security. Analytics features offer insights into total student counts per year and branch, highlighting the maximum count. Additional functionalities include generating lists of absent students and those with attendance below 75%, along with a year-wise overview of vacant seats. The project enhances college management through streamlined data handling and insightful analytics.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/)

## Getting Started

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. **Install dependencies:**

    ```bash
    cd ERP
    npm install
    ```

### Configuration:

1. **Install MongoDB:**

   - [Download and Install MongoDB](https://www.mongodb.com/try/download/community) on your machine.

2. **Set up a Cloud-based MongoDB instance (optional):**

   - If you prefer, you can use a cloud-based MongoDB service such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Follow their documentation to create an account and set up a cluster.

3. **Configure MongoDB Connection:**

   Create a MongoDB configuration file (e.g., `db.js`) in the root of your project:

   ```javascript
   // db.js
   const mongoose = require('mongoose');
   const dbUrl = mongodb-link; // Update the path based on your project structure

4. **Postman Setup**

    **Import Postman Collection:**

       - Import the provided Postman collection located at [path/to/your/PostmanCollection.json](path/to/your/PostmanCollection.json). This collection includes pre-configured requests             for testing your APIs.

    **Configure Environment (optional):**

       - If your APIs require environment-specific variables, consider configuring a Postman environment. Update the environment variables accordingly.

5. **Usage**

   **Run the Project Locally:**

   ```bash
   npm start
   ```
     - Visit http://localhost:3000 in your browser.

