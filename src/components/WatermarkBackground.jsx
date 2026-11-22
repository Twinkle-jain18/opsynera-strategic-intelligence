/**
 * src/components/WatermarkBackground.jsx
 *
 * Clean, transparent Opsynera crest watermark centered in the background.
 * Uses /logo-watermark.png which has its background removed and alpha transparency
 * baked directly into the PNG.
 */

export default function WatermarkBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-[340px] sm:w-[520px] md:w-[660px] lg:w-[800px] xl:w-[900px] aspect-square flex items-center justify-center">
        <img
          src="/logo-watermark.png"
          alt=""
          className="w-full h-full object-contain"
          style={{
            opacity: 0.085, // Crisp, clearly discernible yet subtle watermark
            transform: 'translateY(10%)', // Moved a bit lower as requested
          }}
        />
      </div>
    </div>
  );
}
