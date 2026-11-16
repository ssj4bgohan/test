// Vercel serverless endpoint. Configure DISCORD_WEBHOOK_URL in project environment variables.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ error: 'Analytics is not configured' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  const allowed = new Set(['visit', 'game_start', 'game_over']);
  if (!body || !allowed.has(body.event)) return res.status(400).json({ error: 'Invalid event' });

  const labels = { visit: 'Nova visita (consentida)', game_start: 'Partida iniciada', game_over: 'Partida encerrada' };
  const fields = [{ name: 'Evento', value: labels[body.event], inline: true }];
  if (body.event === 'game_over' && Number.isFinite(body.score)) {
    fields.push({ name: 'Pontuação', value: String(Math.max(0, Math.min(1000000, Math.floor(body.score)))), inline: true });
  }
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [{ title: 'RUNNER — Estatísticas', color: 12054379, fields, timestamp: new Date().toISOString(), footer: { text: 'Enviado após consentimento do visitante' } }] })
    });
    if (!response.ok) return res.status(502).json({ error: 'Analytics delivery failed' });
    return res.status(204).end();
  } catch {
    return res.status(502).json({ error: 'Analytics delivery failed' });
  }
}
