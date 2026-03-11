document.addEventListener('DOMContentLoaded', function () {

  // ─── Contact config ──────────────────────────────────────
  const siteContact = {
    email: 'malakakatlego67@gmail.com',
    phone: '+27 76 913 5144',
    linkedin: 'https://linkedin.com/in/katlego-jeffrey-malaka-820a8726a',
    github: 'https://github.com/KJMalaka',
    location: 'Cape Town, South Africa',
    status: 'Available for WIL Placement'
  };

  // ─── Copy to clipboard ───────────────────────────────────
  window.copyToClipboard = async function (textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      const btn = document.querySelector(`.copy-btn[onclick*="${textToCopy}"]`);
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.width = `${btn.offsetWidth}px`;
        setTimeout(() => { btn.textContent = originalText; btn.style.width = ''; }, 1800);
      }
    } catch (err) {
      prompt('Could not automatically copy. Please copy manually:', textToCopy);
    }
  };

  // ─── Wire profile card CTAs ──────────────────────────────
  const profileEmailCta = document.querySelector('.profile-card a[href^="mailto"]');
  const profileLinkedInCta = document.querySelector('.profile-card a[href*="linkedin"]');
  if (profileEmailCta) profileEmailCta.setAttribute('href', 'mailto:' + siteContact.email);
  if (profileLinkedInCta) profileLinkedInCta.setAttribute('href', siteContact.linkedin);

  // ─── Contact form — mailto fallback ─────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const subject = form.querySelector('[name="subject"]').value;
      const message = form.querySelector('[name="message"]').value;
      const mailto = `mailto:malakakatlego67@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hi Katlego,\n\n' + message + '\n\n— ' + name)}`;
      window.location.href = mailto;
    });
  }

  // ─── Project Filtering ───────────────────────────────────
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allProjects = document.querySelectorAll('.project');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      allProjects.forEach(project => {
        project.style.display = (filter === 'all' || project.dataset.category === filter) ? 'flex' : 'none';
      });
    });
  });

  // ─── Theme Toggle ────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', currentTheme);
  themeToggle.innerHTML = currentTheme === 'light' ? '&#x1F31E;' : '&#x1F31A;';

  themeToggle.addEventListener('click', () => {
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'light' ? '&#x1F31E;' : '&#x1F31A;';
  });

  // ─── Stats animation on scroll ───────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease';
    statObserver.observe(stat);
  });

  // ─── Skill tag stagger animation on scroll ───────────────
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(8px)';
    tag.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
  });

  const skillsSection = document.querySelector('.skills-proficiency');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillTags.forEach(tag => { tag.style.opacity = '1'; tag.style.transform = 'translateY(0)'; });
          skillsObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });
    skillsObserver.observe(skillsSection);
  }

  // ─── Project links — open valid ones in new tab ──────────
  document.querySelectorAll('.project-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.trim() !== '#') {
      a.setAttribute('target', '_blank');
    } else {
      a.addEventListener('click', e => {
        e.preventDefault();
        alert('Demo link not yet set — check GitHub for the code.');
      });
    }
  });

  // ─── Smooth scrolling ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Page load fade-in ───────────────────────────────────
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  console.log('Portfolio loaded ✨ — KJMalaka');
});