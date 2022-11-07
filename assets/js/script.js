/* File: assets/js/script.js */
import { root, qs, css, getRandomInt, lottery, html, ce } from "./library.js";

const QUESTIONS_PER_QUIZ = 10;
const OPTIONS_PER_QUESTION = 4;
const QUIZ_DATA_URL = './assets/data/quiz-data.json';

// TODO: Time limit stuff

function displayQuestion(){}

function displayAllQuestions(){};

/**
 * @function readQuizData
 * @description read the JSON file that has the quiz questions to generate a quiz.
 * Note: Because the JSON file is external, this function is asynchronous. 
 */
async function readQuizData(){
    //const reqURL    = './assets/data/quiz-data.json';
    //const req       = new Request(reqURL);
    const req       = new Request(QUIZ_DATA_URL);   // request
    const res       = await fetch(req);             // response (using the fetch API!)
    const questions = await res.json();
    // console.log(questions);
    //console.log(questions.length);    // 50

    const gameboard = qs("#gameboard");
    const deck   = qs("#deck");
    const tabbar = qs("#tabbar");
    //testing.innerHTML = questions;

    const a_prefixes = ["A","B","C","D"];

    // randomly pick 10 questions
    let pick = lottery(QUESTIONS_PER_QUIZ,questions.length);
    //console.log(pick);           // Show which questions we are using


    //const quiz = ce("dl");      // TODO: This needs to be some form object later

    //testing.append(quiz);
    for(let i = 0; i < pick.length; i++){
        let qtab   = ce("div",{"class":"tab"});      // The tab that will go in the bottom-center
        let qpanel = ce("div",{"class":"panel"});    // the panel that will go in the card-body

        // Display our question        
        let qidx  = pick[i];                                        // question index
        let qp    = ce("p",{"class":"question"});                   // question element
        let qtext = questions[qidx].question;                       // question text
        let qnum  = `${i+1}`;                                       // question number.
        html(qtab)(qnum);                                           // use this prefix in our tab.
        tabbar.append(qtab);                                        // Add our new tab to the tabbar.
        html(qp)(`${qnum}. ${qtext}`);                              // use our number as a prefix with our question in our question element.
        // console.log(qp);
        qpanel.append(qp);                                           // Add our question to our panel.

        // get  our options
        let qoptions = ce("div",{"class":"options"});
        let qopts  = questions[qidx].options;                         // Our array of options
        let qorder = lottery(OPTIONS_PER_QUESTION,qopts.length);    // Randomize the order of our options.  (TODO: could we have used Array.shuffle?)
        //console.log(qorder);                                      // Show the order of those options. 
        for(let j = 0; j < qorder.length; j++){
            let oprefix = a_prefixes[j];                            // Our option prefix
            let oidx    = qorder[j];                                // Option index
            let option  = qopts[oidx].answer;                      // Option text
            let correct = qopts[oidx].isCorrect;                   // Better make sure this stays together with the previous variable.
            let oid     = `q${qnum}a${oprefix}`;                    // We need an id for our label
            let oname   = `q${qnum}`                                // Each set of radio button should share the same name
            let oradio  = ce("input",{
                "type":"radio",
                "id": oid,
                "name": oname,
                "value" : `${correct}`
            });
            let olabel  = ce("label",{"for":oid});
            html(olabel)(`${oprefix}. ${option}`);
            //console.log(olabel);
            //qoptions.append(oradio,olabel,"<br/>");
            qoptions.append(oradio,olabel,ce("br"));
            //console.log(qoptions);
        }
        qpanel.append(qoptions);

        console.log(qpanel);
        deck.append(qpanel);

        // TODO: once an item is selected, no backsies! Disable the buttons, report if it was right or wrong
        // TODO: Need backward and forward buttons

        //for(let j = 0; j < question[i].options.length; j++)
    }
    


}

readQuizData();

function shuffleOptions(){
    // for each questions, shuffle around the possible answers
    // There will be three answers that are wrong, and one answer that is right.
    // The right answer adds points
    // The wrong answer deducts time
    // To make sure that the right answer is always the correct answer, the answer with the right answer should have an isCorrect value of true
}


function pickOneQuestion(){}{
    // randomly pick a question
}

function pick10Questions(){
    // randomly pick 10 unique questions
    // no question should be drawn twice!
    // Build a queue
    // Wish list: if run out of questions, pick another question so as long it wasn't any of the questions in the queue.
}

function initClock(){}

function isTimeZero(){}

function addPoints(){}
function subTime(){}
// function skipQuestion(){}  // Skip a question, but come back and answer it later. Wish List Item

function playGame(){}

function displayScore(){}

function gameOver(){}
function gameWin(){}

function displayHighScores(){}

function sortByInitials(){}
function sortByHighestScores(){}
function sortByLowestTime(){}