const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.querySelector('.form-message');
const revealItems = document.querySelectorAll('.reveal');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

        menuCards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !matches);
        });
    });
});

bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameField = bookingForm.querySelector('input[type="text"]');
    const name = nameField.value.trim();

    formMessage.textContent = name
        ? `Thank you, ${name}! Your reservation request has been received.`
        : 'Thank you! Your reservation request has been received.';

    bookingForm.reset();
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));
