import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    const PLACE_ID = process.env.PLACE_ID;
    const API_KEY  = process.env.GOOGLE_API_KEY;

  let count  = 57;   // fallback if API fails
  let rating = 5.0;

  try {
        console.log('[reviews] env check - PLACE_ID:', PLACE_ID ? 'set' : 'MISSING', 'API_KEY:', API_KEY ? 'set' : 'MISSING');
        const res  = await fetch
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`
              );
        const data = await res.json();
        console.log('[reviews] API response status:', data.status, '| error:', data.error_message ?? 'none');
        count  = data.result?.user_ratings_total ?? count;
        rating = data.result?.rating            ?? rating;
  } catch (err) {
        console.error('[reviews] fetch failed:', err?.message || String(err));
  }

  const text = `${rating.toFixed(1)} · ${count} Google Reviews`;

  return new ImageResponse(
        (
                <div
            style={{
              display:     'flex',
              alignItems:  'center',
              background:  'white',
              width:       '100%',
              height:      '100%',
              paddingLeft: '0px',
  }}
      >
        <span style={{
                  color:      '#AD1000',
                  fontWeight: 500,
                  fontSize:   23,
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
      }}>
{text}
</span>
  </div>
    ),
{
        width:  520,
                height: 30,
                headers: {
                  'Cache-Control': 'no-store',
                    },
}
  );
}
