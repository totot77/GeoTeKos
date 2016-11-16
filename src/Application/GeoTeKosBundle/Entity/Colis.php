<?php

namespace Application\GeoTeKosBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Colis
 *
 * @ORM\Table(name="t_colis_col")
 * @ORM\Entity(repositoryClass="Application\GeoTeKosBundle\Repository\ColisRepository")
 */
class Colis
{
    /**
     * @var int
     *
     * @ORM\Column(name="col_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="col_libelle", type="string", length=255)
     */
    private $libelle;

    /**
     * @ORM\OneToMany(targetEntity="Livreur", mappedBy="colis", cascade={"remove", "persist"})
     */
     protected $livreurs;

     /**
     * @ORM\OneToMany(targetEntity="Client", mappedBy="colis", cascade={"remove", "persist"})
     */
     protected $clients;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set libelle
     *
     * @param string $libelle
     *
     * @return Colis
     */
    public function setLibelle($libelle)
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * Get libelle
     *
     * @return string
     */
    public function getLibelle()
    {
        return $this->libelle;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->livreurs = new \Doctrine\Common\Collections\ArrayCollection();
        $this->clients = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add livreur
     *
     * @param \Application\GeoTeKosBundle\Entity\Livreur $livreur
     *
     * @return Colis
     */
    public function addLivreur(\Application\GeoTeKosBundle\Entity\Livreur $livreur)
    {
        $this->livreurs[] = $livreur;

        return $this;
    }

    /**
     * Remove livreur
     *
     * @param \Application\GeoTeKosBundle\Entity\Livreur $livreur
     */
    public function removeLivreur(\Application\GeoTeKosBundle\Entity\Livreur $livreur)
    {
        $this->livreurs->removeElement($livreur);
    }

    /**
     * Get livreurs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLivreurs()
    {
        return $this->livreurs;
    }

    /**
     * Add client
     *
     * @param \Application\GeoTeKosBundle\Entity\Client $client
     *
     * @return Colis
     */
    public function addClient(\Application\GeoTeKosBundle\Entity\Client $client)
    {
        $this->clients[] = $client;

        return $this;
    }

    /**
     * Remove client
     *
     * @param \Application\GeoTeKosBundle\Entity\Client $client
     */
    public function removeClient(\Application\GeoTeKosBundle\Entity\Client $client)
    {
        $this->clients->removeElement($client);
    }

    /**
     * Get clients
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getClients()
    {
        return $this->clients;
    }
}
