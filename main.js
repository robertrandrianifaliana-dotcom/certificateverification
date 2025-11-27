const form = document.getElementById('certificate-form');
const qrcodeContainer = document.getElementById('qrcode-container');
const qrcodeDiv = document.getElementById('qrcode');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const certificateDate = document.getElementById('certificate-date').value;
    const level = document.getElementById('level').value;
    const certificateFile = document.getElementById('certificate-file').files[0];

    if (certificateFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const certificateData = e.target.result;

            const data = {
                studentName,
                certificateDate,
                level,
                certificateData
            };

            const jsonString = JSON.stringify(data);

            // Clear previous QR code
            qrcodeDiv.innerHTML = '';

            // Generate QR code
            try {
                const qr = qrcode(0, 'L');
                qr.addData(jsonString);
                qr.make();
                qrcodeDiv.innerHTML = qr.createImgTag();
                qrcodeContainer.style.display = 'block';
            } catch (err) {
                console.error(err);
                alert("Error generating QR code. The data might be too large.");
            }
        };
        reader.readAsDataURL(certificateFile);
    }
});