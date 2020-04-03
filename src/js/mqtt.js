/*!
 * MQTT Module
 * Handles all MQTT network protocol operations
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

const mqtt = require('mqtt');

/* ================================ Variables =============================== */

const options = {
  port: 1883,
  host: 'mqtt://m11.cloudmqtt.com',
  username: 'xxxxxxxxxxxxxxxxxx',
  password: 'xxxxxxxxxxxxxxxxxx',
  encoding: 'utf8',
  // assign random client number
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  // frequency in seconds that checks are sent to ensure that the mqtt broker is
  // alive (s)
  keepalive: 60,
  // interval between two reconnections (ms)
  reconnectPeriod: 1000,
  // Only required if connecting to broker that only supports MQTT 3.1 (not
  // 3.1.1 compliant)
  // protocolId: 'MQIsdp',
  // protocolVersion: 3,
  // restore subscriptions upon reconnection
  clean: true
};

const topics = {
  publish: ['test']
  , subscribe: ['test']
};

/* ============================= Private Methods ============================ */

// N/A

/* ============================== Public Methods ============================ */

function init() {

  const client  = mqtt.connect(options.host, options);

  client.on('connect', function () {
    console.log('connected');
    // subscribe to a topic
    client.subscribe(topics.subscribe[0], function (err) {
      if (!err) {
        // publish to a topic
        client.publish(topics.publish[0], 'Hello mqtt');
      }
    })
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString());
    console.log(message.toString());
    // client.end();
  })

  client.on('error', function (err) {
    console.log(err);
  });

  client.on('close', function () {
    console.log('mqtt client disconnected');
  });

}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init: init
};
