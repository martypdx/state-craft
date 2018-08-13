import html from '/js/libs/html.js';

import Header from '../header.js';
import Footer from '../components/footer.js';

import NationCreator from '../components/nation-creator.js';
import nationApi from '/js/services/nation-api.js';

let template = function() {
    return html`

    <main> Hello World</main>
        
   `;
};

export default class App {
    constructor() {
        this.nation = nationApi.get();

       
    }

    render() {

        let dom = template();
        let main = dom.querySelector('main');
        let footer = new Footer;

        this.header = dom.querySelector('header');
        let appHeader = new Header({});
        this.header.appendChild(appHeader.render());

        console.log('in app.js', this.nation);

        let nationCreator = new NationCreator({
            test: 'i a prop',
        });

        
        main.appendChild(nationCreator.render());
        main.appendChild(footer.render());
        return dom;
    }
}