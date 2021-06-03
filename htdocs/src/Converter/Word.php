<?php
namespace App\Converter;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Requests\Word as WordRequest;
use Darsyn\IP\Version\Multi as IP;

class Word  implements ParamConverterInterface {
    public function supports(ParamConverter $configuration)
    {
        if (null === $configuration->getClass()) {
            return false;
        }

        return is_a($configuration->getClass(), WordRequest::class, true);
    }

    public function apply(Request $request, ParamConverter $configuration)
    {
        $param = $configuration->getName();
        $data = json_decode($request->getContent(), true);

        if (!array_key_exists('word', $data)) {
            return false;
        }

        $class = $configuration->getClass();
        $word = new $class();
        $word->ip = IP::factory($request->getClientIp());
        $word->word = $data['word'];

        $request->attributes->set($param, $word);

        return true;
    }
}