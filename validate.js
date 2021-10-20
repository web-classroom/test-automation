const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;

function validate(email) {
    return regex.test(email);
}

module.exports = validate;
