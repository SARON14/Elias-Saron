import { Hero } from "@/features/hero/components/hero";
import { CountdownSection } from "@/features/hero/components/countdown-section";
import { OurStory } from "@/features/story/components/our-story";
import { EventInfo } from "@/features/info/components/event-info";
import { FeaturedMoments } from "@/features/gallery/components/featured-moments";
import { MemoryGallery } from "@/features/gallery/components/memory-gallery";
import { PhotoUpload } from "@/features/gallery/components/photo-upload";
import { TelegramJoin } from "@/features/info/components/telegram-join";
import { Footer } from "@/features/navigation/components/footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-off-white">
      <Hero />
      <CountdownSection />
      <OurStory />
      <EventInfo />
      <FeaturedMoments />
      <MemoryGallery />
      <PhotoUpload />
      <TelegramJoin />
      <Footer />
    </main>

  );
}
