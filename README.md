# Blog Backend 📝🚀  

A simple backend for a blogging platform built with **Node.js, Express, MongoDB, and Zod** for validation.  

## Features ⚡  

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Bcrypt-Password%20Hashing-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Zod-Input%20Validation-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-Database-yellowgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Cookies-Based%20Auth-orange?style=for-the-badge" />
</p>

---

## Installation 🛠️  

```sh
git clone https://github.com/vipulsc/blog-backend.git
cd blog-backend
npm install
```


**Environment Variables**

Create a `.env` file and add:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
userSecret=your_jwt_secret

```
## 📌 API Endpoints

### 📝 User Routes
| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/api/v1/user/signup`   | Register a new user                  |
| POST   | `/api/v1/user/login`    | Login and receive an auth token      |

### 📝 Blog Routes
| Method | Endpoint                | Description                          | Auth Required |
|--------|-------------------------|--------------------------------------|--------------|
| POST   | `/api/v1/user/newPost`  | Create a new blog                    | ✅           |
| GET    | `/api/v1/blog/`         | Fetch all blogs                      |              |
| GET    | `/api/v1/blog/:id`      | Fetch a specific blog                |              |
| PUT    | `/api/v1/user/edit/:id` | Edit a blog                          | ✅           |

