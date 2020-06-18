var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

// Original API
// // app.get('/api-endpoint', function(request, response) {
//     var nameString = request.query.name;
//     var historyString = request.query.history;
    
//       var jsonContent = 
//           [
//                         {
//                             "id": 1,
//                             "productImage": "https://www.hkcsl.com/u/cms/pccw/img/handset/20111_2.jpg",
//                             "productLink": "https://www.hkcsl.com/handset/tc/pro_details.jsp?id=421070",
//                             "status": "Success",
//                             "statusStyle": "slds-text-color_success",
//                             "productName": "Black Shark 2 Pro (12GB+256GB)",
//                             "purchaseDate": "05-May-2019",
//                             "paymentMethod": "Cash",
//                             "purchasePrice": "4898",
//                             "purchaseMethod": "Walk-in"
//                         }
//       ,
//                         {
//                             "id": 2,
//                             "productImage": "https://www.hkcsl.com/u/cms/pccw/img/handset/38221_2.jpg",
//                             "productLink": "https://www.hkcsl.com/handset/tc/pro_details.jsp?id=421070",
//                             "status": "Cancel",
//                             "statusStyle": "slds-text-color_destructive",
//                             "productName": "iPhone SE (128GB)",
//                             "purchaseDate": "05-Jun-2020",
//                             "paymentMethod": "Credit card",
//                             "purchasePrice": "3899",
//                             "purchaseMethod": "Website"
//                         }        
//                 ]
//       ;
//     response.setHeader('Access-Control-Allow-Origin','*');
//     response.send(JSON.parse(JSON.stringify(jsonContent)));
    
// });

//Purchase History
app.get('/api/purchaseHistory', function (request, response) {
  fs.readFile('./data/purchaseHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

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
