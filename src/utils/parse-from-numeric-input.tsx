export const parse = (v: string) => (v ? parseFloat(v?.replace(/,/g, '')) : 0);
