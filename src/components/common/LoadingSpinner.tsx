export function LoadingSpinner({ text = "加载中..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-border-warm rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-terracotta rounded-full animate-spin" />
      </div>
      <p className="text-sm text-stone-gray">{text}</p>
    </div>
  );
}
