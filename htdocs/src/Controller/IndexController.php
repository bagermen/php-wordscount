<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class IndexController extends AbstractController
{
    /**
     * @Route("/index", name="index")
     * @Template
     */
    public function index()
    {
        return [];
    }
}
