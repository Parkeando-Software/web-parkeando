import React, { useState, useEffect, useRef } from "react";
import { X, Gift, FileText, Image, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useSwal } from "@hooks/useSwal";
import * as adminRaffleService from "@services/adminRaffleService";
import { handleApiError } from "@utils/adminHelpers";

// Base URL for award images
const AWARDS_BASE_URL = 'https://api.parkeando.es/awards/';

export default function RaffleFormModal({ isOpen, onClose, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_number: null,
    month: "",
    year: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState({});

  // Fetch available images from server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await adminRaffleService.getAvailableImages();
        setAvailableImages(images);
      } catch (error) {
        console.error('Error fetching available images:', error);
        // Fallback to default images if API fails
        setAvailableImages([1, 2, 3]);
      }
    };

    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  // Slider navigation functions
  const nextSlide = () => {
    if (currentSlide < availableImages.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.month) {
      newErrors.month = "El mes es requerido";
    }

    if (!formData.year) {
      newErrors.year = "El año es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await adminRaffleService.createRaffle(formData);
      
      swal.fire({
        title: "Sorteo creado",
        html: `
          <p>El sorteo ha sido creado exitosamente.</p>
          <p class="mt-2"><strong>Días restantes:</strong> ${response.days_remaining || 0} días</p>
        `,
        icon: "success",
        timer: 3000,
      });

      onSuccess();
    } catch (error) {
      swal.fire({
        title: "Error",
        text: handleApiError(error),
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Crear Sorteo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="mb-2">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Título del Sorteo *
              </div>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Sorteo Mensual Diciembre"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Descripción *
              </div>
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el premio y las condiciones del sorteo..."
              rows={4}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.description ? "border-red-500" : "border-input"
              } bg-background resize-none`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image Selector - Slider */}
          <div>
            <Label htmlFor="image_number">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Imagen del Premio
              </div>
            </Label>
            {availableImages.length > 0 ? (
              <div className="mt-4 space-y-4">
                {/* Slider Container */}
                <div className="relative">
                  {/* Navigation Arrows */}
                  {availableImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border rounded-full p-2 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        disabled={currentSlide === availableImages.length - 1}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border rounded-full p-2 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Slider Track */}
                  <div className="overflow-hidden rounded-lg border-2 border-border bg-transparent">
                    <div
                      ref={sliderRef}
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {availableImages.map((num) => (
                        <div
                          key={num}
                          className="min-w-full flex items-center justify-center p-8"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, image_number: num });
                              if (errors.image_number) {
                                setErrors({ ...errors, image_number: null });
                              }
                            }}
                            className={`relative rounded-lg border-2 p-6 transition-all hover:scale-105 ${
                              formData.image_number === num
                                ? "border-primary bg-primary/10 shadow-xl"
                                : "border-border bg-background hover:border-primary/50"
                            }`}
                          >
                            <img
                              src={`${AWARDS_BASE_URL}gift_${num}.png`}
                              alt={`Regalo ${num}`}
                              className="w-48 h-48 object-contain"
                            />
                            {formData.image_number === num && (
                              <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dots Indicator */}
                {availableImages.length > 1 && (
                  <div className="flex justify-center gap-2">
                    {availableImages.map((num, index) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === index
                            ? "bg-primary w-8"
                            : "bg-border hover:bg-primary/50"
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Selected Image Info */}
                {formData.image_number && (
                  <p className="text-sm text-center text-muted-foreground">
                    Imagen seleccionada: Regalo {formData.image_number}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay imágenes de premio disponibles</p>
                <p className="text-xs mt-1">Agrega imágenes en formato gift_X.png a la carpeta assets/awards</p>
              </div>
            )}
          </div>

          {/* Month and Year Selector */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="month" className="mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Mes del Sorteo *
                </div>
              </Label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.month ? "border-red-500" : "border-input"
                } bg-background`}
              >
                <option value="">Selecciona mes</option>
                {(() => {
                  const currentMonth = new Date().getMonth() + 1;
                  const currentYear = new Date().getFullYear();
                  const months = [
                    { value: 1, label: "Enero" },
                    { value: 2, label: "Febrero" },
                    { value: 3, label: "Marzo" },
                    { value: 4, label: "Abril" },
                    { value: 5, label: "Mayo" },
                    { value: 6, label: "Junio" },
                    { value: 7, label: "Julio" },
                    { value: 8, label: "Agosto" },
                    { value: 9, label: "Septiembre" },
                    { value: 10, label: "Octubre" },
                    { value: 11, label: "Noviembre" },
                    { value: 12, label: "Diciembre" },
                  ];
                  
                  return months
                    .filter((month) => {
                      // Si el año seleccionado es el actual, filtrar meses pasados y actual
                      if (parseInt(formData.year) === currentYear) {
                        return month.value > currentMonth;
                      }
                      return true;
                    })
                    .map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ));
                })()}
              </select>
              {errors.month && (
                <p className="text-sm text-red-500 mt-1">{errors.month}</p>
              )}
            </div>

            <div>
              <Label htmlFor="year" className="mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Año *
                </div>
              </Label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.year ? "border-red-500" : "border-input"
                } bg-background`}
              >
                {Array.from({ length: 3 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.year && (
                <p className="text-sm text-red-500 mt-1">{errors.year}</p>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Nota:</strong> El sorteo se creará para el mes y año seleccionados.
              Las fechas de inicio y fin se establecerán al principio y final del mes elegido.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Sorteo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
