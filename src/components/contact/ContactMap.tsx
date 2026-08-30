import { CONTACT, MAP_EMBED_URL, SITE_NAME } from "@/lib/constants";

export default function ContactMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <iframe
        src={MAP_EMBED_URL}
        title={`Map showing ${SITE_NAME}, ${CONTACT.addressLines.join(", ")}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[24rem] w-full border-0 lg:h-full lg:min-h-[32rem]"
      />
    </div>
  );
}
