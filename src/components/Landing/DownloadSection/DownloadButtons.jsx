export default function DownloadButtons() {
  const buttons = [
    {
      labelSmall: "Descargar en",
      labelMain: "App Store",
      href: "https://apps.apple.com/es/app/parkeando/id6754628698",
      bg: "bg-slate-950/92 hover:bg-slate-950",
      text: "text-white",
      iconViewBox: "0 0 32 32",
      iconPath:
        "M26.5058 27.625C25.33 29.3817 24.0833 31.0959 22.185 31.1242C20.2867 31.1667 19.6775 30.005 17.5242 30.005C15.3567 30.005 14.6908 31.0959 12.8917 31.1667C11.0358 31.2375 9.63333 29.2967 8.44333 27.5825C6.02083 24.0834 4.165 17.6375 6.65833 13.3025C7.89083 11.1492 10.1008 9.78921 12.495 9.74671C14.3083 9.71837 16.0367 10.9792 17.1558 10.9792C18.2608 10.9792 20.3575 9.46337 22.5533 9.69004C23.4742 9.73254 26.0525 10.0584 27.71 12.495C27.5825 12.58 24.6358 14.3084 24.6642 17.8925C24.7067 22.1709 28.4183 23.6017 28.4608 23.6159C28.4183 23.715 27.8658 25.6559 26.5058 27.625ZM18.4167 4.95837C19.4508 3.78254 21.165 2.89004 22.5817 2.83337C22.7658 4.49087 22.1 6.16254 21.1083 7.35254C20.1308 8.55671 18.5158 9.49171 16.9292 9.36421C16.7167 7.73504 17.51 6.03504 18.4167 4.95837Z",
    },
    {
      labelSmall: "Disponible en",
      labelMain: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.parkeando.app",
      bg: "bg-white/12 hover:bg-white/18",
      text: "text-white",
      iconViewBox: "0 0 32 32",
      iconPath:
        "M4 28.9958V4.9125C4 4.07667 4.48167 3.34 5.19 3L19.1442 16.9542L5.19 30.9083C4.48167 30.5542 4 29.8317 4 28.9958ZM23.5642 21.3742L8.32083 30.1858L20.3483 18.1583L23.5642 21.3742ZM28.31 15.2683C28.7917 15.6508 29.1458 16.2458 29.1458 16.9542C29.1458 17.6625 28.8342 18.2292 28.3383 18.6258L25.0942 20.4958L21.5525 16.9542L25.0942 13.4125L28.31 15.2683ZM8.32083 3.7225L23.5642 12.5342L20.3483 15.75L8.32083 3.7225Z",
    },
  ];

  return (
    <div className="mb-16 mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.href}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex h-[4.5rem] w-full max-w-[290px] items-center justify-center rounded-2xl border border-white/18 px-6 py-4 shadow-[0_18px_45px_rgba(2,6,23,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-1 ${btn.bg} ${btn.text}`}
        >
          <svg
            width="32"
            height="32"
            viewBox={btn.iconViewBox}
            fill="currentColor"
            className="mr-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
          >
            <path d={btn.iconPath} />
          </svg>
          <div className="text-left">
            <div className="text-xs uppercase tracking-[0.16em] text-white/70">
              {btn.labelSmall}
            </div>
            <div className="text-lg font-semibold">{btn.labelMain}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
