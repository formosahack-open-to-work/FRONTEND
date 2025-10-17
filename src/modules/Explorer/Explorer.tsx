import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown,
  FiChevronUp,
  FiHeart,
  FiActivity,
  FiMoon,
  FiBook,
  FiUsers,
  FiTarget,
  FiEye,
  FiMessageSquare,
  FiFileText,
  FiCoffee,
  FiClock,
} from 'react-icons/fi';

// Tipos
type Strategy = {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
};

const Explorer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    daily: true,
    longTerm: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Estrategias diarias
  const dailyStrategies: Strategy[] = [
    {
      id: 'relaxation',
      title: 'Técnicas de Relajación y Respiración',
      content:
        'La respiración profunda es una herramienta poderosa y accesible en cualquier momento. Inhale lentamente por la nariz contando hasta cuatro, sostenga la respiración por cuatro segundos y exhale suavemente por la boca durante seis segundos. Repetir este ciclo varias veces ayuda a calmar el sistema nervioso. La meditación, el yoga y el tai chi también son prácticas muy beneficiosas.',
      icon: <FiHeart className="text-[#141A45] text-xl" />,
    },
    {
      id: 'exercise',
      title: 'Actividad Física Adaptada',
      content:
        'El ejercicio regular es un potente ansiolítico natural. Consulte con su equipo médico para diseñar un plan de actividad física seguro y adaptado a sus capacidades. Caminatas suaves, estiramientos o ejercicios en silla pueden marcar una gran diferencia en el estado de ánimo.',
      icon: <FiActivity className="text-[#141A45] text-xl" />,
    },
    {
      id: 'nutrition',
      title: 'Alimentación Consciente y Equilibrada',
      content:
        'Una dieta saludable no solo beneficia el control de la enfermedad de base, sino que también influye en la salud mental. Priorice el consumo de frutas, verduras, granos integrales y proteínas magras. Limite la cafeína y el alcohol, ya que pueden exacerbar los síntomas de ansiedad.',
      icon: <FiCoffee className="text-[#141A45] text-xl" />,
    },
    {
      id: 'sleep',
      title: 'Higiene del Sueño',
      content:
        'El descanso es fundamental para la regulación emocional. Intente establecer un horario regular para acostarse y levantarse, cree un ambiente relajante en su habitación y evite el uso de pantallas antes de dormir.',
      icon: <FiMoon className="text-[#141A45] text-xl" />,
    },
    {
      id: 'routine',
      title: 'Mantenga una Rutina',
      content:
        'La estructura y la previsibilidad pueden proporcionar una sensación de control y seguridad. Establecer horarios para las comidas, la medicación, el ejercicio y el descanso puede ayudar a reducir la incertidumbre y la ansiedad.',
      icon: <FiClock className="text-[#141A45] text-xl" />,
    },
    {
      id: 'info',
      title: 'Información Veraz y Limitada',
      content:
        'Infórmese sobre su enfermedad a través de fuentes fiables, como su equipo médico o asociaciones de pacientes. Sin embargo, evite la sobreinformación y la búsqueda constante de síntomas en internet, ya que esto puede aumentar la preocupación.',
      icon: <FiBook className="text-[#141A45] text-xl" />,
    },
  ];

  // Estrategias a largo plazo
  const longTermStrategies: Strategy[] = [
    {
      id: 'support',
      title: 'Comunicación Abierta y Red de Apoyo',
      content:
        'Compartir sus miedos y preocupaciones con familiares, amigos o un profesional de la salud mental es crucial. No afronte la enfermedad en soledad. Los grupos de apoyo, presenciales u online, pueden ser un espacio seguro para conectar con personas que atraviesan situaciones similares.',
      icon: <FiUsers className="text-[#141A45] text-xl" />,
    },
    {
      id: 'goals',
      title: 'Establezca Metas Realistas y Celebre los Pequeños Logros',
      content:
        'Fije objetivos alcanzables tanto en el manejo de su enfermedad como en otros aspectos de su vida. Reconocer y celebrar cada avance, por pequeño que sea, refuerza la autoestima y la sensación de control.',
      icon: <FiTarget className="text-[#141A45] text-xl" />,
    },
    {
      id: 'mindfulness',
      title: 'Enfoque en el Presente (Mindfulness)',
      content:
        'Practicar la atención plena ayuda a reducir la rumiación sobre el pasado y la preocupación por el futuro. Concéntrese en el "aquí y ahora" a través de sus sentidos: preste atención a los sonidos, los olores, los sabores y las sensaciones físicas del momento presente.',
      icon: <FiEye className="text-[#141A45] text-xl" />,
    },
    {
      id: 'professional',
      title: 'Busque Ayuda Profesional',
      content:
        'La terapia psicológica, en particular la terapia cognitivo-conductual (TCC), ha demostrado ser muy eficaz para tratar la ansiedad. Un psicólogo o psiquiatra puede proporcionarle herramientas personalizadas para identificar y modificar los patrones de pensamiento negativos que alimentan la ansiedad.',
      icon: <FiMessageSquare className="text-[#141A45] text-xl" />,
    },
    {
      id: 'express',
      title: 'Exprese sus Emociones',
      content:
        'Permitirse sentir y expresar emociones como el miedo, la tristeza o la ira es parte del proceso de adaptación. Escribir en un diario, hablar con alguien de confianza o realizar actividades artísticas pueden ser canales de expresión muy saludables.',
      icon: <FiFileText className="text-[#141A45] text-xl" />,
    },
  ];

  
  return (
    <div className="min-h-screen bg-white text-gray-800 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#141A45] mb-4">
            Afrontando la Ansiedad en el Camino de las Enfermedades Crónicas
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Consejos prácticos para una vida más equilibrada y plena
          </p>
        </motion.header>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 mb-10 bg-white shadow-sm border border-gray-100"
        >
          <p className="mb-3">
            Vivir con una enfermedad crónica como la diabetes o el cáncer puede generar una carga emocional significativa, donde la ansiedad es una compañera frecuente y desafiante.
          </p>
          <p>
            Sin embargo, existen estrategias prácticas y efectivas para manejarla y prevenirla, permitiendo una mejor calidad de vida y un mayor bienestar integral.
          </p>
        </motion.div>


        {/* Sección Diaria */}
        <Section
          title="Estrategias Prácticas para el Día a Día"
          isOpen={expandedSections.daily}
          onToggle={() => toggleSection('daily')}
        >
          <StrategyList strategies={dailyStrategies} />
        </Section>

        {/* Sección Largo Plazo */}
        <Section
          title="Prevención de la Ansiedad a Largo Plazo"
          isOpen={expandedSections.longTerm}
          onToggle={() => toggleSection('longTerm')}
          className="mt-10"
        >
          <StrategyList strategies={longTermStrategies} />
        </Section>

        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl text-center italic bg-blue-50 border-l-4 border-[#141A45]"
        >
          <p className="text-lg text-gray-800">
            Cuidar su salud mental es tan importante como cuidar su salud física.  
            <span className="block mt-2 font-semibold text-[#141A45]">Usted no está solo en este camino.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Componente reutilizable para secciones con acordeón
const Section: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ title, isOpen, onToggle, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div
        onClick={onToggle}
        className="flex justify-between items-center p-5 rounded-2xl cursor-pointer transition-all bg-white hover:bg-gray-50 shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-[#141A45]">{title}</h2>
        {isOpen ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-b-2xl bg-white shadow-sm border border-t-0 border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Lista de estrategias con iconos
const StrategyList: React.FC<{ strategies: Strategy[] }> = ({ strategies }) => {
  return (
    <div className="space-y-5">
      {strategies.map((strategy) => (
        <motion.div
          key={strategy.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 p-4 rounded-xl bg-gray-50"
        >
          <div className="flex-shrink-0 mt-1">{strategy.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
            <p className="mt-1 text-gray-700">{strategy.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Explorer;