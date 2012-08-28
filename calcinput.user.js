// ==UserScript== 
// @name           CalcInput
// @namespace      http://riofrios.com/
// @match          http://*/*
// @match          https://*/*
// @exclude        https://mail.google.com/*
// ==/UserScript== 

(function() {
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = src;
    script.addEventListener('load', function() {
      var callbackScript = document.createElement('script');
      callbackScript.textContent = '(' + callback.toString() + ')();';
      document.body.appendChild(callbackScript);
    }, false);
    document.body.appendChild(script);
  }

  loadScript("//cdnjs.cloudflare.com/ajax/libs/headjs/0.96/head.min.js", function() {
    head.js("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1/underscore-min.js", function() {
      $(document).keyup(function(ev) {
        if(ev.altKey && ev.which == 18) { // Alt-Enter
          if(ev.target.tagName.toLowerCase() == 'input'
            && (ev.target.type == 'text' || ev.target.type == 'number')) {
            ev.target.dataset.uncalculatedValue = ev.target.value;

            with(Math) {
              var pi = PI;
              var newValue = eval(ev.target.value);
            }
            if(_.isNumber(newValue)) newValue = newValue.toPrecision(6);
            ev.target.value = new String(newValue);

            if(ev.ctrlKey) { // Alt-Ctrl-Enter
              ev.target.form.submit();
            }
          }
        } else if(ev.ctrlKey && !ev.shiftKey && ev.which == 90) { // Ctrl-Z
          if(ev.target.tagName.toLowerCase() == 'input'
            && (ev.target.type == 'text' || ev.target.type == 'number')) {
            if(ev.target.dataset.uncalculatedValue) {
              ev.target.value = ev.target.dataset.uncalculatedValue;
              delete ev.target.dataset.uncalculatedValue;
            }
          }
        }
      });
    });
  });

})();
