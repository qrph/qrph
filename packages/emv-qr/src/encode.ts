import crc16ccitt from "crc/calculators/crc16ccitt";

import { ID } from "./constants.js";
import type { UnstructuredEMVQRData } from "./types.js";

const formatCrc = (value: string): string => {
  const arr = new TextEncoder().encode(value);
  return crc16ccitt(arr).toString(16).toUpperCase().padStart(4, "0");
};

const appendCrc = (value: string): string => {
  const toCrc = `${value}${ID.IDCRC}04`;
  const crc = formatCrc(toCrc);
  return `${toCrc}${crc}`;
};

const encodeUnstructuredData = (data: UnstructuredEMVQRData): string => {
  return Object.entries(data)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => {
      const valueStr =
        typeof value === "string" ? value : encodeUnstructuredData(value);
      return `${key}${valueStr.length.toString().padStart(2, "0")}${valueStr}`;
    })
    .join("");
};

export const encodeEMVQR = (data: UnstructuredEMVQRData): string => {
  const { [ID.IDCRC]: _, ...dataWithoutCrc } = data;
  const encodedData = encodeUnstructuredData(dataWithoutCrc);
  return appendCrc(encodedData);
};
