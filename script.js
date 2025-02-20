// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        programName: document.getElementById('programName').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        targetAudience: document.getElementById('targetAudience').value,
        objectives: document.getElementById('objectives').value,
        activities: document.getElementById('activities').value,
        strengths: document.getElementById('strengths').value,
        weaknesses: document.getElementById('weaknesses').value,
        preparedBy: document.getElementById('preparedBy').value,
        position: document.getElementById('position').value
    };

    // Handle image uploads
    const imageFiles = Array.from(document.getElementById('images').files);
    const imagePreviews = imageFiles.slice(0, 4).map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file);
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
    });
});
