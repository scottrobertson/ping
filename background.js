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

  				var notification = webkitNotifications.createNotification(
				  'Power.png',  // icon url - can be relative
				  title + ' is Down',  // notification title
				  'This website apears to be down. Check www.isup.me for status'  // notification body text
				);
  			} else {

  				var notification = webkitNotifications.createNotification(
				  'Chrome.png',  // icon url - can be relative
				  data.domain + ' is available',  // notification title
				  data.ip  // notification body text
				);

  			}

			notification.show();

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