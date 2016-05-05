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
// Append total cost of everthing selected to the bottom of the activities fieldset
// instantiate total cost variable
var totalCost = 0;
$('.activities').append("<p id='p2'> Total Cost Will Be: $" + totalCost + "</p>");
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
else {
      // assign an appropriate variable
      $(this).children().attr("id", "wholeDayBox");
}});
///////////////////////////////////////////////////////////////////////////
// When Check Boxes Change State, Stuff Happens
//////////////////////////////////////////////////////////////////////////
$(".activities").find("input:checkbox").change(function() {
// remove the total Cost because it's going to be updated at the end of the function
$('#p2').remove();
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
          //disable other check boxes of the same type
          $(this).find("input:not(:checked)").attr('disabled', 'disabled');
          // append some text to the unchecked boxes of the same type showing that the morning has been booked
          $(this).find("input:not(:checked)").parent().append('<small id="Booked"><b> &#10060; Already Booked<b></small>');
          // cost goes up by $100

        }
      });
          totalCost += 100;
    }
    // ************************************************
    // if checkbox related to an afternoon workshop is checked
    // ************************************************
    else if ($(this).attr("id") == "afternoonBox") {
      // then do stuff to each of the other check boxes
     $(".activities > label").each (function() {
      // then check to see if the checkbox relates to a morning workshop
       if ($(this).children().attr("id") === "afternoonBox") {
         //disable other check boxes of the same type
         $(this).find("input:not(:checked)").attr('disabled', 'disabled');
         // append some text to the unchecked boxes of the same type showing that the morning has been booked
         $(this).find("input:not(:checked)").parent().append('<small id="Booked"><b> &#10060; Already Booked<b></small>');

       }
     });
        totalCost += 100;
   }
   else if ($(this).attr("id") == "wholeDayBox") {
     // remaining box is for the conference
     totalCost += 200;
   }
 }
    ///////////////////////////////////////////////////////////////////////////
    // When Check Box is Unchecked
    //////////////////////////////////////////////////////////////////////////
    else if (!$(this).prop('checked')) {
      // ************************************************
      // if the checkbox related to a morning workshop is unchecked
      // ************************************************
      if ($(this).attr("id") == "morningBox") {
        // then do stuff to each of the other check boxes
        $(".activities > label").each (function() {
          // check to see if they are related to a morning workshop
          if ($(this).find("input").attr("id") == "morningBox") {
            //disable other check boxes of the same type
            $(this).find("input:not(:checked)").prop('disabled', false);
            //remove appended tag
            $(this).find('#Booked').remove();
          }})
          //cost goes down $100
          totalCost -= 100;
        }
         // ************************************************
         // if the checkbox related to a afternoon workshop is unchecked
         // ************************************************
       else if ($(this).attr("id") == "afternoonBox") {
         //then do stuff to each of the other check boxes
         $(".activities > label").each (function() {
           // check to see if they are related to an afternoon workshop
           if ($(this).children().attr("id") === "afternoonBox") {
             // disable other check boxes of the same type
             $(this).find("input:not(:checked)").prop('disabled', false);
             // remove appended tag
             $(this).children('#Booked').remove();
           }})
          // cost goes down $100
          totalCost -= 100;
       }
         else if ($(this).attr("id") == "wholeDayBox") {
           // remaining box is for the conference
           totalCost -= 200;
         }

  }
  //update total cost
  $('.activities').append("<p id='p2'>Total Cost Will Be: $" + totalCost + "</p>");
});
