"use client";
import { Button } from "./button";
import { ToastContainer, toast } from "react-toastify";

export default function CopyLink({ id }: { id: string }) {
  const handlerCopyLink = async () => {
    try {
      const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/calendar/${id}`;
      await navigator.clipboard.writeText(link);
      toast(`Link copied successfully: ${link}`);
    } catch (err) {
      const errorMessage = "Failed to copy link:";
      console.error(errorMessage, err);
      toast(errorMessage);
    }
  };

  return (
    <Button
      onClick={() => {
        handlerCopyLink();
      }}
    >
      Copy Link
    </Button>
  );
}
