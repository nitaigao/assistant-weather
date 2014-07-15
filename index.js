var querystring = require('querystring'),
    weather     = require('weather'),
    faye        = require('faye'),
    settings    = require('env-settings')
;

function start() {
  var client = new faye.Client(settings.brain + '/');
  client.subscribe('/weather', function(message) {
    var command = JSON.parse(message);
    processCommand(command);
  });
}

start()

function processCommand(command) {
  weather({logging: true, appid:'Q2_Ky4zV34FoqoNxkluqSyzvnSWiyyZhc3v5EVRdqXdutumqGZbWdm_qcxFfcNnLmA--', location: 'Esher'}, function(data) {
    var client = new faye.Client(settings.brain + '/');

    if (command.category == "weather") {
      var summary = "The weather is currently " + data.text
      client.publish('/responses', summary);
    }

    if (command.category == "temperature") {
      var temperature = "The temperature is currently " + data.temp + " degrees C"
      client.publish('/responses', temperature);
    }

  });
}
