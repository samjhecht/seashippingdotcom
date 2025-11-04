"use client";

import { trackCTAClick } from "@/lib/analytics";
import { COMPANY_INFO } from "@/lib/constants";
import { images, imageSizes } from "@/lib/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const heroImage = images.hero.main;

  return (
    <section
      className="relative h-[500px] md:h-[600px] flex items-center justify-center"
      aria-label="Hero banner"
    >
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority={heroImage.priority}
        className="object-cover"
        sizes={imageSizes.hero}
        quality={90}
      />
      {/* Subtle dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-[5]" aria-hidden="true" />
      <div
        className="relative z-10 text-center text-white px-4 max-w-4xl"
        style={{
          textShadow: "3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {COMPANY_INFO.tagline}
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          {COMPANY_INFO.yearsOfExperience} Years of Global Shipping Excellence
        </p>
        <button
          onClick={() => {
            trackCTAClick("Get a Quote", "Hero");
            router.push("/request");
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-white"
          style={{ backgroundColor: "#ee1c23" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#d6191f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ee1c23")
          }
        >
          Get a Quote
        </button>
      </div>
    </section>
  );
}
