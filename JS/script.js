// ==========================================
// ZHC USED CAR - SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initFilters();
    initSmoothScroll();
    initDetailPage();
});

// ==========================================
// FILTER
// ==========================================

function initFilters() {
    const button = document.querySelector(".search-button");

    if (button) {
        button.addEventListener("click", filterUnits);
    }
}

function filterUnits() {
    const model = getValue("filterModel");
    const year = getValue("filterYear");
    const price = getValue("filterPrice");
    const km = getValue("filterKm");

    const cards = document.querySelectorAll(".car-card");
    const noResult = document.getElementById("noResult");

    if (!cards.length) return;

    let visible = 0;

    cards.forEach(card => {
        const cardModel = card.dataset.model || "";
        const cardYear = card.dataset.year || "";
        const cardPrice = Number(card.dataset.price || 0);
        const cardKm = Number(card.dataset.km || 0);

        const modelMatch = model === "all" || cardModel === model;
        const yearMatch = year === "all" || cardYear === year;
        const priceMatch = price === "all" || cardPrice <= Number(price);
        const kmMatch = km === "all" || cardKm <= Number(km);

        const show = modelMatch && yearMatch && priceMatch && kmMatch;

        card.classList.toggle("is-hidden", !show);

        if (show) visible++;
    });

    if (noResult) {
        noResult.style.display = visible === 0 ? "block" : "none";
    }
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "all";
}

window.filterUnits = filterUnits;
window.filterCatalog = filterUnits;

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

// ==========================================
// UNIT DATA
// ==========================================

const cars = {
    "alvez-ex-2023": {
        name: "Alvez EX 2023",
        price: "Rp 200.000.000",
        year: "2023",
        km: "16.000 KM",
        transmission: "AT",
        description:
            "Wuling Alvez EX tahun 2023 tersedia di ZHC Used Car. Hubungi tim kami untuk informasi lebih lanjut mengenai kondisi unit dan proses pembelian.",
        images: [
            "IMAGE/ALVEZ EX 2023/alvez-1.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-2.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-3.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-4.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-5.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-6.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-7.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-8.jpeg",
            "IMAGE/ALVEZ EX 2023/alvez-9.jpeg"
        ]
    },

    "almaz-exclusive-5-seat-2019": {
        name: "Almaz Exclusive 5 Seat 2019 - Merah",
        price: "Rp 160.000.000",
        year: "2019",
        km: "109.000 KM",
        transmission: "AT",
        description:
            "Wuling Almaz Exclusive 5 Seat tahun 2019 warna merah tersedia di ZHC Used Car. Hubungi tim kami untuk informasi lebih lanjut mengenai kondisi unit dan proses pembelian.",
        images: [
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-1.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-2.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-3.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-4.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-5.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-6.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-7.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-8.jpeg",
            "IMAGE/ALMAZ EX 2019 MERAH/Almaz-9.jpeg"
        ]
    },

    "alvez-se-2025": {
        name: "Alvez SE 2025",
        price: "Rp 175.000.000",
        year: "2025",
        km: "100 KM",
        transmission: "AT",
        description:
            "Wuling Alvez SE tahun 2025 tersedia di ZHC Used Car. Hubungi tim kami untuk informasi lebih lanjut mengenai kondisi unit dan proses pembelian.",
        images: [
            "IMAGE/ALVEZ SE 2025/alvezse-1.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-2.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-3.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-4.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-5.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-6.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-7.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-8.jpeg",
            "IMAGE/ALVEZ SE 2025/alvezse-9.jpeg"
        ]
    },

    "almaz-exclusive-5-seat-2019-silver": {
        name: "Almaz Exclusive 5 Seat 2019 - Silver",
        price: "Rp 160.000.000",
        year: "2019",
        km: "98.000 KM",
        transmission: "Automatic",
        description:
            "Wuling Almaz Exclusive 5 Seat tahun 2019 warna silver dengan kilometer 98.000 KM tersedia di ZHC Used Car.",
        images: [
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver1.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver2.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver3.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver4.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver5.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver6.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver7.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver8.jpeg",
            "IMAGE/ALMAZ EX 2019 SILVER/almaz-ex-silver9.jpeg"
        ]
    },

    "almaz-exclusive-5-seat-2019-abu": {
        name: "Almaz Exclusive 5 Seat 2019 - Abu",
        price: "Rp 160.000.000",
        year: "2019",
        km: "54.000 KM",
        transmission: "Automatic",
        description:
            "Wuling Almaz Exclusive 5 Seat tahun 2019 warna abu dengan kilometer 54.000 KM tersedia di ZHC Used Car.",
        images: [
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu1.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu2.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu3.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu4.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu5.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu6.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu7.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu8.jpeg",
            "IMAGE/ALMAZ EX 2019 ABU/almaz-ex-abu9.jpeg"
        ]
    }
};

// ==========================================
// DETAIL PAGE
// ==========================================

function initDetailPage() {
    const mainImage = document.getElementById("mainImage");

    if (!mainImage) return;

    const carId = new URLSearchParams(window.location.search).get("car");
    const car = cars[carId];

    if (!car) {
        showMissingCar();
        return;
    }

    setText("carName", car.name);
    setText("breadcrumbName", car.name);
    setText("carPrice", car.price);
    setText("carYear", car.year);
    setText("carKm", car.km);
    setText("carTransmission", car.transmission);
    setText("carDescription", car.description);

    mainImage.src = car.images[0];
    mainImage.alt = car.name;

    renderThumbnails(car, mainImage);
    setWhatsApp(car.name);

    document.title = `${car.name} | ZHC Used Car`;
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function renderThumbnails(car, mainImage) {
    const container = document.getElementById("thumbnails");

    if (!container) return;

    container.innerHTML = "";

    car.images.forEach((image, index) => {
        const thumbnail = document.createElement("img");

        thumbnail.src = image;
        thumbnail.alt = `${car.name} foto ${index + 1}`;
        thumbnail.loading = "lazy";

        if (index === 0) {
            thumbnail.classList.add("active");
        }

        thumbnail.addEventListener("click", () => {
            mainImage.src = image;

            container.querySelectorAll("img").forEach(img => {
                img.classList.remove("active");
            });

            thumbnail.classList.add("active");
        });

        container.appendChild(thumbnail);
    });
}

function setWhatsApp(carName) {
    const button = document.getElementById("whatsappButton");

    if (!button) return;

    const message =
        `Halo ZHC Used Car, saya tertarik dengan ${carName}. Mohon informasi lebih lanjut.`;

    button.href =
        `https://wa.me/6285178247141?text=${encodeURIComponent(message)}`;
}

function showMissingCar() {
    setText("carName", "Unit Tidak Ditemukan");
    setText("breadcrumbName", "Unit Tidak Ditemukan");
    setText(
        "carDescription",
        "Unit yang kamu cari tidak tersedia atau link unit sudah tidak valid."
    );

    const mainImage = document.getElementById("mainImage");
    const status = document.querySelector(".detail-status");
    const thumbnails = document.getElementById("thumbnails");

    if (mainImage) mainImage.style.display = "none";
    if (status) status.style.display = "none";
    if (thumbnails) thumbnails.style.display = "none";
}
