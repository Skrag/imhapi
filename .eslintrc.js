module.exports = {
    "env": {
        "node": true,
        "mongo": true,
        "atomtest": true,
        "es6": true
    },
    "extends": "./node_modules/lab/lib/linter/.eslintrc.js",
    "rules": {
        "no-shadow": [
            2,
            { "allow": ["err", "done", "server", "next", "res"] }
        ]
    }
};
