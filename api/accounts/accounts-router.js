const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountPayload, checkAccountId} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const data = await Accounts.getAll()
    console.log('hello')
    res.json(data) 
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {id} = req.params
    const data = await Accounts.getById(id)
    res.json(data)
  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newData = await Accounts.create(req.body)
    res.json(newData)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {id} = req.params
    const changes = req.body

    await Accounts.updateById(id, changes)
    const updated = await Accounts.getById(id)
    
    res.json(updated)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {id} = req.params
    await Accounts.deleteById(id)
    res.json({message:`post with id of ${id} was deleted`})
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
