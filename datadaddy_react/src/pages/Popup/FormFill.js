var fullFormHTML = document.querySelectorAll("form")[0];
console.log(fullFormHTML);
for (let i = 0; i < fullFormHTML.length; i++) {
    var htmlComponent = fullFormHTML[i]
    var fieldName = htmlComponent.name;
    var fieldValue = htmlComponent.value;
    var fieldType = htmlComponent.type;

    if (fieldName == "firstName") {
        htmlComponent.value = "Bolor";
    }
    else if (fieldName == "lastName") {
        htmlComponent.value = "Jagdagdorj";
    }
    else if (fieldName == "email") {
        htmlComponent.value = "bjagdagdorj@gmail.com";
    }
    else if (fieldType == "radio" && fieldValue) {
        const updatePattern = /access/i;
        let updateResult = fieldValue.match(updatePattern);
        if (updateResult) {
            console.log("YAY" + fieldValue + i);
            htmlComponent.checked = true;
        }
    }
}