//use strict
'use strict';
//////////////////////////////////////////////////////////////////////
// Construct the HTML in the Document
//////////////////////////////////////////////////////////////////////
// Assign Incremental IDs to the Fieldset Elements
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
// when job role selector is changed,if it's changed to 'other', reveal the text field below
$( "#title").change(function() {
  if ($("#title option:selected").text() == "Other") {
      $("#other-field").show();
}
 else {
    $("#other-field").hide();
  }});
// display correct color selectors based upon T-shirt design
$( "#design").change(function() {
  // check if Theme - JS Puns has been selected
      if ($("#design option:selected").text() == "Theme - JS Puns") {
        //display appropriate colors
          $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>");
          }
          // check if Theme - I ♥ JS has been selected
      else if ($("#design option:selected").text() == 'Theme - I ♥ JS') {
        // display appropriate colors again
              $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>");
          }
          // if nothing has been selected
      else {
        //empty the colors selector of html
              $('#color').empty();
      }
});
// assign ID to activities based upon time of day
$(".activities > label").each (function() {
  // if the checkbox label relates to a morning activity
  if ($(this).text().indexOf("9am-12pm") >= 0) {
    // assign an appropriate variable
    $(this).children().attr("id", "morningBox");
  }
  // if the checkbox relates to an afternoon activity
  else if ($(this).text().indexOf("1pm-4pm") >= 0) {
    // assign an appropriate variable
      $(this).children().attr("id", "afternoonBox");
    }
});
///////////////////////////////////////////////////////////////////////////
// When Check Boxes Change State, Stuff Happens
//////////////////////////////////////////////////////////////////////////
$(".activities").find("input:checkbox").change(function() {
// create a global 'this'
var checkedBox = $(this);
///////////////////////////////////////////////////////////////////////
// If a Check Box is Checked
///////////////////////////////////////////////////////////////////////
  if ($(this).prop('checked')) {
    // ************************************************
    // if the checkbox related to a morning workshop is checked
    // ************************************************
    if ($(this).attr("id") == "morningBox") {
      // then do stuff to each of the other check boxes
      $(".activities > label").each (function() {
        // check to see if they are related to a morning workshop as well
        if ($(this).find("input").attr("id") == "morningBox") {
          //if so, append some text to the other boxes showing that the morning has been booked
          $(this).append('<small id="morningBooked"><b> &#10060; Morning Booked<b></small>');
          // remove text from the box that has already been ckecked
          // disable relevant check boxes to prevent double-booking
        }
      });
    }
    // ************************************************
    // if checkbox related to an afternoon workshop is checked
    // ************************************************
    else if ($(this).attr("id") == "afternoonBox") {
      // then do stuff to each of the other check boxes
     $(".activities > label").each (function() {
      // then check to see if the checkbox relates to a morning workshop
       if ($(this).children().attr("id") === "afternoonBox") {
         // append text that the afternoon has already been booked
         $(this).append('<small id="afternoonBooked"><b> &#10060; Afternoon Booked<b></small>');
         // remove text from the box that has already been ckecked
         // disable relevant check boxes to prevent double-booking
       }
     });
   }}
    ///////////////////////////////////////////////////////////////////////////
    // When Check Box is Unchecked
    //////////////////////////////////////////////////////////////////////////
    else if (!$(this).prop('checked')) {
      // ************************************************
      // if the checkbox related to a morning workshop is unchecked
      // ************************************************
       if ($(this).attr("id") == "morningBox") {
         $(".activities > label").each (function() {
           if ($(this).children().attr("id") === "morningBox") {
             // remove appended tag
             $(this).children("#morningBooked").remove();
           }
         })}
         // ************************************************
         // if the checkbox related to a afternoon workshop is unchecked
         // ************************************************
       else if ($(this).attr("id") == "afternoonBox") {
         $(".activities > label").each (function() {
           if ($(this).children().attr("id") === "afternoonBox") {
             // remove appended tag
             $(this).children('#afternoonBooked').remove();
           }
         })}
  }
});
