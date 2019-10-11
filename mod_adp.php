<?php

/**
 * здесь описание и комментарии
 */
defined('_JEXEC') or die;
$doc = JFactory::getDocument();
JHtml::_('script', 'system/core.js', false, true);
$doc->addScript(Juri::base() . "components/com_ttfsp/ttfsp.js");
//$doc->addStyleSheet(Juri::base() . 'components/com_ttfsp/css/ttfsp.css');
$doc->addStyleSheet(Juri::base() . 'modules/mod_adp/assets/css/addpoint.css');
// подключаем наш хелпер
require_once __DIR__ . '/helper.php';

$idDoc = $params->get('idDoc');
$nameDoc = $params->get('fio');

//подключаем html-шаблон для вывода содержания модуля (шаблон default).
require JModuleHelper::getLayoutPath('mod_adp');