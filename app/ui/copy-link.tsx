"use client";

export default function CopyLink() {
  const handlerCopyLink = async () => {
    try {
      const link = window.location.href;
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <h1
      onClick={handlerCopyLink}
      className="absolute cursor-pointer hover:to-blue-950"
    >
      {" "}
      Copy Link
    </h1>
  );
}
