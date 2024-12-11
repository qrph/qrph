import { z } from "zod";

export const RECIPIENT_TYPES = ["com.p2pqrpay", "ph.ppmi.p2m"] as const;

export type RecipientType = (typeof RECIPIENT_TYPES)[number];

export const zRecipientType = z.enum(RECIPIENT_TYPES);

/**
 * Information about the recipient specific to QRPH.
 *
 * - For P2P (personal) codes, this is field 27 and field 00 is `com.p2pqrpay`.
 * - For P2M (business) codes, this is field 28 and field 00 is `ph.ppmi.p2m`.
 */
export const zQRPHRecipientInfo = z.object({
  type: zRecipientType,
  /**
   * Recipient bank code. (Field 01)
   */
  bankCode: z.string(),
  /**
   * The account number of the recipient. (Field 03)
   */
  accountNumber: z.string().max(100),
});

export type QRPHRecipientInfo = z.infer<typeof zQRPHRecipientInfo>;

export const POINT_OF_INITIATION_METHODS = ["static", "dynamic"] as const;

export type PointOfInitiationMethod =
  (typeof POINT_OF_INITIATION_METHODS)[number];

export const zPointOfInitiationMethod = z.enum(POINT_OF_INITIATION_METHODS);

export const POINT_OF_INITIATION_METHOD_MAP: Record<
  string,
  PointOfInitiationMethod
> = {
  "11": "static",
  "12": "dynamic",
};

export const zRootQRInfo = z.object({
  /**
   * The method used to determine the point of initiation.
   */
  pointOfInitiationMethod: zPointOfInitiationMethod,
  /**
   * The merchant category code. 4 digits.
   */
  merchantCategoryCode: z.string().length(4),
  /**
   * The transaction currency. 3 digits.
   */
  transactionCurrency: z.string().length(3),
  /**
   * The transaction amount. Includes the decimal point. Left as a string to avoid floating point issues.
   *
   * If absent, the application should prompt the consuemr to enter the transaction amount.
   */
  transactionAmount: z.string().max(13).optional(),
  /**
   * The country code of the merchant. 2 characters.
   */
  countryCode: z.string().length(2),
  /**
   * The name of the recipient.
   */
  merchantName: z.string().max(25),
  /**
   * The city of the recipient.
   *
   * - In Maya and BPI, this is the city.
   * - In BDO and Shopee, this is the province.
   * - In GCash, this is a barangay.
   */
  merchantCity: z.string().max(15),
  /**
   * The postal code of the recipient.
   */
  postalCode: z.string().max(10).optional(),
});

export type RootQRInfo = z.infer<typeof zRootQRInfo>;

export const zQRPHData = zRootQRInfo.extend({
  recipient: zQRPHRecipientInfo,
  // Raw data from the QR code. One level deep; not sure if there may be more deeply nested structures.
  _raw: z.record(z.union([z.string(), z.record(z.string())])),
});

export type QRPHData = z.infer<typeof zQRPHData>;
