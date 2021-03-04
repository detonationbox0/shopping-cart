// Javascript
console.log("Hello there!");

/**
*  Display the Cart by Default
*/
// #region
$( document ).ready(function() {
  console.log( "ready!" );
  // Only hide bucket if empty
  var buckets = $(".cart-area");
  buckets.each(function(bucket) {
    if ($(this).find(".bucket").length == 0) {
      $(this).find(".orders").slideToggle();
      // twist the arrow and replace "Collapse" too...
      $(this).find(".fa-chevron-right").toggleClass("rotate");
      $(this).find(".expand").empty().append("Expand");
    }
  });
  $(".area-head").find(".fa-chevron-right").toggleClass("rotate");
  $("#cart-orders").find(".bucketexpand").empty().append("Collapse");
  $("#cart-orders").find(".fa-chevron-right").toggleClass("rotate");
});
//#endregion

/**
 *  Toggle Cart Area Visibility
 */
//#region
$(document).on("click", ".area-head", function() {
  ($(this).find(".expand").text() == "Expand") ? $(this).find(".expand").empty().append("Collapse") : $(this).find(".expand").empty().append("Expand"); // Expand or Collapse? Tell user
  $("#" + $(this).attr("id").split("-")[0] + "-orders").slideToggle("fast"); // Toggle order visiblity
  $(this).find(".fa-chevron-right").toggleClass("rotate"); // Toggle chevron rotation
})
//#endregion

 /**
 *  Toggle Store Bucket Visibility
 */
//#region
$(document).on("click", ".bucket-head", function() {
  ($(this).find(".bucketexpand").text() == "Expand") ? $(this).find(".bucketexpand").empty().append("Collapse") : $(this).find(".bucketexpand").empty().append("Expand");
  $(this).parent().find(".bucket-orders").slideToggle("fast"); // Toggle order visiblity
  $(this).find(".fa-chevron-right").toggleClass("rotate"); // Toggle chevron rotation
});
//#endregion

/**
*  All Orders, season to taste
*/
//#region
var orders = [
  {
    name:"Marco's Pizza - Delaware - 1010",
    product:"Unlimited Medium 1-Topping Pizzas Window Cling",
    service:"Print Only",
    shipTo:"219 S. Sandusky St.",
    qty:3,
    weeks:1,
    price:66.19,
    card:"CC - Ending with 4246",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_20_20_378.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:true,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Delaware - 1010",
    product:"Medium Specialty Box Topper",
    service:"Print Only",
    shipTo:"219 S. Sandusky St.",
    qty:3500,
    weeks:1,
    price:130.79,
    card:"CC - Ending with 4246",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_41_41_1010136.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:false,
      details:false,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Delaware - 1010",
    product:"Medium Specialty Box Topper",
    service:"Direct Mail",
    shipTo:"219 S. Sandusky St.",
    qty:10000,
    weeks:6,
    price:5098.74,
    card:"CC - Ending with 4246",
    thumb: "https://www.themailshark.com/prepress/img/example/ScratchOff.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:true,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Delaware - 1010",
    product:"Stay Connected Interior Sticker",
    service:"Print Only",
    shipTo:"219 S. Sandusky St.",
    qty:5,
    weeks:1,
    price:23.33,
    card:"CC - Ending with 4246",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_15_15_1010150.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:false,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Tiffin - 1029",
    product:"CrewBuilder Join Our Team (Coupons)",
    service:"Print Only",
    shipTo:"75 Melmore St.",
    qty:2000,
    weeks:1,
    price:57.54,
    card:"CC - Ending with 4125",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_38_38_1010118.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:true,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Tiffin - 1029",
    product:"CrewBuilder Join Our Team (Coupons)",
    service:"Print Only",
    shipTo:"75 Melmore St.",
    qty:2000,
    weeks:1,
    price:57.54,
    card:"CC - Ending with 4125",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_38_38_1010118.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:false,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Middletown - 1037",
    product:"Football Magnet",
    service:"Direct Mail",
    shipTo:"75 Melmore St.",
    qty:2000,
    weeks:5,
    price:1451.50,
    card:"CC - Ending with 4117",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_49_49_1010135.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:true,
      details:true,
    },
    saved:false
  },
  {
    name:"Marco's Pizza - Middletown - 1037",
    product:"Football Magnet",
    service:"Direct Mail",
    shipTo:"75 Melmore St.",
    qty:2000,
    weeks:5,
    price:1451.50,
    card:"CC - Ending with 4117",
    thumb: "https://www.themailshark.com/prepress/img/example/Artwork_1_1029_49_49_1010135.jpg",
    orderstatus:{
      questions:true,
      coupons:true,
      artwork:true,
      details:false,
    },
    saved:false
  },
];
//#endregion

/**
*  Add the orders to the DOM, then update order counts
*/
addOrders(orders, function() {
  // Update order counts
  countOrders(function() {
    // Calculate order total
    calculateTotals();
  });

});

/**
*  Add Orders to the DOM
*  @param {JSON Array} orders - A collection of orders to add to the DOM
*  @callback callback
*/
//#region
function addOrders (orders, callback) {
  
  // Loop through the orders one-by-one
  for (var i = 0; i < orders.length; i++) {
    
    // Create random unique ID, assign to each order
    var uid = '_' + Math.random().toString(36).substr(2, 9); // Ex: "_x5jut1rcj"
    orders[i].id = uid;

    // Find out what container to add this order to
    var container;
    var falseStats = [];
    for (key in orders[i].orderstatus) {
      if (!orders[i].orderstatus[key]) {
        falseStats.push(key);
      };
    };

    if (!orders[i].saved) { // It's not saved
      if (falseStats.length > 0) { // Something's not done
        container = "pending-orders"; // Add to Needs Attention
      } else { // Everything is done
        container = "cart-orders"; // Add to Cart
      }
    } else { // It's saved
      container = "saved-orders"; // Add to Saved
    };

    var storeName = orders[i].name.split("-")[1].trim();
    // Check if a bucket exists yet for this order's store
    if (!$("#" + container + " > ." + storeName.toLowerCase() + "-bucket").length) {
      // Doesn't exist, make and add bucket
      var bucket = `<div class="bucket ` + storeName.toLowerCase() + `-bucket">
          <div class="bucket-head ` + storeName.toLowerCase() + `-bucket-head">
            <div class="bucket-name">` + orders[i].name + `<span class="bucket-count">0 Item(s)</span><span class="bucketexpand">Collapse</span></div>
            <div class="bucket-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="bucket-orders">
          </div>
        </div>`

      $("#" + container).append(bucket);

    };

    // Saved for Later Link
    var savedText = "";
    (orders[i].saved == true) ? savedText = "Add to Cart" : savedText = "Save for Later";

    // Make order DOM elements
    var order = `
    <div class="order" id="` + orders[i].id + `">
      <div class="order-info">
        <div class="order-thumb">
          <img class="thumb" src="` + orders[i].thumb + `" />
        </div>
        <div class="order-details">
          <div class="order-title">` + orders[i].product + `</div>
          <div class="props">
            <div class="link show-hide-props">Show Details</div>
            <div class="props-container">
              <div class="prop">Card: <span class="prop-value">` + orders[i].card + `</span></div>
              <div class="prop">Service: <span class="prop-value">` + orders[i].service + `</span></div>
              ` + (orders[i].service == "Direct Mail" ? '<div class="prop">Duration: <span class="prop-value">' + orders[i].weeks + ' Weeks</span></div>' : '') + `
              <div class="prop">Shipping To: <span class="prop-value">` + orders[i].shipTo + `</span></div>
              <div class="prop">Qty: <span class="prop-value">` + orders[i].qty.toLocaleString() + `</span></div>
            </div>
          </div>
        </div>
        <div class="order-total">
          <h4 class="price">$` + (orders[i].service == "Direct Mail" ? (orders[i].price / orders[i].weeks).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<span class='wk'>/ Week</span><div class='wk-d'>$0.00 Due Now</div>" : orders[i].price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")) + `</h4>
        </div>
      </div>
      <div class="order-bottom">
        <div class="bottomarea order-actions">
          <p class="link" id="delete" value="` + orders[i].id + `">Delete</p>
          <p class="link" id="edit">Edit</p>
          <p class="link" id="copy">Copy</p>
          ` + (container != "pending-orders" ? '<p class="link" id="save" value="' + orders[i].id + '">' + savedText +  '</p>' : '') + `
        </div>
        <div class="bottomarea status">
          <div class="statustag questions pass" id="questions" value="` + orders[i].id + `"><i class="fas fa-check statusicon"></i><div class="statuslabel">Questions</div></div>
          <div class="statustag coupons pass" id="coupons" value="` + orders[i].id + `"><i class="fas fa-check statusicon"></i><div class="statuslabel">Coupons</div></div>
          <div class="statustag artwork pass" id="artwork" value="` + orders[i].id + `"><i class="fas fa-check statusicon"></i><div class="statuslabel">Artwork</div></div>
          <div class="statustag details pass" id="details" value="` + orders[i].id + `"><i class="fas fa-check statusicon"></i><div class="statuslabel">Details</div></div>
        </div>
      </div>
      <div class="data-store" id="data-` + orders[i].id + `">` + JSON.stringify(orders[i]) + `</div>
    </div>
    <div class="order-border"></div>
    `
    // Append to the bucket
    $("#" + container + " > ." + storeName.toLowerCase() + "-bucket > div.bucket-orders").append(order);

    // Update order status to indicate incomplete items
    for (var x = 0; x < falseStats.length; x++) {
      //   console.log(falseStats[x])
      // Only get here if something is false
      var statusTag = $("#" + orders[i].id).find("." + falseStats[x]);
      statusTag.addClass("fail").removeClass("pass")
      // statusTag.css("border-color", "rgba(220, 20, 60, 0.2)");
      statusTag.find("i").css("color", "crimson").removeClass("fa-check-circle").addClass("fa-times-circle");
      if (falseStats[x] == "artwork") {
          statusTag.find("i").removeClass("fa-times-circle").addClass("fa-sync-alt")
          statusTag.find(".statuslabel").prepend("Create ");
      }    
    }
  }
  callback();
}
//#endregion

/**
*  Update order counts globally
*  @callback callback
*/
//#region
function countOrders(callback) {
  // Count Container Totals
  var pendingOrders = $("#pending-orders").find(".order").length;
  var cartOrders = $("#cart-orders").find(".order").length;
  var savedOrders = $("#saved-orders").find(".order").length;
  $("#pending-count").empty().append(pendingOrders + " Item(s)");
  $("#cart-count").empty().append(cartOrders + " Item(s)");
  $("#saved-count").empty().append(savedOrders + " Item(s)");

  // Count Bucket Totals.
  var buckets = $("body").find(".bucket");
  for (var i = 0; i < buckets.length; i++) {
    var numOrders = $(buckets[i]).find(".order").length;
    if (numOrders == 0) {
      $(buckets[i]).remove(); // No orders? Remove bucket.
    }
    $(buckets[i]).find(".bucket-count").empty().append(numOrders + " Item(s)")
  }

  // Create cart flags
  // Count number of Needs Attention Orders
  var numOfPending = $("#pending-body").find(".order").length;

  if (numOfPending > 0) {
    // There's pending orders
    var flagPending = `
      <div class="flag">
      <i class="fas fa-exclamation-triangle"></i>
      <div id="flag-title">
        <h4 class="flag-text">Warning: <span class="debold">` + pendingOrders + ` Order(s) Need Attention </span></h4>
        <!-- <p class="link" id="go-to-pending">View</p> -->
      </div>
    </div>
    `
    $("#cart-flags").empty().append(flagPending);
  } else {

    // Remove the pending orders flag
    $("#cart-flags").empty();
    
  }

  // Count number of orders per store in Cart
  // Populate Order Details

  //First, empty cart details
  $("#totals-cart").empty();

  var storeBuckets = $("#cart-orders").find(".bucket");

  for (var i = 0; i < storeBuckets.length; i++) {
    // What store is this? Count orders in this bucket
    // Load first order
    var storeName = "";
    var totalPrice = 0;
    var dueNow = 0;
    var anOrder = $(storeBuckets[i]).find(".data-store").each(function() {
      var jsonOrder = JSON.parse($(this).text());
      storeName = jsonOrder.name;
      totalPrice = totalPrice + jsonOrder.price;
      if (jsonOrder.service == "Print Only") {
        // Direct Mail items are never paid for at this point
        dueNow = dueNow + jsonOrder.price;
      }
    });

    // var storeName = anOrder.name;
    var numOrders = $(storeBuckets[i]).find(".order").length;

    var storeTotalsDOM = `
      <div class="details-area">
        <div class="details-title">
          <div class="details-store-name">` + storeName + `</div>
          <div class="details-num-orders">` + numOrders + ` Item(s)</div>
        </div>
        <div class="details-details">
          <div class="detail">
            <div class="detail-name total-due-text">Total Due</div><div class="detail-price total-due-text total-due-price">$` + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + `</div>
          </div>
          <div class="detail">
            <div class="detail-name due-now-text">Due Now</div><div class="detail-price due-now-text due-now-price">$` + dueNow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + `</div>
          </div>
        </div>
      </div>
    `
    //Add to dom
    $("#totals-cart").append(storeTotalsDOM);

  }

  callback();

}
//#endregion

/**
*  Show a Dialog to the User
*  @param {string} message - The message or custom DOM to display to the user
*  @param {string} type - The type of message to display to the user.
*  @param {string} type - Additional dom elements to display to the user
*  @callback callback - Returns {bool} so we know the user confirmed something
*/
//#region
function showMessage (message, type, html, callback) {
  /* Remember to always .empty() overlay-container */
  /* Prevent hyphenations from wrapping! */
  message = message.replace(/-/g, '‑')

  if (type == "dialog") { // Simple dialog message
    var dom = `
    <div class="dialog">
      <div class="dialog-message">` + message + `</div>
      ` + (html ? html : '') + `
      <div class="dialog-buttons">
        <div class="dialog-button dialog-yes">` + (html ? "Add" : 'Yes') + `</div>
        <div class="dialog-button dialog-no">Cancel</div>
      </div>
    </div>
    `;


  } else if (type == "checkout") {

    // Clone the order details as confirmation
    var dom = $("#totals-area").clone().addClass("totals-area-mob").css({
      margin:"auto",
      boxShadow:"unset",
      width:"350px"
    }).prepend(`
      <div class="dialog-message">` + message + `</div>
    `);

    
    // Add yes no class to check out and continue button
    $(dom).find("#place").addClass("dialog-yes").removeAttr("id").text("Check Out").css({
      backgroundColor:"#354B85",
      color:"white"
    });

    $(dom).find("#continue").addClass("dialog-no").removeAttr("id").text("Cancel");
    
    // Make details visible
    $(dom).find("#show-hide-details").text("Hide Details");
    $(dom).find(".details-details").show();

    // Coerce to string
    dom = $(dom)[0].outerHTML;
    
  }

  $("#overlay-background").fadeToggle("fast").css("display", "flex");

  // $("#overlay-background").show().css("display", "flex");
  $("#overlay-container").empty().append(dom);

  /* Prevent the last two words from wrapping */
  noMoreLonelyWords(".dialog-message", 2);

  $(".dialog-yes").on("click", function() {
    $("#overlay-background").fadeToggle(function() {
      $("#overlay-container").empty();
    });
    callback(true);
  })

  $(".dialog-no").on("click", function() {
    $("#overlay-background").fadeToggle(function() {
      $("#overlay-container").empty();
    });
    
    // $("#overlay-background").hide();
    callback(false);
  })

};
//#endregion

/**
*  A Delete button is clicked
*/
//#region
$(document).on("click", "#delete", function() {
  var orderid = $(this).attr("value");
  showMessage("Are you sure you want to delete this order?", "dialog", undefined, function (returned) {
    if (returned) {
      // User wishes to delete order with id orderid
      $("#" + orderid).remove();
      // Remove from Order Details too (or try to anyway)
      $("#totals-" + orderid).remove()
      // Update order counts
      countOrders(function() {
        calculateTotals(); // Update Order Details
      });
    }
  });
});

/**
*  A Status Tag is Clicked
*/
//#region
$(document).on("click", ".statustag", function() {
  var which = $(this).attr("id");
  
  var orderid = $(this).attr("value");
  var orderData = $("#" + orderid).find('.data-store').text();
  var order = JSON.parse(orderData);

  // If the text is red, then pass it. Otherwise fail it
  console.log(!$(this).hasClass("pass"));

  if (!$(this).hasClass("pass")) {
    order.orderstatus[which] = true;
  } else {
    order.orderstatus[which] = false;
  }

  // Remove this order and also from details
  $("#" + orderid).remove();
  $("#totals-" + orderid).remove();

  // Add Order
  addOrders ([order], function() { // then
    countOrders(function() { // then
      calculateTotals();
    });
  });
  
});

/**
*  A Save for Later button is clicked
*/
//#region
$(document).on("click", "#save", function() {
  var orderid = $(this).attr("value");
  
  var orderData = $("#" + orderid).find('.data-store').text();
  var order = JSON.parse(orderData);

  var message = "";

  (order.saved == false) ? message = "You are about to move the " + order.product + " to your saved orders. Continue?" : message = "You are about to move the " + order.product + " to your shopping cart. Continue";

  showMessage(message, "dialog", undefined, function (returned) {
    if (returned) { // User said Yes

      (message.includes("saved")) ? order.saved = true : order.saved = false;
      
      // Remove this order and also from details
      $("#" + orderid).remove();
      $("#totals-" + orderid).remove();

      // Add Order
      addOrders ([order], function() { // then
        countOrders(function() { // then
          calculateTotals();
        });
      });
    }
  });
});

/**
*  An Approve Artwork button is clicked
*/
//#region
$(document).on("click", "#approve", function() {
  // Get thumbnail url
  var thumbUrl = $(this).attr("src");
  // Replace .jpg with .pdf
  var pdfUrl = thumbUrl.substr(0, thumbUrl.lastIndexOf(".")) + ".pdf";
  var win = window.open(pdfUrl, '_blank');
  if (win) {
      //Browser has popups
      win.focus();

      // Get order ID
      var oID = $(this).attr("value");

      // The user is on a new tab. When they come back, ask if they would like to approve the artwork.
      var message = "Would you like to approve this order's artwork?"
      showMessage(message, "dialog", undefined, function (returned) {
        if (returned) { // User said Yes
          // Get this order, set Artwork to true, remove this order, send new one to addOrders()
          var jsonOrder = JSON.parse($("#" + oID).find(".data-store").text());
          $("#" + oID).remove();
          jsonOrder.orderstatus.artwork = true;

          addOrders ([jsonOrder], function() { // then
            countOrders(function() { // then
              calculateTotals();
            });
          });


        }
      });
  } else {
      //Browser has blocked popups
      alert('Please allow popups for this website');
  }
});

/**
*  Show / Hide Properties
*/
//#region
$(document).on("click", ".show-hide-props", function() {
  ($(this).text() == "Hide Details") ? $(this).text("Show Details") : $(this).text("Hide Details")
  $(this).next().slideToggle("fast");
});
//#endregion

/**
*  Show / Hide Order Details Info
*/
//#region
$(document).on("click", "#show-hide-details", function() {
  ($(this).text() == "Hide Details") ? $(this).text("Show Details") : $(this).text("Hide Details")
  $(".details-details").slideToggle("fast");
});
//#endregion

/**
*  View Thumbnail
*/
//#region
$(document).on("click", ".thumb", function() {
  // var imageLink = $(this).attr("src");
  var win = window.open($(this).attr("src"), '_blank');
  if (win) {
      //Browser has allowed it to be opened
      win.focus();
  } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
  }
});
//#endregion


/**
*  Only show Saved Order if all checks are checked in Add Order
*/
//#region
$(document).on("click", ".chk", function() {
  var showSaved = false;
  if ($("#chk-orderattr > .chk:checked").length == 4) {
    $("#field-saved").slideDown("fast");
  } else {
    $("#field-saved").slideUp("fast");
  }
});
//#endregion

/**
*  Needs Attention Flag is clicked, go to Pending
*/
//#region
$(document).on("click", ".debold", function() {
  //Hide Cart
  if ($("#cart-orders").is(":visible")) {
    // console.log("Expand")
    $(".area-head").find(".fa-chevron-right").toggleClass("rotate");
    $("#cart-body").find(".expand").empty().append("Expand")
    $("#cart-orders").slideUp("fast");
  }
});
//#endregion

/**
*  Place My Order button is pressed
*/
//#region
$(document).on("click", "#place", function() {
  // Show message
  var message = "Are you sure you'd like to check out?"
  // var orderDetails = $("#totals-area").clone().html();
  // console.log(orderDetails);
  showMessage(message, "checkout", undefined, function (returned) {
    if (returned) {
      // They said Yes            
    }
  });
  
});
//#endregion

/**
*  Calculate order totals
*/
//#region
function calculateTotals() {
  var storeCount = $("#cart-orders > .bucket").length; // Number of stores in cart
  var numItems = $("#cart-orders").find(".order").length; // Number of items in order details 
  var duePrices = $(".due-now-price"); // All Due Now Prices in order details
  var totalPrices = $(".total-due-price"); // All Due Now Prices in order details
  
  var calcTotal = 0;
  for (var n = 0; n < totalPrices.length; n++) { // Add up prices in order details
    calcTotal = calcTotal + Number($(totalPrices[n]).text().replace(",","").substring(1));
  }


  var calcDue = 0;
  for (var n = 0; n < duePrices.length; n++) { // Add up Due Now prices in order details
    calcDue = calcDue + Number($(duePrices[n]).text().replace(",","").substring(1));
  }


  var orderTotal = "$" + calcTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // Turn back in to money string
  var dueNow = "$" + calcDue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  // Update dom
  $("#totals-sum-stores").empty().append(storeCount + " Store(s)");
  $("#totals-sum-items").empty().append(numItems);
  $("#totals-sum-total").empty().append(orderTotal);
  $("#totals-sum-due").empty().append(dueNow);

}
//#endregion

/**
*  Prevent single word lines in wrap
*  https://stackoverflow.com/questions/4823722/how-can-i-avoid-one-word-on-the-last-line-with-css
*/
//#region
// 
function noMoreLonelyWords(selector, numWords){

  // Get array of all the selected elements
  var elems = document.querySelectorAll(selector);
  var i;
    for(i = 0; i < elems.length; ++i){

      // Split the text content of each element into an array
      var textArray = elems[i].innerText.split(" ");

      // Remove the last n words and join them with a none breaking space
      var lastWords = textArray.splice(-numWords, numWords).join("&nbsp;");

      // Join it all back together and replace the existing
      // text with the new text
      var textMinusLastWords = textArray.join(" ");
      elems[i].innerHTML = textMinusLastWords + " " +  lastWords;
    }
  }