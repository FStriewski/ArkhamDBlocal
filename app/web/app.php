<?php

use Symfony\Component\ClassLoader\ApcClassLoader;
use Symfony\Component\HttpFoundation\Request;

$loader = require_once __DIR__.'/../app/autoload.php';
//umask(0000);

// Enable APC for autoloading to improve performance.
// You should change the ApcClassLoader first argument to a unique prefix
// in order to prevent cache key conflicts with other applications
// also using APC.
/*
// $apcLoader = new ApcClassLoader(sha1(__FILE__), $loader);
// $loader->unregister();
// $apcLoader->register(true);
*/

require_once __DIR__.'/../app/AppKernel.php';
//require_once __DIR__.'/../app/AppCache.php';

$kernel = new AppKernel('prod', false);
$kernel->loadClassCache();
//$kernel = new AppCache($kernel);

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
//Request::enableHttpMethodParameterOverride();
$secret = 'f8jdsmo12hkcwc4s0k84kw0ogc0ocwwoc4w0ckkc8ckggk8g0';
// $secret = 'a44b03667cea775ae06c36c17bec5baf96617d91';
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
