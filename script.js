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
let footer = make("footer", 1, ["py-20", "bg-slate-800"]);
let modalSection = make("setion", 1, ["modal", "hidden", "fixed", "inset-0", "flex", "items-center", "justify-center", "isolate"]);

body.appendChild(Header);
main.appendChild(heroSection);
main.appendChild(collectionSection);
body.appendChild(main);
body.appendChild(modalSection);
body.appendChild(footer);

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
headerMenuOption1.addEventListener("click", () => {
    showAll == 0 ? showAll = 1 : showAll = 0;
    blockLoad();
})
headerMenuOption2.addEventListener("click", () => {
    showModal();
})
headerMenuOption3.addEventListener("click", () => {
    showModal();
})
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
let showAll = 0;

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
    boxButton.addEventListener("click", () => {
        showModal();
    })

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

function updatePagination(collectionPaginationLeft, collectionPaginationRight) {
    document.querySelector(".pagination_anchor_container").classList.remove("hidden");
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

function hidePagination () {
    document.querySelector(".pagination_anchor_container").classList.add("hidden");
}
function showPagination () {
    document.querySelector(".pagination_anchor_container").classList.remove("hidden");
}

const showBlocks = boxloaded => {
    if (boxloaded != "all") {
        document.querySelectorAll("[data-block-position]").forEach(item => {
            if (Math.floor(parseInt(item.getAttribute("data-block-position")) / 6) == boxloaded) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        })
    } else {
        document.querySelectorAll("[data-block-position]").forEach(item => item.classList.remove("hidden"));
    }
}

let pageCount = Math.ceil(boxCount / 6);
if (pageCount > 1) {
    let collectionPaginationContainer = make("div", 1, ["pagination_anchor_container", "mx-auto", "flex", "gap-3", "justify-center", "py-2", "px-4"]);
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

const blockLoad = () => {
    if (showAll == 0) {
        showBlocks(boxloaded);
        showPagination();
    } else {
        showBlocks("all");
        hidePagination();
    }
}
blockLoad();

// ================================================================================================= Modal

let modalContent = make("div", 1, ["bg-white", "max-w-xl", "w-full", "rounded", "border"]);
let modalBackground = make("div", 1, ["absolute", "inset-0", "bg-slate-800", "opacity-50", "-z-10"]);
let modalHeading = make("h3", 1, ["font-bold", "px-10", "py-3", "border-b"], "Modal Heading");
let modalBody = make("div", 1, ["px-4", "py-3"]);
let modalImage = make("img", 1, ["w-full"]);
modalImage.setAttribute("src", "https://picsum.photos/400/200");
let modalcontent = make("p", 1, ["my-4"], "HEllo Modal");
modalBackground.addEventListener("click", () => {
    hideModal();
})

modalBody.appendChild(modalImage);
modalBody.appendChild(modalcontent);
modalContent.appendChild(modalHeading);
modalContent.appendChild(modalBody);
modalSection.appendChild(modalContent);
modalSection.appendChild(modalBackground);

function hideModal () {
    document.querySelector(".modal").classList.add("hidden");
}

function showModal () {
    document.querySelector(".modal").classList.remove("hidden");
}
function modalBuilder(input) {

}
// ======================================================================================== Footer Section

let footerContainer = make("div", 1, ["container", "max-w-[1170px]", "w-100", "mx-auto", "grid", "grid-cols-4", "gap-8"]);
let footerText = make("p", 1, ["text-center", "w-100", "text-white"], "Hello world");
let footerColumn1 = make("div");
let footerColumn2 = make("div");
let footerColumn3 = make("div");
let footerColumn4 = make("div");
let footerLogo = make("img", 1, ["object-cover", "h-20", "w-44", "cursor-pointer"]);
footerLogo.setAttribute("src", "./images/logo.png");
let footerContent = make("p", 1, ["text-white", "mt-4"], "SUN BURNT is a Delice Food related website, aimed to practice and improve front-end development with API");
footerColumn1.appendChild(footerLogo);
footerColumn1.appendChild(footerContent);

let footerHeading1 = make("p", 1, ["text-white", "text-xl", "font-bold", "mb-10"], "Explore");
let footerMenu1Option1 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "All Recipies");
let footerMenu1Option2 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Try Random");
let footerMenu1Option3 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Latest Recipe");
footerMenu1Option1.addEventListener("click", () => {
    showAll == 0 ? showAll = 1 : showAll = 0;
    blockLoad();
})
footerMenu1Option2.addEventListener("click", () => {
    showModal();
})
footerMenu1Option3.addEventListener("click", () => {
    showModal();
})
footerColumn2.appendChild(footerHeading1);
footerColumn2.appendChild(footerMenu1Option1);
footerColumn2.appendChild(footerMenu1Option2);
footerColumn2.appendChild(footerMenu1Option3);

let footerHeading2 = make("p", 1, ["text-white", "text-xl", "font-bold", "mb-10"], "Contact Us");
let footerMenu2Option1 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Email Us");
let footerMenu2Option2 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Book a meeting");
let footerMenu2Option3 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Contact Support");
footerMenu2Option1.addEventListener("click", () => {
    modalBuilder("email");
    showModal();
})
footerMenu2Option2.addEventListener("click", () => {
    modalBuilder("meeting");
    showModal();
})
footerMenu2Option3.addEventListener("click", () => {
    modalBuilder("support");
    showModal();
})
footerColumn3.appendChild(footerHeading2);
footerColumn3.appendChild(footerMenu2Option1);
footerColumn3.appendChild(footerMenu2Option2);
footerColumn3.appendChild(footerMenu2Option3);

let footerHeading3 = make("p", 1, ["text-white", "text-xl", "font-bold", "mb-10"], "About us");
let footerMenu3Option1 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "About Us");
let footerMenu3Option2 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Our Story");
let footerMenu3Option3 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Privacy Policy");
let footerMenu3Option4 = make("p", 1, ["text-white", "cursor-pointer", "mb-2"], "Legal Support");
footerMenu3Option1.addEventListener("click", () => {
    modalBuilder("about");
    showModal();
})
footerMenu3Option2.addEventListener("click", () => {
    modalBuilder("story");
    showModal();
})
footerMenu3Option3.addEventListener("click", () => {
    modalBuilder("privacy");
    showModal();
})
footerMenu3Option4.addEventListener("click", () => {
    modalBuilder("legal");
    showModal();
})
footerColumn4.appendChild(footerHeading3);
footerColumn4.appendChild(footerMenu3Option1);
footerColumn4.appendChild(footerMenu3Option2);
footerColumn4.appendChild(footerMenu3Option3);
footerColumn4.appendChild(footerMenu3Option4);

footerContainer.appendChild(footerColumn1);
footerContainer.appendChild(footerColumn2);
footerContainer.appendChild(footerColumn3);
footerContainer.appendChild(footerColumn4);
footer.appendChild(footerContainer);










