chrome.omnibox.onInputEntered.addListener(
    function(domain) {
        ping(domain, function(result) {
            var data = JSON.parse(result.response);
            if (data.ip === null || data.domain === null) {
                chrome.tabs.create({'url': "http://isup.me/" + domain}, function(tab) {
                  return true;
                });
            } else {
                var notification = webkitNotifications.createNotification(
                    'img/Chrome.png',
                    data.domain + ' is available',
                    data.ip
                );
                notification.show();
            }
        });
    }
);

function ping(domain, callback) {
    var obj = new XMLHttpRequest();
    obj.onreadystatechange = function() {
        if(obj.readyState == 4) {
            callback(obj);
        }
    }
    obj.open('get', 'http://scottymeuk-ping.herokuapp.com/index.php?domain=' + domain, true);
    obj.send();
    return obj;
}