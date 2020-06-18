var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

// Original API
app.get('/api-endpoint', function(request, response) {
    var nameString = request.query.name;
    var historyString = request.query.history;
    
      var jsonContent = 
          [
                        {
                            "id": 1,
                            "productImage": "https://www.hkcsl.com/u/cms/pccw/img/handset/20111_2.jpg",
                            "productLink": "https://www.hkcsl.com/handset/tc/pro_details.jsp?id=421070",
                            "status": "Completed",
                            "statusStyle": "slds-text-color_success",
                            "productName": "Black Shark 2 Pro (12GB+256GB)",
                            "purchaseDate": "2019-06-05",
                            "paymentMethod": "Cash",
                            "purchasePrice": "4898",
                            "purchaseMethod": "Walk-in"
                        }
      ,
                        {
                            "id": 2,
                            "productImage": "https://www.hkcsl.com/u/cms/pccw/img/handset/38221_2.jpg",
                            "productLink": "https://www.hkcsl.com/handset/tc/pro_details.jsp?id=421070",
                            "status": "In progress",
                            "statusStyle": "slds-text-color_destructive",
                            "productName": "iPhone SE (128GB)",
                            "purchaseDate": "2020-06-05",
                            "paymentMethod": "Credit card",
                            "purchasePrice": "3899",
                            "purchaseMethod": "Website"
                        }        
                ]
      ;
    
    var outputResult;
    const startDate = request.params.startDate;
    
    console.log("Original start date: " + startDate);
    
    
//     const endDate = request.params.endDate;
    
    if (startDate){
        var date = new Date(startDate)
        console.log("formated Start Date: " + date);
//         outputResult = jsonContent.filter(x => {
//             if (x.purchaseDate){
//                 return date >= x.purchaseDate
//             }
//         })
    }
    
//     if (endDate){
//         var date = new Date(endDate)
//         outputResult = jsonContent.filter(x => {
//             if (x.purchaseDate){
//                 return date <= x.purchaseDate
//             }
//         })
//     }
    
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(JSON.parse(JSON.stringify(jsonContent)));
//     response.send(JSON.parse(JSON.stringify(outputResult)));
    
});

//Purchase History
app.get('/api/purchaseHistory', function (request, response) {
  fs.readFile('./data/purchaseHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    // Testing
//     data = data.slice(1);  
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(JSON.parse(data));
  })
});

//Promotion Recommendation
app.get('/api/promotionRecommendation', function (request, response) {
  fs.readFile('./data/promotionRecommendation.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(JSON.parse(data));
  })
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
