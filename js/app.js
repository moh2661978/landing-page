/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// navigation global var
const navigation = document.getElementById('navbar__list');
// sections global var
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 */


//Get the go to the top button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 40px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * Begin Main Functions
 * 
*/


// build the nav

const navBuilder = () => {

    let navUI = '';
    let firstLink = true;

    // looping over all sections
    sections.forEach(section => {

        const sectionID = section.id;
        const sectionDataNav = section.dataset.nav;

        navUI += `<li>
        <a href="#${sectionID}" class="menu__link">
        ${sectionDataNav}
        </a>
        </li>`;

    });
    // append all elements to the navigation
    navigation.innerHTML = navUI;

};

navBuilder();

// Add class 'active' to section when near top of viewport
// Get element's position in the viewport
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// remove the active class
const removeActive = (section) => {
    section.classList.remove('your-active-class');
    section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};

// adding the active class with a green background color
const addActive = (conditional, section) => {
    if (conditional) {
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: lightblue;";
    };
};

//implementating the actual section activation function
const sectionActivation = () => {
    // Will loop on all the sections
    sections.forEach(section => {
        const elementOffset = offset(section);
        // work on the condition to add active function
        inviewport = () => elementOffset < 300 && elementOffset >= -300;

        removeActive(section);
        addActive(inviewport(), section);
    });
};
// add eventlisner so when ever scroll the function get implemented
window.addEventListener('scroll', sectionActivation);

// Scroll to anchor ID using scrollTO event
const scrolling = () => {

    const links = document.querySelectorAll('.navbar__menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            for (i = 0; i < sections; i++) {
                sections[i].addEventListener("click", sectionScroll(link));
            }
        });
    });

};

scrolling();


/**
 * End Main Functions
 *
*/
