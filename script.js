// --- CONFIGURACIÓN Y DATOS INICIALES ---
const USER_AUTH = { user: "selvinberly", pass: "aventura2024" };

let travels = JSON.parse(localStorage.getItem('travels')) || [
    {
        id: 1,
        title: "Cascadas de ensueño",
        location: "Guatemala",
        date: "Mayo 2024",
        img: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&q=80&w=1000",
        desc: "Explorando los rincones más verdes de nuestra tierra."
    }
];

// --- RENDERIZAR POSTS EN LA HOME ---
function renderTravels() {
    const grid = document.getElementById('travel-grid');
    if (!grid) return;

    grid.innerHTML = travels.map(t => `
        <article class="card-travel reveal active">
            <div class="relative h-80 overflow-hidden">
                <img src="${t.img}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="${t.title}">
                <span class="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">${t.location}</span>
            </div>
            <div class="p-8">
                <span class="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">${t.date}</span>
                <h3 class="text-2xl mt-2 mb-3 font-serif italic">${t.title}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">${t.desc}</p>
                <div class="flex justify-between items-center">
                    <a href="post.html" class="text-xs font-bold border-b-2 border-black pb-1 hover:text-emerald-600 hover:border-emerald-600 transition">VER GALERÍA</a>
                    ${localStorage.getItem('isLogged') ? `<button onclick="deletePost(${t.id})" class="btn-admin-action">ELIMINAR</button>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// --- LÓGICA DE LOGIN ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;

        if (u === USER_AUTH.user && p === USER_AUTH.pass) {
            localStorage.setItem('isLogged', 'true');
            window.location.href = 'index.html';
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// --- LOGOUT (OPCIONAL) ---
function logout() {
    localStorage.removeItem('isLogged');
    window.location.reload();
}

// --- BORRAR POST ---
function deletePost(id) {
    if(confirm('¿Seguro que quieres borrar esta aventura?')) {
        travels = travels.filter(t => t.id !== id);
        localStorage.setItem('travels', JSON.stringify(travels));
        renderTravels();
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    renderTravels();
    
    // Año en footer
    const yr = document.getElementById('year');
    if(yr) yr.textContent = new Date().getFullYear();

    // Mostrar botón de Admin si está logueado
    const adminBtn = document.getElementById('admin-btn');
    if (localStorage.getItem('isLogged') && adminBtn) {
        adminBtn.textContent = "Añadir Viaje";
        adminBtn.href = "#"; 
        adminBtn.onclick = () => {
            const title = prompt("Título del viaje:");
            if(title) {
                const newPost = {
                    id: Date.now(),
                    title: title,
                    location: prompt("Ubicación:"),
                    date: "Recién subido",
                    img: prompt("URL de la imagen de portada:"),
                    desc: prompt("Descripción corta:")
                };
                travels.unshift(newPost);
                localStorage.setItem('travels', JSON.stringify(travels));
                renderTravels();
            }
        };
    }
});
