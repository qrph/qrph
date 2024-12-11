import type { UnstructuredEMVQRData } from "@qrph/emv-qr";
import { constants, encodeEMVQR } from "@qrph/emv-qr";

import type { QRPHData } from "./schema.js";

const pointOfInitiationMethodMap = {
  static: "11",
  dynamic: "12",
};

export const encodeQRPH = (data: QRPHData): UnstructuredEMVQRData => {
  const root: UnstructuredEMVQRData = {
    [constants.ID.IDPointOfInitiationMethod]:
      pointOfInitiationMethodMap[data.pointOfInitiationMethod],
    [constants.ID.IDMerchantCategoryCode]: data.merchantCategoryCode,
    [constants.ID.IDTransactionCurrency]: data.transactionCurrency,
    [constants.ID.IDCountryCode]: data.countryCode,
    [constants.ID.IDMerchantName]: data.merchantName,
    [constants.ID.IDMerchantCity]: data.merchantCity,
  };
  if (data.transactionAmount) {
    root[constants.ID.IDTransactionAmount] = data.transactionAmount;
  }
  if (data.postalCode) {
    root[constants.ID.IDPostalCode] = data.postalCode;
  }

  const recipient = {
    "00": data.recipient.type,
    "01": data.recipient.bankCode,
    "03": data.recipient.accountNumber,
  };
  const recipientKey = data.recipient.type === "com.p2pqrpay" ? "27" : "28";
  return {
    ...data._raw,
    ...root,
    [recipientKey]: {
      ...(data._raw[recipientKey] as Record<string, string>),
      ...recipient,
    },
  };
};

/**
 * Encode a QRPH data object to a string to be used in a QR code.
 *
 * @param data - The QRPH data object to encode.
 * @returns The encoded QRPH string.
 */
export const encodeQRPHToText = (data: QRPHData): string => {
  const emvQRData = encodeQRPH(data);
  return encodeEMVQR(emvQRData);
};
