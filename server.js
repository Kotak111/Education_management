const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
require("./config/db")
const cookieParser=require("cookie-parser");
const UserRoutes=require("./routes/user.route")
const AdminRoute= require("./routes/admin.route")
const TeacherRoute=require("./routes/teacher.route")
const StudentRoute=require("./routes/student.route")
app.use(cookieParser());
const port = process.env.PORT
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Education_managemnt API',
        version: '1.0.0',
        description: 'API for managing expenses',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/admin.route.js','./routes/teacher.route.js','./routes/student.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth",UserRoutes)

//admin apis 
app.use("/admin",AdminRoute)

//Teacher apis
app.use("/teacher",TeacherRoute)

//student apis
app.use("/student",StudentRoute)
app.get("/",(req,res)=>{
    res.send("<center><h1>Education_managemnt_App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Education_management target=_blank>Repository :- Education_management</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))