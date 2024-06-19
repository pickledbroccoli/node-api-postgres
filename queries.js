const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'uborka',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});
// in a real production env this will be in a separate file, unaccessible for version control, because of the sensitive information

/*
*  Now for the ROUTES :)
*
*  GET: / | displayHome()
*  GET: /users | getUsers()
*  GET: /users/:id | getUserById()
*  POST: /users | createUser()
*  PUT: /users/:id | updateUser()
*  DELETE: /users/:id | deleteUser()
*
*/

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User with ID: ${id} modified`);
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(204).send(`User with ID: ${id} deleted`);
    });
};
