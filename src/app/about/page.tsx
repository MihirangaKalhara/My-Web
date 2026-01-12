import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Navigation Back */}
      <nav className="max-w-4xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2 items-center">
        {/* Profile Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src="/profile.jpg"
            alt="Mihiranga Kalhara"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              With over 8 years of experience in the tech industry, I bridge the gap between design and engineering. My approach is rooted in the belief that software should not only work perfectly but also feel natural and intuitive.
            </p>
            <p>
              I have led teams at Fortune 500 companies and helped startups launch from zero to one. Currently, I focus on the React ecosystem, specifically Next.js, leveraging the power of Server Components to build blazing fast applications.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Experience", value: "8+ Years" },
              { label: "Projects", value: "50+ Delivered" },
              { label: "Clients", value: "Global" },
              { label: "Focus", value: "React / UX" }
            ].map((stat, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/5 p-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}