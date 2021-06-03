<?php

namespace App\Repository;

use App\Entity\Word;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Word|null find($id, $lockMode = null, $lockVersion = null)
 * @method Word|null findOneBy(array $criteria, array $orderBy = null)
 * @method Word[]    findAll()
 * @method Word[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WordRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Word::class);
    }

    /**
     * @return Word[] Returns an array of Word objects
     */

    public function findByUserField(User $user)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.user = :val')
            ->setParameter('val', $user)
            ->add('orderBy', 'w.count DESC, w.word ASC')
            ->getQuery()
            ->getResult();
    }
}
