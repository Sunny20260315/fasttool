import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  href?: string | null;
  filename?: string;
  className?: string;
};

export function DownloadButton({ label, href, filename = "image-output.jpg", className }: Props) {
  if (!href) {
    return (
      <Button disabled className={`w-full ${className || ''}`}>
        {label}
      </Button>
    );
  }

  return (
    <a href={href} download={filename} className="block">
      <Button className={`w-full ${className || ''}`}>{label}</Button>
    </a>
  );
}
