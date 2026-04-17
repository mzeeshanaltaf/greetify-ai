"use client";

import { useState, useCallback } from "react";
import { Trash2, RefreshCw, Loader2, ImageIcon, AlertCircle } from "lucide-react";
import type { Card } from "@/lib/db/schema";

const OUTPUT_LABELS: Record<string, string> = {
  ecard: "E-Card",
  poster: "Poster",
  flyer: "Flyer",
};

interface Props {
  initialCards: Card[];
  initialNextCursor: string | null;
}

export default function LibraryClient({ initialCards, initialNextCursor }: Props) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    setError("");
    try {
      const res = await fetch(`/api/cards?limit=20&cursor=${encodeURIComponent(nextCursor)}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? "Failed to load more.");
      setCards((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError("");
    // Optimistic removal
    setCards((prev) => prev.filter((c) => c.id !== id));
    try {
      const res = await fetch(`/api/cards/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        // Restore on failure
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Failed to delete card.");
      }
    } catch (err) {
      // Restore card
      setCards((prev) => {
        const card = initialCards.find((c) => c.id === id);
        return card ? [...prev, card].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : prev;
      });
      setError(err instanceof Error ? err.message : "Could not delete card.");
    } finally {
      setDeletingId(null);
    }
  };

  if (cards.length === 0 && !loadingMore) {
    return (
      <div className="text-center py-20">
        <ImageIcon className="w-14 h-14 text-[#7a6f66]/30 mx-auto mb-5" />
        <p className="text-[#7a6f66] text-sm mb-2">Your library is empty.</p>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[#d4a853] font-semibold hover:underline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Generate your first card
        </a>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs mb-6">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            isDeleting={deletingId === card.id}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {nextCursor && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#0d0b18]/20 text-sm text-[#3d3530] font-semibold hover:border-[#d4a853] hover:text-[#d4a853] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading…
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function CardTile({
  card,
  isDeleting,
  onDelete,
}: {
  card: Card;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}) {
  const date = new Date(card.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border border-[#0d0b18]/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all ${
        isDeleting ? "opacity-40 pointer-events-none" : "hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      }`}
    >
      {/* Thumbnail */}
      <div className="aspect-square overflow-hidden bg-[#f7f3ee]">
        <img
          src={card.imageUrl}
          alt={card.occasion}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-semibold text-[#0d0b18] truncate capitalize">
          {card.occasion.replace(/-/g, " ")}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-[#7a6f66]">
            {OUTPUT_LABELS[card.outputType] ?? card.outputType} · {date}
          </span>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
        <a
          href={`/dashboard?from=${card.id}`}
          className="flex items-center gap-1.5 w-full justify-center px-3 py-2 rounded-full bg-white text-[#0d0b18] text-xs font-bold hover:bg-[#f7f3ee] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Use again
        </a>
        <button
          type="button"
          onClick={() => onDelete(card.id)}
          className="flex items-center gap-1.5 w-full justify-center px-3 py-2 rounded-full bg-red-500/80 text-white text-xs font-bold hover:bg-red-500 transition-colors cursor-pointer"
        >
          {isDeleting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Trash2 className="w-3 h-3" />
          )}
          Delete
        </button>
      </div>
    </div>
  );
}
