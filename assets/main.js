
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('nav .right');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navRight.classList.toggle('show');
  });

  // --- Cookie Acceptor Logic ---

const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies-btn');

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// 1. Check for existing consent on page load
if (getCookie("laxmi_cookie_consent") === "accepted") {
    cookieBanner.classList.add('hidden');
} else {
    cookieBanner.classList.remove('hidden'); // Ensure it's visible if no consent
}

// 2. Handle button click
acceptBtn.addEventListener('click', () => {
    // Set cookie for 365 days
    setCookie("laxmi_cookie_consent", "accepted", 365); 
    cookieBanner.classList.add('hidden');
    
    // NOTE: This is where you would enable your analytics scripts (e.g., Google Analytics)
    // For now, it just hides the banner.
});


// --- Modal Viewer Logic (Add to your existing <script> block) ---

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('modal-caption');
const closeBtn = document.querySelector('.close-btn');

// Get all project images
const projectCards = document.querySelectorAll('#projects .card');

projectCards.forEach(card => {
    const img = card.querySelector('img');
    const caption = card.querySelector('.info h3').textContent;

    // Attach click listener to the entire card
    card.addEventListener('click', () => {
        // Only trigger the modal if the image is the target (to prevent link clicks from breaking)
        if (event.target === img) {
            modal.style.display = "flex"; // Use flex to center the content
            modalImg.src = img.src;
            captionText.innerHTML = caption;
            document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        }
    });
});

// Close modal when the 'x' button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when the user clicks anywhere outside of the image/caption
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Restore scrolling
    }
});

    // Clears all forms on the page just before the user leaves it.
    window.onbeforeunload = () => {
        // Find every form element on the page
        const forms = document.getElementsByTagName('form');
        
        // Loop through and reset each one
        for (const form of forms) {
            form.reset();
        }
    };