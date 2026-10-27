/* Portfolio animations: scroll reveals, staggered cards, and active navigation */
document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealSelectors = [
        ".section-label",
        ".section > h2",
        ".section-text",
        ".education-card",
        ".skill-card",
        ".other-skills",
        ".project-card",
        ".experience-card",
        ".certificate-card",
        ".achievement-category",
        ".responsibility-card",
        ".contact-description",
        ".contact-links"
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(", "));

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    // Stagger related cards so they appear in a gentle sequence.
    [
        ".skill-card",
        ".project-card",
        ".certificate-card",
        ".achievement-card",
        ".responsibility-card"
    ].forEach((selector) => {
        document.querySelectorAll(selector).forEach((card, index) => {
            card.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
        });
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        revealElements.forEach((element) => observer.observe(element));
    }

    // Highlight the navigation link for the section currently in view.
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    if ("IntersectionObserver" in window && sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", isActive);
                });
            });
        }, {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }
});
