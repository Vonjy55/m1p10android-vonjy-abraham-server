const usersDb = require('../db/users-db')

function checkRole(roles) {
    return checkRole[roles] || (checkRole[roles] =
        function(req, res, next) {
            const id = req.jwtPayLoad.userId;
            console.log(id);

            usersDb.findOneById(id)
                .then((result) => {
                        // user_role = result.role
                        let isValid = false;
                        for (var role of roles) {
                            if (role == result.rows[0].role) {
                                isValid = true;
                            }
                        }

                        if (isValid) {
                            next();
                        } else {
                            res.status(400).send("Error fetching document!")
                        }
                    }

                )
                .catch((err) => {
                    console.log(err);
                    res.status(400).send("Error fetching document!")
                })



        }
    );
}

module.exports = checkRole;