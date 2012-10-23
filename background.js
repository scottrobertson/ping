chrome.omnibox.onInputEntered.addListener(
  function(domain) {
    	
  		ping(domain, function(result) {
  			
  			var data = JSON.parse(result.response);

  			if (data.ip === null || data.domain === null) {


  				if (data.domain !== null) {
  					var title = data.domain;
  				} else if(data.ip !== null) {
  					var title = data.ip;
  				} else {
  					var title = 'This Website';
  				}
               
                chrome.tabs.create({'url': "http://isup.me/" + domain}, function(tab) {
                    return true;
                });
                                
  			} else {

  				var notification = webkitNotifications.createNotification(
				  'Chrome.png',
				  data.domain + ' is available',  
				  data.ip 
				);
                
                notification.show();

  			}

  		});

  });


function ping(domain, callback) {
		
	var obj = new XMLHttpRequest();  

	obj.onreadystatechange = function() {
		if(obj.readyState == 4) {
			callback(obj);
		} 
	}

	var apiKey = '6ad80f62e94579dd6c539176128f9cf2';

	obj.open('get', 'http://scottymeuk.co.uk/api/ping/' + domain + '?apikey=' + apiKey, true);
	obj.send();
	return obj; 

}