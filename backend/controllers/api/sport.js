const sql = require("../../database/database");


const getSport = async (req,res) => {
  const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  const feature_id = url.searchParams.get("feature_id")
  console.log(feature_id)

  try {
    let data = ""
    if (feature_id) {
      data = await sql`
        SELECT id, sport, sport_txt, revetement, revetement_txt, etat, etat_txt, est_publique, est_publique_txt, remarque, date_modification, user_id, google_maps_url, ST_AsGeoJSON(geom) AS geom
        FROM w2p.terrain_sport
        WHERE id = ${feature_id}
      `
    } else {
      data = await sql`
        SELECT id, sport, sport_txt, revetement, revetement_txt, etat, etat_txt, est_publique, est_publique_txt, remarque, date_modification, user_id, google_maps_url, ST_AsGeoJSON(geom) AS geom
        FROM w2p.terrain_sport
      `;
    }
    
    // LIMIT 100
    res.json(data.map(row => ({
        id: row.id,
        user_id: row.user_id,
        sport: row.sport,
        sport_txt: row.sport_txt,
        revetement: row.revetement,
        revetement_txt: row.revetement_txt,
        etat: row.etat,
        etat_txt: row.etat_txt,
        est_publique: row.est_publique,
        est_publique_txt: row.est_publique_txt,
        remarque: row.remarque,
        date_modification: row.date_modification,
        g_url: row.google_maps_url,
        geometry: JSON.parse(row.geom),
    })));
  } catch (err) {
      console.error('Erreur lors de la récupération des points :', err);
      res.status(500).send('Erreur serveur');
  }
}

const postSport = async (req,res) => {
  const { sport, revetement, etat, est_publique, remarque, user_id, geom } = req.body;
  try {
      const [newData] = await sql`
        INSERT INTO w2p.terrain_sport (sport, revetement, etat, est_publique, remarque, user_id, geom)
        VALUES (${sport}, ${revetement}, ${etat}, ${est_publique}, ${remarque}, ${user_id}, ST_GeomFromText(${geom}, 2056))
        RETURNING id;
      `;
      res.status(200).json({
        message: "Création réussie",
        id: newData.id
       });
  } catch (error) {
      console.error('Erreur lors de l’ajout dans la base :', error.stack);
      res.status(500).send('Erreur serveur : ' + error.message);
  }
}


const putSport = async (req,res) => {
  const { id } = req.params;
  const { sport, revetement, etat, est_publique, remarque, user_id} = req.body;

  console.log('Requête reçue pour ID :', id);
  console.log('Données mises à jour :', { sport, revetement, etat, est_publique, remarque, user_id });

  try {
      await sql`
          UPDATE w2p.terrain_sport
          SET 
              sport = ${sport},
              revetement = ${revetement},
              etat = ${etat},
              est_publique = ${est_publique},
              remarque = ${remarque},
              user_id = ${user_id}
          WHERE id = ${Number(id)}
          RETURNING *;
      `;
      res.status(200).json({ message: "Modification réussie" });
  } catch (error) {
      console.error('Erreur lors de la mise à jour du point :', error);
      res.status(500).send('Erreur serveur :' + error.message);
  }
}

const deleteSport = async (req,res) => {
  const terrainId = req.params.id;

  try {
      const result = await sql`
          DELETE FROM w2p.terrain_sport
          WHERE id = ${terrainId}
          RETURNING *
      `;
      
    res.status(200).send({ message: "Terrain supprimé" });
  } catch (error) {
    console.error('Erreur lors de la suppression dans la base :', error);
    res.status(500).send('Erreur serveur :' + error.message);
  }  
}

module.exports = { getSport, putSport, postSport, deleteSport }