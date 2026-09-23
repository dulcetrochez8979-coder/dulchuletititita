// 1. Credentials
const supabaseUrl = 'https://orakwbfuoxakludfslpv.supabase.co'; 
const supabaseKey = 'sb_publishable_f5Enp-x0MZ7BfNYCNiSurA_ZlOqz-iF';

// 2. Cliente de Supabase
let supabaseClient = null;

// 3. Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el cliente directamente al cargar la página
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        console.log("Cliente Supabase inicializado.");
    } else {
        console.error("La librería de Supabase no se cargó correctamente.");
    }

    const btnConectar = document.getElementById('btnConectar');
    // CORRECCIÓN: 'btnbuscar' en minúsculas coincide exactamente con el ID del HTML
    const btnBuscar = document.getElementById('btnbuscar'); 

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    }
});

// 4. Conectar / Probar conexión con Supabase
function conectarSupabase() {
    try {
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        alert("CONEXIÓN EXITOSA CON SUPABASE 🔌");
        console.log("Cliente Supabase listo:", supabaseClient);
    } catch (error) {
        alert("ERROR DE CONEXIÓN: " + error.message);
        console.error(error);
    }
}

// 5. Buscar Categoría
async function buscarCategoria() {
    if (!supabaseClient) {
        alert("La conexión con Supabase no se ha establecido ⚠️");
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

        // Filtrar por ID si fue ingresado
        if (idInput) {
            const idNumber = parseInt(idInput, 10);
            query = query.eq('id_categoria', isNaN(idNumber) ? idInput : idNumber);
        }

        // Filtrar por Nombre si fue ingresado
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

        // Llenar campos del formulario con el primer resultado
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre || data[0].nombre_categoria || '';
        document.getElementById('estado').value = data[0].estado || '';

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
