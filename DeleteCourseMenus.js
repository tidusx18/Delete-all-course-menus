// ==UserScript==
// @name         Bb Delete Course Menus
// @version      1.0
// @description  Deletes all the course menus (left hand side) except for "Course Content".
// @author       Daniel Victoriano
// @match        https://fiu.blackboard.com/*
// ==/UserScript==

(function() {
    'use strict';

// Create a new button and append to menu bar
var newLi = document.createElement("li");
newLi.setAttribute("id", "my-button");
newLi.setAttribute("class", "mainButton sub bcContent");

var newLink = document.createElement("a");
newLink.style.cursor = "pointer";
newLink.innerHTML = "Delete All";

newLi.appendChild(newLink);

document.querySelector(".actionBar").appendChild(newLi);

// Add listener for user click - Call deleteMenu() when clicked
document.querySelector("#my-button").addEventListener("click", function() {
    startDeleteMenus();
		});

// Only called on user 'click' of delete button
// Sets sessionStorage variables and faciliates first iteration of course menu deletion process
function startDeleteMenus() {
	
	// First delete confirmation
	confirm("Careful, you're going to delete all course menus.");
	
	// Second and final delete confirmation
	var confirmation = confirm("This will delete all course menus. No going back after this...Proceed?");
	
	// Set sessionStorage variables and data
	var listItemSpans = document.querySelectorAll("#courseMenuPalette_contents li a span:first-child, #courseMenuPalette_contents li h3 span:first-child");
	var spantitles = [];
	for(var i = 0; i<listItemSpans.length; i++) {
		var title = listItemSpans[i].getAttribute("title");
		spantitles.push(title);
	}
	
	var listItems = document.querySelectorAll("#courseMenuPalette_contents li");
	var listItemIds = [];
	for(var i = 0; i<listItems.length; i++) {
		var itemId = listItems[i].id.replace("paletteItem:", "");
		listItemIds.push(itemId);
	}
	
	// Store session data
	sessionStorage.setItem("counter", "0");
	sessionStorage.setItem("spantitles", JSON.stringify(spantitles));
	sessionStorage.setItem("listItemIds", JSON.stringify(listItemIds));
	
	// Get session data
	var storedTitles = sessionStorage.getItem("spantitles");
	var storedIds = sessionStorage.getItem("listItemIds");
	
	// Parse retrieved session data
	var parsedTitles = JSON.parse(storedTitles);
	var parsedIds = JSON.parse(storedIds);
	
	console.log(parsedTitles);
	console.log(parsedIds);
}

// Deletes all existing menu items minus 1 (last child)
function deleteMenu() {

    if(confirmation) {


        var counter;

        if(listItems.length > 0) {

            while(counter < listItems.length) {

                //var title = listItemTitles[counter].getAttribute("title");

                //if(title !== "Course Content") {
                    var listItemId = listItems[counter].id.replace("paletteItem:", "");
                    theCourseMenu.removeToc(listItemId);
                    counter++;
                //}
                //else {
                //    counter++;
                //}
            }
        }
        else {
            alert("There aren't any menu items left!");
        }
    }
}
})();