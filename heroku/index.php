<?php
$get_domain = isset($_GET['domain']) ? $_GET['domain'] : false;
if (!isset($get_domain))
{
    exit(json_encode(array(
        'domain' => null,
        'ip' => null
    )));
}

// Parse the domain
$parse_domain = parse_url($get_domain);
$domain = isset($parse_domain['host']) ? $parse_domain['host'] : $parse_domain['path'];

// Get the IP for this domain
$ip = gethostbyname($domain);
if(!filter_var($ip, FILTER_VALIDATE_IP))
{
    $ip = null;
}

// Return the domain and ip
exit(json_encode(array(
    'domain' => $domain,
    'ip' => $ip
)));