"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { useAuth, useClerk } from "@clerk/nextjs";

interface ListItem {
  _id: string;
  name: string;
  isDefault: boolean;
  contains: boolean;
}

interface SaveListBtnProps {
  animeId: number;
}

const OFFSET = 6;

export default function SaveListBtn({ animeId }: SaveListBtnProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lists, setLists] = useState<ListItem[]>([]);
  const [newListName, setNewListName] = useState("");
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isPending, startTransition] = useTransition();

  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* ---------- Mount safety ---------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- Scroll lock---------- */
useEffect(() => {
  if (!open) return;

  const scrollEl = (document.scrollingElement || document.documentElement) as HTMLElement;
  const scrollTop = scrollEl.scrollTop;

  scrollEl.style.overflow = "hidden";
  scrollEl.style.height = "100%";

  const preventScroll = (e: Event) => {
    e.preventDefault();
  };

  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });

  return () => {
    scrollEl.style.overflow = "";
    scrollEl.style.height = "";
    scrollEl.scrollTop = scrollTop;

    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
  };
}, [open]);



  /* ---------- Fetch lists ---------- */
  useEffect(() => {
    if (!open) return;

    fetch(`/api/lists?animeId=${animeId}`)
      .then(res => res.json())
      .then(setLists);
  }, [open, animeId]);

  /* ---------- Position calculation (after render) ---------- */
  useEffect(() => {
    if (!open || !buttonRef.current || !modalRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const modalRect = modalRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - btnRect.bottom;
    const spaceAbove = btnRect.top;

    const openUpwards = spaceBelow < modalRect.height && spaceAbove > modalRect.height;

    setPosition({
      left: btnRect.left,
      top: openUpwards
        ? btnRect.top - modalRect.height - OFFSET
        : btnRect.bottom + OFFSET,
    });
  }, [open, lists.length]);

  /* ---------- Outside click ---------- */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* ---------- Toggle ---------- */
  const handleToggle = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    setOpen(prev => !prev);
  };

  /* ---------- Toggle list ---------- */
  const toggleList = (listId: string) => {
    startTransition(async () => {
      setLists(prev =>
        prev.map(l =>
          l._id === listId ? { ...l, contains: !l.contains } : l
        )
      );

      const res = await fetch("/api/lists/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId, animeId }),
      });

      if (!res.ok) {
        setLists(prev =>
          prev.map(l =>
            l._id === listId ? { ...l, contains: !l.contains } : l
          )
        );
      }
    });
  };

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="text-xl hover:text-primary"
      >
        📂
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed bg-bg-dark text-white rounded-xl shadow-lg w-72 p-4 z-50"
            style={{
              top: position?.top ?? -9999,
              left: position?.left ?? -9999,
            }}
          >
            <h2 className="text-lg font-bold mb-3">Save to…</h2>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {lists.map(list => (
                <label key={list._id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={list.contains}
                    onChange={() => toggleList(list._id)}
                    disabled={isPending}
                    className="accent-primary"
                  />
                  {list.name}
                </label>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 text-xs text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
