# Talent Hub API Documentation
## Project Description
Talent Hub is a recruitment platform where employers can post jobs, applicants can apply, and admins can manage users and applications. The platform supports role-based access control and JWT authentication.
## Base URL

https://talent-hub-zm8m.onrender.com


---

## Authentication

### Register User
**Endpoint:** `/auth/register`  
**Method:** `POST`  
**Description:** Register a new user (admin, employer, or applicant).  

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "applicant"  // Options: admin | employer | applicant
}

```
Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant",
    "createdAt": "2025-08-23T12:00:00Z"
  },
  "token": "jwt-token"
}
```
Login

Endpoint: /auth/login
Method: POST
Description: Login a user and receive JWT token.

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}

```
Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  },
  "token": "jwt-token"
}
```
Jobs
Get All Jobs

Endpoint: /jobs
Method: GET
Headers:

Authorization: Bearer <jwt-token>


Response:
```json
{
  "jobs": [
    {
      "id": "job-id",
      "title": "Frontend Developer",
      "description": "React/Next.js experience",
      "role": "employer",
      "createBy": "employer-id",
      "createByUser": { "id": "employer-id", "name": "Employer One" },
      "Applications": [],
      "appliedByUser": false
    }
  ]
}
```
Create Job

Endpoint: /job/create
Method: POST
Headers:

Authorization: Bearer <jwt-token> (employer only)


Request Body:
```json
{
  "title": "Backend Developer",
  "description": "Node.js, PostgreSQL experience"
}

```
Response:
```json
{
  "message": "Job created successfully",
  "job": {
    "id": "job-id",
    "title": "Backend Developer",
    "description": "Node.js, PostgreSQL experience",
    "createBy": "employer-id"
  }
}
```
Delete Job

Endpoint: /jobs/:id
Method: DELETE
Headers:

Authorization: Bearer <jwt-token> (employer only)


Response:
```json
{
  "message": "Job deleted successfully"
}
```
Applications
Apply to Job

Endpoint: /applications
Method: POST
Headers:

Authorization: Bearer <jwt-token> (applicant only)


Request Body:
```json
{
  "jobId": "job-id",
  "note": "I am very interested in this position."
}

```
Response:
```json
{
  "message": "Application submitted",
  "application": {
    "id": "application-id",
    "status": "applied",
    "jobId": "job-id",
    "userId": "applicant-id"
  }
}
```

Get My Applications

Endpoint: /applications
Method: GET
Headers:

Authorization: Bearer <jwt-token>


Response:
```json
{
  "jobs": [
    {
      "id": "job-id",
      "title": "Frontend Developer",
      "description": "React experience",
      "Applications": [
        {
          "id": "application-id",
          "status": "applied",
          "jobId": "job-id",
          "userId": "applicant-id"
        }
      ]
    }
  ]
}
```
Notes

Authentication: All protected endpoints require the Authorization header with the JWT token.

Use this Accounts to Test the website 
Applicant
``json
email: "applicant1@talenthub.com",
 password:"password123",
``
Employee
```json
email: "employer3@talenthub.com",
password:"password123",
```
Admin
```json
email: "admin@talenthub.com",
 password:"password123",
```
