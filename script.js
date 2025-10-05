// Theme handling
(function themeInit() {
	var html = document.documentElement;
	var saved = localStorage.getItem('tm-theme');
	if (saved === 'light' || saved === 'dark') {
		html.setAttribute('data-theme', saved);
	} else {
		html.setAttribute('data-theme', 'auto');
	}
})();

(function main() {
	var themeToggle = document.getElementById('themeToggle');
	var menuToggle = document.getElementById('menuToggle');
	var mobileMenu = document.getElementById('mobileMenu');
	var yearEl = document.getElementById('year');
	var form = document.getElementById('contactForm');
	var toast = document.getElementById('toast');

	// Update year
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	// Theme toggle
	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			var html = document.documentElement;
			var current = html.getAttribute('data-theme');
			var next = current === 'dark' ? 'light' : 'dark';
			if (current === 'auto') {
				// Default to dark on first toggle if system is light, else light
				next = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
			}
			html.setAttribute('data-theme', next);
			localStorage.setItem('tm-theme', next);
		});
	}

	// Mobile menu
	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', function () {
			mobileMenu.classList.toggle('open');
		});
		mobileMenu.querySelectorAll('a').forEach(function (a) {
			a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
		});
	}

	// Smooth scroll for in-page links
	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener('click', function (e) {
			var id = this.getAttribute('href').slice(1);
			var el = document.getElementById(id);
			if (el) {
				e.preventDefault();
				el.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Contact form validation + fake submit
	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var name = document.getElementById('name');
			var email = document.getElementById('email');
			var message = document.getElementById('message');

			var valid = true;
			clearError('name');
			clearError('email');
			clearError('message');

			if (!name.value.trim()) { setError('name', 'Please enter your name.'); valid = false; }
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setError('email', 'Please enter a valid email.'); valid = false; }
			if (!message.value.trim()) { setError('message', 'Please enter a message.'); valid = false; }

			if (!valid) return;

			// Simulate submission
			setTimeout(function () {
				showToast('Thanks! We\'ll get back to you soon.');
				form.reset();
			}, 400);
		});
	}

	function setError(field, text) {
		var small = document.querySelector('.error[data-for="' + field + '"]');
		if (small) small.textContent = text;
	}
	function clearError(field) {
		var small = document.querySelector('.error[data-for="' + field + '"]');
		if (small) small.textContent = '';
	}
	function showToast(text) {
		if (!toast) return;
		toast.textContent = text;
		toast.classList.add('show');
		setTimeout(function () { toast.classList.remove('show'); }, 2600);
	}
})();
