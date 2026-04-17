export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed', message: 'Use POST.' });
  }

  try {
    const { clientId, clientSecret, region, audience } = req.body || {};

    if (!clientId || !clientSecret || !region) {
      return res.status(400).json({
        error: 'missing_input',
        message: 'clientId, clientSecret, and region are required.'
      });
    }

    const allowedRegions = new Set([
      'https://login.mypurecloud.ie',
      'https://login.euc2.pure.cloud',
      'https://login.mypurecloud.com',
      'https://login.usw2.pure.cloud',
      'https://login.mypurecloud.de',
      'https://login.mypurecloud.jp',
      'https://login.apne2.pure.cloud',
      'https://login.aps1.pure.cloud',
      'https://login.apse2.pure.cloud',
      'https://login.cac1.pure.cloud',
      'https://login.sae1.pure.cloud'
    ]);

    if (!allowedRegions.has(region)) {
      return res.status(400).json({
        error: 'invalid_region',
        message: 'Region is not in the allowlist.'
      });
    }

    const form = new URLSearchParams();
    form.set('grant_type', 'client_credentials');
    if (audience && String(audience).trim()) {
      form.set('audience', String(audience).trim());
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`, 'latin1').toString('base64');

    const genesysResponse = await fetch(`${region}/oauth/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: form.toString()
    });

    const responseText = await genesysResponse.text();

    res.status(genesysResponse.status);
    res.setHeader('Content-Type', genesysResponse.headers.get('content-type') || 'application/json; charset=utf-8');
    return res.send(responseText);
  } catch (error) {
    return res.status(500).json({
      error: 'server_error',
      message: error && error.message ? error.message : String(error)
    });
  }
}
