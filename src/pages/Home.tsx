import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Package, Palette, Sparkles, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from '../components/ThemeToggle';

export const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    const whatsappMessage = `Hola! Me contacto desde la web.%0ANombre: ${formData.nombre}%0AEmail: ${formData.email}%0ATeléfono: ${formData.telefono}%0AMensaje: ${formData.mensaje}`;
    window.open(`https://wa.me/5492604317432?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50
                    dark:from-gray-900 dark:via-gray-800 dark:to-orange-900 transition-colors duration-500">
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl
                         flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-xl opacity-20"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600
                           bg-clip-text text-transparent">
                GrabArte
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Corte láser de precisión
              </p>
            </div>
          </motion.div>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Transformamos tus ideas
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">
              en arte grabado
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Especialistas en corte y grabado láser con diodo sobre MDF.
            Creamos diseños únicos con precisión y calidad excepcional.
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600
                     text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Solicitar Presupuesto
          </motion.a>
        </motion.div>
      </section>

      {/* Servicios Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Nuestros Servicios
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tecnología de punta para resultados profesionales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Servicio 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                     border border-orange-200/30 dark:border-orange-800/30 shadow-xl
                     hover:shadow-2xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl
                          flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Corte Láser
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Cortes precisos y limpios en MDF de diferentes grosores.
              Ideal para diseños complejos y detalles finos.
            </p>
          </motion.div>

          {/* Servicio 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                     border border-orange-200/30 dark:border-orange-800/30 shadow-xl
                     hover:shadow-2xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl
                          flex items-center justify-center mb-4">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Grabado Artístico
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Grabados personalizados con detalles excepcionales.
              Perfecto para decoración y productos únicos.
            </p>
          </motion.div>

          {/* Servicio 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                     border border-orange-200/30 dark:border-orange-800/30 shadow-xl
                     hover:shadow-2xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl
                          flex items-center justify-center mb-4">
              <Package className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Productos Personalizados
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Creamos piezas únicas según tu diseño. Regalos, señalética,
              decoración y más.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Galería Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Algunos de nuestros trabajos
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((numero, index) => (
            <motion.div
              key={numero}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl
                       border border-orange-200/30 dark:border-orange-800/30 shadow-xl
                       overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={`/gallery/trabajo-${numero}.jpg`}
                  alt={`Trabajo ${numero} - GrabArte`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Contactanos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Estamos listos para dar vida a tu proyecto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                          border border-orange-200/30 dark:border-orange-800/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Email
                  </h4>
                  <a href="mailto:contacto@grabarte.com"
                     className="text-orange-600 dark:text-orange-400 hover:underline">
                    contacto@grabarte.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                          border border-orange-200/30 dark:border-orange-800/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    WhatsApp
                  </h4>
                  <a href="https://wa.me/5492604317432"
                     className="text-orange-600 dark:text-orange-400 hover:underline"
                     target="_blank" rel="noopener noreferrer">
                    +54 9 260 431-7432
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                          border border-orange-200/30 dark:border-orange-800/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Ubicación
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6
                          border border-orange-200/30 dark:border-orange-800/30 shadow-xl">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Redes Sociales
              </h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="p-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8
                     border border-orange-200/30 dark:border-orange-800/30 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-all"
                  placeholder="+54 9 260 431-7432"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-all resize-none"
                  placeholder="Contanos sobre tu proyecto..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600
                         text-white font-semibold rounded-xl shadow-lg hover:shadow-xl
                         transition-all"
              >
                Enviar Consulta por WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-12 border-t border-orange-200/30 dark:border-orange-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              GrabArte © {new Date().getFullYear()} • Corte Láser de Precisión
            </p>
            <p className="text-sm">
              <Link to="/privacidad" className="text-orange-600 dark:text-orange-400 hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
