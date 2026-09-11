// ==========================================
// ZHC USED CAR - SCRIPT.JS
// Clean, reusable & responsive-ready
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
    const model = document.getElementById("filterModel");
    const year = document.getElementById("filterYear");
    const price = document.getElementById("filterPrice");
    const km = document.getElementById("filterKm");
    const button = document.querySelector(".search-button");

    if (!model || !year || !price || !km) return;

    [model, year, price, km].forEach(select => {
        select.addEventListener("change", () => {
            // Tidak langsung menjalankan filter agar user tetap bisa memilih semua opsi.
        });
    });

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


// Backward compatibility for existing inline onclick="filterUnits()"
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
// DETAIL PAGE
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
        name: "Almaz Exclusive 5 Seat 2019",
        price: "Rp 160.000.000",
        year: "2019",
        km: "109.000 KM",
        transmission: "AT",
        description:
            "Wuling Almaz Exclusive 5 Seat tahun 2019 tersedia di ZHC Used Car. Hubungi tim kami untuk informasi lebih lanjut mengenai kondisi unit dan proses pembelian.",
        images: [
            "IMAGE/ALMAZ RS/Almaz-1.jpeg",
            "IMAGE/ALMAZ RS/Almaz-2.jpeg",
            "IMAGE/ALMAZ RS/Almaz-3.jpeg",
            "IMAGE/ALMAZ RS/Almaz-4.jpeg",
            "IMAGE/ALMAZ RS/Almaz-5.jpeg",
            "IMAGE/ALMAZ RS/Almaz-6.jpeg",
            "IMAGE/ALMAZ RS/Almaz-7.jpeg",
            "IMAGE/ALMAZ RS/Almaz-8.jpeg",
            "IMAGE/ALMAZ RS/Almaz-9.jpeg"
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
    }
};

function initDetailPage() {
    const mainImage = document.getElementById("mainImage");

    if (!mainImage) return;

    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("car");
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
