import Button from "@/components/ui/Button";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Icon from "@/components/ui/Icon";
import { buildMobileSrcSet, buildSrcSet, imageSrc } from "@/lib/images";
import {
  ADDRESS,
  BOOKING_URL,
  CONTACT,
  HERO_IMAGE,
  HERO_LOGO,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <link
        rel="preload"
        as="image"
        href={`${HERO_IMAGE.mobile!.base}-960.${HERO_IMAGE.ext}`}
        imageSrcSet={buildMobileSrcSet(HERO_IMAGE)}
        imageSizes="100vw"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={`${HERO_IMAGE.base}-1600.${HERO_IMAGE.ext}`}
        imageSrcSet={buildSrcSet(HERO_IMAGE)}
        imageSizes="100vw"
        media="(min-width: 641px)"
        fetchPriority="high"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ResponsiveImage
          image={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left sm:object-[70%_center]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-surface/25  lg:bg-transparent lg:bg-gradient-to-r lg:from-surface lg:from-25% lg:via-surface/25 lg:via-55% lg:to-transparent"
      />

      <div className="container-page section-y-lg">
        <div className="max-w-xl text-center lg:max-w-[34rem]" data-aos="fade-up">
          <h1 className="flex flex-col items-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">
              {`Chiropractor in ${ADDRESS.suburb}, ${ADDRESS.state}`}
            </span>
            <img
              src={imageSrc(HERO_LOGO, 640)}
              srcSet={buildSrcSet(HERO_LOGO)}
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 17rem, 14rem"
              alt={SITE_NAME}
              width={1072}
              height={678}
              loading="eager"
              decoding="async"
              draggable={false}
              className="mt-6 h-auto w-56 max-w-full select-none object-contain sm:w-68 lg:w-80"
            />
          </h1>

          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-28 bg-accent" />

          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-primary/80 sm:text-lg">
            {SITE_DESCRIPTION}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href={BOOKING_URL} className="text-base uppercase" fullWidthOnMobile>
              <Icon name="calendar" className="mr-3 h-5 w-5" />
              Book online
            </Button>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Icon name="pin" className="h-5 w-5 text-accent" />
            {CONTACT.region}
          </p>
        </div>
      </div>
    </section>
  );
}
