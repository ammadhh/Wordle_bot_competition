// useful global constants
const WORD_LENGTH = 5;
const NUM_GUESSES = 6;

let current_guesses = [];
let guess_feedback = [];
let current_possible_words = [];

// current_solution_index is a random number corresponding to an index in the solution list in Flask
let current_solution_index = 0;
let currentwordguess = 0

reset_board();
// document.addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         submitGuess();
//     } else if (event.key === "Backspace") {
//         deleteLastLetter();
//     } else {
//         const letter = event.key.toUpperCase();
//         if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
//             addLetter(letter);
//         }
//     }
// });

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submit_button_input();
    }
    else if (event.key === "Backspace") {
        // TODO: cool to change the colors maybe as they update with sockets ? 
        delete_letter();
    }  else {
        const letter = event.key.toUpperCase();
        if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
            add_letter(letter);
        }
    }
});
function add_letter(letter) {
    if(currentwordguess < 5){
        let curr_letter = document.getElementById(current_guesses.length.toString() + currentwordguess.toString());
        // curr_letter.className('correct')
        curr_letter.textContent = letter
        currentwordguess += 1
        console.log(curr_letter)
        console.log("Letter pressed:", letter);
    }
}
function delete_letter()
{
    if(currentwordguess > 0){ 
        let curr_letter = document.getElementById(current_guesses.length.toString() + (currentwordguess - 1).toString());
        console.log(currentwordguess)
        curr_letter.textContent = ""
        currentwordguess -= 1
    }
    console.log("Delete pressed");
}
function submit_button_input(){
    let tempguess = "";
    for (let row = 0; row < 5; ++row) {
        let temp_letter = document.getElementById(current_guesses.length.toString() + row.toString()).textContent;
        tempguess += temp_letter;
    }
    let user_input = document.getElementById("user-input");
    user_input.value = tempguess
    submit_user_input()
}
window.onload = function() {
    const keyboardLayout = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    const keyboard = document.getElementById('keyboard');
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        
        row.split('').forEach(letter => {
            const button = document.createElement('button');
            button.className = 'key';
            button.textContent = letter;
            button.setAttribute('data-letter', letter);
            button.addEventListener('click', () => {
                // Implement logic for key press
                add_letter(letter)
            });
            rowDiv.appendChild(button);
        });

        keyboard.appendChild(rowDiv);
    });

    // Adding special buttons
    const submitButton = document.createElement('button');
    submitButton.id = 'submit';
    submitButton.className = 'large-key';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
        // Implement logic for submit
        // let curr_letter = document.getElementById(current_guesses.length.toString() + (0).toString()).textContent;
        // let curr_letter1 = document.getElementById(current_guesses.length.toString() + (1).toString()).textContent;
        // let curr_letter2 = document.getElementById(current_guesses.length.toString() + (2).toString()).textContent;
        // let curr_letter3 = document.getElementById(current_guesses.length.toString() + (3).toString()).textContent;
        // let curr_letter4 = document.getElementById(current_guesses.length.toString() + (4).toString()).textContent;
        // let user_input = document.getElementById("user-input");
        // let guess = curr_letter + curr_letter1 + curr_letter2 + curr_letter3 + curr_letter4
        // user_input.value = guess
        // submit_user_input()
        submit_button_input()
        console.log("Submit pressed");
    });
    keyboard.appendChild(submitButton);

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete';
    deleteButton.className = 'large-key';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        // Implement logic for delete
        delete_letter()
    });
    keyboard.appendChild(deleteButton);
};

function change_mode() {
    // change the text content of the current mode
    let new_mode = document.getElementById("modes").value;
    
    if (new_mode !== document.getElementById("curr-mode").textContent) {
        document.getElementById("curr-mode").textContent = new_mode;
        reset_board();
    }

    if (new_mode === "user") {
        document.getElementById("if-user-mode").className = "";
        document.getElementById("not-user-mode").className = "disabled";
    }
    else {
        document.getElementById("if-user-mode").className = "disabled";
        document.getElementById("not-user-mode").className = "";
    }
}

function insert_letters() {
    console.log("Insert Ran")
    for (let row = 0; row < current_guesses.length; ++row) {
        for (let col = 0; col < WORD_LENGTH; ++col) {
            let curr_letter = document.getElementById(row.toString() + col.toString());
            console.log("Current Letter is", curr_letter.textContent)
            // let curr_letter = document.getElementById #TODO: change color of used letters
            let button = document.querySelector(`button[data-letter="${curr_letter.textContent}"]`);
            let mode = document.getElementById("curr-mode").textContent;

            if (guess_feedback[row][col] === "C") {
                curr_letter.className = ("correct");
                if(mode === "USER"){
                    button.classList.add("green");
                }
            }
            else if (guess_feedback[row][col] === "M") {
                curr_letter.className = ("present");
                if(mode === "USER"){
                    button.classList.add("red");
                }
            }
            else {
                curr_letter.className = ("absent");
                if(mode === "USER"){
                    button.classList.add("grey");
                }
            }
            
            curr_letter.textContent = current_guesses[row][col];
        }
    }
}
// TODO: Test if it works
// function insert_letter() {
//     console.log("Insert Single Letter")
//     for (let row = 0; row < current_guesses.length; ++row) {
//         for (let col = 0; col < WORD_LENGTH; ++col) {
//             let curr_letter = document.getElementById(row.toString() + col.toString());
//             if (guess_feedback[row][col] === "C") {
//                 curr_letter.className = ("correct");
//             }
//             else if (guess_feedback[row][col] === "M") {
//                 curr_letter.className = ("present");
//             }
//             else {
//                 curr_letter.className = ("absent");
//             }
            
//             curr_letter.textContent = current_guesses[row][col];
//         }
//     }
// }

function shakeWords(){
        console.log("Inside Failure If Statmenet")
        for (let i = 0; i < 5; i++) {
            document.getElementById(`${current_guesses.length}${i}`).classList.add('always-shake');
        }
        // document.getElementById(`board-${username}`).classList.add('always-shake');
        // Remove the class after the animation ends
        setTimeout(function() {
            // document.getElementById(`board-${username}`).classList.remove('always-shake');
            for (let i = 0; i < 5; i++) {
                document.getElementById(`${current_guesses.length}${i}`).classList.remove('always-shake');
            }
        }, 500);
        return;
}
function updateRemainingList() {
    const listElement = document.getElementById("remainingList");
    // Clear the current list contents
    listElement.innerHTML = '';
    // Add each item in the 'remaining' array as a list item
    current_possible_words.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });
}
// var socket = io.connect('http://' + document.domain + ':' + location.port);

function submit_user_input() {
    let user_input = document.getElementById("user-input");
    if (typeof io !== 'undefined') {
        var socket = io.connect('http://' + document.domain + ':' + location.port);
    
        // Assuming you have other logic here...
        socket.on('connect', function() {
            socket.send("Guessed: " + user_input.value);
        });
    
        // ... and possibly other event handlers
    } else {
        console.error("Socket.IO is not defined. Please check if the Socket.IO script is properly loaded.");
        // Handle the case when Socket.IO is not available
        // You might want to load the script dynamically or inform the user
    }
    if (current_guesses.length >= NUM_GUESSES) {
        user_input.value = "MAX GUESSES REACHED";
        return;
    }
    if (guess_feedback[guess_feedback.length - 1] === "CCCCC") {
        user_input.value = "CORRECTLY GUESSED";
        return;
    }
    let guess = user_input.value.toUpperCase();
    fetch("/check_guess/?index=" + current_solution_index.toString() + "&guess=" + guess,
          { credentials: "same-origin", method: "POST" })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (data.feedback === "INVALID") {
                user_input.value = data.feedback;
                shakeWords()
            }
            else {
                currentwordguess = 0
                // proper guess, so we can append it and the feedback to current_guesses and guess_feedback
                current_guesses.push(guess);
                guess_feedback.push(data.feedback);
                current_possible_words = data.rem
                updateRemainingList()
                console.log(current_possible_words)
                insert_letters();
                if (guess_feedback[guess_feedback.length - 1] === "CCCCC") {
                    user_input.value = "CORRECTLY GUESSED";
                }
            }
        })
        .catch((error) => console.log(error));
        // ADDITION UNKNOWN BELOW
}

async function simulate() {
    // simulate using the current mode num_simulate times
    // can only call this function when the mode is not user
    let num_simulate = Number(document.getElementById("num-simulate").value);
    let mode = document.getElementById("curr-mode").textContent;
    for (let i = 0; i < num_simulate; ++i) {
        // start a new game
        reset_board();

        // use while loop, since initial guesses can increase the guess amount
        while (current_guesses.length < NUM_GUESSES) {
            // generate a next guess
            const { guess } = await fetch("/generate_guess/", {credentials: "same-origin",
                                                         method: "POST",
                                                         body: JSON.stringify({mode, current_guesses, guess_feedback})})
                                        .then((response) => {
                                            if (!response.ok) throw Error(response.statusText);
                                            return response.json();
                                        })
                                        .catch((error) => console.log(error));
            // get feedback for the next guess
            const { feedback } = await fetch("/check_guess/?index=" + current_solution_index.toString() + "&guess=" + guess,
                                             { credentials: "same-origin", method: "POST" })
                                            .then((response) => {
                                                if (!response.ok) throw Error(response.statusText);
                                                return response.json();
                                            })
                                            .catch((error) => console.log(error));
            // get list of all possible guesses
            const { rem } = await fetch("/check_guess/?index=" + current_solution_index.toString() + "&guess=" + guess,
                                             { credentials: "same-origin", method: "POST" })
                                            .then((response) => {
                                                if (!response.ok) throw Error(response.statusText);
                                                return response.json();
                                            })
                                            .catch((error) => console.log(error));            current_guesses.push(guess);
            guess_feedback.push(feedback);
            current_possible_words = rem
            console.log(current_possible_words)
            // current_possible_words = possible_words
            insert_letters();
            updateRemainingList()
            // currently delaying 2 seconds per iteration
            await new Promise(r => setTimeout(r, 1000));
            
            if (guess_feedback[guess_feedback.length - 1] === "CCCCC") {
                break;
            }
        }
    }
}

function reset_board() {
    let mode = document.getElementById("curr-mode").textContent;
    if (current_guesses.length >= NUM_GUESSES || guess_feedback[guess_feedback.length - 1] === "CCCCC") {
        // store the data in db and update stats
        let win = Number(guess_feedback[guess_feedback.length - 1] === "CCCCC");
        fetch("/insert_stat/?win=" + win.toString() + "&num_guesses=" + current_guesses.length.toString() + "&mode=" + mode,
              { credentials: "same-origin", method: "POST" })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(({ modes }) => {
                let stats_list = document.getElementById("stats-list");
                // overwrite stats list with new data
                stats_list.innerHTML = modes.map(({mode, win_rate, avg_guesses}) => {
                    return '<div class="stats-line" key="' + mode + '">'
                            + '<span class="mode-stat">' + mode + '</span>'
                            + '<span class="win-rate">Win Rate: ' + win_rate.toFixed(2) + '</span>'
                            + '<span class="avg-guesses">Avg Guesses: ' + avg_guesses.toFixed(2) + '</span>'
                            + '</div>'
                }).join("");
            })
            .catch((error) => console.log(error));
    }
    current_guesses = [];
    guess_feedback = [];

    // need to query the api for this number
    fetch("/get_solution_index/", { credentials: "same-origin", method: "GET" })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            current_solution_index = data.index;
        })
        .catch((error) => console.log(error));
    // clear the top words section
    document.getElementById("top-words").innerHTML = "Not Available";

    // clear all user input
    document.getElementById("user-input").value = "";

    document.getElementById("modes").value = mode;

    // clear colors of all letters in the game board and remove letters
    for (let row = 0; row < NUM_GUESSES; ++row) {
        for (let col = 0; col < WORD_LENGTH; ++col) {
            let curr_letter = document.getElementById(row.toString() + col.toString());
            curr_letter.className = "letter";
            curr_letter.textContent = "";
        }
    }
}