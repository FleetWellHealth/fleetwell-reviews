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

  // Load Bitter Medium (500) from our own public folder — no external dependency
  const fontData = await fetch(
    new URL('/fonts/Bitter-Medium.ttf', 'https://fleetwell-reviews.vercel.app')
  ).then(r => r.arrayBuffer());

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
          fontSize:   25,
          fontFamily: 'Bitter',
          lineHeight: 1,
        }}>
          {text}
        </span>
      </div>
    ),
    {
      width:  520,
      height: 30,
      fonts: [{
        name:   'Bitter',
        data:   fontData,
        weight: 500,
        style:  'normal',
      }],
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
