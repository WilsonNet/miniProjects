// Model

class Cat {
    /**
     * 
     * @param {String} name 
     * @param {String} picture 
     */
    constructor(name, picture, counter) {
        this.name = name;
        this.picture = picture;
        this.clicks = 0;
    }
}

const model = {
    cats: [],

    getAllCats: function () {
        return this.cats;
    }
}

model.cats.push(new Cat('John', 'img/cat.jpg'));
model.cats.push(new Cat('Jast', 'img/cat2.jpg'));
model.cats.push(new Cat('Jist', 'img/cat3.jpg'));
model.cats.push(new Cat('Jost', 'img/cat4.jpg'));
model.cats.push(new Cat('Just', 'img/cat5.jpg'));


// Octopus

const octopus = {
    currentCat: null,

    addClick: function () {
        this.currentCat.clicks++;
        catViewDisplay.setClicks(this.currentCat);
    },
    setCat: function (cat) {
        this.currentCat = cat;
    },
    getCats: function () {
        return model.getAllCats();
    },
    init: function () {
        viewCatlist.init();
        viewCatlist.renderList(this.getCats());
        catViewDisplay.init();
        adminView.init();
    },

    updateCat: function (cat) {
        this.currentCat.name = cat.name;
        this.currentCat.picture = cat.picture;
        this.currentCat.clicks = cat.clicks;
        catViewDisplay.setCat(cat);
        viewCatlist.renderList(this.getCats());
    }
}


// View List
const viewCatlist = {
    catsList: null,
    init: function () {
        this.catsList = document.getElementById('cats-list');
    },
    renderList: function (catsList) {
        this.catsList.innerHTML = "";
        catsList.forEach(gato => {
            const btn = document.createElement('button');
            const t = document.createTextNode(gato.name);
            btn.appendChild(t);
            this.catsList.appendChild(btn);
            btn.addEventListener('click', evt => catViewDisplay.setCat(gato));
        })
    }
}



// // Render list

// }



// // View Cat display

const catViewDisplay = {
    catName: null,
    clickCat: null,
    clickCounter: null,

    init: function () {
        this.catName = document.getElementById('cat-name');
        /** @type {HTMLImageElement} */
        this.clickCat = document.getElementById('clickCat');
        this.clickCounter = document.getElementById('clickCounter');
        this.clickCat.addEventListener("click", evt => {
            octopus.addClick();
        })
    },
    /**
     * 
     * @param {Cat} cat 
     */
    setCat: function (cat) {
        this.catName.innerHTML = cat.name;
        this.clickCat.src = cat.picture;
        octopus.setCat(cat);
        this.setClicks(cat);
        adminView.setFormValues(cat);
    },
    setClicks: function (cat) {
        clickCounter.innerHTML = `Clicks: ${cat.clicks}`;
    }
}

adminView = {
    form: null,
    button: null,
    submitButton: null,
    cancelButton: null,
    formName: null,
    formUrl: null,
    formClicks: null,

    init: function () {
        this.form = document.getElementById('form');
        this.button = document.getElementById('adminButton');
        this.button.addEventListener("click", evt => this.toggleForm());
        this.formName = document.getElementById('form-name');
        this.formUrl = document.getElementById('form-url');
        this.formClicks = document.getElementById('form-clicks');
        this.cancelButton = document.getElementById('cancelButton');
        this.cancelButton.addEventListener("click", evt => this.cancel());
        
        this.submitButton = document.getElementById('submitButton');
        this.submitButton.addEventListener("click", evt=>this.submitValues());
    },
    cancel: function () {
        this.setFormValues(octopus.currentCat);
    },
    toggleForm: function () {
        this.form.classList.toggle('d-none');
    },
    /**
     * 
     * @param {Cat} cat 
     */
    setFormValues: function (cat) {
        this.formName.value = cat.name;
        this.formUrl.value = cat.picture;
        this.formClicks.value = cat.clicks;
    },
    submitValues: function () {
        const cat = new Cat(
            this.formName.value,
            this.formUrl.value
        );
        cat.clicks = this.formClicks.value;
        octopus.updateCat(cat);        
    }


}

octopus.init();
