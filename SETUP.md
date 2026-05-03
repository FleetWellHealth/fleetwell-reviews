# FleetWell Reviews — Setup Guide

This project generates a live review image for your email signature.
Estimated setup time: 20 minutes. No coding required.

---

## Step 1 — Get Your Google Place ID (2 min)

1. Go to: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Search for **FleetWell Health** in the map
3. Click your listing — a Place ID appears below the search box (looks like: `ChIJ...`)
4. Copy it and save it somewhere — you'll need it in Step 4

---

## Step 2 — Get a Google Places API Key (10 min)

1. Go to: https://console.cloud.google.com
2. Sign in with your Google account
3. Click **Select a project** → **New Project** → name it "FleetWell" → **Create**
4. In the search bar, search **Places API** → click it → click **Enable**
5. Go to **Credentials** (left sidebar) → **Create Credentials** → **API Key**
6. Copy the API key — save it alongside your Place ID
7. (Optional but recommended) Click **Restrict Key** → under API restrictions, select **Places API only**

> Note: Google requires billing to be enabled but gives $200/month free credit.
> At your email volume you will never exceed the free tier.

---

## Step 3 — Create a GitHub Account & Upload the Project (5 min)

1. Go to: https://github.com and create a free account (or sign in)
2. Click the **+** icon → **New repository**
3. Name it `fleetwell-reviews` → keep it **Public** → click **Create repository**
4. Click **uploading an existing file** on the next screen
5. Drag the entire `fleetwell-reviews` folder contents into the upload area
6. Click **Commit changes**

---

## Step 4 — Deploy to Vercel (5 min)

1. Go to: https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Find `fleetwell-reviews` in the list → click **Import**
4. Before clicking Deploy, click **Environment Variables** and add:

   | Name               | Value                        |
   |--------------------|------------------------------|
   | `GOOGLE_API_KEY`   | *(your API key from Step 2)* |
   | `PLACE_ID`         | *(your Place ID from Step 1)*|

5. Click **Deploy** — takes about 1 minute
6. When done, copy your deployment URL (looks like: `fleetwell-reviews.vercel.app`)

---

## Step 5 — Send the URL to your assistant

Once deployed, your live review image will be at:

```
https://YOUR-VERCEL-URL.vercel.app/api/reviews
```

Send that URL and your assistant will update the email signature automatically.

---

## How It Works

- Every time someone opens your email, their client loads the image from Vercel
- Vercel fetches your current review count from Google (cached for 1 hour)
- The image updates automatically — no manual changes needed
- If the API ever fails, it falls back to showing "57 Five-Star Google Reviews"
