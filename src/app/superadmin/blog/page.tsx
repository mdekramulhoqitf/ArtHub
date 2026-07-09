"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, X, Save, Search, Eye, EyeOff,
  BookOpen, Clock, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_POSTS, CATEGORY_LABELS, CATEGORY_COLORS,
  type BlogPost, type BlogCategory,
} from "@/lib/blog-data";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as BlogCategory[];

const EMPTY: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "GUIDE",
  tags: [],
  authorName: "",
  authorAvatar: undefined,
  readTime: 5,
  published: false,
  createdAt: new Date().toISOString(),
};

export default function SuperAdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<BlogCategory | "ALL">("ALL");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  const filtered = posts.filter((p) => {
    const matchCat = categoryFilter === "ALL" || p.category === categoryFilter;
    const q = search.toLowerCase();
    return matchCat && (!q || p.title.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q));
  });

  function openNew() {
    setEditing({ ...EMPTY, createdAt: new Date().toISOString() });
    setIsNew(true);
    setTagInput("");
  }

  function openEdit(post: BlogPost) {
    setEditing({ ...post });
    setIsNew(false);
    setTagInput("");
  }

  function closeEdit() {
    setEditing(null);
    setIsNew(false);
  }

  function savePost() {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").trim();
    const toSave = { ...editing, slug };
    if (isNew) {
      setPosts((prev) => [toSave, ...prev]);
    } else {
      setPosts((prev) => prev.map((p) => (p.slug === toSave.slug ? toSave : p)));
    }
    closeEdit();
  }

  function deletePost(slug: string) {
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
    setDeleteSlug(null);
  }

  function togglePublished(slug: string) {
    setPosts((prev) => prev.map((p) => (p.slug === slug ? { ...p, published: !p.published } : p)));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (!tag || !editing) return;
    if (!editing.tags.includes(tag)) {
      setEditing((prev) => prev ? { ...prev, tags: [...prev.tags, tag] } : prev);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setEditing((prev) => prev ? { ...prev, tags: prev.tags.filter((t) => t !== tag) } : prev);
  }

  const pub = posts.filter((p) => p.published).length;
  const draft = posts.filter((p) => !p.published).length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-500" /> Blog / Magazine
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{pub} published · {draft} draft</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 w-52"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["ALL", ...ALL_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as any)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                categoryFilter === cat
                  ? "bg-rose-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              {cat === "ALL" ? "All" : CATEGORY_LABELS[cat as BlogCategory]}
            </button>
          ))}
        </div>
      </div>

      {/* Posts table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Post</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Author</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((post) => (
              <tr key={post.slug} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {post.coverImage && (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        <Image src={post.coverImage} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white text-sm line-clamp-1">{post.title}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[post.category])}>
                    {CATEGORY_LABELS[post.category]}
                  </span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <p className="text-gray-300 text-xs">{post.authorName}</p>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <button
                    onClick={() => togglePublished(post.slug)}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors",
                      post.published
                        ? "bg-emerald-900/50 text-emerald-400 hover:bg-emerald-900"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    )}
                  >
                    {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {post.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => openEdit(post)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteSlug(post.slug)}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-gray-500 text-sm">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="font-bold text-white text-lg">{isNew ? "New Blog Post" : "Edit Blog Post"}</h2>
              <button onClick={closeEdit} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Title *</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing((p) => p ? { ...p, title: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500"
                  placeholder="Article title…"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Slug</label>
                <input
                  value={editing.slug}
                  onChange={(e) => setEditing((p) => p ? { ...p, slug: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500 font-mono"
                  placeholder="auto-generated-if-blank"
                />
              </div>

              {/* Category + ReadTime */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing((p) => p ? { ...p, category: e.target.value as BlogCategory } : p)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Read Time (min)</label>
                  <input
                    type="number"
                    min={1}
                    value={editing.readTime}
                    onChange={(e) => setEditing((p) => p ? { ...p, readTime: Number(e.target.value) } : p)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Author Name *</label>
                <input
                  value={editing.authorName}
                  onChange={(e) => setEditing((p) => p ? { ...p, authorName: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500"
                  placeholder="Author's name…"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Cover Image URL</label>
                <input
                  value={editing.coverImage}
                  onChange={(e) => setEditing((p) => p ? { ...p, coverImage: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500"
                  placeholder="https://…"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Excerpt *</label>
                <textarea
                  rows={3}
                  value={editing.excerpt}
                  onChange={(e) => setEditing((p) => p ? { ...p, excerpt: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500 resize-none"
                  placeholder="Short description shown in listing…"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Content (Markdown)</label>
                <textarea
                  rows={12}
                  value={editing.content}
                  onChange={(e) => setEditing((p) => p ? { ...p, content: e.target.value } : p)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500 resize-y font-mono"
                  placeholder="## Heading&#10;&#10;Paragraph text here…"
                />
                <p className="text-[10px] text-gray-500 mt-1">Supports ## headings, **bold**, *italic*, - lists, numbered lists</p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-rose-500"
                    placeholder="Add tag + Enter…"
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editing.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing((p) => p ? { ...p, published: !p.published } : p)}
                  className={cn(
                    "relative inline-flex items-center w-11 h-6 rounded-full transition-colors",
                    editing.published ? "bg-rose-600" : "bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "absolute w-4 h-4 rounded-full bg-white shadow transition-transform",
                    editing.published ? "translate-x-6" : "translate-x-1"
                  )} />
                </button>
                <span className="text-sm text-gray-300">{editing.published ? "Published" : "Draft"}</span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
              <button onClick={closeEdit} className="px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-xl transition-colors">
                Cancel
              </button>
              <button
                onClick={savePost}
                disabled={!editing.title.trim() || !editing.excerpt.trim() || !editing.authorName.trim()}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <Save className="w-4 h-4" /> {isNew ? "Create Post" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteSlug && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-white mb-2">Delete Post?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone. The post will be permanently removed.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteSlug(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl transition-colors">
                Cancel
              </button>
              <button
                onClick={() => deletePost(deleteSlug)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
