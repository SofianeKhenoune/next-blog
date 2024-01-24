export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="p-4 w-full max-w-7xl mx-auto">{children}</div>
}
