const sql = require("../../database/database");

const getSport = async (req,res) => {
  try {
    const sport_type = await sql`
      SELECT code, valeur
      FROM w2p.subtype_terrain
    `;
    res.json(sport_type.map(row => ({
        code: row.code,
        valeur: row.valeur,
    })));
  } catch (err) {
    console.error('Erreur lors de la récupération des points :', err);
    res.status(500).send('Erreur serveur');
  } 
};

const getEstPublique = async (req,res) => {
  try {
    const est_publique = await sql`
        SELECT code, valeur
        FROM w2p.dom_est_publique
    `;
    res.json(est_publique.map(row => ({
        code: row.code,
        valeur: row.valeur,
    })));
  } catch (err) {
    console.error('Erreur lors de la récupération des points :', err);
    res.status(500).send('Erreur serveur');
  }
};

const getEtat = async (req,res) => {
  try {
    const etat = await sql`
        SELECT code, valeur
        FROM w2p.dom_etat
    `;
    res.json(etat.map(row => ({
        code: row.code,
        valeur: row.valeur,
    })));
  } catch (err) {
    console.error('Erreur lors de la récupération des points :', err);
    res.status(500).send('Erreur serveur');
  }
};

const getRevetement = async (req,res) => {
  try {
    const revetement = await sql`
        SELECT code, valeur
        FROM w2p.dom_revetement
    `;
    res.json(revetement.map(row => ({
        code: row.code,
        valeur: row.valeur,
    })));
  } catch (err) {
    console.error('Erreur lors de la récupération des points :', err);
    res.status(500).send('Erreur serveur');
}
};

module.exports = { getSport, getEstPublique, getEtat, getRevetement };