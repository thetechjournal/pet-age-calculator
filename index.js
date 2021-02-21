const petAge = document.getElementById('pet-age');
const petAgeCoverted = document.getElementById('pet-age-converted');
const fromAnimal = document.getElementById('from-animal');
const toAnimal = document.getElementById('to-animal');
const showFactBtnCard1 = document.getElementById('btn-show-fact-card-1');
const showFactBtnCard2 = document.getElementById('btn-show-fact-card-2');
const cardBack = document.getElementById('card-back');
const factInfoCard1 = document.getElementById('facts-card-1');
const factInfoCard2 = document.getElementById('facts-card-2');



let animals = ["Human", "Cat", "Chicken", "Dog", "Goat", "Rabbit"];
let options;

const ageChart = {
    "Human": 1,
    "Cat": 10.5,
    "Chicken": 5.33,
    "Cow": 3.64,
    "Dog": 10.5,
    "Duck": 4.21,
    "Goat": 5.33,
    "Horse": 2,
    "Pigeon": 7.27,
    "Rabbit": 8.89,
    "Sheep": 5.33
}

animals.map((animal) => {
    options += `<option value=${animal}>${animal}</option>`;
})

fromAnimal.innerHTML = options;
toAnimal.innerHTML = options;
toAnimal.options[3].selected = true;



async function getAnimalFacts() {
    let factsArray = [];
    const url = "animals.json"
    let response = await fetch(url)
    let data = await response.json();
    for(let i=0; i<data.length; i++){
        factsArray.push(data[i]);
    }
    return factsArray[0];
}

const getFacts = async (animal) => {
    let facts = []
    facts = await getAnimalFacts();
    let randomNumber = Math.floor(Math.random() * 10) // 0-5 
    let generatehHtml;
    switch(animal) {
        case "human":
            generatehHtml = `${facts.human[randomNumber]}`
            return generatehHtml;
        case "cat":
            generatehHtml = `${facts.cat[randomNumber]}`
            return generatehHtml;
        case "chicken":
            generatehHtml = `${facts.chicken[randomNumber]}`
            return generatehHtml;
        case "dog":
            generatehHtml = `${facts.dog[randomNumber]}`
            return generatehHtml;
        case "goat":
            generatehHtml = `${facts.goat[randomNumber]}`
            return generatehHtml;
        case "rabbit":
            generatehHtml = `${facts.rabbit[randomNumber]}`
            return generatehHtml; 
        default:
          // default code block
      }
}

// ************* Event Handlers ***************** //

const handleAnimalChange = (e) => {
    let fromPet = fromAnimal.value;
    let toPet = toAnimal.value;
    petAgeCoverted.value = (petAge.value * ageChart[toPet]/ageChart[fromPet]).toFixed(2)
    document.getElementById("card-img-1").style.backgroundImage = `url('./images/${fromPet.toLowerCase()}.jpg')`;
    document.getElementById("card-img-2").style.backgroundImage = `url('./images/${toPet.toLowerCase()}.jpg')`;
    document.querySelectorAll(".from-fun-fact-head").forEach(element => element.textContent = `${fromPet}: Fun Facts`);
    document.querySelectorAll(".to-fun-fact-head").forEach(element => element.textContent = `${toPet}: Fun Facts`);
    factInfoCard1.textContent = "Checkout our collection of weird and interesting facts. We promise, you'll be surprised!."
    factInfoCard2.textContent = "Checkout our collection of weird and interesting facts. We promise, you'll be surprised!."
}

showFactBtnCard1.addEventListener('click', async function() {
    let fromPet = (fromAnimal.value).toLowerCase();
    factInfoCard1.innerHTML = await getFacts(fromPet);
})

showFactBtnCard2.addEventListener('click', async function() {
    let toPet = (toAnimal.value).toLowerCase();
    factInfoCard2.innerHTML = await getFacts(toPet);
})

toAnimal.addEventListener('change', handleAnimalChange);
fromAnimal.addEventListener('change', handleAnimalChange);
petAge.addEventListener('input', handleAnimalChange);










