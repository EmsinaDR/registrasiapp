
(function () {

  const form = document.getElementById("formRegistrasi");
  const tombol = document.getElementById("btnKirim");
  const status = document.getElementById("statusForm");

  const accordions = document.querySelectorAll(".ata-accordion");

  let sedangMengirim = false;
  let timerPengiriman = null;

  // ACCORDION UTAMA
  accordions.forEach(function (accordion) {

    const summary = accordion.querySelector(":scope > summary");

    summary.addEventListener("click", function (e) {

      e.preventDefault();

      const akanDibuka = !accordion.open;

      accordions.forEach(function (item) {
        item.open = false;
      });

      accordion.open = akanDibuka;

    });

  });

  // DROPDOWN APLIKASI
  const dropdownAplikasi = document.querySelector(".ata-select-dropdown");
  const jumlahAplikasi = document.getElementById("jumlahAplikasi");

  if (dropdownAplikasi && jumlahAplikasi) {

    const checkboxAplikasi = dropdownAplikasi.querySelectorAll(
      'input[name="Daftar Aplikasi Klaim"]'
    );

    checkboxAplikasi.forEach(function (checkbox) {

      checkbox.addEventListener("change", function () {

        const terpilih = Array.from(checkboxAplikasi)
          .filter(function (item) {
            return item.checked;
          });

        jumlahAplikasi.textContent = terpilih.length
          ? terpilih.length + " aplikasi dipilih"
          : "Pilih aplikasi yang diklaim";

      });

    });

    document.addEventListener("click", function (e) {

      if (!dropdownAplikasi.contains(e.target)) {
        dropdownAplikasi.open = false;
      }

    });

  }

  // VALIDASI FORM
  form.addEventListener("invalid", function (e) {

    const accordion = e.target.closest(".ata-accordion");

    if (accordion) {

      accordions.forEach(function (item) {
        item.open = false;
      });

      accordion.open = true;

    }

  }, true);

  // PENGIRIMAN FORM
  form.addEventListener("submit", function (e) {

    if (sedangMengirim) {
      e.preventDefault();
      return;
    }

    if (!form.reportValidity()) {
      e.preventDefault();
      return;
    }

    const aplikasiTerpilih = form.querySelectorAll(
      'input[name="Daftar Aplikasi Klaim"]:checked'
    );

    if (aplikasiTerpilih.length === 0) {

      e.preventDefault();

      const bagianAplikasi = dropdownAplikasi.closest(".ata-accordion");

      accordions.forEach(function (item) {
        item.open = false;
      });

      bagianAplikasi.open = true;
      dropdownAplikasi.open = true;

      status.className = "error";
      status.textContent = "Pilih minimal satu aplikasi yang akan diklaim.";

      dropdownAplikasi.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      return;
    }

    sedangMengirim = true;

    tombol.disabled = true;
    tombol.textContent = "MENGIRIM DATA...";

    status.className = "info";
    status.textContent =
      "Data sedang dikirim. Silakan tunggu respons dari server.";

    clearTimeout(timerPengiriman);

    timerPengiriman = setTimeout(function () {

      sedangMengirim = false;

      tombol.disabled = false;
      tombol.textContent = "KIRIM PENDAFTARAN";

      status.className = "error";
      status.textContent =
        "Waktu tunggu habis. Periksa Google Sheets sebelum mencoba kembali.";

    }, 20000);

  });

})();
