// 1. Tus credenciales
const supabaseUrl = 'https://vfegtbeqetqxlovratlk.supabase.co'; 
const supabaseKey = 'sb_publishable_dXV5VSUTZfknTi6Vs4kduA_iQ0MlsxK';

// 2. Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// 3. Esperamos a que el HTML esté cargado antes de buscar el botón
document.addEventListener('DOMContentLoaded', () => {
    
    // Asignamos el evento click al botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');
    
    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar en el HTML");
    }
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar en el HTML");
    }
});

// 4. Función que se ejecuta al hacer clic en CONECTAR
function conectarSupabase() {
    try {
        // Si aún no se ha creado el cliente, lo creamos
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        
        // Si se crea correctamente, mostramos el mensaje
        alert("CONEXIÓN EXITOSA");
        console.log("Cliente Supabase inicializado correctamente:", supabaseClient);
        
    } catch (error) {
        alert("ERROR DE CONEXIÓN");
        console.error("Detalles del error:", error);
    }
}
async function buscarCategoria() {
    // 1. Verificar que el cliente esté conectado
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;}
    // 2. Obtener los valores del formulario
    const id = document.getElementById('id_categoria').value.trim();
    const nombre = document.getElementById('nombre_categoria').value.trim();
    // 3. Validar que al menos uno esté lleno
    if (!id && !nombre) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;}
    try {
        // 4. Construir la consulta base
        let query = supabaseClient.from('categorias').select('*');

        // 5. Filtrar según lo que el usuario escribió
        if (id) {
            query = query.eq('id_categoria', id);
        }
        if (nombre) {
            query = query.ilike('nombre', `%${nombre}%`); // 'nombre' es el campo real en Supabase
        }
        // 6. Ejecutar la consulta
        const { data, error } = await query;
        if (error) throw error;
        // 7. Si no hay resultados
        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;}
        // 8. Mostrar el primer resultado en el formulario
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre;
        document.getElementById('estado').value = data[0].estado;
        alert(`✅ Se encontraron ${data.length} resultado(s).`);}
         catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
async function buscarCategoria() {
    // 1. Verificar que el cliente esté conectado
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    // 2. Obtener los valores del formulario
    const id = document.getElementById('id_categoria').value.trim();
    const nombre = document.getElementById('nombre_categoria').value.trim();

    // 3. Validar que al menos uno esté lleno
    if (!id && !nombre) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        // 4. Construir la consulta base
        let query = supabaseClient.from('categorias').select('*');

        // 5. Filtrar según lo que el usuario escribió
        if (id) {
            query = query.eq('id_categoria', id);
        }
        if (nombre) {
            query = query.ilike('nombre', `%${nombre}%`); // 'nombre' es el campo real en Supabase
        }

        // 6. Ejecutar la consulta
        const { data, error } = await query;

        if (error) throw error;

        // 7. Si no hay resultados
        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // 8. Mostrar el primer resultado en el formulario
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre;
        document.getElementById('estado').value = data[0].estado;

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        lert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
