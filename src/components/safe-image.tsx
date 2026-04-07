import NextImage, { type ImageProps } from "next/image";

/**
 * Same as next/image, but tolerates post-HTML mutations before hydration
 * (e.g. Dark Reader injecting `data-darkreader-*` and inline styles on `<img>`).
 */
export function SafeImage(props: ImageProps) {
  return <NextImage {...props} suppressHydrationWarning />;
}
