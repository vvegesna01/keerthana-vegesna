import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

function getReadingTime(text: string) {
  const wordsPerMinute = 250;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: String(data.date),
      description: data.description,
      tags: data.tags || [],
      content,
      readingTime: getReadingTime(content),
    };
  });

  // 🔥 Sort newest → oldest
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByTag(tag: string) {
  const posts = getAllPosts();

  return posts.filter((post) =>
    post.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags() {
  const posts = getAllPosts();

  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag: string) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}
