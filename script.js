// Datos iniciales de prueba (Aparecerán si el localStorage está vacío)
const initialTravels = [
    {
        id: 1,
        title: "Nuestra primera aventura",
        location: "Guatemala",
        date: "Mayo 2024",
        img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000",
        desc: "Bienvenidos a nuestro blog. Aquí documentaremos cada paso de Selvin & Berly por el mundo."
    }
];

// Cargar viajes del localStorage o usar los iniciales
let travels = JSON.parse(localStorage.getItem('travels')) || initialTravels;

function renderTravels() {
    const grid = document.getElementById('travel-grid');
    if (!grid) {
        console.error("No se encontró el elemento travel-grid");
        return;
    }

    if (travels.length === 0) {
        grid.innerHTML = "<p class='col-span-full text-center text-gray-400'>Aún no hay viajes registrados.</p>";
        return;
    }

    grid.innerHTML = travels.map(t => `
        <article class="card-travel reveal active" style="opacity:1; transform:none;">
            <div class="relative h-80 overflow-hidden rounded-t-3xl">
                <img src="${t.img}" class="w-full h-full object-cover" alt="${t.title}">
                <span class="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">${t.location}</span>
            </div>
            <div class="p-8 bg-white rounded-b-3xl border border-gray-100">
                <span class="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">${t.date}</span>
                <h3 class="text-2xl mt-2 mb-3 font-serif italic text-gray-800">${t.title}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">${t.desc}</p>
                <div class="flex justify-between items-center">
                    <a href="post.html" class="text-xs font-bold border-b-2 border-emerald-600 pb-1 text-emerald-700">VER AVENTURA</a>
                    ${localStorage.getItem('isLogged') ? `<button onclick="deletePost(${t.id})" class="text-red-500 text-xs font-bold uppercase">Borrar</button>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Cargado, iniciando renderizado...");
    renderTravels();
    
    // Año automático
    const yr = document.getElementById('year');
    if(yr) yr.textContent = new Date().getFullYear();

    // Cambiar botón si hay sesión iniciada
    const adminBtn = document.getElementById('admin-btn');
    if (localStorage.getItem('isLogged') && adminBtn) {
        adminBtn.textContent = "+ AÑADIR VIAJE";
        adminBtn.onclick = (e) => {
            e.preventDefault();
            createNewPost();
        };
    }
});

function createNewPost() {
    const title = prompt("Título del viaje:");
    if(!title) return;
    const location = prompt("Ubicación (ej: Volcán de Fuego):");
    const img = prompt("URL de la foto (puedes usar un link de Unsplash o tu IG):");
    const desc = prompt("Breve descripción:");

    const newPost = {
        id: Date.now(),
        title,
        location,
        date: "Recién publicado",
        img: img || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
        desc: desc || "Sin descripción."
    };

    travels.unshift(newPost);
    localStorage.setItem('travels', JSON.stringify(travels));
    renderTravels();
}

function deletePost(id) {
    if(confirm('¿Borrar esta aventura?')) {
        travels = travels.filter(t => t.id !== id);
        localStorage.setItem('travels', JSON.stringify(travels));
        renderTravels();
    }
}
