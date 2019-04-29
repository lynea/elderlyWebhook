var express = require('express');
var router = express.Router();
var axios = require("axios"); 
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({
  extended: true
})); 

router.use(bodyParser.json());

/* GET users listing. */
router.post('/', function(req, res, next) {
  let message = req.body.queryResult.parameters.messageBody; 
  let meetingDate = req.body.queryResult.parameters.afspraakDag; 
  let meetingTime = req.body.queryResult.parameters.afsprakenTijd; 
  let recipient = req.body.queryResult.parameters.namen; 
  let newName = req.body.queryResult.outputContexts[0].parameters.namen; 
  
  // let url = "http://www.omdbapi.com/?t="+showTitle+"&apikey=752fa0bf";
  let action = req.body.queryResult.action; 
 console.log("we did hit the route"); 
  
    // axios.get(url).then(aRes => {
    //   let apiData = aRes.data;  
    //   let actors =  apiData.Actors; 
    //   let writers = apiData.Writer;
    //   let title =   apiData.Title; 
    //   let image =   apiData.Poster; 
    //   let score =   apiData.imdbRating; 
    //   let plot =    apiData.Plot;
    //   let link =    "https://www.imdb.com/title/"+apiData.imdbID; 
    //   let textResponse = ""; 
    //   let standardText = " what else can i do for you?"; 

    //   if( action == "actors"){
    //      textResponse = "The main actors of "+ title + " are: " + actors; 
    //   }else if(action == "writers"){
    //     textResponse = "The writers of "+ title + " are: " + writers ; 
    //   } else if(action == "score"){
    //     textResponse = "IMDB users gave "+ title + " a score of: " + score ; 
    //   }else if(action == "plot"){
    //     textResponse = plot; 
    //   }else {
    //   console.log("i could not find what you are looking for.")
    // }
    //   
    // }).catch(err =>{
    //   console.log(err); 
    // })
    if(action == "askVisit"){
      textResponse = "u wilt " + recipient + " vragen " + meetingDate + " om " + meetingTime + " langs te komen, is dit correct?"; 
    }else if(action ==  "vraagLangskomen.vraagLangskomen-no.vraagLangskomen-nee-custom.vraagLangskomen-nee-denaam-custom"){
      textResponse = "ik heb de ontvanger veranderd naar " + recipient; 
    }else if(action == "vraagLangskomen.vraagLangskomen-yes"){
      console.log("this works"); 
      textResponse = "ik heb de uitnodiging verstuurd naar " + newName; 
      
    }else if(action == "sendMessage"){
      textResponse = "uw bericht voor " + recipient + " is: " + message +"." + " is dit correct?"; 
    }
    
    res.send(createTextResponse(textResponse)); 
});




function createTextResponse (textResponse){
  let response = {
    "fulfillmentText":"title",
    "fulfillmentMessages": [
      {
        "card": {
          "title": "title",
          "subtitle": textResponse,
          "imageUri": "image",
          "buttons": [
            {
              "text": "Se more",
              "postback": "link"
            }
          ]
        }
      }
    ],
   
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": textResponse
              }
            }
          ]
        }
      },
      "facebook": {
        "text": "Hello, Facebook!"
      },
      "slack": {
        "text": "This is a text response for Slack."
      }
    },
  
  };
  return response; 
}


module.exports = router;


