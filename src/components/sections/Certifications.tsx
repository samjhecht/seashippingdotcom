import Image from 'next/image';

export function Certifications() {
  return (
    <section className="py-8" aria-labelledby="certifications-heading">
      <div className="container mx-auto px-4">
        <h2 id="certifications-heading" className="text-2xl font-bold mb-8 text-center">
          Memberships | Associations | Affiliations
        </h2>

        {/* Association Icons Banner */}
        <div className="flex justify-center">
          <Image
            src="/images/certifications/ssl-association-icons.png"
            alt="Sea Shipping Line Memberships, Associations and Affiliations"
            width={1024}
            height={54}
            className="max-w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
