module.exports = (database) => {
    function subscribe(email) {
        return database.query("INSERT INTO subscriber (email) VALUES (:email)", {
            replacements: { email: email },
            type: database.QueryTypes.INSERT
        });
    }
    return subscribe;
};