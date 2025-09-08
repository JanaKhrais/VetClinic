# Store Frontend
This is the frontend for a simple store web application built with React + Vite.


# Description

The app allows two types of users:

- 👤 **Regular users**: 
  - ❌ Cancel appointment 
  - 📅 Book appointment 
  - ✏️Edit appointmnets

- 🛠️ **Admins**:
  
  - ✅Approve appointments.
  -   ❌ Delete appointment


Login and signup are included with a basic role-based flow (user/admin). Data is persisted in the backend via PostgreSQL.

## 🧑‍💻 User Requirements

1. **Login or Sign Up** with an email and password
2. On sign up, choose your role: `user` or `admin`
3. **Admin** users:
   - Can approve, decline, and delete appointments
4. **Regular** users:
   - Can only book appointments, cancel and edit them.
5. The app remembers login sessions using `localStorage`


## 🛠️ Technologies
- React 18
- Vite
- Fetch API
- LocalStorage (for session persistence)
## 🚀 Getting Started

```bash
cd store-client
npm install
npm run dev