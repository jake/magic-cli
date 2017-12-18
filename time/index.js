const inquirer = require('inquirer');
const fetch = require('node-fetch');
const username = require('username');

var questions = [
    {
        type: 'list',
        name: 'project_name',
        message: 'Which project?',
        choices: [
            new inquirer.Separator(),
            {
                name: 'New Project',
                value: '$new'
            },
        ]
    },
    {
        type: 'input',
        name: 'project_name',
        message: 'Project name:',
        when: function(answers) {
            return answers.project_name == '$new';
        }
    },
    {
        type: 'input',
        name: 'amount',
        message: 'How much of today did you spend on it?',
        validate: function(answer) {
            if (isNaN(answer)) {
                return "Enter a number (e.g 0.5 for half a day)";
            } else {
                return true;
            }
        }
    },
];

const getProjects = async function() {
    const response = await fetch('https://commando-time.now.sh/projects');
    return await response.json();
}

getProjects().then((projects) => {
    questions[0].choices = projects.concat(questions[0].choices);

    inquirer.prompt(questions).then(answers => {
        username().then(async (username) => {
            answers.person = username;

            return await fetch('https://commando-time.now.sh/insert', {
                method: 'POST',
                body: JSON.stringify(answers),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
        })

    });
});
