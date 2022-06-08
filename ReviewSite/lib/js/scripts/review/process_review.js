function getStrReviewInfo() {
    let title = document.getElementById("title").value;
    let rate = document.getElementById("rate").value;
    let group = document.getElementById("group").value;
    let description = document.getElementById("description").value;

    let tags = [];
    let container = document.getElementById("tagsContainer");
    let fields = container.getElementsByTagName("input");
    let i = 0;
    while (fields[i].value !== "") {
        tags.push(fields[i].value);
        i = i + 1;
    }

    return {title, rate, group, description, tags};
}

function saveImage() {
    let image = document.getElementById("image").files[0];
    // TODO: change image name to generated
    const formData = new FormData();
    formData.append('file', image)
    fetch("/save-image", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .catch(error => {
            console.error(error)
        })
    return image.name;
}

function isDataValid(title, rate, group, description, tags) {
    return !(isEmptyStr(title)
        || rate < 0
        || rate > 5
        || isEmptyStr(description)
        || isEmptyStr(tags[0]));
}

function isImageInputValid() {
    let image = document.getElementById("image").files[0];
    return !(image === undefined
        || (image.type !== "image/png"
            && image.type !== "image/jpeg"));
}

function isEmptyStr(str) {
    return str.trim().length === 0;
}

export {
    getStrReviewInfo,
    saveImage,
    isDataValid,
    isImageInputValid,
}