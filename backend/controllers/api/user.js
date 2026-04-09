const sql = require("../../database/database");
const bcrypt = require("bcrypt");

const getPersonalInfo = async (req,res) => {
  try {
    // req.user contient les informations du payload du JWT
    const userId = req.user.user_id;
    
    const userInfo = await sql`
      SELECT *
      FROM w2p.users
      WHERE user_id = ${userId}
    `;

    if (userInfo.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(userInfo[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postUser = async (req,res) => {
  const { userName, userEmail, userPassword } = req.body;
  const hashedPassword = await bcrypt.hash(userPassword,10);
  try {
    
    const newUser = await sql`
      INSERT INTO w2p.users (user_name, user_email, user_password)
      VALUES (${userName}, ${userEmail}, ${hashedPassword} )
      RETURNING *;
    `;
    res.json(newUser)

  } catch (error) {
    res.status(500).json({error:error.message});
  }
}

module.exports = { getPersonalInfo, postUser }