import axios from 'axios'

const sendPost = function () {
 axios.post('https://wilsonwongnodered.mybluemix.net/testing', {firstName: "Fred", lastName: "Flinstone"})
  .then(function(response) {
    console.log(response)
  })
  .catch(function(err){
    console.log(err)
  })
}


export {sendPost}
