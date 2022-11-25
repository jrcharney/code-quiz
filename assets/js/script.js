/* File: assets/js/script.js */
import { root, qs, css, getRandomInt, lottery, html, ce } from "./library.js";

const QUESTIONS_PER_QUIZ = 10;
const OPTIONS_PER_QUESTION = 4;
const QUIZ_DATA_URL = './assets/data/quiz-data.json';

// TODO: Time limit stuff

function displayQuestion(){}

function displayAllQuestions(){};

function questionTab(num,text){
    return html(ce("div",{
        "id" : `tab_${num}`,
        "class":"tab"
    }))((text === undefined) ? num : text);     // use number if there is no text
}

function questionPanel(num){
    return ce("div",{
        "id": `panel_${num}`,
        "class":"panel"
    });
}

function questionText(text){
        //let qp    = ce("p",{"class":"question"});                   // question element
        //let qtext = questions[qidx].question;                       // question text
        //html(qp)(`${qnum}. ${qtext}`);                              // use our number as a prefix with our question in our question element. (We don't do that here)
        return html(ce("p",{"class":"question"}))(text);        
}

function radioButton(id,name,value){
    return ce("input",{
        "type":"radio",
        "id": id,
        "name": name,
        "value" : value
    });
}

function radioLabel(id,text){
    //let olabel  = ce("label",{"for":oid});
    //html(olabel)(`${oprefix}. ${option}`);
    return html(ce("label",{"for":id}))(`${text}`);     // This does what those previous two lies does
}

function clickButton(id,text,title){
    return html(ce("button",{
        "title" : title,
        "id" : id
    }))(text);
}

/**
 * @function readQuizData
 * @description read the JSON file that has the quiz questions to generate a quiz.
 * Note: Because the JSON file is external, this function is asynchronous. 
 */
async function readQuizData(){
    //const reqURL    = './assets/data/quiz-data.json';
    //const req       = new Request(reqURL);
    //const req       = new Request(QUIZ_DATA_URL);   // request
    //const res       = await fetch(req);             // response (using the fetch API!)
    const res = await fetch(QUIZ_DATA_URL);
    const questions = await res.json();
    // console.log(questions);
    //console.log(questions.length);    // 50

    const gameboard = qs("#gameboard");
    const deck   = qs("#deck");             // where our questions will go
    const tabbar = qs("#tabbar");           // Where our tabs will go
    //testing.innerHTML = questions;

    const a_prefixes = ["A","B","C","D"];

    // randomly pick 10 questions
    let pick = lottery(QUESTIONS_PER_QUIZ,questions.length);
    //console.log(pick);           // Show which questions we are using

    let answers = new Array(QUESTIONS_PER_QUIZ);  // Let's track the users answers with an array size
    console.log(answers);       // Arraay of 10 empty slots

    let radioEvents = ["input","change"];

    for(let i = 0; i < pick.length; i++){
        let qnum   = `${i+1}`;                                       // question number.
        let qtab   = questionTab(qnum);         // The tab that will go in the bottom-center
        let qpanel = questionPanel(qnum);       // the panel that will go in the card-body
        
        // Display our question        
        let qidx  = pick[i];                                        // question index
        let qp = questionText(`${qnum}. ${questions[qidx].question}`);  // question element with text
        
        tabbar.append(qtab);                                        // Add our new tab to the tabbar.
        qpanel.append(qp);                                           // Add our question to our panel.

        // get  our options
        let qoptions = ce("div",{"class":"options"});
        let qopts  = questions[qidx].options;                         // Our array of options
        let qorder = lottery(OPTIONS_PER_QUESTION,qopts.length);    // Randomize the order of our options.  (TODO: could we have used Array.shuffle?)
        //console.log(qorder);                                      // Show the order of those options. 
        let oname   = `q${qnum}`;                                // Each set of radio button should share the same name
        
        // let answer;  // This variable is problematic. Let's try individual answers instead.
        // answers[i]

        // We defined qanswer here so oradio know what is is ahead of time.
        let qanswer = clickButton(`btn_${oname}`,"Select Answer","Is that your final answer?");
        qanswer.disabled = true;        // Prevent submitting an undefined answer. (Use this to disable/enable form elements)
        
        //console.log(qorder.length); 4, times ten

        for(let j = 0; j < qorder.length; j++){
            let oprefix = a_prefixes[j];                            // Our option prefix
            let oidx    = qorder[j];                                // Option index
            let oid     = `q${qnum}a${oprefix}`;                    // We need an id for our label
            //let correct = qopts[oidx].isCorrect;                   // Better make sure this stays together with the previous variable.
            //let option  = qopts[oidx].answer;                      // Option text
            //let oradio  = radioButton(oid,oname,`${correct}`);      // Create our radio button with attributes
            //let olabel  = radioLabel(oid,`${oprefix}. ${option}`);  // Create the label for our radio button
            
            // Let's declutter some stuff
            let oradio  = radioButton(oid,oname,`${qopts[oidx].isCorrect}`);      // Create our radio button with attributes
            let olabel  = radioLabel(oid,`${oprefix}. ${qopts[oidx].answer}`);  // Create the label for our radio button
            //console.log(`oradio: ${oradio.name} ${oradio.id} ${oradio.value}`);       // this is correct

            // TODO: Should we move these radio events downcode?
            /*
            // Let's add our event listeners here for our radio buttons
            radioEvents.forEach((rev) => {      // and put it in a forEach so we don't have to type twice!
                oradio.addEventListener(rev, (ev) => {
                    //answers[i] = Boolean(ev.target.value);
                    //console.log(`${rev} ${qnum} ${oname} ${i} ${answers[i]}`);
                    //qanswer.setAttribute("disabled",false);       // Don't do this.
                    qanswer.disabled = false;       // enable the button when we have an answer
                });
            });
            */

            /* TODO: Think about using a join so we don't end with a br at the end. */
            //qoptions.append(oradio,olabel,"<br/>");       // nope (because append will treat "<br/>" as raw text)
            qoptions.append(oradio,olabel,ce("br"));        // yes! (because now we created a <br/> element)
            //console.log(qoptions);
        }
        //qpanel.append(qoptions);    // Write our options to the panel
        //qpanel.append(ce("br"));    // Let's stick a line break here.
        //qpanel.append(qanswer);     // Write our button to the panel.
        qpanel.append(qoptions,ce("br"),qanswer);   // One line version of the last three lines
        deck.append(qpanel);        // write our panel to teh deck.

        /* We had to move the above three lines to where they are, so that radios would return a NodeList WITH elements, otherwise they would not be recognzied in the DOM. */

        //console.log(oname);
        //console.log(document.getElementsByName(oname));
        let radios = document.getElementsByName(oname);
        console.log(radios);      // NodeList, but we don't want that
        //console.log(radios.forEach((radio) => {radio.id})); // undefined
        //console.log(Array.from(radios));    // works!

        radios.forEach((radio) => {
            // Let's add our event listeners here for our radio buttons
            radioEvents.forEach((rev) => {      // and put it in a forEach so we don't have to type twice!
                radio.addEventListener(rev, (ev) => {
                    //answers[i] = Boolean(ev.target.value);
                    //console.log(`${rev} ${qnum} ${oname} ${i} ${answers[i]}`);
                    //qanswer.setAttribute("disabled",false);       // Don't do this.
                    qanswer.disabled = false;       // enable the button when we have an answer
                });
            });
        });

        //console.log(radios.length); // 0?!
        //console.log(radios.forEach((radio) => {radio.id})); // undefined
        //console.log(Array.from(radios));    // empty array
        //console.log(radios.children);      // undefined
        //console.log(`radios ${radios instanceof NodeList}`);    // true, times 10
        // console.log(Array.from(radios.children));    // Nope!
        
        //Array.from(radios)
        radios.forEach((radio) => {
            console.log(`radios ${radio.name} ${radio.id} ${radio.value}`);     // radio.value is a STRING
        });
        
        radios.forEach((radio) => {console.log(radio.id);});

        //console.log(radios.map((radio) => radio.value));
        // So I have to pick the one that is "checked"

        qanswer.addEventListener("click", (ev) => {
            //let radios = document.getElementsByName(oname);
        
            console.log(`click ${qnum} ${oname} ${i} ${answers[i]}`);
            radios.forEach((radio) => {
                let value = Boolean(radio.value);   // needs to be converted to Boolean from string!
                // console.log(`value ${typeof value}`);   // boolean
                console.log(`value ${value}`);   // boolean
                //console.log(`${radio.nextSibling.innerHTML} ${value}`);
                if(radio.checked){
                    answers[i] = value; //Boolean(radio.value);      // this needs to be converted to boolean
                    console.log(`checked ${qnum} ${oname} ${i} ${answers[i]}`);
                }

                /*
                // This isn't ready yet
                let label = css(radio.nextSibling);  // should be the label element 
                //console.log(`isLabel ${radio.nextSibling instanceof HTMLLabelElement}`);
                //console.log(radio.nextSibling.innerHTML);
                if(value){
                    label("font-weight","bold");
                }else{
                    label("text-decoration-line","line-through");
                }
                */
            });
            console.log(answers);

            if(answers[i]){        // we have to be literal here, bc if answer is false, it still answers true?
                // Report correct answer! Add 10 points to score
                // Set tab icon to green check ✔️
                
                html(qtab)("✔️");
                console.log(`click right ${qnum} ${oname} ${i} ${answers[i]}`);
            }else{
                
                // Report incorrect answer: Deduct 10 seconds from time
                // Set tab icon to red x ❌
                html(qtab)("❌");
                console.log(`click wrong ${qnum} ${oname} ${i} ${answers[i]}`);
            }
            
            // Once answered, no do-overs!
            radios.forEach((radio) => {
                //radio.setAttribute("disabled",true);
                radio.disabled = true;
            });
            qanswer.disabled = true;
            

        });
    };

    /* Our tabs and panels now have events! */
    const tabs = Array.from(tabbar.children);
    const panels = Array.from(deck.children);

    // Mark the first tab selected
    //Array.from(tabbar.children)
    tabs.at(0).classList.add("selected");
    
    // Show the first question
    panels.forEach((panel,idx) => {
        if(idx !== 0){
            panel.classList.add("hide");
        }else{
            panel.classList.add("show");
        } 
        //console.log(`${idx} ${child.classList.contains("hide")}`);
    });

    // Setting events for tabs
    tabs.forEach((tab,idx) => {
        tab.addEventListener("click",(ev) => {
            //console.log(`${idx} clicked`);
            panels.forEach((panel, pidx) => {
                panel.classList.replace("show","hide");
                if(pidx === idx){
                    //console.log(`Panel ${pidx}`);
                    panel.classList.replace("hide","show");
                    tabs.forEach(t => t.classList.remove("selected"));
                    ev.target.classList.add("selected");
                }
            });
        });
    });

    // Previous Button
    qs("#btn_prev").addEventListener("click",(ev) => {
        //let active = tabs.findIndex((tab) => tab.classList.contains("selected"));
        let active = panels.findIndex((panel) => panel.classList.contains("show"));
        //console.log(`${active}`);
        //console.log(panels[active]);
        if(active > 0){
            //console.log(panels[active-1]);
            panels.at(active).classList.replace("show","hide");
            tabs.at(active).classList.remove("selected");
            panels.at(active-1).classList.replace("hide","show");
            tabs.at(active-1).classList.add("selected");
        }
    });

    // Next Button
    qs("#btn_next").addEventListener("click",(ev) => {
        //let active = tabs.findIndex((tab) => tab.classList.contains("selected"));
        let active = panels.findIndex((panel) => panel.classList.contains("show"));
        //console.log(`${active}`);
        //console.log(panels[active]);
        if(active < panels.length - 1){
            //console.log(panels[active+1]);
            panels.at(active).classList.replace("show","hide");
            tabs.at(active).classList.remove("selected");
            panels.at(active+1).classList.replace("hide","show");
            tabs.at(active+1).classList.add("selected");
        }
    });

    // TODO: We need events for the previous and forward buttons and for a button that shows up in the results

    // NOTE: Scores need to be stored in localStorage!
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