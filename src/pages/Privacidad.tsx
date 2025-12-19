import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

export const Privacidad: React.FC = () => {
  const today = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50
                    dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
      {/* Efectos de fondo 3D */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600
                           bg-clip-text text-transparent">
                Política de Privacidad
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Última actualización: {today}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12
                     border border-white/30 dark:border-gray-700/30 shadow-xl"
        >
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="lead text-gray-700 dark:text-gray-300">
              En GrabArte (<a href="https://www.voiceschema.site" className="text-blue-600 dark:text-blue-400">https://www.voiceschema.site</a>)
              valoramos y respetamos la privacidad de los usuarios. Esta Política de Privacidad describe cómo recopilamos,
              utilizamos y protegemos la información personal cuando se solicitan nuestros servicios de corte y grabado láser.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              1. Información que recopilamos
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Podemos recopilar los siguientes datos, según el uso que el usuario haga de nuestros servicios:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información proporcionada voluntariamente a través de formularios de contacto</li>
              <li>Detalles del proyecto o servicio solicitado</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              No recopilamos información sensible sin el consentimiento explícito del usuario.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              2. Uso de la información
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              La información recopilada se utiliza únicamente para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Brindar y mejorar nuestros servicios de corte y grabado láser</li>
              <li>Gestionar comunicaciones y presupuestos con los clientes</li>
              <li>Procesar pedidos y coordinar entregas</li>
              <li>Enviar información relacionada con el servicio solicitado</li>
              <li>Mejorar la experiencia del usuario en nuestro sitio web</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              No utilizamos los datos para fines distintos a los aquí descritos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              3. Compartición de información con terceros
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              GrabArte no vende ni comercializa datos personales.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Podemos compartir información únicamente con:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Proveedores de servicios tecnológicos necesarios para el funcionamiento del sitio web</li>
              <li>Servicios de mensajería (como WhatsApp) para gestionar consultas y comunicaciones con clientes</li>
              <li>Proveedores de hosting y almacenamiento de datos</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Dicha información se comparte bajo estándares de seguridad apropiados y únicamente para cumplir con los servicios solicitados.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              4. Seguridad de la información
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Implementamos medidas técnicas y organizativas razonables para proteger la información personal contra
              accesos no autorizados, pérdida o uso indebido.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Sin embargo, ningún sistema es completamente seguro, por lo que no podemos garantizar seguridad absoluta.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              5. Derechos del usuario
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              El usuario tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Solicitar la rectificación o eliminación de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Para ejercer estos derechos, puede contactarnos a través de los medios indicados en esta política.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              6. Cookies y tecnologías similares
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Este sitio puede utilizar cookies técnicas y funcionales para mejorar la experiencia del usuario.
              El uso del sitio implica la aceptación de estas cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              7. Enlaces a sitios externos
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Nuestro sitio puede contener enlaces a sitios de terceros. GrabArte no es responsable por las
              políticas de privacidad de dichos sitios.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              8. Cambios en esta política
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
              Los cambios serán publicados en esta misma página.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              9. Contacto
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Si tenés dudas sobre esta Política de Privacidad o el tratamiento de datos, podés contactarnos a través de:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800
                          rounded-lg p-4 mt-4">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Email:</strong> <a href="mailto:contacto@grabarte.com" className="text-blue-600 dark:text-blue-400">contacto@grabarte.com</a>
              </p>
              <p className="text-gray-800 dark:text-gray-200 mt-2">
                <strong>WhatsApp:</strong> <a href="https://wa.me/5491234567890" className="text-blue-600 dark:text-blue-400">+54 9 11 1234-5678</a>
              </p>
              <p className="text-gray-800 dark:text-gray-200 mt-2">
                <strong>Web:</strong> <a href="https://www.voiceschema.site" className="text-blue-600 dark:text-blue-400">https://www.voiceschema.site</a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>GrabArte © {new Date().getFullYear()} • Todos los derechos reservados</p>
      </footer>
    </div>
  );
};
