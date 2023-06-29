// =========== show menu =================
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    // Validate That variable exist
    if(toggle && nav){
        toggle.addEventListener('click', () =>{
            // add the show-menu class to the div tag with the nav-menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

// ============== Remove menu-mobile =============
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')

    // when we  click pn each nav-link, we remove the show menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click',linkAction))

// Scroll Section Active link
const sections = document.querySelectorAll('section[id]')

    function scrollActive(){
        const scrollY = window.pageYOffset

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop - 50;
            sectionId = current.getAttribute('id')

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
            }else{
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        })
    }
    window.addEventListener('scroll', scrollActive);

// ==================== show Crollbar Top =================
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the crollBar is higher than 560 viewport height, add the show-scroll class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop)

// ================== darkl light theme =================
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// previeus selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// obtain the current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Validate if user previeusly chose a topic
if (selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

//  Active /Desactive themes
themeButton.addEventListener('click', () => {
    // ADD OR REMOVE
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    // SAVE THE THEME
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// =========== Reduce teh size and print on sheet =========
function scaleCv(){
    document.body.classList.add('scale-cv')
}

// =========== Remove the size 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

// =========== Generate PDF =================
//  PDF AREA
let areaCV = document.getElementById('area-cv')

let resumeButton =  document.getElementById('resume-button')

// HTML2PDF OPTION
let opt = {
    margin:       0,
    filename:     'myResume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
    };

//  FUNCTION TO CALL AREA AND HTML2PDF OPTION
function generateResume(){
    html2pdf(areaCV, opt)
}

//  WHEN THE BUTTON IS CLICKED, IT EXECUTE THE THREE FUNCTION
resumeButton.addEventListener('click', () =>  {
    // a. the class scale-cv is added to the body
    scaleCv()
    // b. THE PDF IS GENERATED
    generateResume()

    // C. THE .SCALE-CV CLASS IS REMOVED FROM THE BODY AFTER 5SEC
    setTimeout(removeScale, 5000)
})