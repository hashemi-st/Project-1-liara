# Project Name
Canny's Clone

## Overview
This project aims to create a clone of the Canny platform, which is a feedback management system. The clone will allow users to submit feedback, vote on ideas, and view relevant content related to products or services.

### Features
**Authentication:**

Implement authentication functionality to allow users to register, login, and manage their accounts securely.
In addition to basic authentication functionality, this project incorporates password recovery capability using SMTP (Simple Mail Transfer Protocol). This feature enables users to recover their forgotten passwords securely through email

- **Database Integration:** 

 Integrate a database system (e.g., MongoDB) to store user information, feedback submissions, voting data, and other relevant information securely.

- **Error Handling:** 

 Develop robust error handling mechanisms to gracefully handle exceptions, errors, and unexpected behaviors within the application. This involves implementing appropriate error codes, error messages, and error logging to assist in debugging and troubleshooting.

- **Logging:** 

 set up logging mechanisms to record user actions and events happening within the platform.

- **Versioning APIs:** 

 Implement versioning for APIs to ensure compatibility and smooth transitions between different versions of the backend services. This includes managing API endpoints, versioning schemes, and backward compatibility.

- **Validation:**

 this project includes robust data validation mechanisms to ensure data integrity and adherence to predefined standards. Data validation encompasses various aspects, including uniqueness, mandatory fields, and format requirements, to maintain the quality and consistency of the data stored within the system.

## Technologies Used
- Node.js
- MongoDB
- REST API


## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Install dependencies:
    ```bash
    cd company-directory-backend
    npm install
    ```
3. Configure MongoDB:
   - Install MongoDB and ensure it is running on your system.
   - If necessary, update the MongoDB connection URL in `src/index.js`.


## Usage
1. Start the server:
    ```bash
    npm start
