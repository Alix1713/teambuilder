//node index.js
//fs.readfile

const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const teamMembers = [];
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const path = require("path");
//these are my prompts in terminal
inquirer
  .prompt([
    {
      // manager
      type: "input",
      message: "Project Managers Name:",
      name: "manager",
    },
    {
      //ID
      type: "input",
      message: "ID:",
      name: "idmanager",
    },
    {
      //Email
      type: "input",
      message: "Email: ",
      name: "emailmanager",
    },
    {
      //Office Number
      type: "input",
      message: "Office Phone:",
      name: "phonenumber",
    },
  ])

  .then((data) => {
    const newManager = new Manager(
      data.manager,
      data.idmanager,
      data.emailmanager,
      data.phonenumber
    );
    teamMembers.push(newManager); //pushes the new manager into the array of team members
    function anotherTeam() {
      addTeammate().then((response) => {
        console.log(response);
        if (response.userchoice === "Intern") {
          addIntern().then((intern) => {
            const newIntern = new Intern(
              intern.intern,
              intern.school,
              intern.emailintern,
              intern.idintern
            );

            teamMembers.push(newIntern);
            anotherTeam();
          });
        } else if (response.userchoice === "Engineer") {
          addEngineer().then((engineer) => {
            const newEngineer = new Engineer(
              engineer.engineer,
              engineer.github,
              engineer.emailengineer,
              engineer.idengineer
            );
            teamMembers.push(newEngineer);
            anotherTeam();
          });
        } else if (response.userchoice === "Exit") {
          const dataContent = generateTemplate(teamMembers);
          fs.writeFile(
            path.join(__dirname, "/dist/index.html"),
            dataContent,
            (error) => {
              console.log(error);
            }
          );
        }
      });
    }
    anotherTeam();
  });

function addTeammate() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Choose an option",
      name: "userchoice",
      choices: ["Intern", "Engineer", "Exit"],
    },
  ]);
}
function addIntern() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Interns Name:",
      name: "intern",
    },
    {
      type: "input",
      message: "School:",
      name: "school",
    },
    {
      type: "input",
      message: "Email: ",
      name: "emailintern",
    },
    {
      type: "input",
      message: "ID:",
      name: "idintern",
    },
  ]);
}
function addmoreTeammate() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Choose an option",
      name: "userchoice",
      choices: ["Intern", "Engineer", "Exit"],
    },
  ]);
}
function addEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Engineers Name:",
      name: "engineer",
    },
    {
      type: "input",
      message: "GitHub Url:",
      name: "github",
    },
    {
      type: "input",
      message: "Email: ",
      name: "emailengineer",
    },
    {
      type: "input",
      message: "ID:",
      name: "idengineer",
    },
  ]);
}

const generateTemplate = (data) => {
  console.log(data);
  function renderInterns(data) {
    let interns = "";
    data.forEach((employee) => {
      if (employee.getRole() === "Intern") {
        interns =
          interns +
          ` <div class="col-sm-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                        class="d-inline-block align-text-top">Intern:${employee.getName()}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID:${employee.getId()}</li>
                    <li class="list-group-item">Email:${employee.getEmail()}</li>
                    <li class="list-group-item">University:${employee.getSchool()}</li>
                </ul>
            </div>
        </div>
    </div>`;
      }
    });
    return interns;
  }
  return (
    ` <!DOCTYPE html>
    <html>
    <title>Team Builder</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" />
    <!--bootstrap navbar css-->
    
    <body>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid" id="navbar">
                <a class="navbar-brand" href="#">
                    <!--make an id to style font and text size in css-->
                    <img src="icon.jpg" alt="" width="170" height="100" class="d-inline-block align-text-top">
                  Team Builder
                </a>
            </div>
        </nav>
        <div class="card text-center">
            <div class="card-header">
            A info board for your team!
                <!--info-->
            </div>
        </div>
        <div class="row">
            <!--cards for team-->
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                                class="d-inline-block align-text-top">Manager: ${data[0].name}</h5>
                        <!--get role-->
                        <!--change images-->
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${data[0].id}</li>
                            <!--get id-->
                            <li class="list-group-item">Email: ${data[0].email}</li>
                            <!--get email-->
                            <li class="list-group-item">Office #: ${data[0].phone}</li>
                            <!--get office #-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                                class="d-inline-block align-text-top">Engineer:${data.idengineer}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID:${data.idengineer}</li>
                            <li class="list-group-item">Email:${data.emailengineer}</li>
                        </ul>
                        <div class="card-body">
                            <a href="https://github.com/" class="card-link">GitHub: ${data.github}</a>
                            <!--github-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                                class="d-inline-block align-text-top">Engineer:${data.enginner}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID:${data.idengineer}</li>
                            <li class="list-group-item">Email:${data.emailengineer}</li>
                        </ul>
                        <div class="card-body">
                            <a href="https://github.com/" class="card-link">GitHub: ${data.github}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                                class="d-inline-block align-text-top">Engineer:${data.engineer}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID:${data.idengineer}</li>
                            <li class="list-group-item">Email:${data.emailengineer}</li>
                        </ul>
                        <div class="card-body">
                            <a href="https://github.com/" class="card-link">GitHub: ${data.github}</a>
                        </div>
                    </div>
                </div>
            </div>
      ` +
    renderInterns(data) +
    `
        </div>
    </body>
    
    </html>`
  );
};
