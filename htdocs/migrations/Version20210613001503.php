<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210613001503 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE "users_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "words_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "users" (id INT NOT NULL, ip BYTEA NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN "users".ip IS \'(DC2Type:ip)\'');
        $this->addSql('CREATE TABLE "words" (id INT NOT NULL, user_id INT NOT NULL, word VARCHAR(255) NOT NULL, count INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_717D1E8CA76ED395 ON "words" (user_id)');
        $this->addSql('CREATE INDEX word_idx ON "words" (word)');
        $this->addSql('CREATE INDEX count_idx ON "words" (count)');
        $this->addSql('CREATE INDEX count_word_idx ON "words" (word, count)');
        $this->addSql('ALTER TABLE "words" ADD CONSTRAINT FK_717D1E8CA76ED395 FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "words" DROP CONSTRAINT FK_717D1E8CA76ED395');
        $this->addSql('DROP SEQUENCE "users_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "words_id_seq" CASCADE');
        $this->addSql('DROP TABLE "users"');
        $this->addSql('DROP TABLE "words"');
    }
}
