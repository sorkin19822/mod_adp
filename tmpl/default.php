<?php
//JHtml::stylesheet(Juri::base() . 'modules/mod_adp/assets/css/addpoint.css', array(), true);
//F:\звери\new\new 1.sql
jimport( 'joomla.application.application' );
JHtml::_('jquery.framework');
JHtml::_('script', Juri::base() . 'modules/mod_adp/assets/js/addpoint.js');

// Get a handle to the Joomla! application object
$application = JFactory::getApplication();
$flag = $_GET['ord'];
if($flag) {
    JFactory::getApplication()->enqueueMessage('Message');
}
JText::script('MOD_DJREVIEWS_ORDER');
?>
<!-- This is a button toggling the modal -->
<button class="btn btn-primary btn-short myModal" style="line-height: 0;padding: 25px 10px!important;" data-id="<?= $idDoc ?>" data-name="<?= $nameDoc ?>">Расписание</button>
