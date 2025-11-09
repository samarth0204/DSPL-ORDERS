/** Helpers to coerce/validate numeric inputs from req.body */
const parseIntOrNull = (val: any, fieldName: string) => {
  if (val === undefined || val === null || val === "") return null;
  if (typeof val === "number") {
    if (!Number.isInteger(val))
      throw new Error(`${fieldName} must be an integer`);
    return val;
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "") return null;
    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed) || Number.isNaN(parsed)) {
      throw new Error(`${fieldName} must be an integer`);
    }
    return parsed;
  }
  throw new Error(`${fieldName} must be an integer or null`);
};

const parseFloatOrNull = (val: any, fieldName: string) => {
  if (val === undefined || val === null || val === "") return null;
  if (typeof val === "number") {
    if (Number.isNaN(val)) throw new Error(`${fieldName} must be a number`);
    return val;
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "") return null;
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed)) {
      throw new Error(`${fieldName} must be a number`);
    }
    return parsed;
  }
  throw new Error(`${fieldName} must be a number or null`);
};
export { parseIntOrNull, parseFloatOrNull };
