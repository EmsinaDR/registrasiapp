
(function () {

  const form = document.getElementById("formRegistrasi");
  const tombol = document.getElementById("btnKirim");
  const status = document.getElementById("statusForm");

  let sedangMengirim = false;
  let timerPengiriman = null;

  form.addEventListener("submit", function (e) {

    // Mencegah pengiriman ganda
    if (sedangMengirim) {
      e.preventDefault();
      return;
    }

    // Validasi browser
    if (!form.reportValidity()) {
      e.preventDefault();
      return;
    }

    // Tandai proses pengiriman
    sedangMengirim = true;

    tombol.disabled = true;
    tombol.textContent = "MENGIRIM DATA...";

    status.className = "info";
    status.textContent =
      "Data sedang dikirim ke server. Silakan tunggu respons pada bagian Status Pendaftaran.";

    // Kembalikan tombol setelah batas waktu
    clearTimeout(timerPengiriman);

    timerPengiriman = setTimeout(function () {

      sedangMengirim = false;

      tombol.disabled = false;
      tombol.textContent = "KIRIM PENDAFTARAN";

      status.className = "error";
      status.textContent =
        "Waktu tunggu habis. Periksa respons server dan Google Sheets sebelum mencoba mengirim ulang.";

    }, 20000);

  });

})();
