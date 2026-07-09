"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, X, Save, Upload, Search,
  ChevronDown, Check, User, Building, Lock, Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FAMOUS_ARTWORKS, type FamousArtwork } from "@/lib/famous-artworks-data";
import { ART_OWNERS, type ArtOwner } from "@/lib/art-owners-data";
import { ARTISTS, type Artist } from "@/lib/artists-data";

// ─── Local editable state ───────────────────────────────────────────────────

type LocType = "museum" | "gallery" | "private" | "destroyed" | "unknown";

interface EditableArtwork {
  slug: string;
  title: string;
  artistSlug: string;
  artistName: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string; // path or preview URL
  imageFile?: File;
  category: "bangladeshi" | "international";
  movement: string;
  tags: string;
  shortDescription: string;
  whyFamous: string;
  creationStory: string;
  technique: string;
  locationType: LocType;
  locationName: string;
  locationCity: string;
  locationCountry: string;
  ownerSlug: string;
}

interface EditableOwner {
  slug: string;
  name: string;
  image: string;
  imageFile?: File;
  coverImage: string;
  title: string;
  location: string;
  bio: string;
  longBio: string;
  collectionFocus: string;
  collectionSlugs: string[];
  contact: string;
  website: string;
  totalWorks: number;
  yearsCollecting: number;
  countries: number;
}

function artworkToEditable(a: FamousArtwork): EditableArtwork {
  const loc = a.currentLocation;
  return {
    slug: a.slug,
    title: a.title,
    artistSlug: a.artistSlug,
    artistName: a.artistName,
    year: a.year,
    medium: a.medium,
    dimensions: a.dimensions ?? "",
    image: a.image,
    category: a.category,
    movement: a.movement,
    tags: a.tags.join(", "),
    shortDescription: a.shortDescription,
    whyFamous: a.whyFamous,
    creationStory: a.creationStory,
    technique: a.technique,
    locationType: loc.type,
    locationName: loc.name,
    locationCity: loc.city ?? "",
    locationCountry: loc.country ?? "",
    ownerSlug: loc.owner?.slug ?? "",
  };
}

function ownerToEditable(o: ArtOwner): EditableOwner {
  return {
    slug: o.slug,
    name: o.name,
    image: o.image,
    coverImage: o.coverImage,
    title: o.title,
    location: o.location,
    bio: o.bio,
    longBio: o.longBio,
    collectionFocus: o.collectionFocus,
    collectionSlugs: [...o.collectionSlugs],
    contact: o.contact ?? "",
    website: o.website ?? "",
    totalWorks: o.stats.totalWorks,
    yearsCollecting: o.stats.yearsCollecting,
    countries: o.stats.countries,
  };
}

const BLANK_ARTWORK: EditableArtwork = {
  slug: "", title: "", artistSlug: "", artistName: "", year: "", medium: "",
  dimensions: "", image: "", category: "bangladeshi", movement: "", tags: "",
  shortDescription: "", whyFamous: "", creationStory: "", technique: "",
  locationType: "museum", locationName: "", locationCity: "", locationCountry: "",
  ownerSlug: "",
};

const BLANK_OWNER: EditableOwner = {
  slug: "", name: "", image: "", coverImage: "", title: "", location: "",
  bio: "", longBio: "", collectionFocus: "", collectionSlugs: [],
  contact: "", website: "", totalWorks: 0, yearsCollecting: 0, countries: 0,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inp = "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500 transition";
const textarea = inp + " resize-none";

function ImageUploadField({ value, onChange }: { value: string; onChange: (url: string, file?: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string, file);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className={inp + " flex-1"}
          placeholder="/images/artworks/filename.png or paste URL"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-semibold px-3 py-2 rounded-xl transition-colors shrink-0"
        >
          <Upload className="w-3.5 h-3.5" /> Upload
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (
        <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
          <Image src={value} alt="preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized={value.startsWith("data:")} />
        </div>
      )}
    </div>
  );
}

// ─── Artwork Form Panel ───────────────────────────────────────────────────────

function ArtworkFormPanel({
  form, setForm, onSave, onClose, isNew, owners, artists,
}: {
  form: EditableArtwork;
  setForm: (f: EditableArtwork) => void;
  onSave: () => void;
  onClose: () => void;
  isNew: boolean;
  owners: EditableOwner[];
  artists: Artist[];
}) {
  const set = (k: keyof EditableArtwork, v: any) => setForm({ ...form, [k]: v });

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-2xl bg-gray-950 border-l border-gray-800 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <div>
            <h2 className="font-bold text-white">{isNew ? "Add Masterwork" : "Edit Masterwork"}</h2>
            <p className="text-gray-500 text-xs mt-0.5">{isNew ? "New artwork entry" : form.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onSave} className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Basic */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" required>
              <input className={inp} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Artwork title" />
            </Field>
            <Field label="Slug" required>
              <input className={inp} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="artwork-slug-url" />
            </Field>
          </div>

          {/* Artist */}
          <Field label="Artist" required>
            <select
              className={inp}
              value={form.artistSlug}
              onChange={e => {
                const artist = artists.find(a => a.slug === e.target.value);
                set("artistSlug", e.target.value);
                if (artist) setForm({ ...form, artistSlug: e.target.value, artistName: artist.name });
              }}
            >
              <option value="">— Select Artist —</option>
              {artists.map(a => (
                <option key={a.slug} value={a.slug}>{a.name}</option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Year" required>
              <input className={inp} value={form.year} onChange={e => set("year", e.target.value)} placeholder="1974" />
            </Field>
            <Field label="Category">
              <select className={inp} value={form.category} onChange={e => set("category", e.target.value as any)}>
                <option value="bangladeshi">Bangladeshi</option>
                <option value="international">International</option>
              </select>
            </Field>
            <Field label="Movement">
              <input className={inp} value={form.movement} onChange={e => set("movement", e.target.value)} placeholder="Expressionism" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Medium" required>
              <input className={inp} value={form.medium} onChange={e => set("medium", e.target.value)} placeholder="Oil on canvas" />
            </Field>
            <Field label="Dimensions">
              <input className={inp} value={form.dimensions} onChange={e => set("dimensions", e.target.value)} placeholder="168 × 256 cm" />
            </Field>
          </div>

          <Field label="Tags (comma-separated)">
            <input className={inp} value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="oil, figurative, bangladesh, iconic" />
          </Field>

          {/* Image */}
          <Field label="Artwork Image" required>
            <ImageUploadField
              value={form.image}
              onChange={(url, file) => setForm({ ...form, image: url, imageFile: file })}
            />
          </Field>

          {/* Descriptions */}
          <Field label="Short Description" required>
            <textarea className={textarea} rows={3} value={form.shortDescription} onChange={e => set("shortDescription", e.target.value)} placeholder="One paragraph summary…" />
          </Field>
          <Field label="Why Famous">
            <textarea className={textarea} rows={5} value={form.whyFamous} onChange={e => set("whyFamous", e.target.value)} placeholder="Why this artwork is significant…" />
          </Field>
          <Field label="Creation Story">
            <textarea className={textarea} rows={4} value={form.creationStory} onChange={e => set("creationStory", e.target.value)} placeholder="How it was created…" />
          </Field>
          <Field label="Technique">
            <textarea className={textarea} rows={3} value={form.technique} onChange={e => set("technique", e.target.value)} placeholder="Technical details…" />
          </Field>

          {/* Location */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Location</p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location Type">
                <select className={inp} value={form.locationType} onChange={e => set("locationType", e.target.value as LocType)}>
                  <option value="museum">Museum</option>
                  <option value="gallery">Gallery</option>
                  <option value="private">Private Collection</option>
                  <option value="destroyed">Destroyed</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
              <Field label="Venue / Collection Name">
                <input className={inp} value={form.locationName} onChange={e => set("locationName", e.target.value)} placeholder="Bangladesh National Museum" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City">
                <input className={inp} value={form.locationCity} onChange={e => set("locationCity", e.target.value)} placeholder="Dhaka" />
              </Field>
              <Field label="Country">
                <input className={inp} value={form.locationCountry} onChange={e => set("locationCountry", e.target.value)} placeholder="Bangladesh" />
              </Field>
            </div>

            {form.locationType === "private" && (
              <Field label="Private Owner">
                <select className={inp} value={form.ownerSlug} onChange={e => set("ownerSlug", e.target.value)}>
                  <option value="">— No owner selected —</option>
                  {owners.map(o => (
                    <option key={o.slug} value={o.slug}>{o.name}</option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Owner Form Panel ─────────────────────────────────────────────────────────

function OwnerFormPanel({
  form, setForm, onSave, onClose, isNew, artworks,
}: {
  form: EditableOwner;
  setForm: (f: EditableOwner) => void;
  onSave: () => void;
  onClose: () => void;
  isNew: boolean;
  artworks: EditableArtwork[];
}) {
  const set = (k: keyof EditableOwner, v: any) => setForm({ ...form, [k]: v });

  function toggleArtwork(slug: string) {
    const has = form.collectionSlugs.includes(slug);
    set("collectionSlugs", has
      ? form.collectionSlugs.filter(s => s !== slug)
      : [...form.collectionSlugs, slug]
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-2xl bg-gray-950 border-l border-gray-800 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <div>
            <h2 className="font-bold text-white">{isNew ? "Add Art Owner" : "Edit Art Owner"}</h2>
            <p className="text-gray-500 text-xs mt-0.5">{isNew ? "New collector / owner" : form.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onSave} className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" required>
              <input className={inp} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Collector name" />
            </Field>
            <Field label="Slug" required>
              <input className={inp} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="collector-slug" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title / Role">
              <input className={inp} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Art Collector & Patron" />
            </Field>
            <Field label="Location">
              <input className={inp} value={form.location} onChange={e => set("location", e.target.value)} placeholder="Dhaka, Bangladesh" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact Email">
              <input className={inp} value={form.contact} onChange={e => set("contact", e.target.value)} placeholder="contact@email.com" />
            </Field>
            <Field label="Website">
              <input className={inp} value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://example.com" />
            </Field>
          </div>

          <Field label="Profile Image">
            <ImageUploadField
              value={form.image}
              onChange={(url, file) => setForm({ ...form, image: url, imageFile: file })}
            />
          </Field>

          <Field label="Cover / Banner Image">
            <ImageUploadField
              value={form.coverImage}
              onChange={(url) => set("coverImage", url)}
            />
          </Field>

          <Field label="Short Bio" required>
            <textarea className={textarea} rows={3} value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Brief description…" />
          </Field>
          <Field label="Full Bio">
            <textarea className={textarea} rows={5} value={form.longBio} onChange={e => set("longBio", e.target.value)} placeholder="Detailed biography…" />
          </Field>
          <Field label="Collection Focus">
            <input className={inp} value={form.collectionFocus} onChange={e => set("collectionFocus", e.target.value)} placeholder="Bangladeshi modern art, 1940s–1990s…" />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Total Works">
              <input type="number" className={inp} value={form.totalWorks} onChange={e => set("totalWorks", Number(e.target.value))} />
            </Field>
            <Field label="Years Collecting">
              <input type="number" className={inp} value={form.yearsCollecting} onChange={e => set("yearsCollecting", Number(e.target.value))} />
            </Field>
            <Field label="Countries">
              <input type="number" className={inp} value={form.countries} onChange={e => set("countries", Number(e.target.value))} />
            </Field>
          </div>

          {/* Artwork assignment */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-rose-400" /> Assigned Artworks
              <span className="text-gray-600 font-normal normal-case tracking-normal">({form.collectionSlugs.length} selected)</span>
            </p>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {artworks.map(a => {
                const checked = form.collectionSlugs.includes(a.slug);
                return (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => toggleArtwork(a.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                      checked ? "bg-rose-600/15 border border-rose-600/40" : "bg-gray-800 border border-transparent hover:border-gray-600"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors", checked ? "bg-rose-600 border-rose-600" : "border-gray-600")}>
                      {checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium truncate", checked ? "text-white" : "text-gray-400")}>{a.title}</p>
                      <p className="text-xs text-gray-600 truncate">{a.artistName} · {a.year}</p>
                    </div>
                    {a.image && (
                      <div className="w-10 h-8 rounded-lg overflow-hidden bg-gray-700 shrink-0 relative">
                        <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized={a.image.startsWith("data:")} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Tab = "artworks" | "owners" | "assignments";

export default function SuperAdminMasterworks() {
  const [tab, setTab] = useState<Tab>("artworks");
  const [search, setSearch] = useState("");

  // Artworks state
  const [artworks, setArtworks] = useState<EditableArtwork[]>(
    FAMOUS_ARTWORKS.map(artworkToEditable)
  );
  const [artworkForm, setArtworkForm] = useState<EditableArtwork | null>(null);
  const [artworkIsNew, setArtworkIsNew] = useState(false);

  // Owners state
  const [owners, setOwners] = useState<EditableOwner[]>(
    ART_OWNERS.map(ownerToEditable)
  );
  const [ownerForm, setOwnerForm] = useState<EditableOwner | null>(null);
  const [ownerIsNew, setOwnerIsNew] = useState(false);

  const [saved, setSaved] = useState<string | null>(null);

  function flash(msg: string) {
    setSaved(msg);
    setTimeout(() => setSaved(null), 2500);
  }

  // Artwork CRUD
  function openNewArtwork() { setArtworkForm({ ...BLANK_ARTWORK }); setArtworkIsNew(true); }
  function openEditArtwork(a: EditableArtwork) { setArtworkForm({ ...a }); setArtworkIsNew(false); }
  function saveArtwork() {
    if (!artworkForm) return;
    if (artworkIsNew) {
      setArtworks(prev => [artworkForm, ...prev]);
    } else {
      setArtworks(prev => prev.map(a => a.slug === artworkForm.slug ? artworkForm : a));
    }
    setArtworkForm(null);
    flash("Artwork saved!");
  }
  function deleteArtwork(slug: string) {
    if (!confirm("Delete this artwork?")) return;
    setArtworks(prev => prev.filter(a => a.slug !== slug));
    flash("Artwork deleted.");
  }

  // Owner CRUD
  function openNewOwner() { setOwnerForm({ ...BLANK_OWNER }); setOwnerIsNew(true); }
  function openEditOwner(o: EditableOwner) { setOwnerForm({ ...o }); setOwnerIsNew(false); }
  function saveOwner() {
    if (!ownerForm) return;
    if (ownerIsNew) {
      setOwners(prev => [ownerForm, ...prev]);
    } else {
      setOwners(prev => prev.map(o => o.slug === ownerForm.slug ? ownerForm : o));
    }
    setOwnerForm(null);
    flash("Owner saved!");
  }
  function deleteOwner(slug: string) {
    if (!confirm("Delete this owner?")) return;
    setOwners(prev => prev.filter(o => o.slug !== slug));
    flash("Owner deleted.");
  }

  // Quick assign: change artwork's artist
  function reassignArtist(artworkSlug: string, artistSlug: string) {
    const artist = ARTISTS.find(a => a.slug === artistSlug);
    setArtworks(prev => prev.map(a =>
      a.slug === artworkSlug
        ? { ...a, artistSlug, artistName: artist?.name ?? a.artistName }
        : a
    ));
    flash("Artist reassigned!");
  }

  // Quick assign: change artwork's owner
  function reassignOwner(artworkSlug: string, ownerSlug: string) {
    setArtworks(prev => prev.map(a =>
      a.slug === artworkSlug ? { ...a, ownerSlug, locationType: ownerSlug ? "private" : a.locationType } : a
    ));
    flash("Owner assigned!");
  }

  const filteredArtworks = artworks.filter(a => {
    const q = search.toLowerCase();
    return !search || a.title.toLowerCase().includes(q) || a.artistName.toLowerCase().includes(q) || a.movement.toLowerCase().includes(q);
  });

  const LOC_ICON: Record<string, React.ReactNode> = {
    museum: <Building className="w-3 h-3" />,
    gallery: <Building className="w-3 h-3" />,
    private: <Lock className="w-3 h-3" />,
    destroyed: <X className="w-3 h-3" />,
    unknown: <X className="w-3 h-3" />,
  };
  const LOC_COLOR: Record<string, string> = {
    museum: "bg-blue-900/30 text-blue-400",
    gallery: "bg-purple-900/30 text-purple-400",
    private: "bg-amber-900/30 text-amber-400",
    destroyed: "bg-red-900/30 text-red-400",
    unknown: "bg-gray-700 text-gray-500",
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Masterworks Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {artworks.length} artworks · {owners.length} owners · {ARTISTS.length} artists
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 bg-emerald-900/30 border border-emerald-700/40 text-emerald-400 text-xs font-semibold px-3 py-2 rounded-xl">
              <Check className="w-3.5 h-3.5" /> {saved}
            </span>
          )}
          {tab === "artworks" && (
            <button onClick={openNewArtwork} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add Masterwork
            </button>
          )}
          {tab === "owners" && (
            <button onClick={openNewOwner} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add Owner
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 w-fit">
        {([
          { key: "artworks", label: "Artworks", count: artworks.length },
          { key: "owners", label: "Art Owners", count: owners.length },
          { key: "assignments", label: "Artist & Owner Assignments" },
        ] as { key: Tab; label: string; count?: number }[]).map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => { setTab(key); setSearch(""); }}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === key ? "bg-rose-600 text-white" : "text-gray-400 hover:text-white")}
          >
            {label}
            {count !== undefined && <span className="ml-1.5 text-xs opacity-70">({count})</span>}
          </button>
        ))}
      </div>

      {/* ── ARTWORKS TAB ── */}
      {tab === "artworks" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title, artist, movement…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Artwork", "Artist", "Year", "Medium", "Category", "Location", "Owner", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredArtworks.map(a => {
                  const owner = owners.find(o => o.slug === a.ownerSlug);
                  return (
                    <tr key={a.slug} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-gray-800 shrink-0 relative border border-gray-700">
                            {a.image && <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized={a.image.startsWith("data:")} />}
                          </div>
                          <p className="text-white font-medium text-sm">{a.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{a.artistName}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{a.year}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs max-w-32 truncate">{a.medium}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded", a.category === "bangladeshi" ? "bg-rose-900/30 text-rose-400" : "bg-blue-900/30 text-blue-400")}>
                          {a.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded w-fit", LOC_COLOR[a.locationType])}>
                          {LOC_ICON[a.locationType]} {a.locationType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {owner ? <span className="text-amber-400">{owner.name}</span> : <span className="text-gray-700">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => openEditArtwork(a)} className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteArtwork(a.slug)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── OWNERS TAB ── */}
      {tab === "owners" && (
        <div className="space-y-4">
          {owners.map(o => (
            <div key={o.slug} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shrink-0 relative">
                {o.image && <Image src={o.image} alt={o.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                {!o.image && <User className="w-6 h-6 text-gray-600 absolute inset-0 m-auto" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-bold text-base">{o.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{o.title} · {o.location}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEditOwner(o)} className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => deleteOwner(o.slug)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{o.bio}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                  <span>{o.totalWorks} works</span>
                  <span>{o.yearsCollecting} years collecting</span>
                  <span>{o.countries} countries</span>
                </div>
                {/* Assigned artworks chips */}
                {o.collectionSlugs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {o.collectionSlugs.map(slug => {
                      const art = artworks.find(a => a.slug === slug);
                      return (
                        <span key={slug} className="text-[10px] bg-rose-900/20 text-rose-400 border border-rose-800/30 px-2 py-0.5 rounded-full">
                          {art?.title ?? slug}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
          {owners.length === 0 && (
            <div className="text-center py-20 text-gray-600">No owners yet. Add one.</div>
          )}
        </div>
      )}

      {/* ── ASSIGNMENTS TAB ── */}
      {tab === "assignments" && (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Quickly reassign which artist created each artwork, and which owner holds it.</p>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Artwork", "Current Artist", "Reassign Artist", "Location Type", "Owner", "Reassign Owner"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {artworks.map(a => (
                  <tr key={a.slug} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-8 rounded-lg overflow-hidden bg-gray-800 shrink-0 relative border border-gray-700">
                          {a.image && <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized={a.image.startsWith("data:")} />}
                        </div>
                        <p className="text-white font-medium text-sm">{a.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.artistName}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.artistSlug}
                        onChange={e => reassignArtist(a.slug, e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-rose-500 max-w-48"
                      >
                        <option value="">— Unknown —</option>
                        {ARTISTS.map(ar => (
                          <option key={ar.slug} value={ar.slug}>{ar.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded", LOC_COLOR[a.locationType])}>
                        {a.locationType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {owners.find(o => o.slug === a.ownerSlug)?.name ?? <span className="text-gray-700">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.ownerSlug}
                        onChange={e => reassignOwner(a.slug, e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-rose-500 max-w-48"
                      >
                        <option value="">— No private owner —</option>
                        {owners.map(o => (
                          <option key={o.slug} value={o.slug}>{o.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Panels */}
      {artworkForm && (
        <ArtworkFormPanel
          form={artworkForm}
          setForm={setArtworkForm}
          onSave={saveArtwork}
          onClose={() => setArtworkForm(null)}
          isNew={artworkIsNew}
          owners={owners}
          artists={ARTISTS}
        />
      )}
      {ownerForm && (
        <OwnerFormPanel
          form={ownerForm}
          setForm={setOwnerForm}
          onSave={saveOwner}
          onClose={() => setOwnerForm(null)}
          isNew={ownerIsNew}
          artworks={artworks}
        />
      )}
    </div>
  );
}
