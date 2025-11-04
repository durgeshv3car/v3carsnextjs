interface BrandOverviewProps {
  description: string;
}

export default function BrandOverview({ description }: BrandOverviewProps) {
  // ✅ Sanitize inline color styles before rendering HTML
  const sanitizedDescription = description.replace(
    /<(?!a\b)([^>]+?)\sstyle="([^"]*?)color:[^;"]+;?([^"]*?)"/gi,
    '<$1 style="$2$3"'
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-[#2E2E2E] p-4 space-y-4 text-[15px] leading-[1.8]">
      <div
        className="prose prose-invert max-w-none leading-loose"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
}
