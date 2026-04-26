"use client";

import { useState, useCallback } from "react";
import { Trash2, RefreshCw, Loader2, ImageIcon, AlertCircle, Download, ExternalLink } from "lucide-react";
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
  const [confirmDelete, setConfirmDelete] = useState<Card | null>(null);
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
    setConfirmDelete(null);
    setCards((prev) => prev.filter((c) => c.id !== id));
    try {
      const res = await fetch(`/api/cards/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Failed to delete card.");
      }
    } catch (err) {
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
            onRequestDelete={() => setConfirmDelete(card)}
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

      {confirmDelete && (
        <ConfirmDeleteDialog
          card={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete.id)}
        />
      )}
    </div>
  );
}

function CardTile({
  card,
  isDeleting,
  onRequestDelete,
}: {
  card: Card;
  isDeleting: boolean;
  onRequestDelete: () => void;
}) {
  const date = new Date(card.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const filename = `greetify-${card.occasion}-${card.id.slice(0, 8)}.png`;

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border border-[#0d0b18]/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all ${
        isDeleting ? "opacity-40 pointer-events-none" : "hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      }`}
    >
      <div className="aspect-square overflow-hidden bg-[#f7f3ee] pointer-events-none select-none">
        <img
          src={card.imageUrl}
          alt={card.occasion}
          draggable={false}
          className="w-full h-full object-cover"
        />
      </div>

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

      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-stretch justify-center gap-2 p-3">
        <a
          href={card.imageUrl}
          download={filename}
          className="flex items-center gap-1.5 justify-center px-3 py-2 rounded-full bg-white text-[#0d0b18] text-xs font-bold hover:bg-[#f7f3ee] transition-colors"
        >
          <Download className="w-3 h-3" />
          Download
        </a>
        <a
          href={card.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 justify-center px-3 py-2 rounded-full bg-white/90 text-[#0d0b18] text-xs font-bold hover:bg-white transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Open in new tab
        </a>
        <button
          type="button"
          onClick={onRequestDelete}
          className="flex items-center gap-1.5 justify-center px-3 py-2 rounded-full bg-red-500/85 text-white text-xs font-bold hover:bg-red-500 transition-colors cursor-pointer"
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

function ConfirmDeleteDialog({
  card,
  onCancel,
  onConfirm,
}: {
  card: Card;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1">
            <h3
              id="confirm-delete-title"
              className="text-base font-semibold text-[#0d0b18]"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Delete this card?
            </h3>
            <p className="text-sm text-[#7a6f66] mt-1 capitalize">
              {card.occasion.replace(/-/g, " ")} · {OUTPUT_LABELS[card.outputType] ?? card.outputType}
            </p>
            <p className="text-xs text-[#7a6f66] mt-3">
              This will permanently remove the card from your library. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-sm font-semibold text-[#3d3530] hover:bg-[#0d0b18]/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
