import type { DocStatus } from '@/lib/types'

const DOT_COLORS: Record<DocStatus, string> = {
  'complete': '#2d7a4f',
  'in-progress': '#b07a1a',
  'not-started': '#ccc8bf',
  'submitted': '#1a5fa8',
}

export default function StatusDot({ status }: { status: DocStatus }) {
  return (
    <span style={{
      width: 7, height: 7, borderRadius: '50%',
      background: DOT_COLORS[status],
      display: 'inline-block', flexShrink: 0,
    }} />
  )
}
