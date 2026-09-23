// 1. Tus credenciales
const supabaseUrl = 'https://orakwbfuoxakludfslpv.supabase.co'; 
const supabaseKey = 'sb_publishable_f5Enp-x0MZ7BfNYCNiSurA_ZlOqz-iF';
// 2. Cliente de Supabase
let supabaseClient = null;

// 3. Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const btnConectar = document.getElementById('btnConectar');
    const btnBuscar = document.getElementById('btnbuscar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    }
});

// 4. Conectar con Supabase
function conectarSupabase() {
    try {
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        alert("CONEXIÓN EXITOSA");
        console.log("Cliente Supabase listo:", supabaseClient);
    } catch (error) {
        alert("ERROR DE CONEXIÓN: " + error.message);
        console.error(error);
    }
}

// 5. Buscar Categoría
async function buscarCategoria() {
    if (!supabaseClient) {
        alert("Primero debes hacer clic en CONECTAR 🔌");
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

        // Si se ingresó un ID, convertir a entero si es número
        if (idInput) {
            const idNumber = parseInt(idInput, 10);
            query = query.eq('id_categoria', isNaN(idNumber) ? idInput : idNumber);
        }

        // Si se ingresó Nombre
        if (nombreInput) {
            query = query.ilike('nombre', `%${nombreInput}%`); // Ajusta 'nombre' si tu columna se llama 'nombre_categoria'
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // Llenar campos con el primer resultado encontrado
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre || data[0].nombre_categoria;
        document.getElementById('estado').value = data[0].estado;

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
