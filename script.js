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
