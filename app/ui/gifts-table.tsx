"use client";
import { useState } from "react";

type GiftRow = {
  id: string;
};

export default function GiftsTable() {
  const [rows, setRows] = useState<GiftRow[]>([{ id: crypto.randomUUID() }]);

  const addRow = () => {
    setRows((prev) => [...prev, { id: crypto.randomUUID() }]);
  };
  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <table className="bg-blue-100 w-full h-10 ">
        <thead>
          <tr>
            <th>Day</th>
            <th>Title</th>
            <th>Description</th>
            {/* <th>Image</th> */}
            <th>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const day = index + 1;
            return (
              <tr key={row.id} className="border-t">
                {/* Day */}
                <td className="border px-2 py-1">
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
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][name]`}
                    className="w-full border px-1 py-0.5"
                    required
                  />
                </td>

                {/* Description */}
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][description]`}
                    className="w-full border px-1 py-0.5"
                    required
                  />
                </td>

                {/* Image */}

                {/* Link */}
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    name={`gifts[${day}][link]`}
                    className="w-full border px-1 py-0.5"
                    required
                  />
                </td>

                {/* Remove button */}
                <td className="border px-2 py-1 text-center">
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
        <div className="bg-blue-500 w-25 h-10 text-center">
          <div
            onClick={() => {
              addRow();
            }}
          >
            Add Gift
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
