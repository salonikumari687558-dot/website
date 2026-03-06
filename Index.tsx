import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { posts, categories } from "@/data/posts";
import PostCard from "@/components/PostCard";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="gradient-hero px-4 py-20 text-center md:py-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
          Your Gateway to Insightful Articles & Trending Topics
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Creative stories, life hacks, and everything you didn't know you needed to read.
        </p>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Latest Stories</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No posts found in this category.</p>
        )}
      </section>
    </main>
  );
};

export default Index;
