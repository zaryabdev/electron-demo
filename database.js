const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/sqlite3');

const handleTableCreate = async () => {
    console.log(`Going to create table`);
    db.serialize(function () {
        db.run("CREATE TABLE Products (name, barcode, quantity)");

        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);

        db.each("SELECT * FROM Products", function (err, row) {
            console.log(row);
        });
    });
    console.log(`Table created succ`);

    db.close();

};

module.exports = handleTableCreate;
// handleTableCreate();