"use client";

export default function CopyLink({ id }: { id: string }) {
  const handlerCopyLink = async () => {
    try {
      const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/calendar/${id}`;
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <h1
      onClick={handlerCopyLink}
      className="absolute cursor-pointer text-black dark:text-primary hover:to-blue-950 hover:underline"
    >
      Copy Link
    </h1>
  );
}
