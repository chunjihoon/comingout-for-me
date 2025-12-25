export default function PastelRainbowBg({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Soft pastel rainbow background */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              `
              radial-gradient(1200px 800px at 15% 10%, rgba(255, 204, 229, 0.55), transparent 60%),
              radial-gradient(1000px 700px at 85% 15%, rgba(204, 229, 255, 0.55), transparent 60%),
              radial-gradient(900px 700px at 20% 85%, rgba(204, 255, 229, 0.55), transparent 60%),
              radial-gradient(1000px 800px at 80% 85%, rgba(255, 255, 204, 0.55), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))
            `,
          }}
        />
  
        {/* Subtle grain for premium feel */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />
  
        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    );
  }
  