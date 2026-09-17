export default async function handler(req, res) {
    // On s'assure qu'on reçoit bien les bonnes données
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { userId, accessToken } = req.body;
    
    // On récupère tes secrets stockés sur Vercel
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const guildId = process.env.GUILD_ID;

    try {
        // On demande à l'API Discord d'ajouter l'utilisateur au serveur
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ access_token: accessToken })
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: "Utilisateur ajouté au serveur !" });
        } else {
            const error = await response.json();
            res.status(response.status).json({ success: false, error });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
    }
}
