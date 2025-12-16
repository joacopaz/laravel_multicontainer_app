<?php

namespace App\Exceptions;

use Exception;

class IncorrectSwapiResourceException extends Exception
{
    protected $message = 'The requested Star Wars resource type is invalid, it should be in ["people", "movies"]';

    protected $code = 400;
}
