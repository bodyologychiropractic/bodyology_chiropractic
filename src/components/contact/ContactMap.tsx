import { MAP_EMBED_URL, getContact, getSiteName } from "@/lib/constants";

export default async function ContactMap() {
  const [contact, siteName] = await Promise.all([getContact(), getSiteName()]);

  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <iframe
        src={MAP_EMBED_URL}
        title={`Map showing ${siteName}, ${contact.addressLines.join(", ")}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[24rem] w-full border-0 lg:h-full lg:min-h-[32rem]"
      />
    </div>
  );
}
