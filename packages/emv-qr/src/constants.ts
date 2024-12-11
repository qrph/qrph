export const ID = {
  IDPayloadFormatIndicator: "00", // (M) Payload Format Indicator
  IDPointOfInitiationMethod: "01", // (O) Point of Initiation Method
  IDMerchantAccountInformationRangeStart: "02", // (M) 2-51 Merchant Account Information
  IDMerchantAccountInformationRangeEnd: "51", // (M) 2-51 Merchant Account Information
  IDMerchantCategoryCode: "52", // (M) Merchant Category Code
  IDTransactionCurrency: "53", // (M) Transaction Currency
  IDTransactionAmount: "54", // (C) Transaction Amount
  IDTipOrConvenienceIndicator: "55", // (O) Tip or Convenience Indicator
  IDValueOfConvenienceFeeFixed: "56", // (C) Value of Convenience Fee Fixed
  IDValueOfConvenienceFeePercentage: "57", // (C) Value of Convenience Fee Percentage
  IDCountryCode: "58", // (M) Country Code
  IDMerchantName: "59", // (M) Merchant Name
  IDMerchantCity: "60", // (M) Merchant City
  IDPostalCode: "61", // (O) Postal Code
  IDAdditionalDataFieldTemplate: "62", // (O) Additional Data Field Template
  IDCRC: "63", // (M) CRC
  IDMerchantInformationLanguageTemplate: "64", // (O) Merchant Information— Language Template
  IDRFUForEMVCoRangeStart: "65", // (O) 65-79 RFU for EMVCo
  IDRFUForEMVCoRangeEnd: "79", // (O) 65-79 RFU for EMVCo
  IDUnreservedTemplatesRangeStart: "80", // (O) 80-99 Unreserved Templates
  IDUnreservedTemplatesRangeEnd: "99", // (O) 80-99 Unreserved Templates
} as const;

export const ADDITIONAL_FIELD = {
  AdditionalIDBillNumber: "01", // (O) Bill Number
  AdditionalIDMobileNumber: "02", // (O) Mobile Number
  AdditionalIDStoreLabel: "03", // (O) Store Label
  AdditionalIDLoyaltyNumber: "04", // (O) Loyalty Number
  AdditionalIDReferenceLabel: "05", // (O) Reference Label
  AdditionalIDCustomerLabel: "06", // (O) Customer Label
  AdditionalIDTerminalLabel: "07", // (O) Terminal Label
  AdditionalIDPurposeTransaction: "08", // (O) Purpose Transaction
  AdditionalIDAdditionalConsumerDataRequest: "09", // (O) Additional Consumer Data Request
  AdditionalIDRFUforEMVCoRangeStart: "10", // (O) RFU for EMVCo
  AdditionalIDRFUforEMVCoRangeEnd: "49", // (O) RFU for EMVCo
  AdditionalIDPaymentSystemSpecificTemplatesRangeStart: "50", // (O) Payment System Specific Templates
  AdditionalIDPaymentSystemSpecificTemplatesRangeEnd: "99", // (O) Payment System Specific Templates
} as const;

export const MERCHANT_ACCOUNT_INFORMATION = {
  MerchantAccountInformationIDGloballyUniqueIdentifier: "00",
  MerchantAccountInformationIDPaymentNetworkSpecificStart: "01", // (O) 03-99 RFU for EMVCo
  MerchantAccountInformationIDPaymentNetworkSpecificEnd: "99", // (O) 03-99 RFU for EMVCo
} as const;

export const MERCHANT_INFORMATION = {
  MerchantInformationIDLanguagePreference: "00", // (M) Language Preference
  MerchantInformationIDMerchantName: "01", // (M) Merchant Name
  MerchantInformationIDMerchantCity: "02", // (O) Merchant City
  MerchantInformationIDRFUforEMVCoRangeStart: "03", // (O) 03-99 RFU for EMVCo
  MerchantInformationIDRFUforEMVCoRangeEnd: "99", // (O) 03-99 RFU for EMVCo
} as const;

export const UNRESERVED_TEMPLATE = {
  UnreservedTemplateIDGloballyUniqueIdentifier: "00",
  UnreservedTemplateIDContextSpecificDataStart: "01", // (O) 03-99 RFU for EMVCo
  UnreservedTemplateIDContextSpecificDataEnd: "99", // (O) 03-99 RFU for EMVCo
} as const;

export const INITIAL_METHOD = {
  PointOfInitiationMethodStatic: "11",
  PointOfInitiationMethodDynamic: "12",
} as const;
