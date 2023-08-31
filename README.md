# Scene It
      
Scene It is a soft clone of Letterboxd. Films, and our thoughts on them, were meant to be shared. Scene It provides a way for users to discover new films and their friends' opinions on them, while also sharing their own.

Check out [Scene It](https://scene-it.onrender.com/) (Moving from Render soon)

## Index

[MVP Feature List](https://github.com/Angad-Bhatia/letterboxd-project/wiki/Features-List) |
[Database Scheme](https://github.com/Angad-Bhatia/letterboxd-project/wiki/DB-Schema) |
[User Stories](https://github.com/Angad-Bhatia/letterboxd-project/wiki/User-Stories) |
[Wire Frames](https://github.com/Angad-Bhatia/letterboxd-project/wiki/Wireframes) |

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
<!---
## Splash Page
![splash](https://user-images.githubusercontent.com/66566925/174560214-c0601b18-8cbe-4ce4-895c-8bf8b196eeb5.gif)

## Spots
![spots](https://user-images.githubusercontent.com/66566925/174561250-05f8e96e-eb7e-4741-9167-e3a6eaf2f7d0.gif)

## One spot page and reviews
![ezgif com-gif-maker](https://user-images.githubusercontent.com/66566925/174562986-bf32d1d3-29f3-4da1-a4a7-0762f259c31e.gif)


## Getting started
1. Clone this repository:

   `
   https://github.com/itsmaica/Remotebnb.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking

## AWS
Logged-in Users can
* Upload multiple images of their spot to AWS S3


## Future Features
### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api
