import { 
  IoPeople, 
  IoShieldCheckmark, 
  IoChatbubbleEllipses,
  IoCash,
  IoTime,
  IoHeartDislike,
  IoLockClosed,
  IoRocket,
  IoAccessibility,
  IoArrowForward
} from "react-icons/io5";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-6xl font-bold text-[#141A45] leading-tight">
                Redefiniendo el 
                Apoyo entre Pacientes
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Un refugio de contención para personas con enfermedades crónicas, 
                donde la experiencia compartida es nuestro pilar fundamental.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/register"
                  className="px-8 py-4 text-lg font-semibold text-white bg-[#141A45] rounded-xl hover:bg-[#0f1435] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Comenzar Ahora
                  <IoArrowForward className="text-lg" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#141A45] rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <IoPeople className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Comunidad Verificada</h3>
                      <p className="text-sm opacity-90">Solo pacientes reales</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <IoShieldCheckmark className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Espacio Seguro</h3>
                      <p className="text-sm opacity-90">Libre de juicios</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <IoChatbubbleEllipses className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Apoyo Real</h3>
                      <p className="text-sm opacity-90">Experiencias genuinas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section id="problema" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#141A45]">
              El Aislamiento en la <span className="text-[#141A45]">Enfermedad Crónica</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Las personas con enfermedades crónicas enfrentan una batalla diaria 
              contra la soledad y la incomprensión en un entorno digital saturado de desinformación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#141A45]/10">
              <div className="w-16 h-16 bg-[#141A45]/10 rounded-2xl flex items-center justify-center mb-6">
                <IoCash className="text-2xl text-[#141A45]" />
              </div>
              <h3 className="text-xl font-bold text-[#141A45] mb-4">Costos Financieros</h3>
              <p className="text-gray-600">
                Miles de millones en gastos directos e indirectos, generando 
                deudas médicas y preocupación financiera constante.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#141A45]/10">
              <div className="w-16 h-16 bg-[#141A45]/10 rounded-2xl flex items-center justify-center mb-6">
                <IoTime className="text-2xl text-[#141A45]" />
              </div>
              <h3 className="text-xl font-bold text-[#141A45] mb-4">Tiempo Perdido</h3>
              <p className="text-gray-600">
                Más de 2 horas diarias dedicadas al manejo de la enfermedad, 
                restando tiempo a la vida laboral y personal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#141A45]/10">
              <div className="w-16 h-16 bg-[#141A45]/10 rounded-2xl flex items-center justify-center mb-6">
                <IoHeartDislike className="text-2xl text-[#141A45]" />
              </div>
              <h3 className="text-xl font-bold text-[#141A45] mb-4">Recursos Emocionales</h3>
              <p className="text-gray-600">
                Mayor prevalencia de ansiedad y depresión debido a la incertidumbre, 
                dolor crónico y estigma social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solución Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#141A45] mb-6">
                Nuestra <span className="text-[#141A45]">Magia</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Un ecosistema de apoyo inteligente y empático, curado por y para 
                la comunidad de pacientes crónicos.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#141A45]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoLockClosed className="text-xl text-[#141A45]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#141A45] mb-2">
                      Confianza y Seguridad
                    </h3>
                    <p className="text-gray-600">
                      Entorno digital seguro con moderación experta y verificación 
                      de información médica.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#141A45]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoRocket className="text-xl text-[#141A45]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#141A45] mb-2">
                      Conexión con personas
                    </h3>
                    <p className="text-gray-600">
                      Conectar con pacientes con experiencias 
                      similares y recursos relevantes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#141A45]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IoAccessibility className="text-xl text-[#141A45]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#141A45] mb-2">
                      Empoderamiento Colectivo
                    </h3>
                    <p className="text-gray-600">
                      Validación de la experiencia personal como herramienta 
                      fundamental para el bienestar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#141A45] rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  
                  ¿Cómo funciona?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-lg">Registro y verificación</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-lg">Conexión con tu comunidad</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-lg">Comparte y recibe apoyo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
}