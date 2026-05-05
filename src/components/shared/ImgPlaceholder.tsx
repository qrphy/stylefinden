// İki modlu görsel bileşeni: src verilirse next/image ile Sanity CDN görselini render eder,
// src yoksa "Soon" yazan gri placeholder gösterir — içerik CMS'e eklenmeden önce sayfa boş kalmaz.
import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ImgPlaceholder({
  src,
  alt = "",
  className = "absolute inset-0 w-full h-full",
  priority = false,
  sizes = "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${className} object-cover object-top`}
      />
    );
  }

  return (
    <div className={`${className} flex items-center justify-center bg-gray-100`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-300 select-none">
        Soon
      </span>
    </div>
  );
}
