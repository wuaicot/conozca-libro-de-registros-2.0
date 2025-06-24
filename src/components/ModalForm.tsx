import React, { useState } from "react";

interface FormData {
  name: string;
  edificio: string;
  ciudad: string;
  cargo: string;
  comentario: string;
  correoPrueba?: string;
}

const ciudadesChile = [
  "Arica",
  "Iquique",
  "Antofagasta",
  "Calama",
  "Copiapó",
  "La Serena",
  "Coquimbo",
  "Valparaíso",
  "Viña del Mar",
  "Santiago",
  "Rancagua",
  "Talca",
  "Chillán",
  "Concepción",
  "Temuco",
  "Valdivia",
  "Puerto Montt",
  "Coyhaique",
  "Punta Arenas",
];

const ModalForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    edificio: "",
    ciudad: "",
    cargo: "",
    comentario: "",
    correoPrueba: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar errores al cambiar
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "su nombre es requerido";
    if (!formData.edificio)
      newErrors.edificio =
        'Nombre y # del edificio es requerido ej: "Edif. Williams 602"';
    if (!formData.ciudad) newErrors.ciudad = "Por favor selecciona tu ciudad";
    if (!formData.cargo) newErrors.cargo = "Por favor selecciona tu cargo";

    // Validar correoPrueba si es requerido
    if (
      (formData.cargo === "Administración" || formData.cargo === "Mayordomo") &&
      !formData.correoPrueba
    ) {
      newErrors.correoPrueba = "Correo para app de prueba es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        edificio: formData.edificio,
        ciudad: formData.ciudad,
        cargo: formData.cargo,
        comentario: formData.comentario,
        correoPrueba: formData.correoPrueba || null,
      };

      const response = await fetch("/api/solicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: "",
          edificio: "",
          ciudad: "",
          cargo: "",
          comentario: "",
          correoPrueba: "",
        });
        // Close modal after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el envío");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al enviar el formulario. Por favor intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-cyan-500 shadow-lg shadow-cyan-500/10 w-full max-w-md mt-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-cyan-400 text-center -mt-4">
              Algunos datos para prepararnos:
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-white">
                ¡Gracias por su interés!
              </h3>
              <p className="text-gray-300 mt-2">Le contactaremos pronto 😊</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-bd font-medium mb-1"
                >
                  ♦ Su Nombre <span className="text-cyan-500 text-lg">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="escriba su nombre aquí"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Edificio */}
              <div>
                <label
                  htmlFor="edificio"
                  className="block text-md font-medium mb-1"
                >
                  ♦ Nombre # del Edificio <span className="text-cyan-500 text-lg">*</span>
                </label>
                <input
                  type="text"
                  id="edificio"
                  name="edificio"
                  value={formData.edificio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Ej: Torre Central 1280"
                />
                {errors.edificio && (
                  <p className="mt-1 text-sm text-red-500">{errors.edificio}</p>
                )}
              </div>

              {/* Ciudad */}
              <div>
                <label
                  htmlFor="ciudad"
                  className="block text-md font-medium mb-1"
                >
                  ♦ Ciudad <span className="text-cyan-500 text-lg">*</span>
                </label>
                <select
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Selecciona tu ciudad</option>
                  {ciudadesChile.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
                {errors.ciudad && (
                  <p className="mt-1 text-sm text-red-500">{errors.ciudad}</p>
                )}
              </div>

              {/* Cargo */}
              <div>
                <label
                  htmlFor="cargo"
                  className="block text-md font-medium mb-1"
                >
                  ♦ Su Cargo <span className="text-cyan-500 text-lg">*</span>{" "}
                </label>
                <select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">-</option>
                  <option value="Administración">Administración</option>
                  <option value="Mayordomo">Mayordomo</option>
                  <option value="Conserje">Conserje</option>
                </select>
                {errors.cargo && (
                  <p className="mt-1 text-sm text-red-500">{errors.cargo}</p>
                )}
              </div>

              {/* Correo para app de prueba (condicional) */}
              {(formData.cargo === "Administración" ||
                formData.cargo === "Mayordomo") && (
                <div>
                  <label
                    htmlFor="correoPrueba"
                    className="block text-sm font-medium text-lime-300 mb-1 ml-5"
                  >
                    • Correo para solicitar la prueba <span className="text-cyan-500 text-lg">*</span>
                  </label>
                  <input
                    type="email"
                    id="correoPrueba"
                    name="correoPrueba"
                    value={formData.correoPrueba}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="sucorreo@gmail.com"
                  />
                  <p className="mt-1 text-xs text-lime-300">
                    Para la prueba recomendamos usar correo personal (@gmail) y no el de la administración.
                  </p>
                  {errors.correoPrueba && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.correoPrueba}
                    </p>
                  )}
                </div>
              )}

              {/* Comentario - Cómo podemos ayudar */}
              <div>
                <label
                  htmlFor="comentario"
                  className="block text-md font-medium text-cyan-300 mb-1"
                >
                  ¿Cómo podemos ayudar en su comunidad?
                </label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Describa brevemente cómo podemos ayudar a su comunidad..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
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
