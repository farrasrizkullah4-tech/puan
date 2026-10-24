// ===== 1. Tombol edit =====
// Klik ✎ -> bagian bisa diketik. Klik ✓ -> tersimpan.
document.querySelectorAll(".edit").forEach(function (btn) {
  var el = document.getElementById(btn.dataset.target);

  // Ambil data tersimpan (kalau ada)
  var tersimpan = localStorage.getItem(el.id);
  if (tersimpan) el.innerText = tersimpan;

  btn.onclick = function () {
    if (el.contentEditable !== "true") {
      // mulai edit
      el.contentEditable = "true";
      el.focus();
      btn.innerText = "✓";
      btn.classList.add("aktif");
    } else {
      // simpan
      el.contentEditable = "false";
      btn.innerText = "✎";
      btn.classList.remove("aktif");
      localStorage.setItem(el.id, el.innerText.trim());
      updateWA();
    }
  };
});

// ===== 2. Link WhatsApp ikut nomor telepon =====
function updateWA() {
  var nomor = document.getElementById("telp").innerText.replace(/\D/g, "");
  if (nomor.startsWith("0")) nomor = "62" + nomor.slice(1);
  var nama = document.getElementById("nama").innerText;
  var teks = "Halo " + nama + ", saya menemukan HP Anda.";
  document.getElementById("waBtn").href =
    "https://wa.me/" + nomor + "?text=" + encodeURIComponent(teks);
}
updateWA();

// ===== 3. Ganti foto =====
var fotoImg = document.getElementById("avatarImg");
var fotoIcon = document.getElementById("avatarIcon");

function tampilFoto(src) {
  fotoImg.src = src;
  fotoImg.hidden = false;
  fotoIcon.hidden = true;
}

if (localStorage.getItem("foto")) tampilFoto(localStorage.getItem("foto"));

document.getElementById("fotoBtn").onclick = function () {
  document.getElementById("fotoFile").click();
};

document.getElementById("fotoFile").onchange = function (e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    tampilFoto(reader.result);
    try { localStorage.setItem("foto", reader.result); } catch (err) {}
  };
  reader.readAsDataURL(file);
};

// ===== 4. Laporkan penemuan HP =====
document.getElementById("reportBtn").onclick = function () {
  var kontak = prompt("Masukkan nama & nomor/email Anda:");
  if (kontak) alert("Laporan terkirim. Terima kasih atas kejujurannya!");
};

// ===== 5. Reset data =====
document.getElementById("resetBtn").onclick = function () {
  if (confirm("Kembalikan semua data ke awal?")) {
    localStorage.clear();
    location.reload();
  }
};

// ===== 6. QR (hiasan saja, bukan QR asli) =====
var c = document.getElementById("qr");
var ctx = c.getContext("2d");
var n = 21, s = c.width / n;

for (var y = 0; y < n; y++) {
  for (var x = 0; x < n; x++) {
    if (Math.random() > 0.5) ctx.fillRect(x * s, y * s, s, s);
  }
}
// tiga kotak sudut khas QR
[[0, 0], [n - 7, 0], [0, n - 7]].forEach(function (p) {
  ctx.fillStyle = "#fff"; ctx.fillRect((p[0] - 0) * s, p[1] * s, 7 * s, 7 * s);
  ctx.fillStyle = "#000"; ctx.fillRect(p[0] * s, p[1] * s, 7 * s, 7 * s);
  ctx.fillStyle = "#fff"; ctx.fillRect((p[0] + 1) * s, (p[1] + 1) * s, 5 * s, 5 * s);
  ctx.fillStyle = "#000"; ctx.fillRect((p[0] + 2) * s, (p[1] + 2) * s, 3 * s, 3 * s);
});