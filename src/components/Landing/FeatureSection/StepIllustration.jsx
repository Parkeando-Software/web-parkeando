import React from "react";

function CuteCar({ x = 0, y = 0, scale = 1, small = false }) {
  const stroke = small ? 2.5 : 3.2;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M18 72 C10 72, 6 68, 6 61 C6 52, 13 46, 22 45 C24 27, 38 14, 58 12 C72 1, 95 2, 106 17 C117 18, 126 26, 128 37 C138 38, 146 46, 146 57 C146 66, 140 72, 130 72 H18 Z"
        fill="#ffffff"
        stroke="#1f2937"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
      <circle cx="40" cy="75" r="12" fill="#ffffff" stroke="#1f2937" strokeWidth={stroke} />
      <circle cx="108" cy="75" r="12" fill="#ffffff" stroke="#1f2937" strokeWidth={stroke} />
      <circle cx="40" cy="75" r="4.2" fill="#1f2937" />
      <circle cx="108" cy="75" r="4.2" fill="#1f2937" />
      <circle cx="58" cy="38" r="6.3" fill="#1f2937" />
      <circle cx="93" cy="38" r="6.3" fill="#1f2937" />
      <path
        d="M56 53 C66 64, 84 64, 95 53"
        fill="none"
        stroke="#1f2937"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </g>
  );
}

function ParkingPin({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M30 8 C16 8, 6 19, 6 33 C6 52, 30 78, 30 78 C30 78, 54 52, 54 33 C54 19, 44 8, 30 8 Z"
        fill="#30b56a"
        stroke="#1f2937"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text
        x="28"
        y="40"
        textAnchor="middle"
        fontSize="28"
        fontWeight="800"
        fill="#ffffff"
        fontFamily="Arial, sans-serif"
      >
        P
      </text>
      <ellipse cx="30" cy="82" rx="16" ry="6" fill="#2da6df" opacity="0.28" />
    </g>
  );
}

function ArrowUp({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M10 34 V8 M10 8 L2 16 M10 8 L18 16"
        fill="none"
        stroke="#111827"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function GroundShadow({ x = 0, y = 0, w = 28, h = 8 }) {
  return <ellipse cx={x} cy={y} rx={w} ry={h} fill="#3aa7db" opacity="0.24" />;
}

function StarBurst({ x = 0, y = 0, size = 16 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M${size / 2} 0 L${size * 0.66} ${size * 0.34} L${size} ${size / 2} L${size * 0.66} ${size * 0.66} L${size / 2} ${size} L${size * 0.34} ${size * 0.66} L0 ${size / 2} L${size * 0.34} ${size * 0.34} Z`}
        fill="#ffd34d"
      />
    </g>
  );
}

function PointsBubble({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" rx="14" ry="14" width="88" height="34" fill="#ffffff" />
      <path d="M14 34 L22 42 L26 34" fill="#ffffff" />
      <text
        x="44"
        y="22"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#111827"
        fontFamily="Arial, sans-serif"
      >
        +1 NUM
      </text>
    </g>
  );
}

function GiftIcon({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="6" y="20" width="34" height="26" rx="4" fill="#44c164" stroke="#1f2937" strokeWidth="3" />
      <rect x="0" y="14" width="46" height="10" rx="4" fill="#58d37a" stroke="#1f2937" strokeWidth="3" />
      <path d="M23 14 V46" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
      <path d="M8 14 C8 7, 17 6, 23 14" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 14 C38 7, 29 6, 23 14" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function TrophyIcon({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M12 10 H48 V24 C48 37, 39 46, 30 48 C21 46, 12 37, 12 24 Z"
        fill="#ffc83d"
        stroke="#1f2937"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M12 16 H5 C5 28, 12 31, 16 31" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 16 H55 C55 28, 48 31, 44 31" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 48 V58" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <rect x="18" y="58" width="24" height="8" rx="4" fill="#ffe38a" stroke="#1f2937" strokeWidth="3" />
    </g>
  );
}

export default function StepIllustration({ type }) {
  return (
    <svg viewBox="0 0 240 120" className="h-28 w-full overflow-visible">
      {type === "release" && (
        <>
          <GroundShadow x={70} y={103} w={38} h={8} />
          <GroundShadow x={176} y={104} w={26} h={7} />
          <ArrowUp x={104} y={20} />
          <CuteCar x={12} y={22} scale={0.74} />
          <ParkingPin x={154} y={16} scale={0.82} />
        </>
      )}

      {type === "occupy" && (
        <>
          <GroundShadow x={64} y={103} w={36} h={8} />
          <GroundShadow x={146} y={104} w={20} h={5} />
          <CuteCar x={8} y={24} scale={0.72} />
          <CuteCar x={112} y={56} scale={0.38} small />
          <ParkingPin x={156} y={16} scale={0.8} />
        </>
      )}

      {type === "reward" && (
        <>
          <StarBurst x={32} y={16} size={14} />
          <StarBurst x={66} y={6} size={16} />
          <StarBurst x={100} y={16} size={14} />
          <GroundShadow x={104} y={104} w={36} h={8} />
          <CuteCar x={50} y={28} scale={0.76} />
          <PointsBubble x={150} y={28} />
        </>
      )}

      {type === "raffle" && (
        <>
          <GiftIcon x={4} y={36} />
          <GroundShadow x={108} y={104} w={34} h={8} />
          <CuteCar x={58} y={32} scale={0.7} />
          <TrophyIcon x={170} y={20} />
          <text
            x="198"
            y="95"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#0f172a"
            fontFamily="Arial, sans-serif"
          >
            SORTEOS
          </text>
          <text
            x="198"
            y="108"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#0f172a"
            fontFamily="Arial, sans-serif"
          >
            EXCLUSIVOS
          </text>
        </>
      )}
    </svg>
  );
}
