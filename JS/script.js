// ==========================================
// ZHC USED CAR - SCRIPT.JS
// ==========================================


// ==========================================
// FILTER UNIT
// ==========================================

function filterUnits() {

    // Ambil nilai filter
    const model = document.getElementById("filterModel").value;
    const year = document.getElementById("filterYear").value;
    const price = document.getElementById("filterPrice").value;
    const km = document.getElementById("filterKm").value;

    // Ambil semua kartu mobil
    const cars = document.querySelectorAll(".car-card");

    cars.forEach(car => {

        const carModel = car.dataset.model;
        const carYear = car.dataset.year;
        const carPrice = Number(car.dataset.price);
        const carKm = Number(car.dataset.km);

        let show = true;

        // FILTER MODEL
        if (model !== "all" && carModel !== model) {
            show = false;
        }

        // FILTER TAHUN
        if (year !== "all" && carYear !== year) {
            show = false;
        }

        // FILTER HARGA
        if (price !== "all") {
            const maxPrice = Number(price);

            if (carPrice > maxPrice) {
                show = false;
            }
        }

        // FILTER KM
        if (km !== "all") {
            const maxKm = Number(km);

            if (carKm > maxKm) {
                show = false;
            }
        }

        // Tampilkan / sembunyikan mobil
        if (show) {
            car.style.display = "";
        } else {
            car.style.display = "none";
        }

    });
};


// ==========================================
// RESET FILTER SAAT HALAMAN DIBUKA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const model = document.getElementById("filterModel");
    const year = document.getElementById("filterYear");
    const price = document.getElementById("filterPrice");
    const km = document.getElementById("filterKm");

    if (model) model.value = "all";
    if (year) year.value = "all";
    if (price) price.value = "all";
    if (km) km.value = "all";

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});