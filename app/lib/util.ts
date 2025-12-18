import { upload } from "@vercel/blob/client";

export function getDateDiff(dateInput: Date) {
  const start = new Date(dateInput);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = start.getTime() - today.getTime();

  const daysTillStart = diffInMs / (1000 * 60 * 60 * 24);
  return daysTillStart;
}

export async function uploadGiftImage(
  calendarId: string,
  day: number,
  file: File
) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const pathname = `calendars/${calendarId}/day-${day}-${crypto.randomUUID()}.${ext}`;

  const blob = await upload(pathname, file, {
    access: "public",
    handleUploadUrl: "/api/blob/upload",
  });

  return blob.url;
}
