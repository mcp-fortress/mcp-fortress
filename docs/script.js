// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-based header shadow
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .use-case, .quickstart-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add copy button to code blocks
document.querySelectorAll('.code-block').forEach(block => {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(99, 102, 241, 0.8);
        color: white;
        border: none;
        padding: 0.375rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        opacity: 0;
    `;

    // Make code block relative
    block.style.position = 'relative';

    // Show copy button on hover
    block.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
    });

    block.addEventListener('mouseleave', () => {
        if (copyButton.textContent === 'Copy') {
            copyButton.style.opacity = '0';
        }
    });

    copyButton.addEventListener('click', async () => {
        const code = block.querySelector('code').textContent;
        try {
            await navigator.clipboard.writeText(code);
            copyButton.textContent = 'Copied!';
            copyButton.style.background = 'rgba(16, 185, 129, 0.8)';

            setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.style.background = 'rgba(99, 102, 241, 0.8)';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    block.appendChild(copyButton);
});

// Console easter egg
console.log('%c🏰 MCP Fortress', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cSecuring MCP servers, one scan at a time.', 'font-size: 14px; color: #a1a1aa;');
console.log('%cInterested in contributing? Visit: https://github.com/mcp-fortress/mcp-fortress', 'font-size: 12px; color: #8b5cf6;');
