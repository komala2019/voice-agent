export function Badge({ value, tone }: { value: string; tone?: string }) {
  return <span className={`badge ${tone || value}`}>{value}</span>;
}
