# node_task_management
1. Install VS code for your system at https://code.visualstudio.com/
2. Install node.js and npm from https://nodejs.dev/en/download/
3. Download github desktop from https://desktop.github.com/
    - Signin to your github desktop using credentials
4. Checkout the code from 
5. Navigate to the project folder, make sure the package.json file exists in the current folder.
6. run "npm install" to download and resolve all dependencies.
7. The project is divided into 3 sections:
    - server.js
        Behaves as the server file. It has code to bring the server up and running on port 3000
    - model files
        These have object definitions of task and status, which we will use for our CRUD operations
    - router
        This file acts a router to different requests received by the server. As the cases grow, we can introduce 
            - middleware to handle user authorization
            - controller to handle more data validations/database connections etc.
8. Start the program by using your preferred IDE's method or on terminal using "node server.js"
9. Install postman or similar software apps to test the server code.
