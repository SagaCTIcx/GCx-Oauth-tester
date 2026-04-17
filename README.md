# Genesys Cloud OAuth Tester for Vercel

Minimal project for validating Genesys Cloud OAuth client credentials through a Vercel-hosted page and serverless function.

## Project structure

```text
vercel-genesys-oauth-tester/
├─ index.html
├─ vercel.json
├─ README.md
└─ api/
   └─ token.js
```

## What it does

- `index.html` provides a simple UI for entering:
  - region
  - client ID
  - client secret
  - optional audience
- `api/token.js` sends a server-side POST request to the selected Genesys Cloud `/oauth/token` endpoint
- the UI shows the full response and access token if successful

## Deploy to GitHub -> Vercel

1. Create a new GitHub repository.
2. Upload these files to the repository root exactly as shown in the structure above.
3. In Vercel, click `Add New...` -> `Project`.
4. Import the GitHub repository.
5. Keep the default framework detection as `Other`.
6. Deploy.

No build step is required for this minimal version.

## Usage

After deployment:

1. Open the Vercel URL.
2. Paste the client ID and client secret.
3. Select the correct region.
4. Click `Test credentials`.

## Notes

- This is intended for internal testing and validation.
- This version sends the client ID and client secret from the browser to your own Vercel function. That is acceptable for narrow internal validation, but it is not a production design.
- For a more locked-down version, the credentials could be stored as Vercel environment variables and the page could test only one fixed client.
