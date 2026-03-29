import { features_download_section } from "@utils/features_download_section";

export default function DownloadFeatures() {
  return (
    <div className="flex justify-center mb-16">
      {/* Contenedor centrado con ancho máximo */}
      <div className="max-w-md w-full">
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-200 text-left">
          Todo lo que necesitas en una sola app
        </h3>
        <div className="space-y-4 text-left">
          {features_download_section.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#00AB00] rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-lg">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
