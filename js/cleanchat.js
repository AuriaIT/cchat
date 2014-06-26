
        var _fingerprint = new Fingerprint().get();
        var _dweet_name = "auria_it.chat";
        
		/**
		* Enables the background mode. The app will not pause while in background.
		*/
		if ( window.plugin ) {
			window.plugin.backgroundMode.enable();
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
			
			return true;
        }
        
        var _prependMessage = function (dweet) {
        
            var classstyle = "alert-info";
			
			if ( dweet ) {
					   
				if (dweet["content"] != "" ) {                
					
					if ( dweet["content"]["sender_id"] == _fingerprint ) {
						classstyle = "alert-success";
					} else {
						sendNotify("Neue Nachricht");
					}
				
					$(".message_container").prepend('<div style="font-size:10px;">'+ htmlspecialchars('@ ' + dweet["created"].toLocaleDateString("de-DE") + ' ' +dweet["created"].toLocaleTimeString("de-DE") + ' from ' + dweet["content"]["sender_id"]) +'</div><div class="alert '+classstyle+'" style="margin-top:2px;padding:5px;">' + htmlspecialchars(dweet["content"]["the_message"]) + '</div>');

					
					
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
		 
		function sendNotify(msg) {
				if ( typeof window.plugin !== "undefined" ) {    
					window.plugin.notification.local.add({ message: msg })
				}
		}		 