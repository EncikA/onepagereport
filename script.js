document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("reportForm");
    const outputDiv = document.getElementById("output");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const imageInput = document.getElementById("images");
    const imageGrid = document.createElement("div");
    imageGrid.className = "image-grid";
    let uploadedImages = [];

   // Function to reformat date from yyyy-mm-dd to dd/mm/yyyy
function formatDate(inputDate) {
    if (!inputDate) return ''; // Handle empty input
    const dateParts = inputDate.split('-'); // Split the date into parts
    if (dateParts.length === 3) {
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        return `${day}/${month}/${year}`; // Reformat to dd/mm/yyyy
    }
    return inputDate; // Return the original date if formatting fails
}

// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = {
        programName: document.getElementById('programName').value.trim(),
        date: formatDate(document.getElementById('date').value), // Format the date
        time: document.getElementById('time').value.trim(),
        location: document.getElementById('location').value.trim(),
        targetAudience: document.getElementById('targetAudience').value.trim(),
        objectives: document.getElementById('objectives').value.trim(),
        activities: document.getElementById('activities').value.trim(),
        strengths: document.getElementById('strengths').value.trim(),
        weaknesses: document.getElementById('weaknesses').value.trim(),
        preparedBy: document.getElementById('preparedBy').value.trim(),
        position: document.getElementById('position').value.trim()
    };

    // Handle image uploads
    const imageFiles = Array.from(document.getElementById('images').files);
    const imagePreviews = imageFiles.slice(0, 4).map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        });
    });

    // Wait for all images to load
    Promise.all(imagePreviews).then(images => {
        // Generate output HTML
        const outputHTML = `
            <h2>Generated Report</h2>
            <p><strong>Nama Program/Aktiviti:</strong> ${formData.programName}</p>
            <p><strong>Tarikh:</strong> ${formData.date}</p>
            <p><strong>Masa:</strong> ${formData.time}</p>
            <p><strong>Tempat:</strong> ${formData.location}</p>
            <p><strong>Sasaran:</strong> ${formData.targetAudience}</p>
            <p><strong>Objektif:</strong> ${formData.objectives}</p>
            <p><strong>Aktiviti:</strong> ${formData.activities}</p>
            <p><strong>Kekuatan:</strong> ${formData.strengths}</p>
            <p><strong>Kelemahan:</strong> ${formData.weaknesses}</p>
            <p><strong>Gambar:</strong></p>
            <div class="image-grid">${images.join('')}</div>
            <p><strong>Disediakan oleh:</strong> ${formData.preparedBy}</p>
            <p><strong>Jawatan:</strong> ${formData.position}</p>
        `;

        // Display output
        document.getElementById('output').innerHTML = outputHTML;

        // Show the "Download PDF" button
        document.getElementById('downloadPdfBtn').style.display = 'block';
    }).catch(error => {
        console.error('Error loading images:', error);
        alert('An error occurred while processing the images. Please try again.');
    });
});

// Add functionality to download the report as a PDF
document.getElementById('downloadPdfBtn').addEventListener('click', function () {
    const element = document.getElementById('output');

    // Options for the PDF generation
    const options = {
        margin: 10, // Margins for the PDF (in mm)
        filename: 'OnePageReport.pdf', // Filename for the downloaded PDF
        image: { type: 'jpeg', quality: 0.98 }, // Image settings for better quality
        html2canvas: { scale: 2 }, // Scale factor for higher resolution
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // A4 size, portrait orientation
    };

    // Generate the PDF
    html2pdf().set(options).from(element).save().catch(error => {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
    });
});
