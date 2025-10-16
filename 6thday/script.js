const generateBtn = document.getElementById("generateBtn");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");

generateBtn.addEventListener("click", () => {
  const text = qrText.value.trim();

  if (!text) {
    alert("Please enter some text or a link!");
    return;
  }

  // This API creates QR codes instantly
  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    text
  )}`;

  qrImage.src = qrApi;
  qrImage.style.display = "block";
});
