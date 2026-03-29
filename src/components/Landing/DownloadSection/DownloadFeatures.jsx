import { Check } from "lucide-react";
import { features_download_section } from "@utils/features_download_section";

export default function DownloadFeatures() {
  return (
    <div className="mb-16 flex justify-center">
      <div className="grid w-full max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features_download_section.map((feature, index) => (
          <div
            key={index}
            className="rounded-[1.5rem] border border-white/14 bg-white/10 px-5 py-4 text-left backdrop-blur-lg"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-300/20 text-emerald-200">
                <Check size={18} />
              </div>
              <span className="text-base font-medium text-white">{feature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
