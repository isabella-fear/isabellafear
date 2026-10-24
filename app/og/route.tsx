import { ImageResponse } from 'next/og'
import { profile } from '../content/profile'

export const dynamic = 'force-static'

export function GET() {
  const title = profile.name
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', padding: 90, background: '#3d5145', color: '#f2edda' }}>
        <div style={{ fontSize: 76, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 28, marginTop: 32 }}>Law, constitutionalism, and the ways knowledge grows.</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
