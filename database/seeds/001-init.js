
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const users = [
    {
      username: "BigChungus", 
      password: "IsItReallyChungus", 
      role: "admin"
    }, 
    {
      username: "Lil_Chungus", 
      password: "IsItReallyLil", 
      role: "front-end"
    }, 
    {
      username: "ChimmyChungus", 
      password: "ChungusSoGood", 
      role: "back-end"
    }
  ]
  return knex('users')
    .insert(users)
    .then(() => console.log("\n== seed data for roles table added. ==\n")); 
};
