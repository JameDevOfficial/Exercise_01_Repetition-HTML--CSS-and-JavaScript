"use strict";

const animalInfoWrapper = document.getElementById("animal-info-wrapper");
const animalImage = document.getElementById("animal-form-image");
const animalExample = document.getElementById("gallery-item-example");

var animalInfoVisible = false;
var animals = [];
fetch("assets/animals.json")
  .then((response) => response.json())
  .then((data) => {
    animals = data;

    for (let i = 0; i < animals.length; i++) {
      const clone = animalExample.cloneNode(true);
      clone.style.display = "block";
      clone.querySelector("img").src = animals[i].image;
      clone.querySelector("img").alt = animals[i].name;
      clone.querySelector("h4").textContent = animals[i].name;
      clone.querySelector("span").textContent = `${animals[i].name}, ${animals[i].age}, ${animals[i].species}`;
      animalExample.parentNode.appendChild(clone);

      const button = clone.querySelector("button");
      if (button) {
        button.addEventListener("click", function(e) {
          e.stopPropagation();
          if (!animalInfoVisible) getPartnership(i);
        });
        clone.addEventListener("click", function() {
          if (!animalInfoVisible) getPartnership(i);
        });
      }
    }
  });

var getPartnership = function(i) {
  animalImage.src = animals[i].image; // Set the image source to the selected animal's image
  const animalFormNameElem = animalImage.parentElement.querySelector("#animal-form-name");
  const animalForm = animalFormNameElem.parentElement;
  const animalFormInfoDescr = document.getElementById("animal-form-info-description");

  if (animalFormNameElem) {
    animalFormNameElem.innerHTML = `${animals[i].name}, ${animals[i].age}, ${animals[i].species}`;
    animalFormNameElem.style.display = "block";
    console.log(`${animals[i].name}, ${animals[i].age}, ${animals[i].species}`);
  }
  if (animalFormInfoDescr) {
    animalFormInfoDescr.innerHTML = animals[i].description;
  }
  console.log(animals[i]);
  animalInfoWrapper.style.display = "block";
  animalInfoVisible = true;
};

const items = document.getElementsByClassName("gallery-items");

animalInfoWrapper.addEventListener("click", function(e) {
  if (e.target === animalInfoWrapper) {
    animalInfoWrapper.style.display = "none";
    animalInfoVisible = false;
  }
});
