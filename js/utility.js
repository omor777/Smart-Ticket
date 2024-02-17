function getInnerText(id) {
  return document.getElementById(id).innerText;
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

function showElementById(id) {
  document.getElementById(id).classList.remove("hidden");
}

function hideElementById(id) {
  document.getElementById(id).classList.add("hidden");
}

function setBackgroundColorById(id) {
  document.getElementById(id).classList.add("bg-[#1DD100]", "text-white");
}

function removeAttributeById(id) {
  document.getElementById(id).removeAttribute("disabled");
}

function setAttributeById(id) {
  document.getElementById(id).setAttribute("disabled", true);
}
