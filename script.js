// 1. Dinamismo en la Navegación al hacer Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-lg');
        nav.classList.remove('py-4');
    } else {
        nav.classList.remove('py-2', 'shadow-lg');
        nav.classList.add('py-4');
    }
});

// 2. Animaciones de Revelación (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Sistema de Comentarios
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('user-name').value;
        const text = document.getElementById('user-comment').value;

        addComment(name, text);
        commentForm.reset();
    });
}

function addComment(name, text) {
    const date = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    const newComment = document.createElement('div');
    newComment.className = 'border-l-4 border-blue-600 pl-6 py-2 bg-gray-50 rounded-r-lg reveal active';
    newComment.innerHTML = `
        <h5 class="font-bold text-gray-900">${name}</h5>
        <p class="text-gray-500 text-xs mb-2">${date}</p>
        <p class="text-gray-700">${text}</p>
    `;
    
    commentsList.prepend(newComment);
}

// 4. Año Automático en Footer
document.getElementById('year').textContent = new Date().getFullYear();
