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

