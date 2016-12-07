{
  "src_folders" : ["bundled/e2e-test/"],
  "output_folder" : "reports",
  "selenium" : {
    "start_process" : false
  },
  "test_settings" : {
    "default" : {
      "silent": true,
      "screenshots" : {
        "enabled" : true,
        "path" : "screenshots"
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true
      }
    },
    "phantomjs" : {
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true,
        "phantomjs.binary.path" : "./node_modules/phantomjs/bin/phantomjs"
      }
    },
    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
