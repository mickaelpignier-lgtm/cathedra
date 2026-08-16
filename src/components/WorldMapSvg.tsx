export function WorldMapSvg() {
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.15 }}
    >
      {/* Landmasses in light gray */}
      <g fill="#F2EFE9" stroke="none">
        {/* North America */}
        <path d="M 100 120 L 150 100 L 160 150 L 140 180 L 100 160 Z" />
        {/* Central America */}
        <path d="M 140 180 L 150 200 L 145 210 L 135 200 Z" />
        {/* South America */}
        <path d="M 135 210 L 160 210 L 165 320 L 140 330 L 130 250 Z" />
        {/* Europe */}
        <path d="M 350 100 L 420 90 L 430 140 L 370 150 Z" />
        {/* Africa */}
        <path d="M 380 150 L 450 140 L 480 320 L 410 330 L 370 200 Z" />
        {/* Middle East */}
        <path d="M 450 140 L 500 130 L 510 200 L 480 210 Z" />
        {/* Asia North */}
        <path d="M 400 50 L 650 40 L 680 120 L 450 130 Z" />
        {/* India/South Asia */}
        <path d="M 500 200 L 550 190 L 560 240 L 510 250 Z" />
        {/* Southeast Asia */}
        <path d="M 550 200 L 620 210 L 630 280 L 560 270 Z" />
        {/* China/East Asia */}
        <path d="M 550 120 L 650 110 L 670 170 L 580 180 Z" />
        {/* Japan */}
        <path d="M 660 140 L 680 135 L 685 160 L 665 165 Z" />
        {/* Australia */}
        <path d="M 680 320 L 730 310 L 740 380 L 700 390 Z" />
        {/* New Zealand */}
        <path d="M 750 350 L 770 345 L 775 390 L 755 395 Z" />
        {/* Greenland */}
        <path d="M 420 30 L 450 25 L 455 80 L 425 75 Z" />
      </g>
    </svg>
  );
}
