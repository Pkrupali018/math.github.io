let operators = ["+", "-"];
const startbtn = document.getElementById("start-btn");
const con = document.querySelector(".controls-container");
const question = document.getElementById("question");
const controls = document.querySelector(".container");
const results = document.getElementById("result");
const nextbtn = document.getElementById("next-btn");
const submitbtn = document.getElementById("submit-btn");
const stopbtn = document.getElementById("stop");
const errormessage = document.getElementById("error-msg");

let answerValue;
let operatorsQuestion;

//randome value generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const questionGenerator = () => {
    //for getting random number
    let [num1, num2] = [randomValue(1, 5), randomValue(1, 5)];
    // console.log(num1, num2);

    // for getting random operator
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];
    // console.log(randomOperator);

    if (randomOperator == "-" && num2 > num1) {
        [num1, num2] = [num2, num1];
    }

    //solve equation
    let solution = eval(`${num1}${randomOperator}${num2}`);
    // console.log(num1, randomOperator, num2, solution);

    // //for placing the input at random position
    // (1 for num1, 2 for num2, 3 for operates and antthing for else)
    let randomvar = randomValue(1, 5);
    // console.log(randomvar);
    if (randomvar == 1) {
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\>${randomOperator}<img src="./images/alphabet_d${num2}.jpg", alt="hello", width=30%/>=<img src="./images/alphabet_d${solution}.jpg", alt="hello", width=30%/>`;
    }
    else if (randomvar == 2) {
        answerValue = num2;
        question.innerHTML = `<img src="./images/alphabet_d${num1}.jpg", alt="hello", width=30%/>${randomOperator}<input type="number" id="inputValue" placeholder="?"\>=<img src="./images/alphabet_d${solution}.jpg", alt="hello", width=30%/>`;
    }
    else if (randomvar == 3) {
        answerValue = randomOperator;
        operatorsQuestion = true;
        question.innerHTML = `<img src="./images/alphabet_d${num1}.jpg", alt="hello", width=20%/><input type="text" id="inputValue" placeholder="?"\><img src="./images/alphabet_d${num2}.jpg", alt="hello", width=20%/>=<img src="./images/alphabet_d${solution}.jpg", alt="hello", width=20%/>`;
    }
    else {
        answerValue = solution;
        question.innerHTML = `<img src="./images/alphabet_d${num1}.jpg", alt="hello", width=30%/>${randomOperator}<img src="./images/alphabet_d${num2}.jpg", alt="hello", width=30%/>=<input type="number" id="inputValue" placeholder="?"\>`;
    }

    // User input check

};
// questionGenerator();

// start game
startbtn.addEventListener("click", () => {
    operatorsQuestion = false;
    answerValue = "";
    errormessage.innerHTML = "";
    errormessage.classList.add("hide");
    // Controls the buttons visibility
    startbtn.classList.add("hide");
    submitbtn.classList.add("hide");
    nextbtn.classList.remove("hide");
    stopbtn.classList.remove("hide");
    controls.classList.remove("hide");
    con.classList.add("hide");
    // for(let i=0; i<5; i++){
    questionGenerator();
    // }
});

let winCount = 0;
let lossCount = 0;
nextbtn.addEventListener("click", () => {
    let userInput = document.getElementById("inputValue").value;
    // If user input is not empty
    if (userInput) {
        // console.log(userInput);
        if (userInput == answerValue) {
            winCount++;
        }
        // else if (operatorsQuestion && !operators.includes(userInput)) {
        //     errormessage.classList.remove("hide");
        //     errormessage.innerHTML = "please enter correct operator..!";

        // }
        else{
            lossCount++;
        }
        console.log(winCount);
        console.log(lossCount);
        if((winCount + lossCount) == 5){
            submitbtn.classList.remove("hide");
            nextbtn.classList.add("hide");
        }else{
            operatorsQuestion = false;
            answerValue = "";
            errormessage.innerHTML = "";
            errormessage.classList.add("hide");
    
            submitbtn.classList.add("hide");
            controls.classList.remove("hide");
            con.classList.add("hide");
            questionGenerator();
        }
        
    }
    // If user input is empty
    else {
        errormessage.classList.remove("hide");
        errormessage.innerHTML = "input cannot be empty..";

    }
    
});

// submitbtn.addEventListener("click", () => {
//     errormessage.classList.remove("hide");
//     let userInput = document.getElementById("inputValue").value;

//     // If user input is not empty
//     if (userInput) {
//         // If user guessed correct output
//         if (userInput == answerValue) {
//             stopgame(`Yippie!! <span>Correct${winCount} and NotCorrect${lossCount}</span> Answer`);
//         }
//         // If user inputes operator other than+,-
//         else if (operatorsQuestion && !operators.includes(userInput)) {
//             errormessage.classList.remove("hide");
//             errormessage.innerHTML = "please enter correct operator..!";

//         }
//         // If user guessed wrong answer
//         else {
//             stopgame(`Opps!!<span>Wrong</span> Answer`);
//         }
//     }
//     // If user input is empty
//     else {
//         errormessage.classList.remove("hide");
//         errormessage.innerHTML = "input cannot be empty..";

//     }
// });

submitbtn.addEventListener("click", () => {
    if(winCount >= 4){
        stopgame(`<span>Yippie!! You won <br>Correct = ${winCount}, InCorrect = ${lossCount}</span> Answer`);
    }else{
        stopgame(`<span>Opps!! You Loss <br>Correct = ${winCount}, InCorrect = ${lossCount}</span> Answer`);
    }
});

stopbtn.addEventListener("click",stopgame =  (resultText) => {
    con.classList.remove("hide");
    results.innerHTML = resultText;
    startbtn.innerText = "Restart";
    startbtn.classList.remove("hide");
    controls.classList.remove("hide");}
);

// Stop Game
// const stopgame = (resultText) => {
//     con.classList.remove("hide");
    
//     results.innerHTML = resultText;
//     startbtn.innerText = "Restart";
//     startbtn.classList.remove("hide");
//     controls.classList.remove("hide");
// };

