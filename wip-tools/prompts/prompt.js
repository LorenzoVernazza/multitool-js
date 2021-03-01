const promptSchema = {
    name: '',
    description: '',
    type: 'string',
    required: false,
    default: ''
}

const prompts = [{
    name: 'name',
    description: 'Your name',
    type: 'string',
    required: true,
    default: 'pippo'
}, {
    name: 'sure',
    description: 'Sure?',
    type: 'bool',
    required: true,
    default: 'pippo'
}, {
    name: 'hidden',
    description: 'Hidden text:',
    replace: '*',
    type: 'string',
    required: true,
    default: 'pippo'
}, 
'test'];

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function string(prompt) {
    if (typeof prompt === 'string') prompt = { name: prompt };

    const {
        name,
        description,
        required = false,
        default: defaultValue
    } = prompt;

    let question = '';
    if (description !== undefined){ 
        question += `${description} `;
    } else {
        question += `${name}: `;
    }
    if (defaultValue) question += `(${defaultValue}) `

    return new Promise((resolve) => {
       rl.question(question, (data) => {
        //    rl.close()
            console.log(data)
            if (required && !data) {
                readline.clearLine(rl, 0);
                readline.cursorTo(rl, 0, process.stdout.rows - 2);
                rl.write('Errore\n')
            }
           resolve(data || defaultValue);
        });
    });
}

async function prompt(prompts) {
    const results = {};
    for (const _prompt of prompts) {
        if (typeof _prompt === 'string') {
            results[_prompt] = await string(_prompt);
        } else if (_prompt.type === 'string') {
            results[_prompt.name] = await string(_prompt);
        }
    }
    rl.close()
    console.log(results);
    return results;
}

prompt(prompts)