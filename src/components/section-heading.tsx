import { SectionHeader } from "@/components/ui";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return <SectionHeader eyebrow={eyebrow} title={title} description={description} />;
}
