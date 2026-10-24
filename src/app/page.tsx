// No "use client": this runs on the server, so it can read your blog files
import ProfileBrief from "@/components/home/ProfileBrief";
import ScrollHint from "@/components/home/ScrollHint";
import ShowcaseBrief from "@/components/home/showCase";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <PageContainer className="flex flex-col justify-between pt-5" size="default">
      <div>
        <ProfileBrief />
        <ScrollHint />
        <ShowcaseBrief posts={posts} />

        <div className="relative flex flex-col items-center mt-10">
          <h1 className="text-localhost_text text-xl leading-10 p-10 animate-fadeIn w-3/4 text-center">
            I&apos;m currently open to full-time software engineering roles focused on
            <span className="highlight-bg"> Backend Systems</span>{", "}
            <span className="highlight-bg"> Cloud Infrastructure</span>{", and"}
            <span className="highlight-bg"> Data Platforms</span>.
            Feel free to reach out for opportunities, collaborations, or just to{" "}
            <Link
              href="/contact"
              className="text-links_color font-semibold underline transition duration-300 hover:text-blue-500"
            >
              connect!
            </Link>
          </h1>
        </div>
      </div>
    </PageContainer>
  );
}