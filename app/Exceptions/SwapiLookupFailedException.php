<?php

namespace App\Exceptions;

use Exception;

class SwapiLookupFailedException extends Exception
{
    protected $message = 'External api lookup failed';

    protected $code = 404;
}
