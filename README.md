# Module 17 Challenge: MongoDB, Mongoose ORM, and Express.js - Social Media API

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Credits](#credits)
  - [Questions](#questions)

  ## Description
  This Homework assignment was completed for Unit TSeventeenwelve of the U of M Bootcamp, to practice making a command-line application using Node.js packages and writing postgreSQL tables with data collected from inquirer prompts and class constructors. The complete set of responses is gathered to leverage and update a database; the user can view or add employees, roles, and departments, as well as update employees' roles and managers. I learned a lot about SQL and inner joins that display data retrieved from objects built in constructor classes - it would be very easy to add more questions and functions, to allow the user to store and get a lot more data!

  ## Installation
  To install this project after copying down the repo, you will first need to run npm init (-y for default settings) on the project root, which should grant you access to the necessary soft; Use of other/newer versions of inquirer are not recommended for this project unless I can figure out how to update the inquirer syntax in the actual js code.

  ## Usage
  1. To use this project, ensure you have [Postgres](https://www.postgresql.org/download/) and the node packages installed as specified in the Installation section above.
  2. Open a terminal on the db folder and run psql postgres.
  3. In Postgres, run \i schema.db to build the db.
  4. In Postgres, run \i seeds.db to seed the db.
  5. Open a separate terminal on the project root and simply run node index.js - from there, just answer the questions!

  [A video tutorial for using content-management-system](https://drive.google.com/file/d/1yQuKcbh9Tuz5dCkIeQyQv9uio7ZEFu5d/view?usp=sharing)

  ## Contributing
  If you want to contribute to this project - particularly if you know how I might refactor the code so it works with later versions of inquirer, see my contact info in the Questions section below. I am also curious about ways we might allow the user to give information that we could apply within bounds to ensure we are giving greater design flexibility to store more interesting collections of data in the db and related outputs. Don’t hesitate to reach out! I am a beginner at this stuff but always hungry to learn from others in the community.

  ## Tests
  This app is best tested using nodemon and postman for just the GET/POST/DELETE API calls, but the interaction between the frontend and backend can also be tested directly on the browser using localhost:3001 and the console.
  
  ## Credits
  - Shoutout to [Ramon22](https://stackoverflow.com/users/1189620/ramon22) on Stack Overflow [for the advice and regex material](https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax) on validating emails in Mongoose schemas.

  ## Questions
  - [Check me out on Github!](https://www.github.com/floatingpoint-exaflop)
  - [Email Me](mailto:timscallon1@gmail.com?subject=Hello!)

  ## License
  [![Image showing badge for MIT License.](https://img.shields.io/badge/License-MIT_License-blue)](https://mit-license.org/)
  
  This project is using the MIT License. Please click the badge icon for more information, or refer directly to the LICENSE in the repo.
