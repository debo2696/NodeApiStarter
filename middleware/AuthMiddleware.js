var jwt = require('jsonwebtoken');

module.exports = {

    checkAuth: function(req, resp, next) {
        let data = {};
        try {
            const token = req.headers['x-access-token'];
            if (!token) {
                return resp.status(401).send({ 'status': "unauthenticated", 'message': "Authorization token not provided", data: data });
            }

            jwt.verify(token, process.env.JWT_TOKEN_SECRET, async function(err, decoded) {
                if (err) {
                    return resp.status(401).send({ 'status': "unauthenticated", 'message': 'Unauthentication Action : ' + (err ? err.message : 'UNTRACABLE'), data: data });
                }

                req.auth = {};
                req.auth.id = decoded.user_id;
                req.auth.data = decoded;

                // await User.findOne({ _id: req.auth.id }, '', ).exec().then(function(user) {
                //     req.auth.data = user;
                // })

                // if (!req.auth.data) {
                //     return resp.status(401).send({ status: 'unauthenticated', message: 'Session Expired!! Please signin again to continue', data: data });
                // }
                
                var dt = new Date(req.auth.data.iat * 1000);
                return resp.send({date:dt,response:req.auth});
                next();
            });
        } catch (e) {
            return resp.status(200).send({ status: 'error', message: e ? e.message : 'Something went wrong', data: data });
        }
    },
    checkRole(accepted_role) {
        return function(req, resp, next) {
            let data = {};
            try {
                const token = req.headers['x-access-token'];
                if (!token) {
                    return resp.status(401).send({ 'status': "unauthenticated", 'message': "Authorization token not provided", data: data });
                }

                jwt.verify(token, process.env.JWT_TOKEN_SECRET, async function(err, decoded) {
                    if (err) {
                        return resp.status(401).send({ 'status': "unauthenticated", 'message': 'Unauthentication Action : ' + (err ? err.message : 'UNTRACABLE'), data: data });
                    }
                    // return resp.send('In Role Authenticated logic');
                    // let user = null;
                    // await User.findOne({ _id: req.auth.id }, '', ).exec().then(function(details) {
                    //     return user = details;
                    // })

                    // if (!user) {
                    //     return resp.status(401).send({ status: 'unauthenticated', message: 'Session Expired!! Please signin again to continue', data: data });
                    // }

                    // if (Array.isArray(accepted_role) && accepted_role.includes(user.role)) {
                    //     next();
                    // } else if (accepted_role == user.role) {
                    //     next();
                    // } else {
                    //     return resp.status(200).send({ status: 'error', message: 'Oops!! Permission denied', data: data });
                    // }
                    return resp.send('In Role Authenticated logic');
                    next();
                })
            } catch (e) {
                return resp.status(200).send({ status: 'error', message: e ? e.message : 'Something went wrong', data: data });
            }
        }
    },
};