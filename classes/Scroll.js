export default class Scroll {
    constructor(document, menu) {
        this.document = document;
        this.menu = menu;

        this.document.addEventListener('click', (e) => {
            const buttonSection = e.target.dataset.sectionId;
            if (buttonSection) {
                scrollSection(buttonSection);
            };
        });

        const scrollSection = (id) => {
            const section = document.getElementById(id);
            section.scrollIntoView(top);
        };
    };

    scrollFix(menu, fix) {
        if (window.scrollY > fix) {
            menu.classList.add('sticked');
        } else {
            menu.classList.remove('sticked');
        };
    };

}