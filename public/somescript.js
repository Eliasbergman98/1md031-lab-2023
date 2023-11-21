const skills = ["Web Design","Graphic Design","SEO Optimization","Interaction Design","User Experience Design"];

const sk1lls = [
    {
        skill: "Web Design",
        proficiency: "Very good"
    }
]

let myLi;
for(let skill of skills){
    myLi = document.createElement("li");
    myLi.textContent = skill;
    document.getElementById("skills").appendChild(myLi)

}


let mySpan; ///skriv färg till attribut i style.css
for(let skill of skills){
    myLi = document.createElement("li");
    myLi.textContent = skill.skill + "," + skill.proficiency;
    mySpan = document.createElement("span");
    mySpan.setAttribute("class") = skill.proficiency.replace(" ","-");
    myLi.appendChild
    document.getElementById("skills").appendChild(myLi)

}

let one = 1; let two = 2;

