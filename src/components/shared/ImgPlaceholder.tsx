type Props = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function ImgPlaceholder({
  src,
  alt = "",
  className = "absolute inset-0 w-full h-full",
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
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
