var inquirer = require('inquirer');

var choices = [
    new inquirer.Separator(),
    {
        name: 'New Project',
        value: '$new'
    }
];

var questions = [
    {
        type: 'list',
        name: 'project',
        message: 'Which project?',
        choices, choices,
    },
    {
        type: 'input',
        name: 'project',
        message: 'Project name:',
        when: function(answers) {
            return answers.project == '$new';
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

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
});
