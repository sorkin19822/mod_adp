<?php

defined('_JEXEC') or die;

class modAdpHelper
{
        private $params = null;

        public function __construct()
    {
        $this->params = $this->getParams();
    }

        public function getParams()
    {
        $module = JModuleHelper::getModule('mod_adp');
        $moduleParams = new JRegistry;

        if ($module->params !== '')
        {
            $moduleParams->loadString($module->params);
        }

        return $moduleParams;
    }

        // Non-Static function example
        public function yourFunction()
    {
        $this->params->get('guestid');
    }

        // Static function example
        public static function yourStaticFunction()
    {
        $helper = new modAdpHelper();

        $size = $helper->getParams()->get('guestid');
    }



}

