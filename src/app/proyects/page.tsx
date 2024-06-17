'use client';
import React, { useState,useEffect } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { Project } from '@luca/interface/projects';


// Datos de ejemplo con imágenes ficticias
const projects: Project[] = [
  {
    id: 1,
    name: 'Desarrollo Web',
    activities: 'Diseño de interfaz, integración de backend',
    comments: 'Revisar los colores de la interfaz',
    progress: 'En curso',
    employee: 'Juan Pérez',
    company: 'Tech Solutions',
    deadline: '2024-07-30',
    specialty: 'Desarrollo Web',
    imageUrl: '/images/migrating.jpg'
  },
  {
    id: 2,
    name: 'Optimización de Base de Datos',
    activities: 'Mejora del rendimiento, reducción de tiempos de consulta',
    comments: 'Priorizar consultas más lentas',
    progress: 'Iniciado',
    employee: 'Ana Gómez',
    company: 'Data Tech',
    deadline: '2024-08-15',
    specialty: 'Base de Datos',
    imageUrl: '/images/optimizacion.png'
  },
  {
    id: 3,
    name: 'Aplicación Móvil de Salud',
    activities: 'Desarrollo de funcionalidades, pruebas de usuario',
    comments: 'Incluir recordatorios de medicación',
    progress: 'Finalizado',
    employee: 'Luis Navarro',
    company: 'Health Innovations',
    deadline: '2024-05-20',
    specialty: 'Desarrollo Móvil',
    imageUrl: '/images/comunication.jpg'
  },
  {
    id: 4,
    name: 'Rebranding Corporativo',
    activities: 'Diseño de nuevo logo, actualización de materiales de marketing',
    comments: 'Asegurar coherencia de marca en todas las plataformas',
    progress: 'En curso',
    employee: 'Sofía Martín',
    company: 'Creative Design Ltd.',
    deadline: '2024-09-01',
    specialty: 'Diseño Gráfico',
    imageUrl: '/images/ux.jpg'
  },
  {
    id: 5,
    name: 'Integración de Sistema ERP',
    activities: 'Configuración de módulos, capacitación de usuarios',
    comments: 'Verificar la compatibilidad con software existente',
    progress: 'Iniciado',
    employee: 'Carlos Ruiz',
    company: 'Efficiency Tech',
    deadline: '2024-12-10',
    specialty: 'Sistemas ERP',
    imageUrl: '/images/resources.jpg'
  },
  {
    id: 6,
    name: 'Campaña de Marketing Digital',
    activities: 'Creación de contenido, gestión de redes sociales',
    comments: 'Enfocarse en incrementar el engagement',
    progress: 'En curso',
    employee: 'Elena Torres',
    company: 'Digital Solutions',
    deadline: '2024-06-30',
    specialty: 'Marketing Digital',
    imageUrl: '/images/pngwing.com.png'
  },
  {
    id: 7,
    name: 'Desarrollo de Videojuego',
    activities: 'Programación de gameplay, diseño de personajes',
    comments: 'Balancear niveles de dificultad',
    progress: 'Iniciado',
    employee: 'Marco Fernández',
    company: 'Games Dev Studio',
    deadline: '2025-01-15',
    specialty: 'Desarrollo de Juegos',
    imageUrl: '/images/mockup.png'
  },
  {
    id: 8,
    name: 'Automatización de Procesos',
    activities: 'Instalación de robots, programación PLC',
    comments: 'Realizar pruebas de seguridad',
    progress: 'Finalizado',
    employee: 'Claudia Jiménez',
    company: 'Automation Advanced',
    deadline: '2024-10-05',
    specialty: 'Automatización',
    imageUrl: '/images/asd.png'
  },
  {
    id: 9,
    name: 'Desarrollo de E-commerce',
    activities: 'Configuración de carrito de compras, optimización SEO',
    comments: 'Asegurar transacciones seguras',
    progress: 'En curso',
    employee: 'David Sánchez',
    company: 'Online Retail Inc.',
    deadline: '2024-11-20',
    specialty: 'Comercio Electrónico',
    imageUrl: '/images/comunication.jpg'
  },
];

const ProjectCard: React.FC<{ project: Project, onSelected: () => void, isSingleView?: boolean }> = ({ project, onSelected, isSingleView = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
    onSelected(); // Siempre llama a onSelected, independientemente del estado de showDetails
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 mb-4 ${isSingleView ? 'max-w-xl mx-auto col-span-3' : ''}`}>
      {!isSingleView && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.imageUrl} alt={`Imagen de ${project.name}`} className="w-full h-48 object-cover rounded-t-lg" />
      )}
      <div className="flex justify-center mt-3 items-center space-x-4 text-center">
        <h2 className="text-xl text-gray-700 font-semibold">{project.name}</h2>
        <button className="bg-green-400 text-white rounded p-2" onClick={handleShowDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {showDetails && (
        <div className={`text-gray-600 p-2 tracking-wider ${isSingleView ? 'text-lg' : ''}`}>
          {/* Estilos mejorados para la vista única */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Actividades:</strong> {project.activities}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Comentarios:</strong> {project.comments}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Progreso:</strong> {project.progress}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Empleado:</strong> {project.employee}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Empresa:</strong> {project.company}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Deadline:</strong> {project.deadline}</p>
            <p className="text-center text-gray-700 font-semibold mt-2"><strong>Especialidad requerida:</strong> {project.specialty}</p>
          </div>
        </div>
      )}
    </div>
  );
};

  const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);  // El estado de loading se inicializa en true y nunca cambia.
  
    const handleSelectProject = (project: Project) => {
      setSelectedProject(selectedProject === project ? null : project);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false); // Oculta el spinner después de 3 segundos
        }, 3000);
        return () => clearTimeout(timer);
      }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container pt-16 mx-auto px-4">
          <div className="flex justify-center font-century font-semibold tracking-wider text-shadow items-center text-3xl text-center text-gray-700 mb-9">
          <h1 className='underline-animation'>PROJECTS</h1>
          <ImSpinner8 color="#32CD32" size={40} className='ml-4 mt-1 spin' style={{ animation: 'spin 2s linear infinite' }} />
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedProject ? (
              <ProjectCard 
                key={selectedProject.id}
                project={selectedProject}
                onSelected={() => setSelectedProject(null)}
                isSingleView={true}
              />
            ) : (
              projects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onSelected={() => handleSelectProject(project)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectsPage;
