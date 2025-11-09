export interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "textarea";
  required?: boolean;
  disabled?: boolean;
}

// This ensures TypeScript infers exact literal types ("text", not string)
export const dailyFormFields: Record<"MORNING" | "EVENING", Field[]> = {
  MORNING: [
    { name: "hq", label: "HQ", type: "text", required: true },
    { name: "dbName", label: "DB Name", type: "text", required: true },
    { name: "town", label: "Town", type: "text", required: true },
    { name: "beat", label: "Beat", type: "text", required: true },
  ],

  EVENING: [
    { name: "hq", label: "HQ", type: "text", required: true },
    { name: "dbName", label: "DB Name", type: "text", required: true },
    { name: "town", label: "Town", type: "text", required: true },
    { name: "tc", label: "Working with TC", type: "number" },
    { name: "pc", label: "Working with PC", type: "number" },
    { name: "ctcWeight", label: "CTC Weight (kg)", type: "number" },
    { name: "ctcValue", label: "CTC Value", type: "number" },
    { name: "atcWeight", label: "ATC Weight (kg)", type: "number" },
    { name: "atcValue", label: "ATC Value", type: "number" },
    { name: "vapPacket", label: "VAP Packet", type: "number" },
    { name: "vapValue", label: "VAP Value", type: "number" },
    { name: "totalWeight", label: "Total Weight (kg)", type: "number" },
    { name: "totalValue", label: "Total Value", type: "number" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],
};
