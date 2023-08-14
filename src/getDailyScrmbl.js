function getDailyScrmbl(callback) {
  fetch('https://xj8a0b5rzj.execute-api.us-east-1.amazonaws.com/default/getScrmblWord')
    .then(response => {
      return response.json()
    })
    .then(data => {
      callback(data.message.word.toUpperCase())
    })
}

export default getDailyScrmbl;