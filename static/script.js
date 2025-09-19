// particles (same as before)
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = 0; canvas.style.left = 0; canvas.style.zIndex = -1;
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener("resize", resizeCanvas);
let particles = [];
for(let i=0;i<100;i++){ particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, radius: Math.random()*2+1, dx:(Math.random()-0.5)*1, dy:(Math.random()-0.5)*1 }); }
function animateParticles(){ ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle="rgba(255,255,255,0.8)"; particles.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.radius,0,Math.PI*2); ctx.fill(); p.x+=p.dx; p.y+=p.dy; if(p.x<0||p.x>canvas.width) p.dx*=-1; if(p.y<0||p.y>canvas.height) p.dy*=-1; }); requestAnimationFrame(animateParticles); }
animateParticles();

// skills
document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector("#skills") || document.querySelector(".skills-grid");
  if (!skillsSection) {
    console.warn('Skills container not found. Add id="skills" or class="skills-grid"');
    return;
  }

  // debug - optional
  console.log('skillsSection:', skillsSection, 'fills:', skillsSection.querySelectorAll('.skill-bar-fill').length, 'percents:', skillsSection.querySelectorAll('.skill-percent').length);

  const fills = skillsSection.querySelectorAll(".skill-bar-fill");
  const percents = skillsSection.querySelectorAll(".skill-percent");

  function animateSkills() {
    fills.forEach(f => {
      const val = parseInt(f.getAttribute("data-fill")) || 0;
      f.style.width = val + "%";
    });

    percents.forEach(p => {
      const target = parseInt(p.getAttribute("data-percent")) || 0;
      let current = parseInt(p.textContent) || 0; // <- important
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) current = target;
        p.textContent = current + "%";
        if (current >= target) clearInterval(interval);
      }, 20);
    });
  }

  function isElementInViewport(el){
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom >= 0;
  }

  if (isElementInViewport(skillsSection)) {
    animateSkills();
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  } else {
    animateSkills(); // fallback
  }
});