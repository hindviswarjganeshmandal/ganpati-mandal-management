exports.canIncome = (req,res,next)=>{
    if(req.session.member?.can_add_income===1) return next();
    return res.status(403).send("No Income Permission");
};

exports.canExpense = (req,res,next)=>{
    if(req.session.member?.can_add_expense===1) return next();
    return res.status(403).send("No Expense Permission");
};