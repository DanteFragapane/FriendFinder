const path = require('path')
const express = require('express')
const htmlRouter = require(path.join(__dirname, '/app/routing/htmlRoutes.js'))
const apiRouter = require(path.join(__dirname, '/app/routing/apiRoutes.js'))
const PORT = process.env.PORT || 3000

const app = express()

app.use(htmlRouter)
app.use(apiRouter)

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`)
})
