import { decodeQRPHFromText, QRPHData } from "@qrph/qrph";
import { createLazyFileRoute } from "@tanstack/react-router";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import qrphLogo from "../../components/QRPH.svg?raw";
import tw, { css, styled } from "twin.macro";

const encodeSVG = (svg: string) => {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const QRCode: React.FC<{
  value: string;
}> = ({ value }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: value,
      dotsOptions: {
        color: "#000",
        type: "rounded", // Options: "rounded", "dots", "classy", etc.
      },
      image: encodeSVG(qrphLogo),
      imageOptions: {
        margin: 6,
      },
      cornersSquareOptions: {
        color: "#000",
        type: "extra-rounded", // Options: "square", "extra-rounded", etc.
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    });

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      qr.append(qrCodeRef.current);
    }
  }, [value]);

  return <div ref={qrCodeRef} />;
};

const MetadataTable = styled.table`
  th {
    ${tw`text-left`}
  }
  td {
    ${tw`text-right`}
  }
`;

const Metadata: React.FC<{
  code: string;
  data: QRPHData;
}> = ({ data, code }) => {
  return (
    <div
      tw="divide-y"
      css={css`
        & > div {
          h2 {
            ${tw`text-lg font-semibold mb-1`}
          }
          ${tw`py-6`}
        }
      `}
    >
      <div>
        <h2>Metadata</h2>
        <MetadataTable>
          <tr>
            <th>Currency</th>
            <td>{data.transactionCurrency}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{data.transactionAmount ?? "Not provided"}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{data.merchantCity}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{data.merchantCategoryCode}</td>
          </tr>
          <tr>
            <th>Point of Initiation Method</th>
            <td>{data.pointOfInitiationMethod}</td>
          </tr>
          <tr>
            <th>Postal Code</th>
            <td>{data.postalCode}</td>
          </tr>
          <tr>
            <th>Bank Code</th>
            <td>{data.recipient.bankCode}</td>
          </tr>
          <tr>
            <th>Account Number</th>
            <td>{data.recipient.accountNumber}</td>
          </tr>
          <tr>
            <th>Recipient Type</th>
            <td>{data.recipient.type}</td>
          </tr>
        </MetadataTable>
      </div>
      <div>
        <h2>Raw data</h2>
        <pre>
          <code>{JSON.stringify(data._raw, null, 2)}</code>
        </pre>
      </div>
      <div>
        <h2>Code</h2>
        <p>{code}</p>
      </div>
    </div>
  );
};

const CodePage: React.FC = () => {
  const { code: codeEncoded } = Route.useParams();
  const code = atob(codeEncoded);

  const parsed = decodeQRPHFromText(code);

  return (
    <div tw="flex flex-col items-center gap-4">
      <h1 tw="font-semibold text-2xl">{parsed.merchantName}</h1>
      <QRCode value={code} />
      <Metadata data={parsed} code={code} />
    </div>
  );
};

export const Route = createLazyFileRoute("/pay/$code")({
  component: () => <CodePage />,
});
