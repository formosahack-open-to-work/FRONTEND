import React from "react";

function Footer() {
  return (
    <section className="py-16 bg-[#141A45] border-t border-white/10">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      {/* Brand Column */}
      <div className="md:col-span-1">
        <div className="flex items-center mb-6">
         
          <h2 className="text-2xl font-bold text-white">Serena</h2>
        </div>
        <p className="text-white/70 mb-6 leading-relaxed">
          Tu journey favorito de apoyo mutuo y comprensión genuina.
        </p>
        
      </div>

      {/* Quick Links */}
      <div className="md:col-span-1">
        <h3 className="text-white font-semibold mb-6 text-lg">Enlaces Rápidos</h3>
        <ul className="space-y-3">
          <li><a href="/forum" className="text-white/60 hover:text-white transition-colors duration-300">Foro</a></li>
          <li><a href="/chat" className="text-white/60 hover:text-white transition-colors duration-300">SerenAI</a></li>
          <li><a href="/explorer" className="text-white/60 hover:text-white transition-colors duration-300">Explorar</a></li>
          
        </ul>
      </div>


      {/* Contact Info */}
      <div className="md:col-span-1">
        <h3 className="text-white font-semibold mb-6 text-lg">Contacto</h3>
        <div className="space-y-4">
          <div className="flex items-center text-white/60">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>info@serena.com</span>
          </div>
          <div className="flex items-center text-white/60">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>+54 1234 5678</span>
          </div>
          <div className="flex items-start text-white/60">
            <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Instituto Politécnico Formosa</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/50 text-sm mb-4 md:mb-0">
          © 2024 Serena. Todos los derechos reservados.
        </p>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-white/50 hover:text-white transition-colors duration-300">Privacidad</a>
          <a href="#" className="text-white/50 hover:text-white transition-colors duration-300">Términos</a>
          <a href="#" className="text-white/50 hover:text-white transition-colors duration-300">Cookies</a>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default Footer;
