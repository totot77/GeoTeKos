<?php

namespace Application\GeoTeKosBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType; 
use Symfony\Component\Form\Extension\Core\Type\ButtonType; 


class ClientType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('nom')
                ->add('prenom')
                ->add('ville')
                ->add('rue')
                ->add('cP')
                ->add('save', SubmitType::class, array('label' => 'Créer'))
                ->add('ajouter', SubmitType::class, array('label' => 'Créer et nouveau'))
                ->add('reinit', ButtonType::class, array('label' => 'Réinitialiser'))
            ;
    }

    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\GeoTeKosBundle\Entity\Client'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'application_geotekosbundle_client';
    }


}
