//use strict
'use strict';
//document ready
$(document).ready(function() {
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
//empty the color selector and hide it
$('#color').html("<option value='none'>Please select a T-shirt Theme</option>");
$('#colors-js-puns').hide();
// Append total cost of everthing selected to the bottom of the activities fieldset
// instantiate total cost variable
var totalCost = 0;
$('.activities').append("<p id='p2'> Total Cost Will Be: $" + totalCost + "</p>");
// html finished, focus on first input field
$('#name').focus();
// when job role selector is changed,if it's changed to 'other', reveal the text field below
$( "#title").change(function() {
  if ($("#title option:selected").text() == "Other") {
      $("#other-field").show();
}
 else {
    $("#other-field").hide();
  }});
// style the selector boxes 
$('select').css({
    "-webkit-appearance": "button",
    "-moz-appearance" : "button",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-webkit-padding-end": "20px",
    "-moz-padding-end": "20px",
    "-webkit-padding-start": "2px",
    "-moz-padding-start": "2px",
    "background-color": "#c1deeb",
    "background-position": "center right",
    "background-repeat": "no-repeat",
    "border": "1px solid #AAA",
    "border-radius": "2px",
    "box-shadow": "0px 1px 3px rgba(0, 0, 0, 0.1)",
    "color": "#555",
    "font-size": "inherit",
    "margin": "0",
    "overflow": "hidden",
    "padding-top": "2px",
    "padding-bottom": "2px",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
    "font-weight": "500",
    "color": "black"
});
//////////////////////////////////////////////////////////////////
// display correct color selectors based upon T-shirt design
//////////////////////////////////////////////////////////////////
$( "#design").change(function() {
  // check if Theme - JS Puns has been selected
      if ($("#design option:selected").text() == "Theme - JS Puns") {
        //display appropriate colors
          $('#colors-js-puns').show();
          $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>");
          }
          // check if Theme - I ♥ JS has been selected
      else if ($("#design option:selected").text() == 'Theme - I ♥ JS') {
        // display appropriate colors again
              $('#colors-js-puns').show();
              $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>");
          }
          // if nothing has been selected
      else {
        //empty the colors selector of html
              $('#colors-js-puns').hide();
              $('#color').empty();
      }
});
//////////////////////////////////////////////////////////////////
// assign ID to activities based upon time of day
//////////////////////////////////////////////////////////////////
$(".activities > label").each (function() {
  // if the checkbox label relates to a morning activity
  if ($(this).text().indexOf("Tuesday 9am-12pm") >= 0) {
    // assign an appropriate variable
    $(this).children().attr("id", "morningBox");
  }
  // if the checkbox relates to an afternoon activity
  else if ($(this).text().indexOf("Tuesday 1pm-4pm") >= 0) {
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
          }});
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
           }});
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
  // for form Validation
  if (totalCost === 0) { activitySelected = false;}
  else if (totalCost > 0) {activitySelected=true;}
  console.log(activitySelected);
  });
//////////////////////////////////////////////////////////////////////
// Form Validation Variables
//////////////////////////////////////////////////////////////////////
  // Name Validation
  var nameValid = false;
  //Email Validation
  var emailValid = false;
  // Role/Job title initial state validation variable
  var tShirtSelected = false;
  // Payment initial state of form validation variable
  var activitySelected = false;
  // Payment initial state of form validation variable
  var ccNumValid = false;
  var zipValid = false;
  var cValidate = false;
  //paymentValid basically means: have Bitcoin or PayPal been selected?
  var paymentValid = false;
  // if PayPal or Bitcoin haven't been selected, it's time to enter credit card info!
  var creditCardSelected = !paymentValid;
///////////////////////////////////////////////////////////////////////////
// Payment Fieldset Validator
//////////////////////////////////////////////////////////////////////////
// Set CVV max length
$('#cvv').attr('maxlength', 3);
// Hide everything by default initially
$( "p:contains('PayPal')").hide();
$( "p:contains('Bitcoin')").hide();
$( "#credit-card").hide();

$("#payment").change(function() {
  // if Credit Card selected
      if ($("#payment option:selected").text() == "Credit Card") {
        // hide Bitcoin and Paypal elements
          $( "#credit-card").show();
          $( "p:contains('PayPal')").hide();
          $( "p:contains('Bitcoin')").hide();
          paymentValid = false;
          return paymentValid;
          }
  // if PayPal selected
      else if ($("#payment option:selected").text() == "PayPal") {
        // hide Bitcoin and credit card elements
          $( "p:contains('PayPal')").show();
          $( "p:contains('Bitcoin')").hide();
          $( "#credit-card").hide();
          paymentValid = true;
          return paymentValid;
          }
  // if bitcoin selected
      else if ($("#payment option:selected").text() == "Bitcoin") {
        // hide PayPal and credit card elements
          $( "p:contains('Bitcoin')").show();
          $( "p:contains('PayPal')").hide();
          $( "#credit-card").hide();
          paymentValid = true;
          return paymentValid;
          }
      else {
        // if nothing is selected change back to hide all
        $( "p:contains('PayPal')").hide();
        $( "p:contains('Bitcoin')").hide();
        $( "#credit-card").hide();
        paymentValid = false;
        creditCardSelected = false;
      }
});
//////////////////////////////////////////////////////////////////////////
// Form Validation
//////////////////////////////////////////////////////////////////////////
$("#name").keyup(function() {
  if ($("name").val() !== "") {
    nameValid = true;
    return nameValid;
  }});
// Email regular expression taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var validateEmail = function(email) {
    var RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return RegEx.test(email);
};
// On KeyUp, check if email is valid
$("#mail").keyup(function() {
  emailValid = validateEmail($(this).val());
  return emailValid;
});
// use Credit Card Validation JQuery Plugin Function
  ccNumValid = $("#cc-num").validateCreditCard().valid;

  $("#zip").keyup(function() {
    zipValid = validateNumber($(this).val());
    return zipValid;
  });
  $("#cvv").keyup(function() {
    var cvvValid = validateNumber($(this).val());
    var lengthValid = (String($(this).val()).length == 3);
    cValidate = (cvvValid && lengthValid);
    return cValidate;
  });

  $("button:submit").click(function() {
    var noCCValid = (nameValid && emailValid && activitySelected && paymentValid);
    var CCValid = (nameValid && emailValid && activitySelected && cValidate && zipValid && ccNumValid);
    var isReady = (noCCValid || CCValid);
    if (!isReady) {
      event.preventDefault();
    }
    $('label[for="name"]').css('color', '#184f68');
    $('label[for="mail"]').css('color', '#184f68');
    $('.activities > legend').css('color', '#184f68');
    $('#fieldset-4 > legend').css('color', '#184f68');
    if (!(nameValid)) {
      $('label[for="name"]').css("color", "red");
    }
    if (!(emailValid)) {
      $('label[for="mail"]').css("color", "red");
    }
    if (!(activitySelected)) {
      $(".activities > legend").css("color", "red");
    }
    if (!(cValidate && zipValid && ccNumValid) && !(paymentValid)) {
      $("#fieldset-4 > legend").css("color", "red");
    }
    });
});
