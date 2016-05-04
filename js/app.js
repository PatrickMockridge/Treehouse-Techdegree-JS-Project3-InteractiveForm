//use strict
'use strict';
// construct the html in the document
// assign incremental IDs to the fieldset elements
$('fieldset').each(function(index) {
$(this).attr("id", "fieldset-" + (index+1));
});
//add 'Other' text field for Job Role selector
$('#fieldset-1').append("<input type='text' id='other-field' placeholder='Your Title...' name='otherJob'>");
//hide text field initially
$("#other-field").hide();
//empty the color selector
$('#color').empty();
// html finished loading, focus on first input field
//focus on first field when document is ready document ready
$(document).ready(function() {
$('#name').focus();
});
//when job role selector is changed,if it's changed to 'other', reveal the text field below
$( "#title").change(function() {
  if ($("#title option:selected").text() == "Other") {
      $("#other-field").show();
}
 else {
    $("#other-field").hide();
  }});
  $( "#title").change(function() {
    if ($("#title option:selected").text() == "Other") {
        $("#other-field").show();
  }
   else {
      $("#other-field").hide();
    }});

$( "#design").change(function() {
      console.log($("#design option:selected").text())
      if ($("#design option:selected").text() == "Theme - JS Puns") {
          $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>")
          }
      else if ($("#design option:selected").text() == 'Theme - I ♥ JS') {
              $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>")
          }
      else {
              $('#color').empty();
      }
});
