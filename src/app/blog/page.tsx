import { getAllPosts } from "@/lib/blog";
import BlogClientPage from "./BlogClientPage";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContainer size="default">
      
      <PageHeader
        title="My Field Notes"
        subtitle="Notes, ideas, and things I keep thinking about, pulled from my Obsidian vault."
      />

      <BlogClientPage posts={posts} />

    </PageContainer>
  );
}