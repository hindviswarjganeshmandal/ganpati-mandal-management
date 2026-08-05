module.exports = (req, res, next) => {

    if (!req.session.member) {

        return res.redirect("/member/login");

    }

    next();

};