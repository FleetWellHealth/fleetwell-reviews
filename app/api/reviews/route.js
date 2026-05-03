import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const PLACE_ID = process.env.PLACE_ID;
  const API_KEY  = process.env.GOOGLE_API_KEY;

  let count  = 57;   // fallback if API fails
  let rating = 5.0;

  try {
    const res  = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`
    );
    const data = await res.json();
    count  = data.result?.user_ratings_total ?? count;
    rating = data.result?.rating            ?? rating;
  } catch (_) {
    // silently use fallback values
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
          paddingLeft: '1px',
        }}
      >
        <span style={{ color: '#AD2501', fontWeight: 500, fontSize: 13 }}>
          {text}
        </span>
      </div>
    ),
    {
      width:  260,
      height: 20,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
