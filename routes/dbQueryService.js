const Promise = require('bluebird');

module.exports = function(connection) {
    this.executeQuery = function(sql, params) {
        return new Promise(function(resolve, reject) {
            params = params || {};
            connection.query(sql, params, function(err, results) {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };
};
