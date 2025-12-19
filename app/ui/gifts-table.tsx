"use client";
import { useState } from "react";
import { useEffect } from "react";
import { GiftField } from "../lib/definitions";
import { Input } from "./input-fields";
import { uploadGiftImage } from "../lib/util";
import { useParams } from "next/navigation";

type GiftRow = {
  id: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  day?: number;
  opened?: boolean;
};

export function GiftsTableV2({ gifts }: { gifts: GiftField[] }) {
  const [rows, setRows] = useState<GiftRow[]>([{ id: crypto.randomUUID() }]);
  const params = useParams();
  const calendarId = params.id as string;

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
    <div className="text-black">
      {rows.map((row, index) => {
        const day = index + 1;
        return (
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
            open
            key={row.id}
          >
            {/* Day */}
            <summary className="collapse-title font-semibold flex justify-between">
              <p>Day {day}</p>
              <input type="hidden" name={`gifts[${day}][day]`} value={day} />
              <p> {row.name}</p>
            </summary>
            <div className="collapse-content text-sm">
              {/* Title */}
              Title
              <Input
                type="text"
                name={`gifts[${day}][name]`}
                className="w-full"
                defaultValue={row.name}
                required
                placeholder="Enter Title"
              />
              Description
              {/* Description */}
              <Input
                type="text"
                name={`gifts[${day}][description]`}
                className="w-full"
                defaultValue={row.description}
                required
                placeholder="Enter Description"
              />
              Link
              {/* Link */}
              <Input
                type="text"
                name={`gifts[${day}][link]`}
                className="w-full"
                defaultValue={row.link}
              />
              Image
              {/* Image */}
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadGiftImage(calendarId, day, file);

                    setRows((prev) =>
                      prev.map((r) =>
                        r.id === row.id ? { ...r, image: url } : r
                      )
                    );
                  }}
                />
                <input
                  type="hidden"
                  name={`gifts[${day}][image]`}
                  value={row.image ?? ""}
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </details>
        );
      })}
      {rows.length === 0 && (
        <div>No gifts yet - click &quot;Add gift&quot; to start ✨</div>
      )}

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

// export function GiftsTable({ gifts }: { gifts: GiftField[] }) {
//   const [rows, setRows] = useState<GiftRow[]>([{ id: crypto.randomUUID() }]);

//   useEffect(() => {
//     if (gifts?.length > 0) {
//       setRows(
//         gifts.map((gift, index) => ({
//           id: gift.id ?? crypto.randomUUID(),
//           name: gift.name ?? "",
//           description: gift.description ?? "",
//           link: gift.link ?? "",
//           image: gift.image ?? "",
//           day: gift.day ?? index + 1,
//         }))
//       );
//     }
//   }, [gifts]);

//   const addRow = () => {
//     setRows((prev) => [...prev, { id: crypto.randomUUID() }]);
//   };
//   const removeRow = (id: string) => {
//     setRows((prev) => prev.filter((r) => r.id !== id));
//   };

//   return (
//     <div className="flex flex-col items-center relative shadow-xs">
//       <table className="bg-blue-50 text-sm w-full text-left rtl:text-right text-body">
//         <thead className="text-sm border-b ">
//           <tr>
//             <th scope="col" className="px-6 py-3 font-medium">
//               Day
//             </th>
//             <th scope="col" className="px-6 py-3 font-medium">
//               Title
//             </th>
//             <th scope="col" className="px-6 py-3 font-medium">
//               Description
//             </th>
//             <th scope="col" className="px-6 py-3 font-medium">
//               Link
//             </th>
//             <th scope="col" className="px-6 py-3 font-medium">
//               Image
//             </th>
//             <th scope="col" className="px-6 py-3 font-medium"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => {
//             const day = index + 1;
//             return (
//               <tr key={row.id} className="border-t">
//                 {/* Day */}
//                 <td className="border border-gray-400 px-2 py-1">
//                   <span className="inline-block w-8 text-center font-medium">
//                     {day}
//                   </span>
//                   <input
//                     type="hidden"
//                     name={`gifts[${day}][day]`}
//                     value={day}
//                   />
//                 </td>

//                 {/* Title */}
//                 <td className="border border-gray-400 px-2 py-1">
//                   <input
//                     type="text"
//                     name={`gifts[${day}][name]`}
//                     className="w-full"
//                     defaultValue={row.name}
//                     required
//                   />
//                 </td>

//                 {/* Description */}
//                 <td className="border border-gray-400 px-2 py-1">
//                   <input
//                     type="text"
//                     name={`gifts[${day}][description]`}
//                     className="w-full"
//                     defaultValue={row.description}
//                     required
//                   />
//                 </td>

//                 {/* Link */}
//                 <td className="border border-gray-400 px-2 py-1">
//                   <input
//                     type="text"
//                     name={`gifts[${day}][link]`}
//                     className="w-full"
//                     defaultValue={row.link}
//                   />
//                 </td>

//                 {/* Images */}
//                 <td className="border border-gray-400 px-2 py-1">
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       id="image"
//                       name={`gifts[${day}][image]`}
//                     />
//                     {/* {row.image && (
//                       <img src={row.image} alt={row.name} className="w-full" />
//                     )} */}
//                     {row.image && (
//                       <input
//                         type="hidden"
//                         name={`gifts[${day}][existingImageUrl]`}
//                         value={row.image}
//                       />
//                     )}
//                   </div>
//                 </td>

//                 {/* Remove button */}
//                 <td className="border border-gray-400 px-2 py-1 text-center">
//                   <button
//                     type="button"
//                     onClick={() => removeRow(row.id)}
//                     className="text-red-500 text-xs"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}

//           {rows.length === 0 && (
//             <tr>
//               <td
//                 colSpan={4}
//                 className="border px-2 py-4 text-center text-gray-500"
//               >
//                 No gifts yet - click &quot;Add gift&quot; to start ✨
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {rows.length < 12 ? (
//         <button
//           className="border border-gray-500 rounded-md bg-blue-50 m-5 py-2 px-5 cursor-pointer hover:bg-blue-200"
//           onClick={() => {
//             addRow();
//           }}
//         >
//           Add Gift
//         </button>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }
