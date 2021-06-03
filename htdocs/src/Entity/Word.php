<?php

namespace App\Entity;

use App\Repository\WordInfoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

/**
 * @ORM\Entity(repositoryClass=WordInfoRepository::class)
 * @ORM\Table(name="`words`", indexes={
 *     @ORM\Index(name="word_idx", columns={"word"}),
 *     @ORM\Index(name="count_idx", columns={"count"}),
 *     @ORM\Index(name="count_word_idx", columns={"word", "count"}),
 * })
 */
class Word
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $word;

    /**
     * @ORM\Column(type="integer")
     */
    private int $count;

    /**
     * @Ignore()
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="words")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false, onDelete="CASCADE")
     */
    private User $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWord(): ?string
    {
        return $this->word;
    }

    public function setWord(string $word): self
    {
        $this->word = $word;

        return $this;
    }

    public function getCount(): ?int
    {
        return $this->count;
    }

    public function setCount(int $count): self
    {
        $this->count = $count;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
