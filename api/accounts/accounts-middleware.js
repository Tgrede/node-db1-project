
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const name = req.body.name
  const budget = req.body.budget
  if(!name || !budget){
    res.status(400).json({message: "name and budget are required"})
  }else if(typeof name !== 'string'){
    res.status(400).json({message: "name of account must be a string"})
  }else if(name.trim() < 3 || name.trim() > 100){
    res.status(400).json({message: "name of account must be between 3 and 100"})
  }else if(isNaN(budget)){
    res.status(400).json({message: "budget of account must be a number"})
  }else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: "budget of account is too large or too small"})
  }else{
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const nameToCheck = req.body.name
  const trimmedName = nameToCheck.trim()
  const allAccounts = await Accounts.getAll()

  const indexOfFoundName = allAccounts.indexof(trimmedName)
  if(indexOfFoundName < 0){
    res.status(400).json({message:"that name is taken"})
  }else{
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC

  // const reqId = req.params.id
  // const allAccounts = await Accounts.getAll()

  // const allIds = allAccounts.map(account => {
  //   return account.id
  // })
  // console.log(allIds)
  // console.log(reqId)
  // if(allIds.includes(reqId)){
  //   next()
  // } else{
  //   res.status(404).json({message:"account not found"})
  // }


  try{
    const account = await Accounts.getById(req.params.id)
    if(!account){
      res.status(404).json({message:"account not found"})
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }


}





// if(allAccounts.includes(Accounts.getById(reqId))){
//   next()
// } else{
//   console.log(reqId)
//   console.log(allAccounts)
//   console.log(Accounts.getById(reqId))
//   res.status(404).json({message:"account not found"})
// }