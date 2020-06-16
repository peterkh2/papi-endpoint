var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api-endpoint', function(request, response) {
    var nameString = request.query.name;
    var historyString = request.query.history;
    
      var jsonContent = { 
            title: nameString,
            imageUrl: "https://image.flaticon.com/icons/png/512/61/61456.png",
            contact: [ {id: 12345, name: "King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"},{id: 12346, name: "King King Lai"}],
            show: true 
        };

    response.send(JSON.parse(JSON.stringify(jsonContent)));
    
});

//Purchase History
app.get('/api/purchaseHistory', function (request, response) {
  var id = request.query.id;

  fs.readFile('./data/purchaseHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    var result;
    var rawData = JSON.parse(data);

    if (id) {
      result = rawData.filter(x => x.id === parseInt(id));
    } else {
      result = rawData;
    }

    response.send(JSON.parse(JSON.stringify(result)));
  })
});

//Promotion Recommendation
app.get('/api/promotionRecommendation', function (request, response) {
  var id = request.query.id;

  fs.readFile('./data/promotionRecommendation.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    var result;
    var rawData = JSON.parse(data);

    if (id) {
      result = rawData.filter(x => x.id === parseInt(id));
    } else {
      result = rawData;
    }

    response.send(JSON.parse(JSON.stringify(result)));
  })
});


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
