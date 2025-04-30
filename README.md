# How to use test version of this app 
29.4.2025.

1. Create MySQL Schemas
   Open MySQL and make schema:
```
   CREATE SCHEMA `fitnesstrackdb` ;
   CREATE SCHEMA `fitnesstracktest` ;
```
2. Start the backend.
   Make sure the lines that initialize both databases are uncommented in your backend code. Then run:
```
   cd backends
   node index.js
```
3. Start the frontend. 
   In a separate terminal, run::
```
   cd frontend
   npm run start
```