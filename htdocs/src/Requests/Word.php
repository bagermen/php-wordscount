<?php

namespace App\Requests;
use Darsyn\IP\IpInterface;

class Word {
    public string $word;

    public IpInterface $ip;
}