const sql = require("../../database/database");


const getEvent = async (req,res) => {
  const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  const user_id = url.searchParams.get("user")
  console.log(user_id)

  try {
    let event = ""
    if (user_id) {
      event =  await sql`
        SELECT event_name, terrain_id, event_date, max_player, player, user_id
        FROM w2p.events
        WHERE user_id = ${user_id}
        ORDER BY event_date DESC`
    } else {
      event =  await sql`
        SELECT event_name, terrain_id, event_date, max_player, player, user_id
        FROM w2p.events
        ORDER BY event_date DESC`
    }

    

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const postEvent = async (req,res) => {
  const { event_name, terrain_id, user_id, event_date, max_player, player } = req.body;
  try {
    await sql`
      INSERT INTO w2p.events (event_name, terrain_id, user_id, event_date, max_player, player)
      VALUES (${event_name}, ${terrain_id}, ${user_id}, ${event_date}, ${max_player}, ${player})
      RETURNING *;
    `;

    res.status(200).json({message : "Création réussie"});
  } catch (error) {
    console.error("Erreur lors de la création de l'événement : ",  error.stack);
    res.status(500).send("Erreur serveur : " + error.message);
  }
}

module.exports = { getEvent, postEvent}