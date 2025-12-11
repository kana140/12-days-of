import { useState, useEffect } from "react";
import { FullGift } from "../lib/definitions";
import { SpriteAnimator } from "react-sprite-animator";
import giftopening from "@/public/present-sprite-opening.png";
// import useSound from "use-sound";
// import pop from "@/public/sounds/pop.mp3";

export default function GiftModal({
  isOpen,
  onClose,
  gift,
}: {
  isOpen: boolean;
  onClose: () => void;
  gift: FullGift | null;
}) {
  const [phase, setPhase] = useState<"animating" | "revealed">("animating");
  useEffect(() => {
    if (isOpen) {
      setPhase("animating");
      const timer = setTimeout(() => {
        setPhase("revealed");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !gift) return null;
  console.log(gift.link);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 rounded-full px-2 text-sm text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {phase === "animating" && (
          <div className="flex flex-col items-center justify-center py-10">
            <SpriteAnimator
              sprite={giftopening.src}
              width={515}
              height={540}
              fps={4}
              direction="horizontal"
              frameCount={3}
              scale={3}
            />
            {/* <div className="mb-4 h-24 w-24 animate-bounce rounded-xl bg-pink-200" /> */}
            <p className="text-sm text-gray-600">Opening your gift…</p>
            <button
              className="mt-4 text-xs text-gray-500 underline"
              onClick={() => setPhase("revealed")}
            >
              Skip animation
            </button>
          </div>
        )}

        {phase === "revealed" && (
          <div className="space-y-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold">{gift.name}</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {gift.description}
            </p>

            {gift.image && (
              <div className="overflow-hidden rounded-xl border">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="h-48 w-full object-cover"
                />
              </div>
            )}

            {gift.link != "" ? (
              gift.link && (
                <a
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-pink-600 underline"
                >
                  Open your surprise 🎁
                </a>
              )
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
