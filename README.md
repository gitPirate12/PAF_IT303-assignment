
---

# FitFusion - Social Media Platform for Fitness Enthusiasts
**Batch**: JUN_WD_01  
**Group Leader**: IT20012892 - Ahamed M.S.A (gitPirate12)  
**Project Group**: JUN_WD_01

## Project Overview:
FitFusion is a social media platform designed for fitness enthusiasts to share their fitness journeys, workout routines, meal plans, and healthy lifestyle tips. Users can create accounts, share posts including images and videos, track their workout status, and interact with others in the fitness community. Additionally, the platform incorporates a notification system and OAuth 2.0 authentication for secure access.

### Key Features:
1. **Post Management**: Users can create and share posts, including pictures and videos, to showcase their fitness activities and progress.
2. **Workout Plan Sharing**: Share personalized workout routines with the community.
3. **Meal Plan Sharing**: Share and explore various meal plans that complement fitness goals.
4. **Current Workout Status**: Keep followers updated on your workout progress in real time.
5. **Notification System**: Get notified about interactions, such as likes, comments, and follow requests.
6. **Authentication**: Secure login and account management using OAuth 2.0.

## Contributors:
- **Ahamed M.S.A**: Post Management  
- **Heshan Senanayaka**: Meal Plan Management  
- **Wickramasinghe B.G.A**: Workout Plan Management  
- **H.W.R.A. Hettiarachchi**: Current Workout Status Management  

## Technologies Used:
- **Frontend**: React.js, CSS
- **Backend**: Spring Boot, Express.js, Node.js
- **Database**: MongoDB
- **Other**: JavaScript, Python
- **API Testing**: Postman
- **IDE**: Visual Studio Code

## Running the Project:

### Prerequisites:
Ensure you have the following installed:
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Spring Boot](https://spring.io/projects/spring-boot)

### Steps to Run:
1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2. **Backend Setup**:
    Navigate to the `backend` directory and install the required dependencies:
    ```bash
    cd FitFusion/backend
    mvn install
    mvn spring-boot:run
    ```
3. **Frontend Setup**:
    Navigate to the `frontend` directory and install the required dependencies:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```
4. **MongoDB**:
    Ensure MongoDB is running locally or provide a connection to a remote database.

5. **Access the Application**:
    - The backend will run on port 8080 by default.
    - The frontend will run on port 3000 by default. Open [http://localhost:3000](http://localhost:3000) in your browser to access FitFusion.

## Testing:
To run tests for this project, use the following command:
```bash
mvn test  # For backend
npm test  # For frontend
```

---
