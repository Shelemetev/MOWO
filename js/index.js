const body = document.querySelector('.body');
const bck = document.querySelector('.dark-back');

window.addEventListener('scroll', () => {
    const rect = body.getBoundingClientRect();
    const scrollProgress = ((-rect.top + window.innerHeight) / body.offsetHeight);

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
		lerp: 0.06, // Lower values create a smoother scroll effect
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

	ScrollTrigger.refresh();

	const cahars = item.textContent.split("");
	item.innerHTML = cahars.map(word => `<span class="char">${word}</span>`).join(" ");
	const char = item.querySelectorAll(".char");
	const outEl = item.parentElement;

	gsap.to(char, {
		scrollTrigger: {
			trigger: item, // Trigger the animation when this container enters the viewport
			start: "top 20%",           // Start animation when the container's top is 80% down the viewport
			end: "bottom 10%",          // End animation when the container's bottom is 20% down the viewport
			scrub: true,                // Smooth scrubbing effect
			markers: true
		},
			opacity: 1,                   // Make the words fully visible
			filter: 'blur(15px) brightness(0%)',	
			y: 0,                         // Move the words back to their original position
			stagger: 0.5,                 // Delay between animations of each word
			duration: 1 ,  
	});

});

document.querySelectorAll('.animated-img').forEach((item) => {

	const outEl = item.parentElement

	ScrollTrigger.refresh();
	
	gsap.to(item, {
		width: item.dataset.width, 
		height: item.dataset.height,  
		duration: 1,
		delay: 1,
		stagger: 0.1,
		scrollTrigger: {
			trigger: item, // Trigger the animation when this container enters the viewport
			start: 'top 100%',           // Start animation when the container's top is 80% down the viewport
			end: "bottom 65%",          // End animation when the container's bottom is 20% down the viewport
			scrub: 0.5,    
		},
	});
})


gsap.to('.horizontal-section', {
	x: '-100%', // Смещение на 200% ширины экрана
	ease: 'none',
	scrollTrigger: {
		trigger: '.horizontal-container',
		start: 'top 20%',
		end: '+=300%', // Длина горизонтальной секции
		scrub: 1, // Плавный скролл
		pin: true, // Фиксация секции,
		onRefresh: () => {
            console.log('ScrollTrigger refreshed');
        }
	},
});

window.addEventListener('scroll', () => {
	console.log(window.scrollY);
    if (window.scrollY > 100) { // Если пользователь прокручивает вверх
        ScrollTrigger.refresh(); // Обновляем ScrollTrigger
    }
});