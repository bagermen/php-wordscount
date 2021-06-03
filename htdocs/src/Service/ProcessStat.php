<?php
namespace App\Service;
use Doctrine\ORM\EntityManagerInterface;
use App\Requests\Word as WordRequest;
use App\Entity\User;
use App\Entity\Word;

class ProcessStat {
    private EntityManagerInterface $entityManager;
    private Statistics $statistics;

    function __construct(EntityManagerInterface $entityManager, Statistics $statistics) {
        $this->entityManager = $entityManager;
        $this->statistics = $statistics;
    }

    public function process(WordRequest $wordRequest): User {
        $user = new User();
        $user->setIp($wordRequest->ip);

        foreach ($this->getWords($wordRequest->word) as $wordEntity) {
            $user->addWord($wordEntity);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        $this->entityManager->clear(Word::class);

        return $user;
    }

    private function getWords(string $text): \Generator {

        foreach ($this->statistics->calculate($text) as $word => $wordCount) {
            $wordEntity = new Word();
            $wordEntity->setWord($word);
            $wordEntity->setCount($wordCount);

            yield $wordEntity;
        }
    }
}