
document.body.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {

   
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString(undefined, options);
    }

    const landingSection = document.getElementById('landingSection');
    const letterSection = document.getElementById('letterSection');
    const openLetterBtn = document.getElementById('openLetterBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');

    
    if (openLetterBtn && landingSection && letterSection) {
        openLetterBtn.addEventListener('click', (event) => {
          
            createBurstEffect(event.clientX, event.clientY, 16);

            
            landingSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            landingSection.style.opacity = '0';
            landingSection.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                
                landingSection.style.display = 'none';
                letterSection.classList.remove('hidden-initially');


                const rect = letterSection.getBoundingClientRect();
                createBurstEffect(window.innerWidth / 2, Math.max(100, rect.top + 80), 12);

            
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        });
    }

   
    if (surpriseBtn && surpriseMessage) {
        surpriseBtn.addEventListener('click', (event) => {
            
            createBurstEffect(event.clientX, event.clientY, 20);

            
            surpriseMessage.classList.remove('hidden-surprise');

            surpriseBtn.querySelector('span').textContent = 'always & forever ♡';
            surpriseBtn.style.pointerEvents = 'none'; 
            surpriseBtn.style.opacity = '0.9';

         
            setTimeout(() => {
                surpriseMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 150);
        });
    }

    function createBurstEffect(x, y, count = 15) {
        const symbols = ['♡', '♥', '✨', '🌸', '💖'];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.className = 'burst-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
            const distance = 40 + Math.random() * 80;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 20; 
            const rot = (Math.random() - 0.5) * 60;
            const size = 14 + Math.random() * 12;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.fontSize = `${size}px`;
            particle.style.color = Math.random() > 0.4 ? '#e76f8b' : '#f7a2b5';
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            particle.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(particle);

            
            setTimeout(() => {
                particle.remove();
            }, 900);
        }
    }

    
    const canvas = document.getElementById('heartCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        
        const hearts = [];
        const maxHearts = Math.min(25, Math.floor(window.innerWidth / 40)); 

        class FloatingHeart {
            constructor() {
                this.reset(true);
            }

            reset(init = false) {
                this.x = Math.random() * width;
                this.y = init ? Math.random() * height : height + 20;
                this.size = 10 + Math.random() * 14;
                this.speedY = 0.4 + Math.random() * 0.7; // slow gentle rise
                this.speedX = 0;
                this.sway = Math.random() * 2 * Math.PI;
                this.swaySpeed = 0.02 + Math.random() * 0.02;
                this.opacity = 0.2 + Math.random() * 0.35;
               
                this.color = Math.random() > 0.5 ? '231, 111, 139' : '247, 162, 181';
            }

            update() {
                this.y -= this.speedY;
                this.sway += this.swaySpeed;
                this.x += Math.sin(this.sway) * 0.5;

                
                if (this.y < -30) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();

                
                const s = this.size / 15;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 18 * s);
                ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < maxHearts; i++) {
            hearts.push(new FloatingHeart());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < hearts.length; i++) {
                hearts[i].update();
                hearts[i].draw();
            }
            requestAnimationFrame(animate);
        }

        animate();
    }

});
