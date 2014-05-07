var http        = require('http'),
    request     = require('request'),
    querystring = require('querystring');


function createServer(port) {
  http.createServer(function (req, res) {
    var body = "";

    req.on('data', function (chunk) {
      body += chunk;
    })

    req.on('end', function () {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
      res.end('OK!');

      var formData = JSON.parse(body);
      processCommand(formData)
    });

  }).listen(port)
}

function start() {
  createServer(8101)
}

start()

function processCommand(command) {
  console.log(command)

  var weather = require('weather');
  weather({logging: true, appid:'Q2_Ky4zV34FoqoNxkluqSyzvnSWiyyZhc3v5EVRdqXdutumqGZbWdm_qcxFfcNnLmA--', location: 'Esher'}, function(data) {
    console.log(data);

    var summary = "The weather is currently " + querystring.escape(data.text.toLowerCase())
    request.get("http://localhost:4000?say=" + summary)
  });
}
