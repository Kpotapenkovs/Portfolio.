const revealItems = document.querySelectorAll('.reveal');
const imagePreviews = document.querySelectorAll('.image-preview');

const viewSections = document.querySelectorAll('.view-section');
const sectionLinks = document.querySelectorAll('.site-header a[href^="#"]');

const showSection = (sectionId) => {
  const requestedSection = sectionId === 'top' ? '#home' : sectionId;
  const selectedSection = document.querySelector(requestedSection);
  if (!selectedSection) return;

  viewSections.forEach((section) => {
    const isSelected = section === selectedSection;
    section.classList.toggle('is-active', isSelected);
    section.classList.toggle('is-hidden', section.id === 'home' && !isSelected);
  });

  sectionLinks.forEach((link) => {
    const selectedHash = selectedSection.id === 'home' ? '#top' : `#${selectedSection.id}`;
    link.toggleAttribute('aria-current', link.getAttribute('href') === selectedHash);
  });
};

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const rawHref = link.getAttribute('href');
    const targetId = rawHref === '#top' ? 'top' : rawHref;
    const selectedSection = document.querySelector(targetId === 'top' ? '#home' : targetId);

    if (selectedSection && selectedSection.classList.contains('is-active')) {
      showSection('top');
      sectionLinks.forEach((navigationLink) => navigationLink.removeAttribute('aria-current'));
      history.replaceState(null, '', '#top');
      return;
    }

    showSection(targetId);
    history.replaceState(null, '', rawHref);
  });
});

showSection('top');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const lightbox = document.createElement('div');
lightbox.className = 'image-lightbox';
lightbox.hidden = true;
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Aizvērt attēlu">&times;</button><img alt="" />';
document.body.append(lightbox);

const lightboxImage = lightbox.querySelector('img');
const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = '';
};

imagePreviews.forEach((preview) => {
  preview.addEventListener('click', (event) => {
    event.preventDefault();
    const image = preview.querySelector('img');
    lightboxImage.src = preview.href;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-close')) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = 'Thanks - your note is ready for its next chapter.';
    event.currentTarget.reset();
  });
}
