import React, { useState } from 'react';

interface FormData {
  email: string;
  edificio: string;
  cargo: string;
  correoPrueba?: string;
}

const ModalForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    edificio: '',
    cargo: '',
    correoPrueba: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores al cambiar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) newErrors.email = 'Email es requerido';
    if (!formData.edificio) newErrors.edificio = 'Nombre del edificio es requerido';
    if (!formData.cargo) newErrors.cargo = 'Por favor selecciona tu cargo';
    
    // Validar correoPrueba si es requerido
    if ((formData.cargo === 'Administración' || formData.cargo === 'Mayordomo') && !formData.correoPrueba) {
      newErrors.correoPrueba = 'Correo para app de prueba es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/solicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({ email: '', edificio: '', cargo: '', correoPrueba: '' });
        // Close modal after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-cyan-500 shadow-lg shadow-cyan-500/10 w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-cyan-400">Solicitar Información</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-white">¡Gracias por tu interés!</h3>
              <p className="text-gray-300 mt-2">Te contactaremos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Edificio */}
              <div>
                <label htmlFor="edificio" className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre del Edificio *
                </label>
                <input
                  type="text"
                  id="edificio"
                  name="edificio"
                  value={formData.edificio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Ej: Torre Central"
                />
                {errors.edificio && <p className="mt-1 text-sm text-red-500">{errors.edificio}</p>}
              </div>

              {/* Cargo */}
              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-300 mb-1">
                  Cargo *
                </label>
                <select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Selecciona tu cargo</option>
                  <option value="Administración">Administración</option>
                  <option value="Mayordomo">Mayordomo</option>
                  <option value="Propietario">Propietario</option>
                  <option value="Inquilino">Inquilino</option>
                </select>
                {errors.cargo && <p className="mt-1 text-sm text-red-500">{errors.cargo}</p>}
              </div>

              {/* Correo para app de prueba (condicional) */}
              {(formData.cargo === 'Administración' || formData.cargo === 'Mayordomo') && (
                <div>
                  <label htmlFor="correoPrueba" className="block text-sm font-medium text-gray-300 mb-1">
                    Correo para App de Prueba *
                  </label>
                  <input
                    type="email"
                    id="correoPrueba"
                    name="correoPrueba"
                    value={formData.correoPrueba}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="correo@appdeprueba.com"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Recomendamos usar un correo personal (ej: @gmail) y no el de la administración.
                  </p>
                  {errors.correoPrueba && <p className="mt-1 text-sm text-red-500">{errors.correoPrueba}</p>}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;