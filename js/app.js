// build the nav

/* Strategy:
get the navbar list by ID & get the sections by querySelectAll to allow me loop in the return array and then pull out the data to li in the navbar list by: assign the array of sections to li and creat li in navbar
append the sections to the li and add the newly created element and its content into the DOM */
const menu = document.getElementById('navbar__list'); // ul inside nav tag
const sections = document.querySelectorAll('section'); // all section tag
// building the navbar
function buildMenuBar() {
    // initialize an li variable to put it later in the navigation to manipulate the loop list of sections names into it and using let for mutating the array
    let navList = document.createElement('li');
    //let firstSecLink = true;
    // looping over all sections by the method array.forEach(element => {...}); getting help from the next urls:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    //https://stackoverflow.com/questions/41085068/how-to-select-all-links-inside-of-nav-element
    //https://api.jquery.com/children/

    sections.forEach((section) => {
        // get the section id
        const secid = section.getAttribute('id');
        // get the sections dataset Attribute
        const secDataNav = section.getAttribute('data-nav');
        // looping in navList = navList + li + anchor every section name and id
        navList += `<a href='#${secid}' class='menu__link'${secDataNav}>${secDataNav}</a>`;

        // Manipulating the DOM by appending all sections titles to the navigation in a dynamic way
        menu.innerHTML = navList;
    });
};
buildMenuBar();

//Building the go to the top button:
//https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
mybutton = document.getElementById('myBtn');

// When the user scrolls down 40px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// call the function When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// Add class 'active' to section when near top of viewport
//Start building the active class

/*As a start, we’ll listen for the 'scroll' event on the document to request the current scrollY position each time the user scrolls. I found that every 300 px the top of section get appeared
just helper function
*/
document.addEventListener('scroll', () => {
    document.documentElement.dataset.scroll = window.scrollY;
});
/*to use the getBoundingClientRect method I will creat a variable to store back the dom rect object which will be returned to me
getting the section position in the window
to know an element's position after it transformed by CSS, or even still in transition animation, it is the best choice (maybe the only way).
*/
// start by return the top rect and determine the position of the section in the viewport
const secRect = (section) => {
    return section.getBoundingClientRect().top;
};
// remove the active class because of section 1 is by default has this class
const classRemove = (section) => {
    //remove the active class styling state
    section.classList.remove('your-active-class');
    //adding style to the all non active sections
    section.style.add = ('section.your-active-class');
};

// adding the active class with a green background color
const classAdd = (isInView, section) => {
    if (isInView) {
        //remove the active class styling state
        section.classList.add('your-active-class');
        //adding style to the active section
        section.style.add = ('section.your-active-class');
    }
};

//Manipulating the dom to set the active section function by looping over the sections
const setBounding = () => {
    // I Will loop on all the sections
    sections.forEach(section => {
        //creating a variable to hold the returning top Rect from the previous function
        const secReturn = secRect(section);
        // Ask if is in view to allow adding the active section function
        isInView = () => secReturn < 300 && secReturn >= -300;
        // remove from the previuos section
        classRemove(section);
        // add to the next section
        classAdd(isInView(), section);
    });
};

// add eventlisner to scroll so that the function get implemented
window.addEventListener('scroll', setBounding);
