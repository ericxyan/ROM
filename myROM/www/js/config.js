angular.module('starter.config', [])

.config(function($compileProvider){
	  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});
