var http        = require('http'),
    request     = require('request'),
    querystring = require('querystring'),
    weather     = require('weather')
    say         = require('say')
    ;

function createServer(port) {
  http.createServer(function (req, res) {
    var body = "";

    req.on('data', function (chunk) {
      body += chunk;
    })

    req.on('end', function () {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
      res.end('OK!');

      if (body.length > 0) {
        var formData = JSON.parse(body);
        processCommand(formData)
      }
    });

  }).listen(port)
}

function start() {
  var port = Number(process.env.PORT || 8181);
  console.log("Started on port " + port)
  createServer(port)
}

start()

function processCommand(command) {
  console.log(command)

  weather({logging: true, appid:'Q2_Ky4zV34FoqoNxkluqSyzvnSWiyyZhc3v5EVRdqXdutumqGZbWdm_qcxFfcNnLmA--', location: 'Esher'}, function(data) {
    console.log(data);

      if (command.category == "weather") {
        var summary = "The weather is currently " + querystring.escape(data.text.toLowerCase())
        say(summary)
      }

      if (command.category == "temperature") {
        var temperature = "The temperature is currently " + querystring.escape(data.temp) + " degrees C"
        say(temperature)
      }

  });
}
