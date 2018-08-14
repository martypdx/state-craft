


import html from '../libs/html.js';
  
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';

import Question from '../components/question.js';
import questionApi from '../services/question-api.js';

import NationDisplay from '../components/nation-display.js';
import nationApi from '../services/nation-api.js';

let template = function() {
    return html`
    <header></header>
    <main>
        <h2>Answer a question!</h2>
        <section class="question"></section>
        
        <section class="nation-display"></section>
    </main>
    <footer></footer>
   `;
};

export default class App {
    constructor() {
        this.questions = questionApi.getAll();
        this.nation = nationApi.get();
        console.log('nations showing', this.nation);
    }

    render() {

        let dom = template();

        let head = dom.querySelector('header');
        let foot = dom.querySelector('footer');
        let header = new Header;
        let footer = new Footer;
        head.appendChild(header.render());
        foot.appendChild(footer.render());


        let qvar = this.questions[this.nation.question];
        let questionSection = dom.querySelector('.question');
        let question = new Question({
        
            
            question: qvar,

            handleAnswer: () => {

                this.nation.question++;
                if(this.nation.question < 10){
                    console.log('questionSection', questionSection.length); 
                    while(questionSection.lastElementChild) {
                        questionSection.lastElementChild.remove();
                    }
                    console.log(this.nation.question);
                    qvar = this.questions[this.nation.question];
                    questionSection.appendChild(question.render());
                }
                else {
                    window.location.replace("/pages/results.html");
                }
            }
        });

        function warning(){
            return html`
                <p>You've already answered all of the questions!</p>
                <p>Dev note: run resetNation() in the console to be able to play again</p>
            `;
        }     
        if(this.nation.question < 10) {
            questionSection.appendChild(question.render());
        }
        else {
            questionSection.appendChild(warning());
        }
        
        let nationSection = dom.querySelector('.nation-display');
        let nationDisplay = new NationDisplay({
            nation: this.nation
        });
        nationSection.appendChild(nationDisplay.render());

        return dom;
    }
}

