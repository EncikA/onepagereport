function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let programName = document.getElementById("programName").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let location = document.getElementById("location").value;
    let target = document.getElementById("target").value;
    let objective = document.getElementById("objective").value;
    let activity = document.getElementById("activity").value;
    let strengths = document.getElementById("strengths").value;
    let weaknesses = document.getElementById("weaknesses").value;
    let preparedBy = document.getElementById("preparedBy").value;
    let position = document.getElementById("position").value;

    doc.text("One Page Report (OPR)", 10, 10);
    doc.text("Nama Program/Aktiviti: " + programName, 10, 20);
    doc.text("Tarikh: " + date, 10, 30);
    doc.text("Masa: " + time, 10, 40);
    doc.text("Tempat: " + location, 10, 50);
    doc.text("Sasaran: " + target, 10, 60);
    doc.text("Objektif: ", 10, 70);
    doc.text(objective, 10, 80, { maxWidth: 180 });
    doc.text("Aktiviti: ", 10, 100);
    doc.text(activity, 10, 110, { maxWidth: 180 });
    doc.text("Kekuatan: ", 10, 130);
    doc.text(strengths, 10, 140, { maxWidth: 180 });
    doc.text("Kelemahan: ", 10, 160);
    doc.text(weaknesses, 10, 170, { maxWidth: 180 });

    doc.text("Disediakan oleh: " + preparedBy, 10, 190);
    doc.text("Jawatan: " + position, 10, 200);

    doc.save("one_page_report.pdf");
}
