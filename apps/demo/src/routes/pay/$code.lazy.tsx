import { decodeQRPHFromText, QRPHData } from "@qrph/qrph";
import { createLazyFileRoute } from "@tanstack/react-router";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

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

const Metadata: React.FC<{
  data: QRPHData;
}> = ({ data }) => {
  return <div>Metadata {data.countryCode}</div>;
};

const CodePage: React.FC = () => {
  const { code: codeEncoded } = Route.useParams();
  const code = atob(codeEncoded);

  const parsed = decodeQRPHFromText(code);

  return (
    <div tw="flex flex-col items-center gap-4">
      <QRCode value={code} />
      <Metadata data={parsed} />
    </div>
  );
};

export const Route = createLazyFileRoute("/pay/$code")({
  component: () => <CodePage />,
});
