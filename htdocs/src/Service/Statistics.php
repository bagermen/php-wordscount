<?php
namespace App\Service;

class Statistics {
    public function calculate(string $word, int $minChars = 3)
    {
        if (preg_match_all("/\\b[^\\s]{{$minChars},}\\b/", strtolower($word), $words) !== false) {
            return array_count_values($words[0]);
        } else {
            return [];
        }
    }
}