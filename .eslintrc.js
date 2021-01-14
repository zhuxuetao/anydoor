module.exports = {
    "root": true,
    "env": {
        // "common": true,
        "node": true,
        "browser": false,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script"
    },
    "rules": {
        "no-console": ["error", {
            "allow": ["info","error", "warn"]
        }]
    }
};
