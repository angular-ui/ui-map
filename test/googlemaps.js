(function() { 
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
 
  getScript("http://maps.googleapis.com/maps/api/js?sensor=false");
})();