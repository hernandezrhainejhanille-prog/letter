
document.body.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {

  
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString(undefined, options);
    }

    
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('waxSeal');
    const envelopeLetterSlip = document.getElementById('envelopeLetterSlip');
    const letterSection = document.getElementById('letterSection');
    const clickHint = document.getElementById('clickHint');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');

    let isOpening = false;
    let isOpen = false;

 
    function handleOpenEnvelope(event) {
        if (isOpening || isOpen) return;
        isOpening = true;

    
        const sealRect = waxSeal ? waxSeal.getBoundingClientRect() : envelope.getBoundingClientRect();
        const burstX = sealRect.left + sealRect.width / 2;
        const burstY = sealRect.top + sealRect.height / 2;

      
        createBurstEffect(burstX, burstY, 14, ['♥', '♡', '✨', '🌸']);


        envelope.classList.add('is-opening');

        
        setTimeout(() => {
            
            createBurstEffect(burstX, burstY - 80, 10, ['✨', '♡', '❀']);
        }, 450);

       
        setTimeout(() => {
            envelope.classList.remove('is-opening');
            envelope.classList.add('is-open');

            if (letterSection) {
                letterSection.classList.remove('hidden-initially');

                setTimeout(() => {
                    letterSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 120);
            }

            if (clickHint) {
                clickHint.style.display = 'none';
            }

            isOpen = true;
            isOpening = false;
        }, 900);
    }

   
    if (envelope) {
        envelope.addEventListener('click', handleOpenEnvelope);

     
        envelope.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEnvelope(e);
            }
        });
    }

    
    if (surpriseBtn && surpriseMessage) {
        surpriseBtn.addEventListener('click', (event) => {
         
            const rect = surpriseBtn.getBoundingClientRect();
            createBurstEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, 18, ['♡', '♥', '✨', '💖']);

          
            surpriseMessage.classList.remove('hidden-surprise');

           
            const btnSpan = surpriseBtn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = 'always & forever ♡';
            }
            surpriseBtn.style.pointerEvents = 'none';

            
            setTimeout(() => {
                surpriseMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 150);
        });
    }

    

    function createBurstEffect(x, y, count = 12, symbols = ['♡', '♥', '✨', '🌸', '💖']) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.className = 'burst-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const distance = 35 + Math.random() * 65;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 25;
            const rot = (Math.random() - 0.5) * 50;
            const size = 13 + Math.random() * 10;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.fontSize = `${size}px`;
            particle.style.color = Math.random() > 0.4 ? '#c9354d' : '#e67389';
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            particle.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(particle);

            
            setTimeout(() => {
                particle.remove();
            }, 950);
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
        const maxHearts = Math.min(20, Math.floor(window.innerWidth / 45)); 

        class AmbientParticle {
            constructor() {
                this.reset(true);
            }

            reset(init = false) {
                this.x = Math.random() * width;
                this.y = init ? Math.random() * height : height + 25;
                this.size = 8 + Math.random() * 11;
                this.speedY = 0.25 + Math.random() * 0.45; 
                this.sway = Math.random() * 2 * Math.PI;
                this.swaySpeed = 0.015 + Math.random() * 0.015;
                this.opacity = 0.12 + Math.random() * 0.22;
                this.color = Math.random() > 0.5 ? '216, 110, 130' : '230, 150, 165';
            }

            update() {
                this.y -= this.speedY;
                this.sway += this.swaySpeed;
                this.x += Math.sin(this.sway) * 0.4;

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
            hearts.push(new AmbientParticle());
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