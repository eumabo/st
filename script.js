const $ = (q) => document.querySelector(q);

const progressBar = $("#progressBar");
const year = $("#year");
year.textContent = new Date().getFullYear();

// Progress bar
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-in");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Mobile nav
const hamb = $("#hamb");
const mobileNav = $("#mobileNav");
hamb?.addEventListener("click", () => {
  const isOpen = mobileNav.hasAttribute("hidden") === false;
  if (isOpen) {
    mobileNav.setAttribute("hidden", "");
    hamb.setAttribute("aria-expanded", "false");
  } else {
    mobileNav.removeAttribute("hidden");
    hamb.setAttribute("aria-expanded", "true");
  }
});
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.setAttribute("hidden", "");
    hamb.setAttribute("aria-expanded", "false");
  });
});

// Form handler (exemplo): mandar pro WhatsApp com texto pronto
function handleSubmit(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const msg =
`Olá! Quero um orçamento.
Nome: ${fd.get("nome") || "-"}
Empresa: ${fd.get("empresa") || "-"}
Email: ${fd.get("email") || "-"}
Telefone: ${fd.get("telefone") || "-"}
Serviço: ${fd.get("servico") || "-"}
Rota: ${fd.get("rota") || "-"}
Detalhes: ${fd.get("detalhes") || "-"}`;

  // Troque pelo número real com DDI do Brasil: 55 + DDD + número
  const whatsapp = "5599999999999";
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  return false;
}
window.handleSubmit = handleSubmit;