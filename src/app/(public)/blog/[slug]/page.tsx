"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Tag, BookOpen, ArrowRight } from "lucide-react";
import { BLOG_POSTS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/blog-data";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="font-heading text-2xl font-bold text-gray-900 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="font-heading text-xl font-bold text-gray-900 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-gray-700 leading-relaxed ml-4 mb-1 list-disc">
          {parseInline(line.slice(2))}
        </li>
      );
    } else if (/^\d+\. /.test(line)) {
      elements.push(
        <li key={key++} className="text-gray-700 leading-relaxed ml-4 mb-1 list-decimal">
          {parseInline(line.replace(/^\d+\. /, ""))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-3" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-700 leading-relaxed mb-2">
          {parseInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function parseInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === slug && p.published);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.published && p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Cover */}
      <div className="relative h-72 md:h-96 bg-gray-900 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="flex items-center gap-1 text-white/70 text-xs">
              <Clock className="w-3 h-3" /> {post.readTime} min read
            </span>
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Magazine
        </Link>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {post.authorName[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{post.authorName}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-rose-500 pl-5 italic">
          {post.excerpt}
        </p>

        {/* Content */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
            <span className="text-xs text-gray-400 uppercase tracking-wider self-center">Tags:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-rose-600" />
              <h2 className="font-heading text-lg font-bold text-gray-900">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-rose-100 transition-all">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-rose-700 transition-colors mb-2">
                      {rel.title}
                    </p>
                    <span className="text-xs text-rose-600 flex items-center gap-0.5">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
