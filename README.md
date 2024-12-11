# qrph

A collection of TypeScript utilities for working with QR Ph codes, notably encoding and decoding.

## Background

QR Ph is a standardized format for encoding payment instructions in a QR code based on the [EMVCo QR Code Standard](https://www.emvco.com/emv-technologies/qr-codes/). Mandated in 2018 by the BSP (Banko Sentral ng Pilipinas) in Republic Act (R.A.) No. 11127, it has quickly become ubiquitous in the Philippines. Virtually all Philippine banks and e-wallet providers support generating and scanning QR Ph codes; however, documentation is sparse, and tooling is lacking.

This library was created by reverse engineering various QR Ph codes found scattered across the Philippines. I hope open sourcing my work will make it easier for others to create their own tools to make payments more seamless across the Philippines.

## License

[Apache-2.0](LICENSE.txt)
