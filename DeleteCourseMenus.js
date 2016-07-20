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

// Call deleteMenu() when button is clicked
document.querySelector("#my-button").addEventListener("click", function() {
    deleteMenu();
		});

// Deletes all existing menu items minus 1 (last child)
function deleteMenu() {
    confirm("Careful, you're going to delete all course menus.");

    var confirmation = confirm("This will delete all course menus. No going back after this...Proceed?");

    if(confirmation) {

        var listItems = document.querySelectorAll("#courseMenuPalette_contents li");

        var counter = 0;

        if(listItems.length > 0) {

            while(counter < listItems.length) {
                var listItemTitles = document.querySelectorAll("#courseMenuPalette_contents li a span");

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