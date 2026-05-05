import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const PLACE_ID = process.env.PLACE_ID;
  const API_KEY  = process.env.GOOGLE_API_KEY;

  let count  = 62;
  let rating = 5.0;

  try {
    const res  = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`,
    { next: { revalidate: 900 } }  // refresh every 15 min
    );
    const data = await res.json();
    count  = data.result?.user_ratings_total ?? count;
    rating = data.result?.rating            ?? rating;
  } catch (err) {
    // fall back to hardcoded values
  }

  const text = `${rating.toFixed(1)} · ${count} Google Reviews`;

  return new ImageResponse(
    (
      <div style={{ display:'flex', alignItems:'center', background:'white', width:'100%', height:'100%', paddingLeft:'0px' }}>
        <span style={{ color:'#AD1000', fontWeight:500, fontSize:23, fontFamily:'Georgia, serif', lineHeight:1 }}>
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
