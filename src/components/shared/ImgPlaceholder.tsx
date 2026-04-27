type Props = { className?: string };

export default function ImgPlaceholder({ className = "absolute inset-0 w-full h-full" }: Props) {
  return (
    <div className={`${className} flex items-center justify-center bg-gray-100`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-300 select-none">
        Soon
      </span>
    </div>
  );
}
