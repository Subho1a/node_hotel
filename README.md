# 🏨 Node Hotel API

A RESTful hotel management backend built with **Node.js**, **Express.js**, and **MongoDB Atlas**. This project allows easy management of hotel staff and menu items via a secure and structured API.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 👨‍🍳 Staff management (CRUD for chefs, waiters, managers)
- 🍽️ Menu item management (CRUD with taste classification)
- 🌶️ Filtering by taste or role
- 🧪 Simple JSON-based input/output

---

## 🛠️ Tech Stack

| Layer            | Technology Used         |
|------------------|--------------------------|
| Runtime          | Node.js                  |
| Framework        | Express.js               |
| Database         | MongoDB Atlas (cloud)    |
| ODM              | Mongoose                 |
| Auth             | JSON Web Tokens (JWT)    |
| Dev Tool         | Nodemon                  |
| Hosting (API)    | Render                   |
| Version Control  | Git + GitHub             |

---
## 🌐 Live Demo

Hosted at: [https://node-hotel-yj3a.onrender.com](https://node-hotel-yj3a.onrender.com)


---
## 📂 Project Structure

```text
.
├── person_model.js         # Mongoose schema for Person
├── menu_model.js           # Mongoose schema for Menu Item
├── personRoutes.js         # Express route handlers for Person
├── menuRoutes.js           # Express route handlers for Menu Item
├── auth.js                 # JWT authentication middleware
├── jwt.js                  # JWT token generation logic
├── db.js                   # MongoDB connection setup (connected to online DB)
├── server.js               # Main Express server
├── package.json            # Project metadata & dependencies
├── package-lock.json       # Lock file for consistent installs
└── .gitignore              # Ignored files and folders

```
---


### 🧑‍🍳 Persons

- `POST /person` – Add a person (e.g., staff)
- `GET /person` – Retrieve all persons
- `GET /person/:workType` – Retrieve persons by role (`chef`, `waiter`, `manager`)
- `PUT /person/:id` – Update person details
- `DELETE /person/:id` – Remove a person

### 🍽️ Menu Items

- `POST /menu` – Add a menu item
- `GET /menu` – List all menu items
- `GET /menu/:taste` – Get items by taste (`sweet`, `spicy`, `sour`)
- `PUT /menu/:id` – Update a menu item
- `DELETE /menu/:id` – Delete a menu item

## 📄 Sample Person JSON


```
{
  "name": "John Doe",
  "age": 28,
  "work": "chef",
  "mobile": 9876543210,
  "email": "john.doe@example.com",
  "addres": "123 Main Street, New York, NY",
  "salary": "35000",
  "password": "securePassword123",
  "username": "johndoe"
}
```

## 📄 Sample Menu Item JSON



```
{
  "name": "Spicy Chicken Curry",
  "price": 180,
  "teast": "spicy",
  "is_drink": false,
  "ingredient": ["chicken", "spices", "onion", "garlic"],
  "num_sales": 300
}
```
