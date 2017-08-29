// Add custom jQuery or Javascript here
// https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
(($, Drupal) => {

  Drupal.behaviors.customBehavior = {
    attach: (context, settings) => {
      // perform jQuery as normal in here
    }
  };

})(jQuery, Drupal);
