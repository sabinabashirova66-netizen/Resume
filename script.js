const API_BASE = "https://inai-col1.fishrungames.com";
const ADS_URL = `${API_BASE}/ads`;

const adsList = document.getElementById("adsList");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const adsCount = document.getElementById("adsCount");
const refreshBtn = document.getElementById("refreshBtn");
const form = document.getElementById("adForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");
const imageInput = document.getElementById("image");
const previewWrap = document.getElementById("previewWrap");
const previewImage = document.getElementById("previewImage");
const cardTemplate = document.getElementById("adCardTemplate");

function formatPrice(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Цена не указана";
  }

  if (number === 0) {
    return "Бесплатно";
  }

  return `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 2,
  }).format(number)} сом`;
}

function getImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${API_BASE}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

function renderAds(items) {
  adsList.innerHTML = "";
  adsCount.textContent = items.length;

  if (items.length === 0) {
    adsList.innerHTML = '<div class="state-box">Объявлений пока нет.</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((ad) => {
    const card = cardTemplate.content.cloneNode(true);
    const img = card.querySelector(".ad-image");
    const noImage = card.querySelector(".no-image");
    const imageUrl = getImageUrl(ad.image_url);

    card.querySelector(".ad-id").textContent = `#${ad.id}`;
    card.querySelector(".ad-price").textContent = formatPrice(ad.price);
    card.querySelector(".ad-title").textContent = ad.title || "Без названия";
    card.querySelector(".ad-description").textContent = ad.description || "Без описания";

    if (imageUrl) {
      img.src = imageUrl;
      img.alt = ad.title ? `Изображение: ${ad.title}` : "Изображение объявления";
      img.style.display = "block";
      noImage.style.display = "none";

      img.addEventListener("error", () => {
        img.style.display = "none";
        noImage.style.display = "grid";
      });
    }

    fragment.appendChild(card);
  });

  adsList.appendChild(fragment);
}

async function loadAds() {
  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  adsList.innerHTML = "";
  refreshBtn.disabled = true;

  try {
    const response = await fetch(ADS_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка GET: ${response.status}`);
    }

    const data = await response.json();
    renderAds(Array.isArray(data.items) ? data.items : []);
  } catch (error) {
    console.error(error);
    errorBox.textContent =
      "Не удалось загрузить объявления. Проверь интернет, доступность API и CORS.";
    errorBox.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
    refreshBtn.disabled = false;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formMessage.className = "message";
  formMessage.textContent = "Отправляем объявление...";
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append("title", document.getElementById("title").value.trim());
  formData.append("description", document.getElementById("description").value.trim());
  formData.append("price", document.getElementById("price").value);

  if (imageInput.files[0]) {
    formData.append("image", imageInput.files[0]);
  }

  try {
    const response = await fetch(ADS_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let details = "";
      try {
        const errorData = await response.json();
        details = errorData.detail ? `: ${JSON.stringify(errorData.detail)}` : "";
      } catch (_) {
        // Ответ сервера может быть не JSON.
      }
      throw new Error(`Ошибка POST: ${response.status}${details}`);
    }

    const createdAd = await response.json();
    form.reset();
    previewImage.removeAttribute("src");
    previewWrap.classList.add("hidden");

    formMessage.className = "message success";
    formMessage.textContent = `Объявление #${createdAd.id} успешно опубликовано.`;

    await loadAds();
  } catch (error) {
    console.error(error);
    formMessage.className = "message error";
    formMessage.textContent =
      "Не удалось отправить объявление. Проверь поля, интернет и доступность API.";
  } finally {
    submitBtn.disabled = false;
  }
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file) {
    previewImage.removeAttribute("src");
    previewWrap.classList.add("hidden");
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    previewImage.src = reader.result;
    previewWrap.classList.remove("hidden");
  });
  reader.readAsDataURL(file);
});

refreshBtn.addEventListener("click", loadAds);

loadAds();
