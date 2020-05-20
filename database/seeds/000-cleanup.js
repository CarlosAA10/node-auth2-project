const cleaner = require('knex-cleaner'); 


function cleanTables(knex) {
  return cleaner 
    .clean(knex, {
      mode:"truncate", 
      restartIdentity: true, 
      ignoretables: ["knex migrations", "knex_migrations_lock"], 
    })
    .then(() => console.log("\n== All tables truncated, ready to seed ==\n"))

} 

exports.seed = function(knex) {
  // Deletes ALL existing entries
  if(knex.client.config.client === "sqlite3") {
    return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex)); 
  } else {
    return cleanTables(knex); 
  }
};


