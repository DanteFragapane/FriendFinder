const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/api/friends', (req, res) => {
  res.sendFile(path.join(__dirname, '../data/friend.json'))
})

// Read from the friends json file and writes the new friends array to the file
router.post('/api/friends', (req, res) => {
  // Match information
  const match = { index: 0, diff: 1000 }

  // Read
  fs.readFile(path.join(__dirname, '../data/friend.json'), 'utf-8', (err, data) => {
    if (err) throw err
    // Parse the array and new info
    const array = JSON.parse(data)
    const results = req.body

    // THIS IS BAD PRACTICE, though unfortunately I see no other way of doing it. Loop inside loop === BAD
    // Loop through the array of people
    array.map((val, index) => {
      console.log(index)
      let totalDifference = 0
      // Loop through the scores inside each person
      val.scores.map((score, index) => {
        // Get the difference between the scores
        totalDifference += Math.abs(results.scores[index] - score)
      })
      // If the current total difference is less than the previous difference,
      // then this person is a better match
      if (totalDifference < match.diff) {
        match.index = index
        match.diff = totalDifference
      }
    })

    console.log(array[match.index])

    // Add the new information to the array
    array.push(results)

    // Write
    fs.writeFile(path.join(__dirname, '../data/friend.json'), JSON.stringify(array), (err) => {
      if (err) throw err
    })

    // Send the match info
    res.send(match)
  })
})

module.exports = router
