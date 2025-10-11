import { useState, useEffect } from "react";

const useDebounce = (value: string, delay = 300) => {
  const [debouncedSearch, setDebouncedSearch] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedSearch;
};

export default useDebounce;
