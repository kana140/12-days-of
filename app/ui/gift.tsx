"use client";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import GiftModal from "@/app/ui/gift-modal";
import { Gift } from "../lib/definitions";

type GiftCardProps = {
  gift: Gift;
};

export default function GiftBox(gift: GiftCardProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelectGift(gift: Gift) {
    setSelectedGift(gift);
    setIsModalOpen(true);
  }
  const isActive = true;
  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={() => handleSelectGift(gift.gift)}
      >
        <img className="size-24" src="/present1.png"></img>
      </button>
      <GiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gift={selectedGift}
      />
    </div>
  );
}
