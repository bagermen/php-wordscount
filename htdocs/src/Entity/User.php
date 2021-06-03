<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Darsyn\IP\Version\Multi as IP;
use Darsyn\IP\IpInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`users`")
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="ip")
     */
    private IpInterface $ip;

    /**
     * @ORM\OneToMany(targetEntity=Word::class, mappedBy="user", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ORM\OrderBy({"count" = "DESC"}, {"word" = "ASC"})
     */
    private $words;

    public function __construct()
    {
        $this->words = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIp(): ?IpInterface
    {
        return $this->ip;
    }

    public function setIp(IpInterface $ip): self
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * @return Collection|Word[]
     */
    public function getWords(): Collection
    {
        return $this->words;
    }

    public function addWord(Word $word): self
    {
        if (!$this->words->contains($word)) {
            $this->words[] = $word;
            $word->setUser($this);
        }

        return $this;
    }

    public function removeWord(Word $word): self
    {
        if ($this->words->removeElement($word)) {
            // set the owning side to null (unless already changed)
            if ($word->getUser() === $this) {
                $word->setUser(null);
            }
        }

        return $this;
    }
}
