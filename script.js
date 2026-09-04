const revealItems = document.querySelectorAll('.reveal');

const viewSections = document.querySelectorAll('.view-section');
const sectionLinks = document.querySelectorAll('.site-header a[href^="#"]');

const showSection = (sectionId) => {
  const selectedSection = document.querySelector(sectionId === 'top' ? '#home' : sectionId);
  if (!selectedSection) return;

  viewSections.forEach((section) => {
    section.classList.toggle('is-active', section === selectedSection);
  });

  sectionLinks.forEach((link) => {
    const selectedHash = selectedSection.id === 'home' ? '#top' : `#${selectedSection.id}`;
    link.toggleAttribute('aria-current', link.getAttribute('href') === selectedHash);
  });
};

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('href').slice(1);
    showSection(sectionId === 'top' ? 'top' : `#${sectionId}`);
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

showSection(window.location.hash ? window.location.hash : 'top');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = 'Thanks - your note is ready for its next chapter.';
    event.currentTarget.reset();
  });
}
