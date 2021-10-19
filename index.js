//node index.js
//fs.readfile

const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const teamMembers = []
//these are my prompts in terminal
inquirer
    .prompt([
        {
            // manager
            type: 'input',
            message: 'Project Managers Name:',
            name: 'manager',
        },
        {
            //ID
            type: 'input',
            message: 'ID:',
            name: 'idmanager',
        },
        {
            //Email
            type: 'input',
            message: 'Email: ',
            name: 'emailmanager',
        },
        {
            //Office Number
            type: 'input',
            message: 'Office Phone:',
            name: 'phonenumber',
        },
    ])

    .then((data) => {
        const newManager = new Manager(data.manager, data.idmanager, data.emailmanager, data.phonenumber)
        teamMembers.push(newManager) //pushes the new manager into the array of team members
        addTeammate().then((response) => {
            if (response === 'Intern') {
                addintern().then(intern => {
                    const newIntern = new intern(intern.intern, intern.school, intern.emailintern, intern.idintern)
                    teamMembers.push(newIntern)
                })
            } else if (response === 'Enginner') {
                addEnginner().then(engineer => {
                    const newEngineer = new engineer(engineer.engineer, engineer.github, engineer.emailengineer, engineer.idengineer)
                    teamMembers.push(newEngineer)
                })
            } else if (response === 'Exit') {
                //needs exit
            }
        })
        const dataContent = generateTemplate(data)
        fs.writeFile('index.html', dataContent, error => {
            console.log(error)
        });

    })

function addTeammate() {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Choose an option',
            name: 'userchoice',
            choices: ['Intern', 'Engineer', 'Exit'],
        }
    ])

}
function addIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Interns Name:',
            name: 'intern',
        },
        {
            type: 'input',
            message: 'School:',
            name: 'school',
        },
        {
            type: 'input',
            message: 'Email: ',
            name: 'emailintern',
        },
        {
            type: 'input',
            message: 'ID:',
            name: 'idintern',
        },
    ])
}
function addEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Engineers Name:',
            name: 'engineer',
        },
        {
            type: 'input',
            message: 'GitHub Url:',
            name: 'github',
        },
        {
            type: 'input',
            message: 'Email: ',
            name: 'emailengineer',
        },
        {
            type: 'input',
            message: 'ID:',
            name: 'idengineer',
        },
    ])
}





const generateTemplate = (data) => {
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
                                class="d-inline-block align-text-top">Manager: ${data.manager}</h5>
                        <!--get role-->
                        <!--change images-->
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${data.idmanager}</li>
                            <!--get id-->
                            <li class="list-group-item">Email: ${data.emailmanager}</li>
                            <!--get email-->
                            <li class="list-group-item">Office #: ${data.phonenumber}</li>
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
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><img src="icon2.png" alt="" width="100" height="100"
                                class="d-inline-block align-text-top">Intern:${data.intern}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID:${data.idintern}</li>
                            <li class="list-group-item">Email:${data.emailintern}</li>
                            <li class="list-group-item">University:${data.school}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>`
}