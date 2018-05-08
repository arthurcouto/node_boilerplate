`use strict`;

module.exports = {
  jwtSecret: `SmAYLOm_YzhzlDP6nY5SaqFx4NR96z46114pLBtBtoorCGtfkFAmf6-aunlmbU8-`,
  jwtSession: { session: false },
  authToken: `ZmExZjcwOWU5YTlhYWRlMjhkYzcxZTIyNWRlMWE0`,
  sql: {
    username: 'teste',
    password: 'teste',
    database: 'previsao_tempo',
    connection: {
      host: 'wololo',
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 1,
        idle: 15000
      },
      dialectOptions: {
        encrypt: true
      }
		},
    define: {
      charset: `utf8`,
      collate: `SQL_Latin1_General_CP1_CI_AS`,
    }
	},
  targetPort: 3000
};
