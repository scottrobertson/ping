<?php
$domain = isset($_GET['domain']) ? $_GET['domain'] : false;
if (!isset($domain))
{
    exit(json_encode(array(
        'domain' => null,
        'ip' => null
    )));
}

$domain = strtolower($domain);
$domain = str_replace(array('https://','http://','www.'), array(null,null,null), $domain);
$ip = gethostbyname($domain);

if(!filter_var($ip, FILTER_VALIDATE_IP))
{
    $ip = null;
}

exit(json_encode(array(
    'domain' => $domain,
    'ip' => $ip
)));