import { mapValues } from "lodash-es";

import { ID } from "./constants.js";
import type { UnstructuredEMVQRData } from "./types.js";

const decodeInner = (text: string): Record<string, string> => {
  const result: Record<string, string> = {};
  let remaining = text;
  while (remaining) {
    if (remaining.length < 4) {
      throw new Error(`malformed: still ${remaining}`);
    }
    const [rawKey, rawLength] = [remaining.slice(0, 2), remaining.slice(2, 4)];
    const length = parseInt(rawLength);
    if (Number.isNaN(length)) {
      throw new Error(`malformed length for field ${rawKey}: ${rawLength}`);
    }
    if (remaining.length < 4 + length) {
      throw new Error(
        `unexpected end of file for field ${rawKey}: ${length.toString()} ${text}`,
      );
    }
    const value = remaining.slice(4, 4 + length);
    remaining = remaining.slice(4 + length);
    result[rawKey] = value;
  }
  return result;
};

export const decodeEMVQR = (text: string): UnstructuredEMVQRData => {
  const result = decodeInner(text);
  // additional parsing on specific fields
  return mapValues(result, (value, key) => {
    if (
      key === ID.IDAdditionalDataFieldTemplate ||
      key === ID.IDMerchantInformationLanguageTemplate ||
      (key >= ID.IDMerchantAccountInformationRangeStart &&
        key <= ID.IDMerchantAccountInformationRangeEnd) ||
      (key >= ID.IDRFUForEMVCoRangeStart && key <= ID.IDRFUForEMVCoRangeEnd) ||
      (key >= ID.IDUnreservedTemplatesRangeStart &&
        key <= ID.IDUnreservedTemplatesRangeEnd)
    ) {
      return decodeInner(value);
    }
    return value;
  });
};
