const navBtn = document.querySelector(".nav__btn");
const serif = document.querySelector(".serif");
const dropDown = document.querySelector(".nav__btn");
const dropDownContainer = document.querySelector(".dropdown__container");
const fF = document.querySelectorAll(".dropdown__container a");
const selectedFont = document.querySelector(".selected__font");
const vocabulary = document.querySelector(".vocabulary");
const input = document.querySelector(".input__word");
const placeholder = document.querySelector(".form input[placeholder]");
const synonymsLink = document.querySelector(".synonyms__a");
const noun = document.querySelector(".section__noun");
const verb = document.querySelector(".section__noun.verb");
const main = document.querySelector(".main");
const dataFontFamily = Array.from(document.querySelectorAll("[data-ff]"));
const toggleInput = document.querySelector(".toggle__input");
const switchToggle = document.querySelector(".switch__toggle");
const switchBtn = document.querySelector(".switch");
const h1 = document.querySelector("h1");
const meaning = document.querySelectorAll("h3");
const moon = document.querySelector(".nav__theme svg");
const play = document.querySelector("button svg");
const lines = document.querySelectorAll(".line");
const synonyms = document.querySelector(".synonyms");
const li = document.querySelectorAll("li");
const search = document.querySelector(".search__btn");
let transcription = document.querySelector(".transcription");
let firstMeaning = document.querySelector(".meaning__first");
let secondMeaning = document.querySelector(".meaning__second");
let thirdMeaning = document.querySelector(".meaning__third");
let verbItem = document.querySelector(".verb__item");
let source = document.querySelector(".link__a");
let searchIcon = document.querySelector(".search__icon");
const footer = document.querySelector(".footer");
let section = document.querySelector(".section");
let small = document.querySelector(".small");
let footerIcon = document.querySelector(".footer__icon");
let footerH3 = document.querySelector(".footer__h3");
let footertext = document.querySelector(".footer__text");
let data = null;

navBtn.addEventListener("click", () => {
  dropDownContainer.classList.remove("none");
  changeFontFamily(fF);
});

function changeFontFamily() {
  fF.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      selectedFont.style.color = "#a445ed";

      if (el.textContent === "Sans Serif") {
        selectedFont.textContent = "Sans Serif";
        dropDownContainer.classList.add("none");
        main.style.fontFamily = "sans-serif";
        dataFontFamily.forEach((el) => {
          el.style.fontFamily = "Inter";
        });
      } else if (el.textContent === "Serif") {
        selectedFont.textContent = "Serif";
        dropDownContainer.classList.add("none");

        main.style.fontFamily = "serif";
        dataFontFamily.forEach((el) => {
          el.style.fontFamily = "Lora";
        });
      } else if (el.textContent === "Mono") {
        selectedFont.textContent = "Mono";
        dropDownContainer.classList.add("none");
        main.style.fontFamily = "Inconsolata";
        dataFontFamily.forEach((el) => {
          el.style.fontFamily = "Inconsolata";
        });
      }
    });
  });
}

switchBtn.addEventListener("click", () => {
  if (toggleInput.checked) {
    moon.classList.toggle("moon");
    document.body.classList.toggle("dark");
    input.classList.toggle("dark2");
    input.classList.toggle("ff-color");
    input.style.boxShadow = "2px 2px 2px rgba(164, 69, 237, 0.294";
    dropDownContainer.classList.toggle("dark2");
    fF.forEach((el) => (el.style.color = "#ffffff"));
    dropDownContainer.classList.toggle("dark__shadow");
    selectedFont.style.color = "#a445ed";
    h1.classList.toggle("ff-color");
    noun.classList.toggle("ff-color");
    verb.classList.toggle("ff-color");
    meaning.forEach((el) => el.classList.toggle("ff-h3-color"));
    synonyms.classList.toggle("ff-h3-color");
    li.forEach((el) => el.setAttribute("data", "ff-color-for-li"));
    lines.forEach((el) => el.classList.toggle("lines-color-for-dark-mode"));
    play.classList.toggle("play");
  } else {
    fF.forEach((el) => (el.style.color = "#000000"));
    dropDownContainer.classList.add("none");
    li.forEach((el) => el.removeAttribute("data", "ff-color-for-li"));
    input.style.boxShadow = "2px 2px 2px rgb(0, 0, 0, 0.15)";
  }
});

search.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (!input.value) {
      small.classList.remove("none");
      input.style.border = "1px solid #ff5252";
      section.classList.add("none");
      editFooter();
      return;
    } else {
      small.classList.add("none");
      input.style.border = "none";
      await showData();
    }
  } catch (error) {
    section.classList.add("none");
    footerH3.classList.remove("none");
    footertext.classList.remove("none");
    footerIcon.classList.remove("none");
  } finally {
  }
});

function editFooter() {
  footerH3.classList.add("none");
  footertext.classList.add("none");
  footerIcon.classList.add("none");
}

async function showData() {
  input.setAttribute("disabled", true);

  await getData();

  editFooter();

  section.classList.remove("none");
  input.value = "";
  input.removeAttribute("disabled");
  console.log(data);
  vocabulary.innerHTML = data[0].word;

  transcription.innerHTML = data[0].phonetic
    ? data[0].phonetic
    : "Not Available";

  firstMeaning.innerHTML = data[0].meanings[0].definitions[0].definition
    ? data[0].meanings[0].definitions[0].definition
    : "Not Available";

  secondMeaning.innerHTML = data[0].meanings[0].definitions[1].definition
    ? data[0].meanings[0].definitions[1].definition
    : "Not Available";

  thirdMeaning.innerHTML = data[0].meanings[0].definitions[2].definition
    ? data[0].meanings[0].definitions[2].definition
    : "Not Available";

  synonymsLink.innerHTML = data[0].meanings[0].synonyms[0]
    ? data[0].meanings[0].synonyms[0]
    : "Not Available";

  verbItem.innerHTML = data[0].meanings[1].definitions[0].definition
    ? data[0].meanings[1].definitions[0].definition
    : "Not Available";

  source.innerHTML = data[0].sourceUrls[0]
    ? data[0].sourceUrls[0]
    : "Not Available";
}

const playAudio = play.addEventListener("click", () => {
  let audioUrl = data[0].phonetics[0].audio;
  let audio = new Audio(audioUrl);
  audio.play();
});

async function getData() {
  let res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`
  );
  data = await res.json();
}
