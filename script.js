document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("reportForm");
    const outputDiv = document.getElementById("output");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const imageInput = document.getElementById("images");
    const imageGrid = document.createElement("div");
    imageGrid.className = "image-grid";
    let uploadedImages = [];

    // Format Date to DD/MM/YYYY
    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }

    // Handle Image Upload Preview
    imageInput.addEventListener("change", function () {
        uploadedImages = [];
        imageGrid.innerHTML = "";
        if (this.files.length > 4) {
            alert("You can upload a maximum of 4 images.");
            this.value = "";
            return;
        }
        Array.from(this.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                uploadedImages.push(img.src);
                imageGrid.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });

    reportForm.appendChild(imageGrid);

    // Generate Report
    reportForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(reportForm);

        outputDiv.innerHTML = `
            <h2>${formData.get("programName")}</h2>
            <p><strong>Tarikh:</strong> ${formatDate(formData.get("date"))}</p>
            <p><strong>Masa:</strong> ${formData.get("time")}</p>
            <p><strong>Tempat:</strong> ${formData.get("location")}</p>
            <p><strong>Sasaran:</strong> ${formData.get("targetAudience")}</p>
            <p><strong>Objektif:</strong> ${formData.get("objectives")}</p>
            <p><strong>Aktiviti:</strong> ${formData.get("activities")}</p>
            <p><strong>Kekuatan:</strong> ${formData.get("strengths")}</p>
            <p><strong>Kelemahan:</strong> ${formData.get("weaknesses")}</p>
            <p><strong>Disediakan oleh:</strong> ${formData.get("preparedBy")}</p>
            <p><strong>Jawatan:</strong> ${formData.get("position")}</p>
        `;

        // Append Image Grid to Output
        const reportImages = document.createElement("div");
        reportImages.className = "image-grid";
        uploadedImages.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            reportImages.appendChild(img);
        });
        outputDiv.appendChild(reportImages);

        downloadPdfBtn.style.display = "block";
    });

    // Download as PDF
    downloadPdfBtn.addEventListener("click", function () {
        html2pdf()
            .from(outputDiv)
            .set({
                margin: 10,
                filename: "OnePageReport.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            })
            .save();
    });
});
