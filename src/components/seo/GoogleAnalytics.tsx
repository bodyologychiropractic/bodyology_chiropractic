import Script from "next/script";

import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_CALL_CONVERSION_LABEL,
  GOOGLE_ADS_CONVERSION_ID,
  getContact,
} from "@/lib/constants";

export default async function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_CONVERSION_ID) return null;

  const contact = await getContact();
  const gtagId = GA_MEASUREMENT_ID || GOOGLE_ADS_CONVERSION_ID;
  const phoneConversionNumber = contact.phone.replace(/\s/g, "");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');\n` : ""}${
          GOOGLE_ADS_CONVERSION_ID ? `gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');\n` : ""
        }${
          GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CALL_CONVERSION_LABEL
            ? `gtag('config', '${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CALL_CONVERSION_LABEL}', { 'phone_conversion_number': '${phoneConversionNumber}' });`
            : ""
        }`}
      </Script>
    </>
  );
}
