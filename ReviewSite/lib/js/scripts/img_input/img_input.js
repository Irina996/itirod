export async function loadDropZone() {
    let drop_zone = document.getElementById("drop-zone");
    let image = document.getElementById("image");
    drop_zone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        drop_zone.classList.add("mouse-over");
        e.dataTransfer.dropEffect = 'copy';
    });

    drop_zone.addEventListener("dragleave", function (e) {
        drop_zone.classList.remove("mouse-over");
    });

    drop_zone.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        image.files = e.dataTransfer.files;
        drop_zone.classList.remove("mouse-over");
        addPreview();
    });

    let drop_zone_button = document.getElementById("drop-zone_button");
    drop_zone_button.addEventListener("click", () => {
        let imag_input = document.getElementById("image");
        imag_input.click();
    });

    let img = document.getElementById("image");
    img.addEventListener("change", () => {
        addPreview();
    })

    function addPreview(){
        let preview = document.getElementById("image_preview");
        preview.src = URL.createObjectURL(image.files[0]);
    }
}