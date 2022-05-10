
function addTagField() {
    let container = document.getElementById("tagsContainer");
    let fields = container.getElementsByTagName("input");

    let i = 0;
    let empty = 0;
    while (fields[i] !== undefined) {
        if (fields[i].value === "") {
            empty = empty + 1;
        }
        i = i + 1;
    }
    if (empty > 1) {
        DeleteEmptyTags();
        empty = 0;
    }
    if (empty === 0) {
        let fieldCount = container.getElementsByTagName("input").length;
        let nextFieldId = fieldCount + 1;

        let field = document.createElement("input");
        field.setAttribute("id", "Tag[" + nextFieldId + "]");
        field.setAttribute("type", "text");
        field.setAttribute("onchange", "addTagField()");
        field.setAttribute("class", "main-form__input");
        field.setAttribute("placeholder", "One more tag");

        container.appendChild(field);
    }
}

function DeleteEmptyTags() {
    let container = document.getElementById("tagsContainer");
    let fields = container.getElementsByTagName("input");
    let fieldCount = container.getElementsByTagName("input").length;
    let i = 0;
    while (i <= fieldCount && fields[i] !== undefined) {
        if (fields[i].value === "") {
            let k = i + 1;
            while (fields[k] !== undefined && fields[k].value === "") {
                k = k + 1;
            }
            let j = i;
            while (fields[k] !== undefined) {
                fields[j].value = fields[k].value;
                fields[k].value = "";
                j = j + 1;
                k = k + 1;
            }
        }
        i = i + 1;
    }
    i = 0;
    while (fields[i] !== undefined) {
        if (fields[i].value === "") {
            let removedEl = container.removeChild(fields[i])
        }
        else {
            i = i + 1;
        }
    }
}

function createFirstTagField(){
    let container = document.getElementById("tagsContainer");
    let field = document.createElement("input");
    field.setAttribute("id", "Tag[1]");
    field.setAttribute("type", "text");
    field.setAttribute("onchange", "addTagField()");
    field.setAttribute("class", "main-form__input");
    field.setAttribute("placeholder", "Tag");
    container.appendChild(field);
}
