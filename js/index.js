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

gsap.registerPlugin(ScrollTrigger)

document.querySelectorAll(".animate-text").forEach((item) => {

	const cahars = item.textContent.split("");
	item.innerHTML = cahars.map(word => `<span class="char">${word}</span>`).join(" ");
	const char = item.querySelectorAll(".char");
	const outEl = item.parentElement;

	char.forEach((c, index) => {
		gsap.to(c, {
			scrollTrigger: {
				trigger: item, // Trigger the animation when this container enters the viewport
				start: "top 90%",           // Start animation when the container's top is 80% down the viewport
				end: "bottom 20%",          // End animation when the container's bottom is 20% down the viewport
				scrub: true,                // Smooth scrubbing effect
			},
				opacity: 1,                   // Make the words fully visible
				filter: 'blur(0px) brightness(100%)',	
				y: 0,                         // Move the words back to their original position
				stagger: 0.1 * index,                 // Delay between animations of each word
				duration: 1 ,                // Duration of the animation for each word
				delay : 0.1 * index,
		});
	})
});

document.querySelectorAll('.animated-img').forEach((item) => {

	const outEl = item.parentElement

	console.log(item);
	
	gsap.to(item, {
		width: item.dataset.width, 
		height: item.dataset.height,  
		duration: 1,
		stagger: 0.1,
		scrollTrigger: {
			trigger: outEl, // Trigger the animation when this container enters the viewport
			start: "top 80%",           // Start animation when the container's top is 80% down the viewport
			end: "bottom 0%",          // End animation when the container's bottom is 20% down the viewport
			scrub: true,                // Smooth scrubbing effect
		},
	});
})





