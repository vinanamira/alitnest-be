<h1 align="center" style="font-weight: bold;">Alitnest</h1>

<p align="center">
 <a href="#tech">Technology</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> 
</p>

<p align="center">
    <b>Alitnest is an application that helps users manage a healthy lifestyle with personalized, measurable, and effective nutrition solutions. This application provides features such as Nutriwise for food scanning, Workout Schedule, Health Articles, and Consultations with nutritionists. </b>
</p>

<h2 id="technologies">Technology</h2>

- Express.js
- MongoDB
- OpenAI
- Docker

<h2 id="started">Getting started</h2>

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running the project:

- [Express.js](https://expressjs.com/en/starter/hello-world.html)
- [OpenAI](https://platform.openai.com/docs/overview)

## How to use

1. **Set up the OpenAI API:**

   - If you're new to the OpenAI API, [sign up for an account](https://platform.openai.com/signup).
   - Follow the [Quickstart](https://platform.openai.com/docs/quickstart) to retrieve your API key.

2. **Set the OpenAI API key:**

   2 options:

   - Set the `OPENAI_API_KEY` environment variable [globally in your system](https://platform.openai.com/docs/libraries#create-and-export-an-api-key)
   - Set the `OPENAI_API_KEY` environment variable in the project: Create a `.env` file at the root of the project and add the following line

    ```bash
   OPENAI_API_KEY=<your_api_key>
   ```
3. **Set the database key:**

   Set the environment variable in the project: Create a `.env` file at the root of the project and add the following line

    ```bash
   MONGODB_URI=<your_url_mongodb>
   ```

4. **Clone the Repository:**

   ```bash
   git clone https://github.com/vinanamira/alitnest-be.git
   ```
   
5. **Enter the Project Directory:**

   After the cloning process is complete, enter the folder of the newly created project:

   ```bash
   cd alitnest-be
   ```

6. **Install dependencies:**

   Run in the project root:

   ```bash
   npm install
   ```

7. **Run the app:**

   ```bash
   npm start
   ```

   The app will be available at [`http://127.0.0.1:<your_port>`](http://127.0.0.1).

<h2 id="routes">📍 API Endpoints</h2>

Here is a list of the main API routes with the expected request bodies.
​
| Route               | Description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /register</kbd>     | Registering new users into the system [request details](#post-register-detail)
| <kbd>POST /login</kbd>     | Perform user authentication for login  [request details](#post-login-detail)
| <kbd>GET /profile/:userId</kbd>     | Retrieving user profile data based on userId [response details](#get-profile-detail)
| <kbd>PUT /profile/:userId</kbd>     | Updating user profile data based on userId [request details](#put-profile-detail)
| <kbd>PUT /profile/password/:userId</kbd>     | Updating the user password based on userId [request details](#forget-password-detail)
| <kbd>POST /nutriwise</kbd>     | Analyzing food from the uploaded image to calculate nutrition [request details](#post-nutriwise-detail)
| <kbd>POST /daily-goals</kbd>     | Adding the user daily food log [request details](#post-daily-goals-detail)
| <kbd>GET /daily-goals/totals/:userId/:date</kbd>     | Taking all user food records on a specific date [response details](#get-daily-goals-detail)
| <kbd>POST /survey</kbd>     | Storing user survey data related to health goals [request details](#post-survey-detail)

<h2>Autentikasi</h2>

<h3 id="post-send-detail">POST /register</h3>

**REQUEST**
```json
{
    "name": "test ajaaa",
    "email": "user@example.com",
    "password": "<hashed_password>"
}
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "message": "Pendaftaran Berhasil!",
  "data": {
    "name": "test ajaaa",
    "email": "user@example.com",
    "password": "$2b$10$CpH7UEWyJnlzlD6Giw3RGuL6rT5ZNmwv0W2SbYGLql2pe6bX5CN3u",
    "_id": "67dd191d911c81ac77186e10",
    "createdAt": "2025-03-21T07:45:33.019Z",
    "updatedAt": "2025-03-21T07:45:33.019Z",
    "__v": 0
  }
}
```

<h3 id="post-login-detail">POST /login</h3>

**REQUEST**
```json
{
    "email": "user@example.com",
    "password": "<hashed_password>"
}
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "message": "Login Berhasil",
  "data": {
    "_id": "67dd191d911c81ac77186e10",
    "email": "user@example.com",
    "email": "test4@gmail.com",
    "password": "$2b$10$CpH7UEWyJnlzlD6Giw3RGuL6rT5ZNmwv0W2SbYGLql2pe6bX5CN3u",
    "createdAt": "2025-03-21T07:45:33.019Z",
    "updatedAt": "2025-03-21T07:45:33.019Z",
    "__v": 0
  }
}
```

<h3 id="get-profile-detail">GET /profile/:userId</h3>

**PATH VARIABLES**
```
userId : 67f7a8d2dd3a9e1643463709
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "data": {
    "id": "67f7a8d2dd3a9e1643463709",
    "name": "test ajaaa",
    "email": "user@example.com",
    "phone": "",
    "createdAt": "2025-04-10T11:17:38.297Z"
  }
}
```

<h3 id="put-profile-detail">PUT /profile/:userId</h3>

**PATH VARIABLES**
```
userId : 67f7a8d2dd3a9e1643463709
```

**REQUEST**
```json
{
    "name": "Putri Sari",
    "email": "putri.baru2@gmail.com",
    "phone": "08123456789"
}
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": "67f7a8d2dd3a9e1643463709",
    "name": "Putri Sari",
    "email": "putri.baru2@gmail.com",
    "phone": "08123456789"
  }
}
```

<h3 id="forget-password-detail">PUT /profile/password/:userId</h3>

**REQUEST**
```json
{
    "currentPassword": "Test 127774",
    "newPassword": "passwordBaru123"
}
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "message": "Password berhasil diperbarui"
}
```

<h2>Nutriwise</h2>

<h3 id="post-nutriwise-detail">POST /nutriwise</h3>

**REQUEST**
```
file
```

**RESPONSE**
```json
{
  "message": "Food analyzed successfully",
  "data": {
    "name": "Mixed Vegetable Salad with Avocado",
    "calories": 250,
    "fat": 18,
    "carbs": 20,
    "protein": 5,
    "vitamins": {
      "vitaminA": 35,
      "vitaminC": 40,
      "calcium": 5,
      "iron": 2,
      "potassium": 750
    }
  }
}
```

<h2>Daily Goals</h2>

<h3 id="post-daily-goals-detail">POST /daily-goals</h3>

**REQUEST**
```json
{
  "userId": "67f6d64d14a019e5a7559264",
  "date": "2025-04-10",
  "meal": {
    "name": "Bebek Goreng",
    "calories": 245,
    "protein": 25,
    "fat": 15,
    "carbs": 10,
    "time": "12:15"
  }
}
```

**RESPONSE**
```json
{
  "message": "Makanan berhasil ditambahkan",
  "data": {
    "userId": "67f6d64d14a019e5a7559264",
    "day": 10,
    "date": "2025-04-09T17:00:00.000Z",
    "meals": [
      {
        "name": "Ayam Geprek",
        "calories": 245,
        "protein": 20,
        "fat": 10,
        "carbs": 15,
        "time": "12:15"
      },
      {
        "name": "Bebek Goreng",
        "calories": 245,
        "protein": 25,
        "fat": 15,
        "carbs": 10,
        "time": "12:15"
      }
    ]
  }
}
```

<h3 id="get-daily-goals-detail">GET /daily-goals/totals/:userId/:date</h3>

**PATH VARIABLES**
```
userId : 67f6d64d14a019e5a7559264
date   : 2025-04-10
```

**RESPONSE**
```json
{
  "success": true,
  "date": "2025-04-09T17:00:00.000Z",
  "totals": {
    "calories": 490,
    "protein": 45,
    "fat": 25,
    "carbs": 25
  }
}
```

<h2>In-App Survey</h2>

<h3 id="post-survey-detail">POST /survey</h3>

**REQUEST**
```json
{
  "name": "User Test",
  "goal": "Menaikkan berat badan",
  "birthDate": "2020-08-16",
  "activityLevel": "Aktif sedang (olahraga sedang 3-5 hari/minggu)",
  "height": 150,
  "currentWeight": 70,
  "gender": "Perempuan",
  "targetWeight": 65,
  "weightGoalSpeed": 0.5
}
```

**RESPONSE**
```json
{
  "status": "SUCCESS",
  "message": "Survey saved successfully",
  "data": {
    "name": "User Test",
    "goal": "Menaikkan berat badan",
    "birthDate": "2004-08-16T00:00:00.000Z",
    "activityLevel": "Aktif ringan (olahraga ringan 1-3 hari/minggu)",
    "height": 150,
    "currentWeight": 70,
    "gender": "Perempuan",
    "targetWeight": 65,
    "weightGoalSpeed": 0.5,
    "_id": "67dd947f776f7f57db04b1a3",
    "createdAt": "2025-03-21T16:31:59.517Z",
    "updatedAt": "2025-03-21T16:31:59.517Z",
    "__v": 0
  }
}
```



<h3>Documentations that might help</h3>

OpenAI Images and Vision Documentation : https://platform.openai.com/docs/guides/images-vision?api-mode=responses&format=file
