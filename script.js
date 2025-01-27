document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const output = document.querySelector('.output');
    const terminalBody = document.querySelector('.terminal-body');

    //Função para focar no campo userInput
    function focusUserInput() {
        userInput.focus();
    }

    // Foco inicial no carregamento da página
    focusUserInput();

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = userInput.value.trim();
            const response = processCommand(command);
            if (command) {
                // Crie um novo elemento div para o comando inserido
                const commandOutput = document.createElement('div');
                commandOutput.classList.add('command-line');
                output.appendChild(commandOutput); // anexar comando à saída
            }
            userInput.value = '';
            focusUserInput(); // Mantenha o foco no campo de entrada após entrar
            if (response) {
                // Crie um novo elemento div para a resposta
                const responseOutput = document.createElement('div');
                responseOutput.classList.add('response-line');
                output.appendChild(responseOutput); // Anexar resposta à saída
                animateTypeOut(responseOutput, response); // Acionar animação de digitação para resposta
            }
        }
    });

    function processCommand(command) {
        const cmd = command.toLowerCase();

        // Lidar com comandos diferentes
        switch (cmd) {
            case 'whois':
                return 'Ei! Meu nome é Marcos e sou desenvolvedor!!!';
            case 'about':
                return 'Este é um site de terminal que funciona como um terminal com seus próprios comandos';
            case 'help':
                return 'Comandos:\n<div class="help-text-container"><pre class="help-text">whois\nhelp\nabout\ncontact\nclear\necho\nproblem</pre></div>';
            case 'contact':
                return 'Você pode entrar em contato comigo por e-mail em "spacedev@spacedevops.com.br".';
                case 'problem':
                return 'Se você não consegue ver o campo inupt, tudo bem, continue escrevendo.';
            case 'clear':
                clearTerminal();
                return ''; // Retornar string vazia após limpar o terminal
            case '':
                return ''; // Lidar com entrada vazia normalmente
            default:
                if (cmd.startsWith('echo ')) {
                    return cmd.substring(5); // Ecoe o texto depois de 'echo'
                }
                return `Command not found: ${command}`;
        }
    }

    function clearTerminal() {
        output.innerHTML = ''; // Limpe o conteúdo de saída
        // Role até o topo depois de limpar
        terminalBody.scrollTop = 0;
    }

    // Certifique-se de que userInput permaneça focado ao clicar fora
    document.addEventListener('click', function(event) {
        if (!userInput.contains(event.target)) {
            focusUserInput();
        }
    });

    function animateTypeOut(element, text) {
        element.innerHTML = ''; // Limpar texto existente
        let i = 0;

        function type() {
            if (i < text.length) {
                let currentChar = text.charAt(i);
                if (currentChar === '<') {
                    const endTagIndex = text.indexOf('>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 1);
                        i = endTagIndex + 1;
                    }
                } else {
                    element.innerHTML += currentChar;
                    i++;
                }
                setTimeout(type, 30); // Ajustar a velocidade de digitação aqui
            }
        }

        type();
    }
});