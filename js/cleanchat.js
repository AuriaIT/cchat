/* ========================================================================
 * CChat: cleanchat.js v1.0.0
 * http://chat.auria.it
 * Copyright 2014 Auria IT
 * ======================================================================== */
 
var _fingerprint = new Fingerprint().get();
var _dweet_name = "auria_it.chat";


        var _fingerprint = new Fingerprint().get();
        var _dweet_name = "auria_it.chat";
  
		function onDeviceReady() {
			/**
			* Enables the background mode. The app will not pause while in background.
			*/
			if ( window.plugin ) {
				window.plugin.backgroundMode.enable();
			}
		}
		
        $(".my_fingerprint").html(_fingerprint);
        
       
		dweetio.get_latest_dweet_for(_dweet_name, function(err, dweet){

			var dweet = dweet[0]; // Dweet is always an array of 1
			_prependMessage(dweet);

		});


        dweetio.listen_for(_dweet_name, function(dweet){
            
            _prependMessage(dweet);
            
        });
        
        var _postChat = function (new_message) {
            document.getElementById('my_message').value = "";
            
			if ( new_message ) {
				dweetio.dweet_for(_dweet_name, {"the_message":new_message,"sender_id":_fingerprint}, function(err, dweet){});  
			}   
			
			return false;
        }
        
        var _prependMessage = function (dweet) {
        
            var classstyle = "alert-info";
			
			if ( dweet ) {
					   
				if (dweet["content"] != "" ) {                
					
					if ( dweet["content"]["sender_id"] == _fingerprint ) {
						classstyle = "alert-success";
					} else {
						if ( window.plugin) {    
							window.plugin.notification.local.add({ message: "Neue Nachricht" })
						}		
					}
				
					$(".message_container").before('<div class="msg-box-info" >'+ htmlspecialchars('@ ' + dweet["created"].toLocaleDateString("de-DE") + ' ' +dweet["created"].toLocaleTimeString("de-DE") + ' from ' + dweet["content"]["sender_id"]) +'</div><div class="alert '+classstyle+' msg-box" >' + htmlspecialchars(dweet["content"]["the_message"]) + '</div>');

					$("html, body").animate({ scrollTop: $(document).height() }, "slow");
					
				}        
			}
        }
    
        function htmlspecialchars(str) {
         if (typeof(str) == "string") {
          str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
          str = str.replace(/"/g, "&quot;");
          str = str.replace(/'/g, "&#039;");
          str = str.replace(/</g, "&lt;");
          str = str.replace(/>/g, "&gt;");
          }
         return str;
         }
	
	 