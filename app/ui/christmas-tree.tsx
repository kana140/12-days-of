"use client";
import { SpriteAnimator } from "react-sprite-animator";
import tree from "@/public/christmas-tree-sprite.png";

export default function ChristmasTree() {
  return (
    <div className="flex justify-center">
      <SpriteAnimator
        sprite={tree.src}
        width={931}
        height={1121}
        fps={2}
        loop
        direction="horizontal"
        frameCount={4}
        scale={2.2}
      />
    </div>
  );
}
