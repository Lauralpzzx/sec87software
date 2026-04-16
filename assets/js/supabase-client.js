/**
 * SUPABASE CLIENT CONFIGURATION
 * 
 * Este archivo inicializa la conexión con PostgreSQL a través de Supabase.
 * Para publicar en Netlify, deberás reemplazar las constantes virtuales
 * con las credenciales reales de tu proyecto de Supabase (URL y API Key).
 */

// NOTA: Para no romper el navegador sin un bundler como Vite, 
// utilizamos la versión ESM por CDN de Supabase para este proyecto escolar estático.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// --- REEMPLAZAR ESTOS VALORES CON LOS REALES POSTERIORMENTE ---
const supabaseUrl = 'https://tu-proyecto-id.supabase.co'
const supabaseAnonKey = 'tu-anon-key-publico'

// Initialize the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * SERVICIOS DE BASE DE DATOS (EJEMPLOS DE USO)
 */

// 1. Login de Alumno
export async function studentLogin(matricula, codigoAcceso) {
  // MOCK DE PRUEBA: Permite entrar con cualquier dato que no esté vacío
  if (matricula && codigoAcceso) {
      return {
          id: 'mock-alumno-1',
          matricula: matricula,
          nombre: 'Alumno',
          apellidos: 'De Prueba',
          grupos: {
              grado: 3,
              grupo: 'A'
          }
      };
  }
  return null;
}

// 1.1 Login de Personal (Director, Prefecto, Tutor)
export async function staffLogin(email, password) {
  // MOCK DE PRUEBA: Permite login con las combinaciones exactas
  const user = email.trim().toLowerCase();
  const pass = password.trim().toLowerCase();

  if (user === 'director' && pass === 'director') {
      return { id: 'dir-1', nombre: 'Director Prueba', rol: 'director', tipo_personal: 'director' };
  }
  
  if (user === 'prefecto' && pass === 'prefecto') {
      return { id: 'pref-1', nombre: 'Prefecto Prueba', rol: 'prefecto', tipo_personal: 'prefecto' };
  }
  
  if (user === 'tutor' && pass === 'tutor') {
      return { id: 'tut-1', nombre: 'Tutor Prueba', rol: 'tutor', tipo_personal: 'tutor' };
  }

  return null; // Credenciales inválidas
}

// 2. Obtener resumen de estudiante (estadísticas)
export async function getStudentSummary(studentId) {
  try {
    const { data, error } = await supabase
      .from('student_summaries')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (error) throw error;
    return data;
  } catch(e) {
    console.warn("Retornando mock de resumen de estudiante (Fallo conexión DB)");
    return {
      attendance_percentage: 82,
      attendance_status: "Riesgo Moderado",
      unjustified_absences: 5,
      absences_period: "Este trimestre",
      group_name: "3° B",
      shift_name: "Turno Matutino",
      grade_level: "Tercer Grado"
    };
  }
}

// 3. Obtener últimas asistencias de un alumno
export async function getStudentAttendance(studentId) {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data;
  } catch(e) {
    console.warn("Retornando mock de asistencia (Fallo conexión DB)");
    return [
      { date: "2026-03-12", entry_time: "07:05:00", status: "A tiempo" },
      { date: "2026-03-11", entry_time: "07:22:00", status: "Retardo" },
      { date: "2026-03-10", entry_time: null, status: "Falta" },
      { date: "2026-03-09", entry_time: "06:55:00", status: "A tiempo" },
      { date: "2026-03-08", entry_time: "07:01:00", status: "A tiempo" }
    ];
  }
}

// 4. Obtener avisos vigentes
export async function getAnnouncements() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;
    return data;
  } catch(e) {
    console.warn("Retornando mock de avisos (Fallo conexión DB)");
    return [
      { 
        title: "Día del Maestro - Suspensión", 
        content: "Se informa a la comunidad que el miércoles 15 no habrá actividades.",
        created_at: "2026-05-15T00:00:00Z"
      },
      { 
        title: "Entrega de Boletas 2° Trimestre", 
        content: "Reunión obligatoria con tutores legales en el auditorio principal.",
        created_at: "2026-05-22T00:00:00Z"
      }
    ];
  }
}
