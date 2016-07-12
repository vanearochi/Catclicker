

$(document).ready(function(){

var model = {

  currentcat: null,

	catList : [ {name:"a", src:"https://s3-us-west-2.amazonaws.com/vaneprojects/images/fire-wheel-828661_640.jpg", counter: 0},
   {name:"b", src:"https://s3-us-west-2.amazonaws.com/vaneprojects/images/chicago-690364_640+(1).jpg", counter: 0},
   {name:"c", src:"https://s3-us-west-2.amazonaws.com/vaneprojects/images/cumulus-488842_1280.jpg", counter: 0},
   {name:"d", src:"https://s3-us-west-2.amazonaws.com/vaneprojects/images/dandelion-808255_640.jpg", counter: 0},
   {name:"e", src:"https://s3-us-west-2.amazonaws.com/vaneprojects/images/glasses-472027_640.jpg", counter:0}],

  currentStatus: "start",

  currentButton: null,
};

var octopus = {

  init: function(){
    model.currentcat = model.catList[0];
    staticView.elementCreation(model.catList[0]);
    model.currentButton = "0";

  },

	createHtmlElem: function( elemName, className){

		var htmlElem = document.createElement(elemName);
		htmlElem.classList.add(className);
		return htmlElem;
	},

  getCatsArrName: function(){

    var length = model.catList.length;
    var nameList = [];
    for(var i  = 0; i < length; i++){
      var name = model.catList[i].name;
      nameList.push(name);
    }
    return nameList;
  },

  selectImage : function(){

    $("button.selector").click(function(){

      var clickedButton = this.innerHTML;
      model.currentButton  = this.id;
      var objectIndex = this.id;
      var selectedCat = model.catList[objectIndex];
      model.currentcat = selectedCat;
      changingView.showInfo(selectedCat);
    })
  },

  addEventListenerToImg : function(){

      $("img").click(function(){

        var cat = model.currentcat;
        cat.counter = parseInt(cat.counter) + 1;
        var number = cat.counter;
        changingView.changeCounter(number);
      });
    },

    addEventListenerToAdminButton : function(){

      $(".adminButton").click(function(){

        model.currentStatus;

        if(model.currentStatus==="start"){
          model.currentStatus = "show";
          changingView.createForm()
        }
        else if(model.currentStatus === "hidden"){
          model.currentStatus = "show";
          changingView.showForm();
        }
      })
    },

    changeCurrentStatus : function(){

      model.currentStatus = "hidden";
      changingView.hideForm()
    },

    addEventListenerToSubmitButton : function(){
      $(".submit").click(function(){

        var currentcat = model.currentcat;
        var currentButton = model.currentButton;
        changingView.changeCatData(currentcat, currentButton);
      })
    },

    addEventListenerToCancelButton: function(){
      $(".cancel").click(function(){

        octopus.changeCurrentStatus();
      })
    }

  };

var staticView = {

  elementCreation: function(firstObject){

    var bodyElem = $("body");
    var catListArr = octopus.getCatsArrName();
    var catList = octopus.createHtmlElem("div", "buttonList");
    bodyElem.append(catList);
    var displayingBox = octopus.createHtmlElem("div", "container");
    bodyElem.append(displayingBox);
    var dataDiv = octopus.createHtmlElem("div", "data");
    var imgDiv = octopus.createHtmlElem("div", "catImage");
    displayingBox.appendChild(dataDiv);
    displayingBox.appendChild(imgDiv);
    var title = octopus.createHtmlElem("p", "title");
    title.innerHTML = firstObject.name;
    var count = octopus.createHtmlElem("p", "counter");
    count.innerHTML = firstObject.counter;
    dataDiv.appendChild(title);
    dataDiv.appendChild(count);
    var image = octopus.createHtmlElem("img", "catImage");
    image.src= firstObject.src;
    dataDiv.appendChild(image);
    octopus.addEventListenerToImg();

    for(var i = 0; i < catListArr.length; i++){

      var button = octopus.createHtmlElem("button", "selector" );
      button.innerHTML = catListArr[i];
      button.id = i;
      catList.appendChild(button);
    }

    var adminArea = octopus.createHtmlElem("div", "admin");
    bodyElem.append(adminArea);
    var adminButton = octopus.createHtmlElem("button", "adminButton");
    adminButton.innerHTML = "Admin";
    adminArea.appendChild(adminButton);
    octopus.addEventListenerToAdminButton();
    var formArea = octopus.createHtmlElem("div", "formArea");
    adminArea.appendChild(formArea);
    var form = octopus.createHtmlElem("form", "changeDataForm");
    $("input").submit();
    octopus.selectImage();
  }

}

var changingView = {

  showInfo: function(catName){

    var dataTitle = $(".title");
    var imageElem = $(".catImage");
    var counterElem = $(".counter");
    imageElem.attr("id", catName.name);
    dataTitle.text(catName.name);
    counterElem.text(catName.counter);
    var clickedImage = document.getElementById(catName.name)
    imageElem.attr("src", catName.src)
  },

  changeCounter: function(a){

    $(".counter").text(a)
  },

   createForm: function (argument) {

    var formElem = $(".formArea");
    var inputName = octopus.createHtmlElem("input", "inputName");
    inputName.type = "text";
    inputName.label = "Name";
    var inputUrl = octopus.createHtmlElem("input", "inputUrl");
    inputUrl.type ="url";
    var inputClicks = octopus.createHtmlElem("input", "inputClicks");
    inputClicks.type = "number"
    formElem.append(inputName);
    formElem.append(inputUrl);
    formElem.append(inputClicks);
    var cancelButton = octopus.createHtmlElem("input", "cancel");
    cancelButton.value = "Cancel";
    cancelButton.type= "reset";
    var saveButton = octopus.createHtmlElem("input", "submit");
    saveButton.type= "submit";
    saveButton.value = "Submit";
    formElem.append(cancelButton);
    formElem.append(saveButton);
    octopus.addEventListenerToSubmitButton();
     octopus.addEventListenerToCancelButton();

  },

  showForm: function(){

    $(".formArea").show();
  },

  hideForm: function() {

    $(".inputName").val("");
    $(".inputClicks").val("");
    $(".inputUrl").val("");
    var formElem = $(".formArea");
    formElem.hide();
  },

  changeCatData: function(currentCat, currentButton){

    var inputNameElem = $(".inputName").val();
    var inputUrlElem = $(".inputUrl").val();
    var inputClicksElem = $(".inputClicks").val();
    var buttonElem = document.getElementById(currentButton);

    if(inputNameElem.length > 0 && inputUrlElem.length > 0 && inputClicksElem.length > 0){

      var catsNames = octopus.getCatsArrName();
      var indexName = catsNames.indexOf(currentCat.name);
      currentCat.name = inputNameElem;
      currentCat.src = inputUrlElem;
      buttonElem.innerHTML = inputNameElem;
      currentCat.counter = inputClicksElem;
      changingView.showInfo(currentCat);
      octopus.changeCurrentStatus();
    }
    else{
      alert("Please enter a value in every field")
    }
  }

};

octopus.init();

});


