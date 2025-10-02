# Employee Data Management

## 📌 Project Goal
A straightforward **CRUD (Create, Read, Update, Delete)** application to manage a list of employees.

This project demonstrates how to build a **full-stack web application** with:
- **Backend (Spring Boot + MySQL)** → REST API endpoints for employee data  
- **Frontend (React.js)** → User interface to interact with the API  

------------

## 📌 API Endpoints

| Method |        Endpoint                |         Description              |          
|--------|--------------------------------|----------------------------------|
| POST   | `/api/employees`               |      Add a new employee          |     
| GET    | `/api/employees`               |      Get all employees           |       
| PUT    | `/api/employees`               | Update an existing employee      | 
| DELETE | `/api/employees/delete/{id}`   |  Delete an employee by ID        | 

--------------

## 🚀 Core Features

### Backend
- Full CRUD API at `/api/employees`
- Each employee has:
  - `id` (auto-generated)  
  - `name` (string)  
  - `email` (string, unique)  
  - `position` (string)  
- Data persistence with **MySQL**  
- Error handling for duplicate emails and invalid requests  

### Frontend
- Table/list view of all employees  
- Form to add a new employee  
- Edit employee 
- Delete employee  
- State updates without page refresh  

-------------

## ⚙️ Setup & Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/Darshanrevankar/Employee-Data-Management.git
```


