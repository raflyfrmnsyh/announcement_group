// Mencegah spasi di awal saat mengetik dan menangkap tombol Enter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    cariPeserta();
  }
});

function cariPeserta() {
  const input = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  if (!input) {
    showError("Silakan masukkan nama peserta.");
    return;
  }

  const hasil = dataPeserta.filter((p) => p.nama.toLowerCase().includes(input));

  if (hasil.length === 0) {
    showError("Peserta tidak ditemukan.");
    return;
  }

  // Nama hanya ditemukan satu
  if (hasil.length === 1) {
    showSuccess(hasil[0]);
    return;
  }

  // Nama ditemukan lebih dari satu
  showPilihKelas(hasil);
}

function bukaModal() {
  const resultBox = document.getElementById("resultBox");
  const modalContent = document.getElementById("modalContent");

  resultBox.classList.remove("hidden");
  resultBox.classList.add("flex");

  // Lock scroll halaman
  document.body.classList.add("overflow-hidden");

  // Animasi masuk
  requestAnimationFrame(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  });
}

function showPilihKelas(hasil) {
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="p-6">

      <div class="text-center mb-6">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full 
                    bg-yellow-100 flex items-center justify-center">
          <i class="fas fa-user-check text-yellow-500 text-xl"></i>
        </div>

        <h2 class="text-xl font-bold text-gray-800">
          Konfirmasi Kelas
        </h2>

        <p class="text-sm text-gray-500 mt-2">
          Nama tersebut ditemukan lebih dari satu.
          Silakan pilih kelas kamu.
        </p>
      </div>

      <div class="space-y-3">

        ${hasil
          .map(
            (p) => `
          <button
            onclick="pilihKelas('${p.id}')"
            class="w-full p-4 text-left rounded-xl border
                   border-gray-200 hover:border-red-400
                   hover:bg-red-50 transition"
          >
            <div class="font-semibold text-gray-800">
              ${p.kelas}
            </div>

            <div class="text-sm text-gray-500 mt-1">
              ${p.nama}
            </div>
          </button>
        `,
          )
          .join("")}

      </div>

      <button
        onclick="tutupModal()"
        class="w-full mt-5 py-3 rounded-xl 
               bg-gray-100 text-gray-700"
      >
        Batal
      </button>

    </div>
  `;

  bukaModal();
}

function tutupModal() {
  const resultBox = document.getElementById("resultBox");
  const modalContent = document.getElementById("modalContent");

  // Animasi keluar
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    resultBox.classList.add("hidden");
    resultBox.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");
  }, 250);
}

function showSuccess(data) {
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="overflow-hidden rounded-3xl">

      <!-- Header -->
      <div class="bg-red-700 text-white px-6 py-5 relative">

        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>

        <div class="relative z-10 flex items-center gap-4">
          <div
            class="w-14 h-14 flex-shrink-0 bg-white/20 rounded-2xl
                   flex items-center justify-center border border-white/20"
          >
            <i class="fa-solid fa-user-check text-2xl"></i>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-red-100">
              Peserta Terdaftar
            </p>

            <h3 class="text-xl font-bold">
              Halo, ${data.nama}
            </h3>
          </div>
        </div>
      </div>


      <!-- Body -->
      <div class="p-6">

        <!-- Informasi peserta -->
        <div class="mb-5">
          <div class="flex items-center gap-3 mb-3">
            <i class="fa-solid fa-graduation-cap text-red-600"></i>

            <div>
              <p class="text-xs text-gray-400 uppercase tracking-wide">
                Kelas
              </p>

              <p class="font-semibold text-gray-800">
                ${data.kelas}
              </p>
            </div>
          </div>
        </div>


        <!-- Kelompok -->
        <div
          class="bg-red-50 border-2 border-red-100 rounded-2xl p-5 text-center"
        >
          <p
            class="text-xs text-red-600 font-bold uppercase tracking-widest mb-2"
          >
            Kamu tergabung ke
          </p>

          <h2 class="text-3xl font-black text-gray-900 mb-1">
            ${data.kelompok}
          </h2>

          <p class="text-sm text-gray-500">
            Jangan lupa catat kelompokmu ya!
          </p>
        </div>


        <!-- ID Peserta -->
        ${
          data.id_peserta
            ? `
            <div class="mt-4 bg-gray-50 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-widest text-gray-400">
                ID Peserta
              </p>

              <p class="font-bold text-gray-700">
                ${data.id_peserta}
              </p>
            </div>
          `
            : ""
        }


        <!-- Tombol -->
        <button
          onclick="tutupModal()"
          class="mt-5 w-full bg-gray-900 hover:bg-gray-800
                 text-white font-semibold py-3.5 rounded-xl
                 transition-all duration-200 active:scale-[0.98]"
        >
          <i class="fa-solid fa-check mr-2"></i>
          Mengerti
        </button>

      </div>
    </div>
  `;

  bukaModal();
}

function showError(message) {
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="p-6">

      <!-- Icon -->
      <div class="flex justify-center mb-5">
        <div
          class="w-16 h-16 bg-red-100 text-red-600 rounded-full
                 flex items-center justify-center"
        >
          <i class="fa-solid fa-circle-exclamation text-3xl"></i>
        </div>
      </div>


      <!-- Text -->
      <div class="text-center">
        <p
          class="text-xs font-bold text-red-600 uppercase
                 tracking-widest mb-2"
        >
          Pencarian Gagal
        </p>

        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Peserta Tidak Ditemukan
        </h3>

        <p class="text-sm text-gray-500 leading-relaxed">
          ${message}
        </p>
      </div>


      <!-- Button -->
      <button
        onclick="tutupModal()"
        class="mt-6 w-full bg-red-700 hover:bg-red-800
               text-white font-semibold py-3.5 rounded-xl
               transition-all duration-200 active:scale-[0.98]"
      >
        <i class="fa-solid fa-rotate-left mr-2"></i>
        Coba Lagi
      </button>

    </div>
  `;

  bukaModal();
}

// Tutup modal dengan tombol ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    tutupModal();
  }
});
function pilihKelas(id) {
  const peserta = dataPeserta.find((p) => p.id === id);

  if (!peserta) {
    showError("Data peserta tidak ditemukan.");
    return;
  }

  showSuccess(peserta);
}
