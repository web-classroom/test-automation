const assert = require('assert');
const { Sequelize } = require('sequelize');

const database = new Sequelize('sqlite::memory::', { logging: false })
const subscribe = require('../subscribe')(database);

describe('subscribe(email)', () => {

    // Initializes the database before running the tests
    before(async () => {
        await database.query("DROP TABLE IF EXISTS subscriber");
        await database.query("CREATE TABLE subscriber (email TEXT)");
    });

    it("should persist the email in database", async () => {
        const query = "SELECT count() as count FROM subscriber";
        const options = { type: database.QueryTypes.SELECT };

        let result = await database.query(query, options);
        assert.equal(result[0].count, 0);

        await subscribe("email@example.com");

        result = await database.query(query, options);
        assert.equal(result[0].count, 1);

        result = await database.query("SELECT email FROM subscriber", options);
        assert.equal(result[0].email, "email@example.com");
    });
});