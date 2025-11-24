// Theme toggle: remember preference and apply immediately
(function(){
	const toggle = document.getElementById('theme-toggle');
	const html = document.documentElement;

	function getPreferred(){
		const stored = localStorage.getItem('theme');
		if(stored) return stored === 'dark';
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function apply(dark){
		if(dark) html.setAttribute('data-theme','dark');
		else html.removeAttribute('data-theme');
		if(toggle){
			toggle.textContent = dark ? '☀️' : '🌙';
			toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
		}
	}

	// initial
	apply(getPreferred());

	if(toggle){
		toggle.addEventListener('click', ()=>{
			const now = html.getAttribute('data-theme') === 'dark';
			apply(!now);
			localStorage.setItem('theme', !now ? 'dark' : 'light');
		});
	}
})();

// Smooth scroll and active nav highlighting
(function(){
	const navLinks = Array.from(document.querySelectorAll('.main-nav a.nav-link'));
	const sections = navLinks.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);

	// Click handler: use smooth scroll and update aria
	navLinks.forEach(a => {
		a.addEventListener('click', (e)=>{
			const id = a.getAttribute('href').slice(1);
			const el = document.getElementById(id);
			if(el){
				e.preventDefault();
				el.scrollIntoView({behavior:'smooth', block:'start'});
				history.replaceState(null,'', '#'+id);
			}
		});
	});

	// IntersectionObserver for section in view
	const observer = new IntersectionObserver((entries)=>{
		entries.forEach(entry => {
			const id = entry.target.id;
			const link = document.querySelector('.main-nav a[href="#'+id+'"]');
			if(entry.isIntersecting){
				navLinks.forEach(n=>n.classList.remove('active'));
				if(link) link.classList.add('active');
			}
		});
	},{root:null,rootMargin:'-20% 0px -55% 0px',threshold:0});

	sections.forEach(s => observer.observe(s));
})();
