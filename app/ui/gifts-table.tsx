"use client";
import { useState } from "react";
import { useEffect } from "react";
import { GiftField } from "../lib/definitions";

type GiftRow = {
  id: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  day?: number;
  opened?: boolean;
};

export default function GiftsTable({ gifts }: { gifts: GiftField[] }) {
  const [rows, setRows] = useState<GiftRow[]>([{ id: crypto.randomUUID() }]);

  useEffect(() => {
    if (gifts?.length > 0) {
      setRows(
        gifts.map((gift, index) => ({
          id: gift.id ?? crypto.randomUUID(),
          name: gift.name ?? "",
          description: gift.description ?? "",
          link: gift.link ?? "",
          image: gift.image ?? "",
          day: gift.day ?? index + 1,
        }))
      );
    }
  }, [gifts]);

  const addRow = () => {
    setRows((prev) => [...prev, { id: crypto.randomUUID() }]);
  };
  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <table className="bg-blue-50 w-full h-10 w-50%">
        <thead>
          <tr>
            <th>Day</th>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const day = index + 1;
            return (
              <tr key={row.id} className="border-t">
                {/* Day */}
                <td className="border border-gray-400 px-2 py-1">
                  <span className="inline-block w-8 text-center font-medium">
                    {day}
                  </span>
                  <input
                    type="hidden"
                    name={`gifts[${day}][day]`}
                    value={day}
                  />
                </td>

                {/* Title */}
                <td className="border border-gray-400 px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][name]`}
                    className="w-full"
                    defaultValue={row.name}
                    required
                  />
                </td>

                {/* Description */}
                <td className="border border-gray-400 px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][description]`}
                    className="w-full"
                    defaultValue={row.description}
                    required
                  />
                </td>

                {/* Link */}
                <td className="border border-gray-400 px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][link]`}
                    className="w-full"
                    defaultValue={row.link}
                    required
                  />
                </td>

                {/* Images */}
                <td className="border border-gray-400 px-2 py-1">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name={`gifts[${day}][image]`}
                    />
                    {/* {row.image && (
                      <img src={row.image} alt={row.name} className="w-full" />
                    )} */}
                    {row.image && (
                      <input
                        type="hidden"
                        name={`gifts[${day}][existingImageUrl]`}
                        value={row.image}
                      />
                    )}
                  </div>
                </td>

                {/* Remove button */}
                <td className="border border-gray-400 px-2 py-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="border px-2 py-4 text-center text-gray-500"
              >
                No gifts yet - click &quot;Add gift&quot; to start ✨
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rows.length < 12 ? (
        <button
          className="border border-gray-500 rounded-md bg-blue-50 m-5 py-2 px-5 cursor-pointer hover:bg-blue-200"
          onClick={() => {
            addRow();
          }}
        >
          Add Gift
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
