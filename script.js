// 1. Credenciales de Supabase
const supabaseUrl = 'https://orakwbfuoxakludfslpv.supabase.co'; 
const supabaseKey = 'sb_publishable_f5Enp-x0MZ7BfNYCNiSurA_ZlOqz-iF';

// 2. Variable global para la instancia
let supabaseClient = null;

// 3. Vinculación de eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el cliente si la CDN cargó correctamente
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        console.log("Cliente de Supabase inicializado correctamente.");
    } else {
        console.error("No se pudo cargar la librería SDK de Supabase desde el CDN.");
    }

    const btnConectar = document.getElementById('btnConectar');
    const btnBuscar = document.getElementById('btnbuscar'); 

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    }
});

// 4. Test o reconexión manual
function conectarSupabase() {
    try {
        if (!supabaseClient && typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        alert("CONEXIÓN EXITOSA CON SUPABASE 🔌");
        console.log("Cliente listo:", supabaseClient);
    } catch (error) {
        alert("ERROR DE CONEXIÓN: " + error.message);
        console.error(error);
    }
}

// 5. Función de búsqueda
async function buscarCategoria() {
    if (!supabaseClient) {
        alert("La librería de Supabase no se ha inicializado ⚠️");
        return;
    }

    const idInput = document.getElementById('id_categoria').value.trim();
    const nombreInput = document.getElementById('nombre_categoria').value.trim();

    if (!idInput && !nombreInput) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        let query = supabaseClient.from('categorias').select('*');

        // Búsqueda exacta por ID (convierte a entero si aplica)
        if (idInput) {
            const idNumber = parseInt(idInput, 10);
            query = query.eq('id_categoria', isNaN(idNumber) ? idInput : idNumber);
        }

        // Búsqueda flexible por Nombre (case-insensitive)
        if (nombreInput) {
            query = query.ilike('nombre', `%${nombreInput}%`);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // Asignación de valores al formulario
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre || data[0].nombre_categoria || '';
        document.getElementById('estado').value = data[0].estado || '';

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al realizar la búsqueda ❌: " + error.message);
        console.error("Detalle técnico del error:", error);
    }
}
