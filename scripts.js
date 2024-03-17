const addSubBox = document.getElementById("addSubBox");
const body = document.body;
const subsEl = document.getElementById('subs');
const themeButtons = document.getElementById("themeButtons");


// -- Themes --



const themes =  {
      "Default": {
        "primary": [9, 11, 12],
        "secondary": [214, 73, 51, 1],
        "tertiary": [43, 48, 58, 1],
        "button": [54, 69, 79, 1],
        "text": [146, 220, 229]
      },
      
      "Secondary": {
        "primary": [56, 182, 255],
        "secondary": [0, 80, 143, 0.3],
        "tertiary": [0, 59, 105, 0.65],
        "button": [92, 225, 230, 0.5],
        "text": [255, 255, 255]
      },


  }

const themeLoader = () => {
  if (!localStorage["theme"]) localStorage["theme"] = "Default"
  let theme = localStorage.getItem("theme")
  document.documentElement.style.setProperty('--primary-color', `rgb(${themes[theme].primary[0]}, ${themes[theme].primary[1]}, ${themes[theme].primary[2]})`);
  document.documentElement.style.setProperty('--secondary-color', `rgba(${themes[theme].secondary[0]}, ${themes[theme].secondary[1]}, ${themes[theme].secondary[2]}, ${themes[theme].secondary[3]})`);
  document.documentElement.style.setProperty('--tertiary-color', `rgba(${themes[theme].tertiary[0]}, ${themes[theme].tertiary[1]}, ${themes[theme].tertiary[2]}, ${themes[theme].tertiary[3]})`);
  document.documentElement.style.setProperty('--button-color', `rgba(${themes[theme].button[0]}, ${themes[theme].button[1]}, ${themes[theme].button[2]}, ${themes[theme].button[3]})`);
  document.documentElement.style.setProperty('--text-color', `rgb(${themes[theme].text[0]}, ${themes[theme].text[1]}, ${themes[theme].text[2]})`);
}

const themeHandler = (theme) => {
  localStorage.setItem("theme", theme)
  themeLoader();
}

for (const th in themes) {
  const newSubEl = document.createElement('button');

  // html

  newSubEl.classList.add('themeEl');
  newSubEl.id = th;

  // style

  newSubEl.style.backgroundColor = `rgb(${themes[th].primary[0]}, ${themes[th].primary[1]}, ${themes[th].primary[2]})`
  newSubEl.style.color = `rgb(${themes[th].text[0]}, ${themes[th].text[1]}, ${themes[th].text[2]})`
  newSubEl.style.border = `2px solid rgb(${themes[th].secondary[0]}, ${themes[th].secondary[1]}, ${themes[th].secondary[2]})`
  newSubEl.style.borderRadius = `10px`
  newSubEl.style.width = `40px`
  newSubEl.style.height = `40px`
  newSubEl.style.marginBottom = `10px`
  
  const themeButtons = document.getElementById("themeButtons");
  themeButtons.appendChild(newSubEl);
  
  newSubEl.onclick = function() {
    themeHandler(th)
  }
}

themeLoader()



// -- Themes End --
// -- Subjects Start--


addSubBox.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      subjectAdd()
  }
});

const subjectAdd = () => {
  if (addSubBox.value) {
    let subject = addSubBox.value;
    subjectStore(subject);
    subsEl.value = '';
    addSubBox.value = '';
    location.reload()
  }
};

const subjectRemove = (subject) => {
  const arr = JSON.parse(localStorage["subjects"]);
  const indexToRemove = arr.indexOf(subject);

  if (indexToRemove > -1) {
    arr.splice(indexToRemove, 1);
  }
  localStorage["subjects"] = JSON.stringify(arr);
  location.reload();
}

const subjectStore = (subject) => {
  if (!localStorage["subjects"]) {
    localStorage["subjects"] = JSON.stringify([subject]);
  } else {
    const arr = JSON.parse(localStorage["subjects"]);
    if (arr.includes(subject)) return;

    arr.push(subject);
    localStorage["subjects"] = JSON.stringify(arr);

    return arr;
  }
};

if (localStorage["subjects"]) {
  const allSubs = JSON.parse(localStorage["subjects"]);

  for (let sub in allSubs) {
    const newSubEl = document.createElement('div');
    newSubEl.classList.add('subjectel');

    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn')
    delBtn.onclick = function() {
      subjectRemove(allSubs[sub])
    }
    delBtn.innerText = "✕";
  
    const subMarksEl = document.createElement('input');
    subMarksEl.placeholder = "Enter your marks";
    subMarksEl.classList.add('subMarksEl');
    subMarksEl.id = allSubs[sub] + "MarksEl";
  
    const innerTextEl = document.createElement('div');
    innerTextEl.classList.add('innerTextEl');
    innerTextEl.textContent = allSubs[sub];
  
    newSubEl.appendChild(innerTextEl);
    newSubEl.appendChild(delBtn)
    newSubEl.appendChild(subMarksEl);
    subsEl.appendChild(newSubEl);
  }
}

addSubBox.addEventListener('click', subjectAdd);


// ------


const totalm = document.getElementById("totalm");

const calculatePercentage = () => {
  if (localStorage["subjects"]) {
    const allSubs = JSON.parse(localStorage["subjects"]);
    if (totalm.value == "") return console.log("Something Went Wrong!");
    else if (isNaN(totalm.value)) return console.log("Something Went Wrong!");
    else if (totalm.value == 0) return console.log("Something Went Wrong!");
      let totalsubjects = allSubs.length;
      let sumtotal = parseInt(totalm.value) * totalsubjects;
      let sum = 0;

      for (let sub in allSubs) {
        let CurElMarks = document.getElementById(`${allSubs[sub]}MarksEl`);
        if (isNaN(CurElMarks.value)) return console.log("Something Went Wrong!");
        if (parseInt(CurElMarks.value) > parseInt(totalm.value)) return console.log(`Something Went Wrong! ${totalm.value} - totalm, ${CurElMarks.value} - CurEl`);
        sum += parseInt(CurElMarks.value);
      }

    let result = (sum/sumtotal) * 100;
    let finalresult = result.toFixed(1);
    showResult(finalresult);
    return finalresult;
  }

  return
}

const showResult = (result) => {
  const resultFillerPanel = document.getElementById("resultFiller");
  const resultText = document.getElementById("resultText");
  resultFillerPanel.style.width = `${result}%`;
  resultText.textContent = result + "%";
}

// ---