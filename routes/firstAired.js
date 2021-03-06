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
  console.log("webhook werkt! ")
  let message = req.body.queryResult.parameters.messageBody; 
  let meetingDate = req.body.queryResult.parameters.afspraakDag; 
  let meetingTime = req.body.queryResult.parameters.afsprakenTijd; 
  let recipient = req.body.queryResult.parameters.namen; 
  let tijdPeriode = req.body.queryResult.parameters.tijdPeriode; 
  var berichten = [
    {
      sendDate :"6 mei", 
      sendTime : "4 uur s'middags",
      body : "hi mam, ik kom wat later want ik sta in de file.", 
      userName : "Lisa" 
    }, 
    {
      sendDate : "5 mei", 
      sendTime : "6 uur s'avonds",
      body : "hey, ik kom aankomende zaterdag om drie uur even een taart langs brengen.", 
      userName : "Jan" 
    }
  ];

  var planning = [
    {
      day :"woensdag", 
      startTime : "8 uur s'avonds",
      endTime : "10 uur s'avonds", 
      user : "Jan" 
    }, 
    {
      day :"vrijdag", 
      startTime : "4 uur s'middags",
      endTime : "6 uur s'middags", 
      user : "Aletta" 
    }, 
    {
      day :"zaterdag", 
      startTime : "8 uur s'avonds",
      endTime : "10 uur s'avonds", 
      user : "Ramon" 
    }, 
  ];
  
var medSchema = [
  {
    actie: "bloedverdunners innemen",
    tijd:"8 uur",
  },
  {
    actie: "suikerspiegel prikken",
    tijd:"9 uur",
  },
];

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
      console.log("hitting vraagLangsKomen-yes");
      
        textResponse = `<speak> Ik heb uw uitnodiging verstuurd
        <break time="300ms"/>
        kan ik nog iets voor u betekenen? 
        </speak>`
      }
      
        
        
      
      
    
   
      
     
    else if(action == "vraagLangskomen.vraagLangskomen-no.vraagLangskomen-nee-custom.vraagLangskomen-nee-dedatum-custom"){
      let newDate = req.body.queryResult.parameters.afspraakDag; 
      textResponse = "ik heb de datum van de uitnodiging veranderd naar " + newDate + " en ik heb uw uitnodiging verstuurd "; 
    }else if(action == "veranderTijd"){
      let newTime = req.body.queryResult.parameters.afsprakenTijd; 
      textResponse = "ik heb de tijd van de uitnodiging veranderd naar " + newTime + " en ik heb uw uitnodiging verstuurd "; 
    }

  
    else if(action == "welcome"){
      textResponse = `<speak> Hallo ik ben Elderly
      <break time="300ms"/>
      Ik kan u helpen met het communiceren met uw familie. <break time="300ms"/> Zo kan ik bijvoorbeeld berichten versturen,  <break time="300ms"/> uw familieleden vragen op bezoek te komen  <break time="300ms"/> en u vertellen wat er allemaal op uw schema staat.   <break time ="300ms"/> wat kan ik voor u betekenen? 
      </speak>`; 
    }


    else if(action == "bericht_Versturen_VeranderNaam"){
      textResponse = `ik heb de ontvanger veranderd naar ${recipient}  zal ik het bericht versturen?`; 
    }else if(action == "sendMessage"){
      var body = (req.body.queryResult.parameters.bericht);
      textResponse = `<speak>
      u wilt uw bericht naar ${recipient} sturen
      <break time="300ms"/>
      en uw bericht is:
      <audio src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio> 
      <break time="300ms"/>
      ${body}
      <break time="500ms"/>
      is dit correct?
     </speak>`
    }

    else if(action == "verstuurBerichtBody.verstuurBericht-isCorrect"){
     
      textResponse = `<speak>
      Ik heb uw bericht verzonden.
      <break time="500ms"/>
      kan ik nog iets voor u betekenen?
     </speak>`
    }

  else if(action == "bericht_Versturen_VeranderBericht"){
    
    var newBody = (req.body.queryResult.queryText); 
    textResponse = `<speak> uw bericht is veranderd naar:
     <audio src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio> 
     <break time="300ms"/>
     ${newBody}
     <break time="500ms"/>
     wilt u dit versturen?
    </speak>`
  }




    else if(action == "opvragenBerichten"){
      textResponse = "u heeft " + berichten.length + " nieuwe berichten. Zal ik deze voor u afspelen?" ; 
    }else if(action == "opvragenBerichten.opvragenBerichten-yes"){
      textResponse = `<speak> 1e bericht van  ${berichten[0].userName}, " ontvangen op ${berichten[0].sendDate}, om ${berichten[0].sendTime}:<audio src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio> ${berichten[0].body} <break time="800ms"/> 
                      2e bericht van  ${berichten[1].userName}, " ontvangen op ${berichten[1].sendDate}, om ${berichten[1].sendTime}:<audio src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio> ${berichten[1].body} <break time="800ms"/> 
                      Wilt u de berichten nog een keer horen? </speak>`             
    }


    else if(action == "planningOpvragen"){
      textResponse = ` <speak> Er staan ${tijdPeriode} ${planning.length} afspraken op uw planning. Wilt u ze allemaal horen,<break time="100ms"/> of alleen de eerstvolgende? </speak>`             
    }else if(action == "opvragenPlanning.opvragenPlanning-allemaal"){
      textResponse = ` <speak> Uw eerstvolgende bezoek is van ${planning[0].user} op ${planning[0].day} van ${planning[0].startTime} tot ${planning[0].endTime}. <break time="300ms"/>
      het tweede bezoek is van ${planning[1].user} op ${planning[1].day} van ${planning[1].startTime} tot ${planning[1].endTime}. <break time="300ms"/>
      Het derde bezoek is van ${planning[2].user} op ${planning[2].day} van ${planning[2].startTime} tot ${planning[2].endTime}. <break time="500ms"/>
      Wilt u ze nogmaals horen?
      </speak>`             
    }
    else if(action == "opvragenPlanning.opvragenPlanning-eerstVolgende"){
      textResponse = ` <speak> Uw eerstvolgende bezoek is van ${planning[0].user} op ${planning[0].day} van ${planning[0].startTime} tot ${planning[0].endTime}. <break time="500ms"/>
      Wilt u deze nogmaals horen?
      </speak>`             
    }

    else if(action == "help"){
      textResponse = ` <speak> 
      U kunt mij vragen uw berichten voor te lezen,<break time="300ms"/>  een nood signaal te verzenden, <break time="300ms"/> vertellen wie er op welk moment bij u langs komt, <break time="300ms"/> een uitnodiging versturen, <break time="300ms"/> en informatie geven over medicijnen. 
      <break time="500ms"/>  
      u kunt het gesprek stoppen door stop tegen mij te zeggen.
      <break time="500ms"/>
      Wilt u de instructies nog een keer horen?
      </speak>`             
    }

    else if(action == "medSchema"){
      let followUpName = req.body.queryResult.outputContexts[0].parameters.namen;
          if(recipient == "ik" || recipient == "mijzelf" ||recipient == "mij" || followUpName == "ik" || followUpName == "mijzelf" || followUpName == "mezelf" ) {textResponse = ` <speak> 
          U moet vandaag om ${medSchema[0].tijd} ${medSchema[0].actie} en om ${medSchema[1].tijd} uw ${medSchema[1].actie} 
          <break time="500ms"/>
          kan ik nog iets voor u betekenen? 
          </speak>`
      }else if(recipient != null){
        textResponse = ` <speak> 
        ${recipient} moet vandaag om ${medSchema[0].tijd} ${medSchema[0].actie} en om ${medSchema[1].tijd} ${medSchema[1].actie}
        <break time="500ms"/>
        kan ik nog iets voor u betekenen? 
        </speak>`   
      }   
      else{
        textResponse = ` <speak> 
        ${followUpName} moet vandaag om ${medSchema[0].tijd} ${medSchema[0].actie} en om ${medSchema[1].tijd} ${medSchema[1].actie}
        <break time="500ms"/>
       kan ik nog iets voor u betekenen? 
        </speak>`   
      }        
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


