const make = (name, id=1, cls=[], html="1p") => {
    let newElem = document.createElement(name);
    id != 1 ? newElem.setAttribute("id", id): null;
    html != "1p" ? newElem.innerHTML = html : null;
    if (cls.length != 0) {
        for ( let item of cls) {
            newElem.classList.add(item);
        }
    }
    return newElem;
}

const body = document.querySelector("body");

// =================================================================================== Add Event Listeners

const addHoverEffect = (item1, item2, cls) => {
    item1.addEventListener("mouseover", () => {
        item2.classList.add(cls)
    })
    item1.addEventListener("mouseleave", () => {
        item2.classList.remove(cls)
    })
}
const addFocusEffect = (item1, item2, cls) => {
    item1.addEventListener("focus", () => {
        item2.classList.add(cls)
    })
    item1.addEventListener("blur", () => {
        item2.classList.remove(cls)
    })
}


let Header = make("header", 1, ["h-12", "bg-orange-100", "fixed", "top-0", "w-full", "z-10"]);
let heroSection = make("section", 1, ["h-[350px]", "flex", "flex-col", "items-center", "justify-center", "mt-12", "bg-red-100", "relative", "isolate", "overflow-hidden"]);
let collectionSection = make("section", 1, ["py-16"]);
let main = make("main");

body.appendChild(Header);
main.appendChild(heroSection);
main.appendChild(collectionSection);
body.appendChild(main);

// ================================================================================================ Header

let Logo = make("img", 1, ["object-cover", "h-20", "w-44", "absolute", "top-2", "cursor-pointer", "rounded-full"]);
Logo.setAttribute("src", "./images/logo.png");
let Placeholder = make("p");

let headerMenuOption1 = make("li", 1, ["font-semibold", "cursor-pointer", "transition-all"], "All Items");
let headerMenuOption2 = make("li", 1, ["font-semibold", "cursor-pointer", "transition-all"], "Try Random");
let headerMenuOption3 = make("li", 1, ["font-semibold", "cursor-pointer", "transition-all"], "Latest Recipe");
addHoverEffect(headerMenuOption1, headerMenuOption1, "scale-105");
addHoverEffect(headerMenuOption2, headerMenuOption2, "scale-105");
addHoverEffect(headerMenuOption3, headerMenuOption3, "scale-105");
let headerMenu = make("ul", 1, ["flex", "gap-6"]);
headerMenu.appendChild(headerMenuOption1);
headerMenu.appendChild(headerMenuOption2);
headerMenu.appendChild(headerMenuOption3);

let SearchBar = make("input", 1, ["outline-0", "rounded-full", "h-8", "w-8", "border", "transition-all", "px-4"]);
let SearchIcon = make("i", 1, ["fa-solid", "fa-magnifying-glass", "absolute", "top-2", "right-2", "cursor-pointer"]);
let Search = make("div", 1, ["d-flex", "relative", "flex", "justify-end"]);
Search.appendChild(SearchBar);
Search.appendChild(SearchIcon);
addHoverEffect(Search, SearchBar, "w-36");
addFocusEffect(SearchBar, SearchBar, "w-56");


let headerContainer = make("div", 1, ["container", "max-w-[1170px]", "h-12", "relative", "mx-auto", "grid", "grid-cols-3", "items-center"]);
headerContainer.appendChild(Placeholder);
headerContainer.appendChild(Logo);
headerContainer.appendChild(headerMenu);
headerContainer.appendChild(Search);

Header.appendChild(headerContainer);




// ========================================================================================== Hero section

let heroOverlay = make("div", 1, ["absolute", "inset-0", "bg-slate-900", "opacity-50", "-z-10", "transition-all"]);
let heroHeading = make("h2", 1, ["text-5xl", "text-white", "font-bold", "relavite"], "Welcome to Sun Burnt");
let heroContent = make("p", 1, ["text-xl", "text-white", "font-semibold", "relavite", "my-4"], "Find the recipe of you always desired");
let heroButton = make("button", 1, ["py-2", "px-12", "bg-orange-600", "rounded", "font-bold", "text-white", "cursor-pointer"], "Try Our Recommended")

heroSection.appendChild(heroOverlay);
heroSection.appendChild(heroHeading);
heroSection.appendChild(heroContent);
heroSection.appendChild(heroButton);

let heroBGIndex = 0;
for (let i = 0; i < 10; i++) {
    let heroBackground = make("img", 1, ["hero_bg", "absolute", "transition-all", "duration-400", "inset-0", "-z-20", "blur-0"]);
    heroBackground.setAttribute("src", `https://picsum.photos/1500/500/?random&t=${i}`);
    heroSection.appendChild(heroBackground);
}
setInterval(() => {
    setHeroBg();
}, 10000)

const setHeroBg = () => {
    let allBG = document.querySelectorAll(".hero_bg");
    allBG.forEach(item => {
        item.classList.add("blur-3xl");
        item.classList.add("opacity-10");
        setTimeout(() => {
            item.classList.remove("blur-3xl");
            item.classList.remove("opacity-10");
        }, 800)
    });
    setTimeout(() => {
        allBG.forEach(item => {
            item.classList.add("hidden");
        })
        allBG[heroBGIndex].classList.remove("hidden");
        heroBGIndex += 1;
        heroBGIndex >= 10 ? heroBGIndex = 0 : null;
    }, 400)
}


// ======================================================================================== Recipe section

let collectionHeading = make("h2", 1, ["text-3xl", "text-center", "font-bold", "mb-12"], "Explore Recipies");
let collectionBox = make("div", 1, ["container", "max-w-[1170px]", "mx-auto", "grid", "grid-cols-3", "gap-4"]);

let boxCount = 0;
let boxloaded = 0;

for (let i = 0; i < 30; i++) {
    boxCount += 1;
    let newBox = make("div", 1, ["mb-12", "border", "pb-6", "rounded", "shadow-md", "transition-all"]);
    newBox.setAttribute("data-block-position", i);
    let boxImage = make("img");
    boxImage.setAttribute("src", `https://picsum.photos/500/300/?random&t=${i}`);
    let boxHeading = make("h3", 1, ["font-bold", "text-xl", "mt-3", "mb-2", "mx-3"], `Box Heading ${i}`);
    let boxContent = make("h3", 1, ["mb-4", "mx-3"], `Box Content ${i}`);
    let boxCategory = make("p", 1, ["mx-3", "mt-1", "mb-3"], "Categories: ");
    let boxIngredient = make("p", 1, ["mx-3", "mt-1", "mb-3"], "Ingredients: ");
    let boxIngredientMore = make("span", 1, ["ml-1", "mt-1", "mb-3"], "...");
    let boxButton = make("button", 1, ["mx-3", "transition-all", "shadow-slate-300", "px-6", "py-2", "rounded", "bg-orange-600", "text-white", "font-bold", "cursor-pointer"], "View Details");
    addHoverEffect(boxButton, boxButton, "shadow-md");

    for (let i = 0; i < 3; i++) {
        let boxCategorySpan = make("span", 1, ["mx-1", "text-xs", "px-2", "pb-1", "cursor-pointer", "bg-blue-300", "rounded-full", "text-white"], "Category");
        boxCategory.appendChild(boxCategorySpan);
        let boxIngredientSpan = make("span", 1, ["ml-1", "text-xs", "pb-1"], "Ingred,");
        boxIngredient.appendChild(boxIngredientSpan);
    }
    boxIngredient.appendChild(boxIngredientMore);

    newBox.appendChild(boxImage);
    newBox.appendChild(boxHeading);
    newBox.appendChild(boxCategory);
    newBox.appendChild(boxContent);
    newBox.appendChild(boxIngredient);
    newBox.appendChild(boxButton);
    addHoverEffect(newBox, newBox, "shadow-xl");
    addHoverEffect(newBox, newBox, "shadow-slate-300");
    collectionBox.appendChild(newBox);
}


collectionSection.appendChild(collectionHeading);
collectionSection.appendChild(collectionBox);

let pageCount = Math.ceil(boxCount / 6);
if (pageCount > 1) {
    let collectionPaginationContainer = make("div", 1, ["mx-auto", "flex", "gap-3", "justify-center", "py-2", "px-4"]);
    let collectionPaginationLeft = make("p", 1, ["pagination_move_left", "hidden", "py-1", "px-2", "inline-block", "cursor-pointer"], "<");
    collectionPaginationLeft.addEventListener("click", () => {
        boxloaded -= 1;
        showBlocks(boxloaded);
        updatePagination(collectionPaginationLeft, collectionPaginationRight);
    })
    collectionPaginationContainer.appendChild(collectionPaginationLeft);
    for (let i = 0; i < pageCount; i++) {
        let collectionPaginationRoll = make("p", 1, ["pagination_anchor", "py-1", "px-2", "inline-block", "cursor-pointer"], i+1);
        collectionPaginationRoll.setAttribute("data-pagination-roll", i);
        collectionPaginationRoll.addEventListener("click", () => {
            boxloaded = i;
            showBlocks(boxloaded);
            updatePagination(collectionPaginationLeft, collectionPaginationRight);
        })
        collectionPaginationContainer.appendChild(collectionPaginationRoll);
    }let collectionPaginationRight = make("p", 1, ["pagination_move_rightight", "hidden", "py-1", "px-2", "inline-block", "cursor-pointer"], ">");
    collectionPaginationContainer.appendChild(collectionPaginationRight);
    collectionPaginationRight.addEventListener("click", () => {
        boxloaded += 1;
        showBlocks(boxloaded);
        updatePagination(collectionPaginationLeft, collectionPaginationRight);
    })

    collectionSection.appendChild(collectionPaginationContainer);
    document.querySelector(".pagination_anchor").classList.add("font-bold");
    updatePagination(collectionPaginationLeft, collectionPaginationRight);
    
}

function updatePagination(collectionPaginationLeft, collectionPaginationRight) {
    let allPaginationAnchor = document.querySelectorAll(".pagination_anchor");
    allPaginationAnchor.forEach(item => item.classList.remove("font-bold"));
    allPaginationAnchor[boxloaded].classList.add("font-bold");
    if (allPaginationAnchor.length > 3) {
        if (boxloaded > 1) {
            collectionPaginationLeft.classList.remove("hidden");
        } else {
            collectionPaginationLeft.classList.add("hidden");
        }
        if (boxloaded < allPaginationAnchor.length - 2) {
            collectionPaginationRight.classList.remove("hidden");
        } else {
            collectionPaginationRight.classList.add("hidden");
        }
    }
    for (let i = 0; i < allPaginationAnchor.length; i++) {
        let myRoll =parseInt(allPaginationAnchor[i].getAttribute("data-pagination-roll"));
        if (myRoll < boxloaded - 2 || myRoll > boxloaded + 2) {
            allPaginationAnchor[i].classList.add("hidden");
        } else {
            allPaginationAnchor[i].classList.remove("hidden");
            console.log("object");
        }
        if (boxloaded > 0 && boxloaded < allPaginationAnchor.length - 1) {
            if (myRoll < boxloaded - 1 || myRoll > boxloaded + 1) {
                allPaginationAnchor[i].classList.add("hidden");
            }
        }
    }
}

const showBlocks = boxloaded => {
    document.querySelectorAll("[data-block-position]").forEach(item => {
        if (Math.floor(parseInt(item.getAttribute("data-block-position")) / 6) == boxloaded) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    })
}



showBlocks(boxloaded);














