<?php

namespace App\Controller\Rest;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Requests\Word;
use App\Service\ProcessStat;
use App\Entity\User;
use App\Repository\WordRepository;

class WordsController extends AbstractController
{
    use ControllerTrait;

    /**
     * @Rest\Post("/words")
     * @ParamConverter("word", class="\App\Requests\Word", converter="word_converter")
     * @Rest\View()
     */
    public function postWordsAction(Word $word, ProcessStat $process, WordRepository $wordsRepository)
    {
        try {
            /** @var User */
            $user = $process->process($word);
        } catch (\Error $error) {
            throw new \Error('Pocess specific errors');
        }

        return $wordsRepository->findByUserField($user);
    }
}
