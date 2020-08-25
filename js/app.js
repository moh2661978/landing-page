// property of History interface allows web applications to explicitly set default scroll restoration behavior on history navigation
// https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration
/*window.history.scrollRestoration = 'manual';*/

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
    // looping over all sections by the method array.forEach(element => {...});

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


// Add ActiveClass to sections

/*
*Whenever the target meets a threshold specified for the IntersectionObserver, the callback is invoked. The callback receives a list of IntersectionObserverEntry objects and the observer:
*/

// function to use for callback in the intersection observer

const changeActiveSec = (entries, observer) => {
    entries.forEach((entry) => {
        // only do ActiveClass if the element is fully on screen
        if (entry.isIntersecting && entry.intersectionRatio == 1) {
            entry.target.classList.add('your-active-class');
        } else {
            entry.target.classList.remove('your-active-class');
        }
    });
}
/*
*Create the intersection observer by calling its constructor and passing it a callback function to be run whenever a threshold is crossed in one direction or the other:
*/

// create the observer 
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
    //A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
};
const observer = new IntersectionObserver(changeActiveSec, options);


// target the sections to be observed
sections.forEach((section) => {
    observer.observe(section);
});

