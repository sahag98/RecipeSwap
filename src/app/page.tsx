import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-center">
      <Hero />
    </main>
  );
}
