// Dynamic content rendering for Dr. Vardhman Jain website

document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    initServiceDetails();
    renderTestimonials();
    renderFacilities();
    renderAchievements();
    renderDoctorInfo();
    renderHospitalInfo();
    renderQuickLinks();
    initQueryForm();
});

// Render Services with Images
function renderServices() {
    const servicesGrid = document.querySelector('.services-grid');
    const featuredServicesGrid = document.querySelector('.featured-services-grid');
    if (!websiteData.services) return;

    const renderService = service => `
        <article class="service-card${service.featured ? ' service-card-featured' : ''}">
            <div class="service-image">
                <img src="${service.image}" alt="${service.title}">
            </div>
            ${service.featured ? '<span class="service-badge">Core speciality</span>' : ''}
            <div class="service-icon">
                <i class="fas fa-${getServiceIcon(service.icon)}"></i>
            </div>
            <h3>${service.featured
                ? `<button type="button" class="service-title-trigger" data-service-details="${service.icon}" aria-haspopup="dialog">${service.title}</button>`
                : service.title}</h3>
            <p>${service.description}</p>
            ${service.featured
                ? `<button type="button" class="service-link service-details-trigger" data-service-details="${service.icon}" aria-haspopup="dialog">View Details <i class="fas fa-arrow-right" aria-hidden="true"></i></button>`
                : '<a href="#contact" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>'}
        </article>
    `;

    const featuredServices = websiteData.services.filter(service => service.featured);
    const generalServices = websiteData.services.filter(service => !service.featured);

    if (featuredServicesGrid) {
        featuredServicesGrid.innerHTML = featuredServices.map(renderService).join('');
    }
    if (servicesGrid) {
        servicesGrid.innerHTML = generalServices.map(renderService).join('');
    }
}

function initServiceDetails() {
    const dialog = document.querySelector('.service-details-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    document.querySelectorAll('[data-service-details]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = dialog.querySelector(`[data-service-panel="${trigger.dataset.serviceDetails}"]`);
            if (!panel) return;

            dialog.querySelectorAll('[data-service-panel]').forEach(item => {
                item.hidden = item !== panel;
            });
            dialog.setAttribute('aria-labelledby', panel.querySelector('h2').id);
            dialog.showModal();
        });
    });

    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            dialog.close();
        }
    });
}

// Get icon class based on service type
function getServiceIcon(icon) {
    const icons = {
        'fracture': 'bone',
        'arthroscopy': 'eye',
        'deformity': 'ruler-combined',
        'joint': 'universal-access',
        'sports': 'running',
        'pediatric': 'baby',
        'spine': 'column',
        'replacement': 'prosthesis'
    };
    return icons[icon] || 'medical';
}

// Render Testimonials
function renderTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid || !websiteData.testimonials) return;

    testimonialsGrid.innerHTML = websiteData.testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-rating">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Hospital Facilities
function renderFacilities() {
    const facilitiesList = document.querySelector('.facilities-list');
    if (!facilitiesList || !websiteData.facilities) return;

    facilitiesList.innerHTML = `
        <div class="facilities-grid">
            ${websiteData.facilities.map(facility => `
                <div class="facility-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${facility}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Render Doctor Achievements
function renderAchievements() {
    const achievements = document.querySelector('.achievements');
    if (!achievements || !websiteData.doctor.achievements) return;

    achievements.innerHTML = websiteData.doctor.achievements.map(achievement => `
        <span class="achievement-badge">
            <i class="fas fa-award"></i> ${achievement}
        </span>
    `).join('');
}

// Render Doctor Info
function renderDoctorInfo() {
    // Set page title
    if (websiteData.seo.title) {
        document.title = websiteData.seo.title;
    }

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && websiteData.seo.description) {
        metaDesc.setAttribute('content', websiteData.seo.description);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && websiteData.seo.keywords) {
        metaKeywords.setAttribute('content', websiteData.seo.keywords);
    }

    // Doctor bio
    const doctorBio = document.querySelector('.doctor-bio');
    if (doctorBio && websiteData.doctor.bio) {
        doctorBio.textContent = websiteData.doctor.bio;
    }

    // Hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && websiteData.doctor.name) {
        heroTitle.textContent = websiteData.doctor.name;
    }
}

// Render Hospital Info
function renderHospitalInfo() {
    // Hospital name in footer
    const hospitalNameEl = document.querySelector('.footer-section h3');
    if (hospitalNameEl && websiteData.hospital.name) {
        hospitalNameEl.textContent = websiteData.hospital.name;
    }

    // Address in contact
    const addressEl = document.querySelector('.contact-address p');
    if (addressEl && websiteData.hospital.address) {
        addressEl.textContent = websiteData.hospital.address;
    }

    // Phone in contact
    const phoneEl = document.querySelector('.mobile-whatsapp-link');
    if (phoneEl && websiteData.hospital.phone) {
        phoneEl.textContent = websiteData.hospital.phone;
        phoneEl.setAttribute('href', websiteData.hospital.whatsapp);
    }

    const whatsappEl = document.querySelector('.whatsapp-link');
    if (whatsappEl && websiteData.hospital.whatsapp) {
        whatsappEl.setAttribute('href', websiteData.hospital.whatsapp);
    }

}

// Render Quick Links
function renderQuickLinks() {
    const footerLinks = document.querySelector('.footer-links');
    if (!footerLinks || !websiteData.quickLinks) return;

    footerLinks.innerHTML = websiteData.quickLinks.map(link => `
        <li><a href="${link.url}">${link.title}</a></li>
    `).join('');
}

// Contact form validation and email handoff
function initQueryForm() {
    const form = document.querySelector('.query-form');
    if (!form) return;

    const emailInput = form.querySelector('#email');
    const emailGroup = emailInput ? emailInput.closest('.form-group') : null;
    const recipient = websiteData.hospital.email || 'dr.vardhmanjain02@gmail.com';

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setEmailError(show) {
        if (!emailGroup) return;
        emailGroup.classList.toggle('has-error', show);
        if (emailInput) {
            emailInput.setAttribute('aria-invalid', show ? 'true' : 'false');
        }
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (!emailInput.value || isValidEmail(emailInput.value.trim())) {
                setEmailError(false);
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        if (!isValidEmail(email)) {
            setEmailError(true);
            emailInput.focus();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setEmailError(false);

        const subject = encodeURIComponent('Website enquiry from ' + fullName);
        const body = encodeURIComponent(
            'Full Name: ' + fullName + '\n' +
            'Email: ' + email + '\n' +
            'Phone Number: ' + phone + '\n\n' +
            'Message:\n' + message
        );

        window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
