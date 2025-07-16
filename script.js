// Datos de las materias (simplificado)
const materias = [
  { id: "anatomia", nombre: "Anatomía", semestre: 1, prerrequisitos: [], aprobada: false },
  { id: "biofisica", nombre: "Biofísica", semestre: 1, prerrequisitos: [], aprobada: false },
  { id: "anatomia-clinica", nombre: "Anatomía Clínica", semestre: 2, prerrequisitos: ["anatomia"], aprobada: false },
];

function cargarMalla() {
  const malla = document.getElementById('malla');
  
  // Agrupar por semestre
  const semestres = {};
  materias.forEach(materia => {
    if (!semestres[materia.semestre]) {
      semestres[materia.semestre] = [];
    }
    semestres[materia.semestre].push(materia);
  });

  // Crear HTML para cada semestre
  for (const [semestre, materiasSemestre] of Object.entries(semestres)) {
    const semestreDiv = document.createElement('div');
    semestreDiv.className = 'semestre';
    semestreDiv.innerHTML = `<h2>Semestre ${semestre}</h2>`;
    
    materiasSemestre.forEach(materia => {
      const materiaDiv = document.createElement('div');
      materiaDiv.className = 'materia bloqueada';
      materiaDiv.textContent = materia.nombre;
      materiaDiv.id = materia.id;
      
      materiaDiv.addEventListener('click', () => {
        materia.aprobada = !materia.aprobada;
        actualizarMalla();
      });
      
      semestreDiv.appendChild(materiaDiv);
    });
    
    malla.appendChild(semestreDiv);
  }
  actualizarMalla();
}

function actualizarMalla() {
  materias.forEach(materia => {
    const elemento = document.getElementById(materia.id);
    const prerrequisitosCumplidos = materia.prerrequisitos.every(prereq => 
      materias.find(m => m.id === prereq)?.aprobada
    );

    elemento.className = 'materia ' + (
      materia.aprobada ? 'aprobada' :
      prerrequisitosCumplidos || materia.prerrequisitos.length === 0 ? 'desbloqueada' : 'bloqueada'
    );
  });
}

// Iniciar
document.addEventListener('DOMContentLoaded', cargarMalla);
