// Elite Basketball Varsity Website - Interactive DOM Manipulation
document.addEventListener('DOMContentLoaded', function() {
    // ===== LOADING SCREEN ANIMATION =====
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // ===== COUNTER ANIMATIONS FOR STATS =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Animate stats when page loads
    setTimeout(() => {
        animateCounter(document.getElementById('gamesPlayed'), 127);
        
        const avgPoints = document.getElementById('averagePoints');
        let points = 0;
        const pointsTimer = setInterval(() => {
            points += 0.2;
            if (points >= 24.8) {
                avgPoints.textContent = '24.8';
                clearInterval(pointsTimer);
            } else {
                avgPoints.textContent = points.toFixed(1);
            }
        }, 50);
        
        animateCounter(document.getElementById('championships'), 3);
        
        const winRate = document.getElementById('teamWins');
        let rate = 0;
        const rateTimer = setInterval(() => {
            rate += 1;
            if (rate >= 89) {
                winRate.textContent = '89%';
                clearInterval(rateTimer);
            } else {
                winRate.textContent = rate + '%';
            }
        }, 25);
    }, 2000);
    
    // ===== DOM ELEMENTS =====
    const mainText = document.getElementById('main-text');
    const changeTextBtn = document.getElementById('change-text-btn');
    const addDrillBtn = document.getElementById('add-drill-btn');
    const drillsList = document.getElementById('drills-list');
    const removeItemBtn = document.getElementById('remove-item-btn');

    // Initialize counters
    let currentTextIndex = 0;
    let currentDrillIndex = 0;
    let isAnimating = false;
    let currentStoryIndex = 0;

    // Story texts array
    const storyTexts = [
        "Basketball isn't just a sport for me—it's the foundation of who I am. As a varsity elite player, every dribble echoes with purpose, every shot carries the weight of dedication, and every defensive stance tells the story of countless hours perfecting my craft. The hardwood court has been my classroom, my sanctuary, and my stage for greatness. From dawn practices that test your limits to game-winning shots under pressure, basketball has forged my character, taught me resilience, and shown me that champions are made in the moments when nobody's watching.",
        
        "The roar of the crowd, the squeak of sneakers on polished hardwood, the satisfying swish of a perfect three-pointer—these are the symphonies that fuel my soul. As team captain, I've learned that leadership isn't just about scoring points; it's about elevating every player around you, making split-second decisions that can change the course of a game, and carrying the hopes of an entire school on your shoulders. Every victory is shared, every defeat is a lesson, and every practice is a step closer to championship glory.",
        
        "Varsity basketball has transformed me from a dreamer into a champion. The 5 AM workouts, the film sessions dissecting every play, the weight room sessions building strength both physical and mental—every element has contributed to my evolution. When the final buzzer sounds and the scoreboard reads victory, it's not just a win for the team; it's validation of every sacrifice made, every hour invested, and every moment I chose greatness over comfort. This is what it means to be varsity elite.",
        
        "Champions aren't born on game day—they're forged in the crucible of daily preparation. My journey as a varsity player has taught me that excellence is not an accident; it's a habit. From perfecting my shooting form in empty gyms to studying opponent film until my eyes burn, from pushing through injuries to leading by example when the team needs motivation—every action has been intentional, every moment has been earned. The championship rings are just symbols; the real victory is the person basketball has helped me become."
    ];

    // Elite drills array
    const eliteDrills = [
        {
            title: "Pro-Level Ball Handling",
            description: "Master advanced dribbling sequences and combinations",
            difficulty: "Advanced",
            duration: "45 mins"
        },
        {
            title: "Shooting Range Extension",
            description: "Progressive shooting drills from multiple spots",
            difficulty: "Intermediate",
            duration: "60 mins"
        },
        {
            title: "Defensive Footwork",
            description: "Elite lateral movement and stance drills",
            difficulty: "Advanced",
            duration: "30 mins"
        },
        {
            title: "Speed and Agility",
            description: "Quick burst and direction change training",
            difficulty: "Expert",
            duration: "40 mins"
        },
        {
            title: "Game Situation Practice",
            description: "Real-time pressure and decision making drills",
            difficulty: "Elite",
            duration: "90 mins"
        }
    ];

    // Story Transform Button
    changeTextBtn.addEventListener('click', () => {
        currentTextIndex = (currentTextIndex + 1) % storyTexts.length;
        mainText.style.opacity = '0';
        
        setTimeout(() => {
            mainText.textContent = storyTexts[currentTextIndex];
            mainText.style.opacity = '1';
        }, 300);
    });

    // Add Elite Drill Button
    addDrillBtn.addEventListener('click', () => {
        if (currentDrillIndex < eliteDrills.length) {
            const drill = eliteDrills[currentDrillIndex];
            const li = document.createElement('li');
            li.className = 'drill-item';
            li.innerHTML = `
                <h3>${drill.title}</h3>
                <p>${drill.description}</p>
                <div>
                    <span>${drill.difficulty}</span>
                    <span>${drill.duration}</span>
                </div>
            `;
            
            drillsList.appendChild(li);
            currentDrillIndex++;
        }
    });

    // Remove Last Drill Button
    removeItemBtn.addEventListener('click', () => {
        const lastDrill = drillsList.lastElementChild;
        if (lastDrill) {
            drillsList.removeChild(lastDrill);
            if (currentDrillIndex > 0) {
                currentDrillIndex--;
            }
        }
    });

    // NOTE: removed the cloneNode(...) replacement that was wiping out event listeners
    // (cloning and replacing the buttons removed the listeners attached above)

    // ===== ENHANCED INTERACTIVITY FUNCTIONS =====
    
    // Confetti effect for completion
    function createConfetti() {
        const colors = ['#ff6b35', '#ff8500', '#f7931e', '#ffa500'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                z-index: 10000;
                border-radius: 50%;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Add confetti animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(${window.innerHeight + 50}px) rotate(720deg); opacity: 0; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Sound effect simulation
    function playDrillAddSound() {
        // Create audio context for sound simulation
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } catch (e) {
                console.log('Audio not available');
            }
        }
    }
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) return; // Don't interfere with browser shortcuts
        
        switch(event.key.toLowerCase()) {
            case 'c':
                if (!changeTextBtn.disabled) changeTextBtn.click();
                break;
            case 'a':
                if (!addDrillBtn.disabled) addDrillBtn.click();
                break;
            case 'r':
                removeItemBtn.click();
                break;
        }
    });
    
    // ===== DYNAMIC HOVER EFFECTS =====
    function addDynamicEffects() {
        // Enhanced drill item interactions
        const drillItems = drillsList.querySelectorAll('.drill-item');
        drillItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) translateY(-8px) scale(1.02)';
                this.style.zIndex = '10';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 5px;
                    height: 5px;
                    background: rgba(255, 107, 53, 0.6);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 0.6s ease-out forwards;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        });
    }
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% { width: 5px; height: 5px; opacity: 1; }
            100% { width: 50px; height: 50px; opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Initialize dynamic effects
    addDynamicEffects();
    
    // Refresh dynamic effects when new items are added
    const listObserver = new MutationObserver(addDynamicEffects);
    listObserver.observe(drillsList, { childList: true });
    
    // ===== SCROLL-BASED ANIMATIONS =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-basketball');
        
        parallax.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Enhanced Scroll Animations
    const scrollElements = document.querySelectorAll('.glass-card, .drill-item, .stat-card, .section-title, .button-grid');

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset));
    };

    const displayScrollElement = (element) => {
        element.classList.add('scroll-animate');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scroll-animate');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 0.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Interactive Parallax Effect
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.glass-card');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (mouseY - cardY) / 30;
            const angleY = (mouseX - cardX) / -30;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // Reset card transform on mouse leave
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Add magnetic button effect
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.transform = `translate(${x/10}px, ${y/10}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // ===== PERFORMANCE MONITORING =====
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Log performance for debugging
            if (fps < 30) {
                console.warn('Performance warning: FPS below 30:', fps);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    monitorPerformance();
    
    // ===== INITIALIZATION COMPLETE =====
    console.log('🏀 ELITE BASKETBALL WEBSITE LOADED! 🏀');
    console.log('Keyboard shortcuts: C = Change story, A = Add drill, R = Remove drill');
    console.log('All interactive features are now active!');
    
    // Add welcome message
    setTimeout(() => {
        if (window.innerWidth > 768) {
            console.log('%c🏆 CHAMPIONSHIP MODE ACTIVATED! 🏆', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
        }
    }, 3000);
});