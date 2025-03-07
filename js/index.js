const body = document.querySelector('.body');
const bck = document.querySelector('.dark-back');

window.addEventListener('scroll', () => {
    const rect = body.getBoundingClientRect();
    const scrollProgress = ((-rect.top + window.innerHeight) / body.offsetHeight);

    console.log(scrollProgress);

    if (scrollProgress > 0) {
        // Изменяем прозрачность фона
        bck.style.backgroundColor = `rgba(0, 0, 0, ${scrollProgress})`;
    }
    
});

const header = document.querySelector('.header')

var oldScrollY = 0;

window.addEventListener('scroll', function(){
	

	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var dY = scrolled - oldScrollY;

	
	if ( dY > 0 ){
	  	header.classList.add('header--hidden');
	} else {
		header.classList.remove('header--hidden');
	}
	
	oldScrollY = scrolled;
});

// Variable to store the Lenis smooth scrolling object
let lenis;

// Initializes Lenis for smooth scrolling with specific properties
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.05, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

initSmoothScrolling()

const animateText = Array.of(document.querySelectorAll(".animate-text"));

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".animate-text").forEach((item) => {
	const words = item.textContent.split(" ");
	item.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
	const word = item.querySelectorAll(".word");

	word.forEach((section) => {


		gsap.to(section, {
			scrollTrigger: {
			  trigger: item,
			  start: "top 60%",
			  end: "bottom 40%",
			  scrub: true,
			},
			filter: 'blur(0px) brightness(100%)',
			y: 0,
			stagger: 0.1,
			duration: 0.5
		  });
		
	})
})




