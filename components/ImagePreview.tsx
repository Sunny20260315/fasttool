import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  description?: string;
  src?: string | null;
  alt: string;
};

export function ImagePreview({ title, description, src, alt }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-dashed border-gray-200 bg-gray-50">
          {src ? (
            <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">No preview</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
