/* Replace with your own YouTube Data API v3 key. Only used by the
   "Import playlist" button on creator.html — client.html never loads this.

   Get this from Google Cloud Console (the same project Firebase already
   created for you — a Firebase project IS a Google Cloud project):
     1. console.cloud.google.com > select your Firebase project
     2. APIs & Services > Library > search "YouTube Data API v3" > Enable
     3. APIs & Services > Credentials > Create credentials > API key

   IMPORTANT: this key is visible to anyone who views your page's source,
   since it's used client-side. Click "Edit" on the key and restrict it:
     - Application restrictions: HTTP referrers > add your GitHub Pages
       URL (e.g. https://yourname.github.io/*)
     - API restrictions: restrict to "YouTube Data API v3" only
   This stops anyone else from copying the key and burning your quota.
   See README.md for more. */
window.YOUTUBE_API_KEY = "REPLACE_WITH_YOUR_YOUTUBE_API_KEY";
