import type { UnstructuredEMVQRData } from "@qrph/emv-qr";
import { constants, decodeEMVQR } from "@qrph/emv-qr";

import type { QRPHData, RootQRInfo } from "./schema.js";
import {
  POINT_OF_INITIATION_METHOD_MAP,
  zQRPHRecipientInfo,
  zRootQRInfo,
} from "./schema.js";

const decodeRootQRInfo = (root: UnstructuredEMVQRData): RootQRInfo => {
  return zRootQRInfo.parse({
    pointOfInitiationMethod:
      POINT_OF_INITIATION_METHOD_MAP[
        root[constants.ID.IDPointOfInitiationMethod]?.toString() ?? ""
      ],
    merchantCategoryCode: root[constants.ID.IDMerchantCategoryCode],
    transactionCurrency: root[constants.ID.IDTransactionCurrency],
    transactionAmount: root[constants.ID.IDTransactionAmount],
    countryCode: root[constants.ID.IDCountryCode],
    merchantName: root[constants.ID.IDMerchantName],
    merchantCity: root[constants.ID.IDMerchantCity],
    postalCode: root[constants.ID.IDPostalCode],
  });
};

const decodeRecipient = (
  data: UnstructuredEMVQRData,
): QRPHData["recipient"] => {
  return zQRPHRecipientInfo.parse({
    type: data["00"],
    bankCode: data["01"],
    accountNumber: data["03"],
  });
};

export const decodeQRPH = (data: UnstructuredEMVQRData): QRPHData => {
  const root = decodeRootQRInfo(data);
  const recipient = data["27"] ?? data["28"];
  if (!recipient || typeof recipient === "string") {
    throw new Error("QRPH data is missing recipient information");
  }
  return {
    ...root,
    recipient: decodeRecipient(recipient),
    _raw: data as Record<string, string | Record<string, string>>,
  };
};

export const decodeQRPHFromText = (text: string): QRPHData => {
  const emvQRData = decodeEMVQR(text);
  return decodeQRPH(emvQRData);
};
