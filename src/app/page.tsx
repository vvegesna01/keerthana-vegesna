// No "use client": this runs on the server, so it can read your blog files
import ProfileBrief from "@/components/home/ProfileBrief";
import ShowcaseBrief from "@/components/home/showCase";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="w-full min-h-screen overflow-x-clip pb-10">
      <ProfileBrief />

      <div id="showcase">
        <div className="max-w-4xl mx-auto px-6">
          <ShowcaseBrief posts={posts} />
        </div>
      </div>
    </main>
  );
}
