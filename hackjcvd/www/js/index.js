/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFile(mediaFiles[i]);
    }
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureVideo() {
    // Launch device video recording application,
    // allowing user to capture up to 2 video clips
//    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 2});
    window.plugins.videocaptureplus.captureVideo(
      captureSuccess, // your success callback
      captureError,   // your error callback
          {
          limit: 1, // the nr of videos to record, default 1 (on iOS always 1)
                                                 duration: 0, // max duration in seconds, default 0, which is 'forever'
                                                 highquality: true, // set to true to override the default low quality setting
                                                 frontcamera: true, // set to true to override the default backfacing camera setting. iOS: works fine, Android: YMMV (#18)
                                                 // you'll want to sniff the useragent/device and pass the best overlay based on that.. assuming iphone here
                                                 portraitOverlay: 'www/assets/JCVD_Kickboxing.mov', // put the png in your www folder
                                                 landscapeOverlay: 'www/assets/JCVD_Kickboxing.mov', // not passing an overlay means no image is shown for the landscape orientation
                                                 //overlayText: 'Please rotate to landscape for the best result' // iOS only
                                                 }
                                                 );
}

// Upload files to server
function uploadFile(mediaFile) {
    alert('i am done uploading file '+ mediaFile.name);
   /* var ft = new FileTransfer(),
    path = mediaFile.fullPath,
    name = mediaFile.name;
    
    ft.upload(path,
              "http://my.domain.com/upload.php",
              function(result) {
              console.log('Upload success: ' + result.responseCode);
              console.log(result.bytesSent + ' bytes sent');
              },
              function(error) {
              console.log('Error uploading file ' + path + ': ' + error.code);
              },
              { fileName: name });*/
}

var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        // have to call initialize function with canvas object
            var objCanvas = document.getElementById("canvas");
            window.plugin.CanvasCamera.initialize(objCanvas);
        // window.plugin.CanvasCamera is now available
        
        app.receivedEvent('deviceready');
        app.initialize();
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};


