var inquirer = require('inquirer');

var output = {};

function chooseProject() {
    inquirer.prompt([{
        type: 'list',
        name: 'project',
        message: 'Which project?',
        choices: [
            'Casey',
            'OK, Dracula',
            new inquirer.Separator(),
            {
                name: 'New Project',
                value: '$new'
            }
        ]
    }]).then(answers => {
        if (answers.project == "$new") {
            askProject();
        } else {
            output.project = answers.project;
            askAmount();
        }
    });
}

function askProject() {
    inquirer.prompt([{
        type: 'input',
        name: 'project',
        message: 'Project name',
    }]).then(answers => {
        output.project = answers.project;
        askAmount();
    });
}

function askAmount() {
    inquirer.prompt([{
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
    }]).then(answers => {
        output.amount = answers.amount;
        console.log(output);
    });
}

chooseProject();
