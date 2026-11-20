const API = (window.ZHC_CONFIG?.API_URL || "").replace(/\/$/, "");
const SECURITY = ["ABS", "EBD", "ESC", "Airbags", "Immobilizer", "Parking Sensor", "Rear Camera", "TPMS", "Hill Start Assist", "Traction Control", "ISOFIX"];
const COMFORT = ["Leather Seats", "Electric Seat", "Keyless Entry", "Push Start Button", "Sunroof", "Cruise Control", "Android Auto", "Apple CarPlay", "AC Digital", "Power Tailgate", "360 Camera"];
let token = localStorage.getItem("zhc_admin_token") || "", inventory = [], selectedFiles = [];
const $ = id => document.getElementById(id);
function money(v) { return "Rp " + Number(v || 0).toLocaleString("id-ID") }
function slug(v) { return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }
function msg(id, text, ok = false) { $(id).textContent = text; $(id).className = "message" + (ok ? " success" : "") }
function api(path, opts = {}) { return fetch(API + path, { ...opts, headers: { "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}), ...(opts.headers || {}) } }) }
function showApp() { $("loginView").classList.add("hidden"); $("appView").classList.remove("hidden"); loadInventory(); }
function showLogin() { $("appView").classList.add("hidden"); $("loginView").classList.remove("hidden"); }
$("loginForm").addEventListener("submit", async e => {
    e.preventDefault(); if (!API) { msg("loginMessage", "API_URL belum diatur di admin-config.js"); return; }
    try { const r = await api("/api/login", { method: "POST", body: JSON.stringify({ password: $("adminPassword").value }) }); const d = await r.json(); if (!r.ok) throw Error(d.error || "Login gagal"); token = d.token; localStorage.setItem("zhc_admin_token", token); showApp(); } catch (err) { msg("loginMessage", err.message) }
});
$("logoutBtn").onclick = () => { token = ""; localStorage.removeItem("zhc_admin_token"); showLogin() };
document.querySelectorAll(".side-link").forEach(b => b.onclick = () => b.dataset.view === "form" ? openForm() : showInventory());
$("addCarBtn").onclick = () => openForm(); $("backBtn").onclick = showInventory; $("cancelBtn").onclick = showInventory;
$("searchInput").addEventListener("input", renderTable);
function showInventory() { $("inventoryView").classList.remove("hidden"); $("formView").classList.add("hidden"); $("crumb").textContent = "Used Cars"; document.querySelectorAll(".side-link").forEach(b => b.classList.toggle("active", b.dataset.view === "inventory")); loadInventory(); }
function openForm(car = null) {
    $("inventoryView").classList.add("hidden"); $("formView").classList.remove("hidden"); $("crumb").textContent = car ? "Edit Car" : "Add Car"; $("formTitle").textContent = car ? "Edit Car" : "Add Car"; document.querySelectorAll(".side-link").forEach(b => b.classList.toggle("active", b.dataset.view === "form")); $("carForm").reset(); $("carId").value = car?.id || ""; selectedFiles = []; $("newGallery").innerHTML = ""; $("photoCount").textContent = "0 foto dipilih"; $("existingGallery").innerHTML = "";
    ["brand", "model", "variant", "year", "transmission", "km", "color", "fuelType", "price", "status", "description"].forEach(k => { if ($(k)) $(k).value = car?.[k] ?? (k === "status" ? "available" : k === "fuelType" ? "Bensin" : "") });
    if (car?.images?.length) { $("existingGallery").innerHTML = car.images.map(src => `<img src="../${src}" title="${src}">`).join(""); $("existingGallery").insertAdjacentHTML("afterbegin", '<p class="hint">Foto saat ini. Jika memilih foto baru, galeri akan diganti dengan foto baru.</p>'); }
    renderChecks("securityChoices", SECURITY, car?.security || []); renderChecks("comfortChoices", COMFORT, car?.comfort || []); msg("formMessage", "");
}
function renderChecks(id, items, selected) { $(id).innerHTML = items.map(x => `<label><input type="checkbox" value="${x.replace(/"/g, "&quot;")}" ${selected.includes(x) ? "checked" : ""}> ${x}</label>`).join(""); }
function checked(id) { return [...$(id).querySelectorAll("input:checked")].map(x => x.value) }
$("photos").addEventListener("change", e => { const files = [...e.target.files]; if (files.length > 15) { msg("formMessage", "Maksimal 15 foto."); e.target.value = ""; return; } selectedFiles = files; $("newGallery").innerHTML = ""; files.forEach(f => { const im = document.createElement("img"); im.src = URL.createObjectURL(f); $("newGallery").appendChild(im) }); $("photoCount").textContent = files.length + " foto dipilih"; });
function compress(file) { return new Promise((resolve, reject) => { const img = new Image(), url = URL.createObjectURL(file); img.onload = () => { const scale = Math.min(1, 1600 / img.width, 1600 / img.height), canvas = document.createElement("canvas"); canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale); canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(url); resolve(canvas.toDataURL("image/jpeg", .78).split(",")[1]); }; img.onerror = reject; img.src = url; }); }
$("carForm").addEventListener("submit", async e => {
    e.preventDefault(); const button = $("publishBtn"); button.disabled = true; button.textContent = "Menyimpan...";
    try {
        const brand = $("brand").value.trim().toUpperCase(), model = $("model").value.trim(), variant = $("variant").value.trim(), year = Number($("year").value);
        const name = [model, variant, year].filter(Boolean).join(" "), id = $("carId").value || slug([brand, model, variant, year, $("color").value].join("-"));
        if (!selectedFiles.length && !$("carId").value) throw Error("Upload minimal 1 foto kendaraan.");
        const images = []; for (let i = 0; i < selectedFiles.length; i++) { const f = selectedFiles[i]; images.push({ name: `${id}-${String(i + 1).padStart(2, "0")}.jpg`, data: await compress(f) }); }
        const car = { id, brand, model, variant, name, color: $("color").value.trim(), status: $("status").value, price: Number($("price").value), year, km: Number($("km").value), transmission: $("transmission").value, fuelType: $("fuelType").value, description: $("description").value.trim(), security: checked("securityChoices"), comfort: checked("comfortChoices") };
        const r = await api("/api/cars", { method: "POST", body: JSON.stringify({ car, images }) }); const d = await r.json(); if (!r.ok) throw Error(d.error || "Gagal menyimpan");
        msg("formMessage", "Berhasil disimpan. GitHub Pages akan memperbarui website setelah proses deployment selesai.", true); button.textContent = "Tersimpan"; setTimeout(showInventory, 1800);
    } catch (err) { msg("formMessage", err.message); button.disabled = false; button.textContent = "Publish Vehicle"; }
});
async function loadInventory() { try { const r = await api("/api/cars"); const d = await r.json(); if (!r.ok) throw Error(d.error || "Gagal mengambil data"); inventory = d.cars || []; renderTable(); $("totalCount").textContent = inventory.length; $("availableCount").textContent = inventory.filter(c => c.status === "available").length; $("reservedCount").textContent = inventory.filter(c => c.status === "reserved").length; $("soldCount").textContent = inventory.filter(c => c.status === "sold").length; } catch (err) { console.error(err); } }
function renderTable() {
    const q = $("searchInput").value.toLowerCase(); const rows = inventory.filter(c => (c.name + " " + c.model + " " + c.brand).toLowerCase().includes(q)); $("carsTable").innerHTML = rows.map(c => `<tr><td><img src="../${c.images?.[0] || "IMAGE/background-web.png"}" onerror="this.style.opacity=.2"></td><td><b>${c.name}</b><br><small>${c.brand} • ${c.color || "-"}</small></td><td>${money(c.price)}</td><td>${c.year}</td><td>${c.transmission}</td><td>${Number(c.km).toLocaleString("id-ID")} KM</td><td><span class="badge ${c.status}">${c.status}</span></td><td><div class="actions"><button data-edit="${c.id}">✎</button><button class="delete" data-delete="${c.id}">🗑</button></div></td></tr>`).join(""); $("emptyState").classList.toggle("hidden", rows.length > 0);
    $("carsTable").querySelectorAll("[data-edit]").forEach(b => b.onclick = () => openForm(inventory.find(c => c.id === b.dataset.edit))); $("carsTable").querySelectorAll("[data-delete]").forEach(b => b.onclick = () => deleteCar(b.dataset.delete));
}
async function deleteCar(id) { const car = inventory.find(c => c.id === id); if (!confirm(`Hapus ${car?.name || id} dari katalog?`)) return; try { const r = await api("/api/cars", { method: "DELETE", body: JSON.stringify({ id }) }); const d = await r.json(); if (!r.ok) throw Error(d.error || "Gagal menghapus"); loadInventory(); } catch (e) { alert(e.message) } }
if (token && API) showApp(); else showLogin();
