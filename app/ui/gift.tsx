"use client";
import { useState } from "react";
import GiftModal from "@/app/ui/gift-modal";
import { Gift, FullGift } from "../lib/definitions";
import { ToastContainer, toast } from "react-toastify";

type GiftCardProps = {
  gift: Gift;
  currentDay: boolean;
};

export default function GiftBox({ gift, currentDay }: GiftCardProps) {
  const [selectedGift, setSelectedGift] = useState<FullGift | null>(
    isFullGift(gift) ? gift : null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function isFullGift(gift: Gift): gift is FullGift {
    return "name" in gift && "description" in gift;
  }

  async function handleSelectGift() {
    console.log("is fuill gift", selectedGift);
    console.log(isFullGift(gift));
    if (selectedGift) {
      setIsModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/gifts/${gift.calendar_id}/${gift.day}`, {
        method: "GET",
      });

      if (res.status === 403) {
        toast(`You can only open this gift on day ${gift.day}`);
        return;
      }

      if (!res.ok) {
        toast("Couldn’t load this gift, sorry!");
        return;
      }

      const fullGift: FullGift = await res.json();

      setSelectedGift(fullGift);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className={
          gift.disabled
            ? "opacity-40 grayscale cursor-not-allowed"
            : "cursor-pointer"
        }
        onClick={handleSelectGift}
        disabled={loading || gift.disabled}
      >
        <img
          className={`size-24 ${
            currentDay && !gift.opened ? "animate-bounce" : ""
          }`}
          src="/present1.png"
          alt="present"
        ></img>
      </button>
      <ToastContainer />

      <GiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gift={selectedGift}
      />
    </div>
  );
}
