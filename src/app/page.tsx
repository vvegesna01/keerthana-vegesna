// No "use client": this runs on the server, so it can read your blog files
import ProfileBrief from "@/components/home/ProfileBrief";
import FeaturedWork from "@/components/home/FeaturedWork";
// Retired Bento Box Showcase (kept commented out per request)
// import ShowcaseBrief from "@/components/home/showCase";
// import { getAllPosts } from "@/lib/blog";

export default function Home() {
  // const posts = getAllPosts();

  return (
    <main className="w-full min-h-screen overflow-x-clip pb-16">
      <ProfileBrief />

      <div id="showcase" className="mt-2 sm:mt-4 md:mt-6">
        <div className="max-w-4xl mx-auto px-6">
          <FeaturedWork />
          {/* <ShowcaseBrief posts={posts} /> */}
        </div>
      </div>
    </main>
  );
}
