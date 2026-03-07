// Intersection Observer for scroll animations if needed later
document.addEventListener('DOMContentLoaded', () => {
    // Basic setup, more to come if we need complex interactions
    console.log("Ready.");
});

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Hero Background
    const hero = document.querySelector('.hero');
    const heroRays = document.querySelector('.hero-rays');

    if (hero && heroRays) {
        hero.addEventListener('mousemove', (e) => {
            // Get coordinates relative to the hero section
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Update CSS variables
            heroRays.style.setProperty('--mouse-x', `${x}%`);
            heroRays.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // 1.5 Bento Grid Premium Spotlight Effect
    document.querySelectorAll('.bento-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 2. Real Extension UI Mock Logic ---
    const minimapTrack = document.querySelector('.minimap-track');
    const hoverPreview = document.querySelector('.hover-preview');
    const previewHeader = document.querySelector('.preview-header');
    const previewRole = document.querySelector('.preview-role');
    const previewBody = document.querySelector('.preview-body');
    const chatgptMessagesContainer = document.querySelector('.chatgpt-messages');
    
    // The exact mock logic requested by the user
    // A longer array to make the scrollbar look realistic
    const mockMessages = [
        { type: 'user', text: "Explain the concept of a Dyson Sphere simply." },
        { type: 'ai', text: "A Dyson Sphere is a hypothetical megastructure that completely encompasses a star to capture a large percentage of its solar power output. It was first described by physicist Freeman Dyson in 1960 as a way for advanced civilizations to meet their growing energy needs." },
        { type: 'user', text: "Could we build one around our Sun?" },
        { type: 'ai', text: "Building a full Dyson Sphere around our Sun is currently impossible. We don't have the materials or the technology. The sheer amount of matter required would mean dismantling several planets in our solar system just to get enough raw material." },
        { type: 'user', text: "Well, what about a Dyson Swarm instead?" },
        { type: 'ai', text: "A Dyson Swarm is much more feasible. Instead of a solid shell, it consists of millions of independent solar collectors orbiting the star in a dense formation. This approach doesn't require impossibly strong materials and can be built gradually over time." },
        { type: 'user', text: "How would we even transmit the energy back to Earth?" },
        { type: 'ai', text: "The most likely method would be wireless power transmission. The collectors could beam the gathered solar energy back to receiving stations on Earth or other colonies using high-frequency microwaves or concentrated lasers." },
        { type: 'user', text: "What happens if a laser misses the receiver?" },
        { type: 'ai', text: "Safety is a major engineering challenge. If a high-powered energy beam missed its target, it could potentially cause severe thermal damage to the surrounding environment or atmosphere. Advanced targeting and fail-safe cutoff systems would be absolutely critical." },
        { type: 'user', text: "Are there any stars that look like they might have alien Dyson structures?" },
        { type: 'ai', text: "The most famous example is Tabby's Star (KIC 8462852). It experienced sudden, massive dips in brightness—up to 22%—that couldn't easily be explained by planets. While some speculated it could be an alien megastructure, recent data suggests the dimming is more likely caused by clouds of uneven dust." },
        { type: 'user', text: "That's slightly disappointing. What's the Kardashev scale?" },
        { type: 'ai', text: "The Kardashev scale is a method of measuring a civilization's level of technological advancement based on the amount of energy it is able to use. It categorizes civilizations into three base types: Type I (planetary), Type II (stellar), and Type III (galactic)." },
        { type: 'user', text: "Where does humanity rank on that scale right now?" },
        { type: 'ai', text: "Humanity is currently a Type 0 civilization. We have not yet harnessed all the energy of our planet. According to astronomer Carl Sagan's extrapolation, we are roughly at a Type 0.73 civilization as of the early 21st century." },
        { type: 'user', text: "How long until we reach Type I?" },
        { type: 'ai', text: "Estimates vary widely, but physicist Michio Kaku suggests humanity could reach Type I status within the next 100 to 200 years, assuming our energy consumption continues to grow at its current rate and we avoid catastrophic societal collapse." }
    ];

    if (minimapTrack && hoverPreview) {
        // Clear hardcoded mock lines (keep arrows)
        const arrows = minimapTrack.querySelectorAll('.minimap-arrow');
        minimapTrack.innerHTML = '';
        if(arrows[0]) minimapTrack.appendChild(arrows[0]);

        let hideTimeout;

        // Render the array of lines
        mockMessages.forEach((msg, index) => {
            const line = document.createElement('div');
            line.className = `minimap-line ${msg.type}-line`;
            
            const num = document.createElement('span');
            num.className = 'minimap-line-number';
            num.textContent = index + 1;
            line.appendChild(num);

            // Step 2: Hover Logic
            line.addEventListener('mouseenter', (e) => {
                clearTimeout(hideTimeout);
                
                // Get precise Y coordinate based on real extension math
                const rect = line.getBoundingClientRect();
                const heroRect = document.querySelector('.chatgpt-mockup').getBoundingClientRect();
                
                // Absolute top point to the exact middle of the dot
                // The CSS 'transform: translateY(-50%)' handles the visual centering
                const topPosition = (rect.top - heroRect.top) + (rect.height / 2);
                
                // Apply perfectly centered math
                hoverPreview.style.top = `${topPosition}px`;
                
                // Populate popup data
                previewRole.textContent = msg.type === 'ai' ? 'AI' : 'You';
                previewHeader.className = `preview-header ${msg.type}`;
                previewBody.textContent = msg.text;
                
                // Show popup
                hoverPreview.style.opacity = '1';
                hoverPreview.style.pointerEvents = 'auto';
            });

            line.addEventListener('mouseleave', () => {
                // 250ms timeout requested by user
                hideTimeout = setTimeout(() => {
                    hoverPreview.style.opacity = '0';
                    hoverPreview.style.pointerEvents = 'none';
                }, 250);
            });

            // Step 3: Click-to-Scroll & Highlight Logic
            line.addEventListener('click', () => {
                // remove active from all minimap lines
                minimapTrack.querySelectorAll('.minimap-line').forEach(l => l.classList.remove('active'));
                line.classList.add('active');

                // Scroll INSIDE the chatgpt mockup
                const targetElement = document.getElementById(`msg-${index}`);
                if (targetElement) {
                    
                    // Native smooth scroll ONLY within the internal container
                    // This prevents the main browser window from scrolling
                    const containerRect = chatgptMessagesContainer.getBoundingClientRect();
                    const targetRect = targetElement.getBoundingClientRect();
                    
                    // Calculate exact scroll position minus a little padding
                    const scrollTopTarget = chatgptMessagesContainer.scrollTop + (targetRect.top - containerRect.top) - 24; 
                    
                    chatgptMessagesContainer.scrollTo({
                        top: scrollTopTarget,
                        behavior: 'smooth'
                    });
                    
                    // Exact logic from real extension: 
                    // Wait 400ms for scroll, add class, remove class 2200ms later
                    setTimeout(() => {
                        // First remove from any previous lines just in case
                        document.querySelectorAll('.navigator-landing').forEach(el => {
                            el.classList.remove('navigator-landing');
                        });
                        
                        // Add to current target
                        targetElement.classList.add('navigator-landing');
                        
                        // Remove exactly 2200ms later
                        setTimeout(() => {
                            targetElement.classList.remove('navigator-landing');
                        }, 2200);
                        
                    }, 400);
                }
            });

            minimapTrack.appendChild(line);
        });

        // Add bottom arrow back
        if(arrows[1]) minimapTrack.appendChild(arrows[1]);

        // Keep popup open when hovering the popup itself
        hoverPreview.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
        hoverPreview.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                hoverPreview.style.opacity = '0';
                hoverPreview.style.pointerEvents = 'none';
            }, 250);
        });

        // Default layout: Scroll chat window to the very bottom to show the latest messages
        const scrollToBottom = () => {
            chatgptMessagesContainer.scrollTop = chatgptMessagesContainer.scrollHeight + 1000;
            
            // Highlight the final minimap line as active automatically
            const allRenderedLines = minimapTrack.querySelectorAll('.minimap-line');
            if (allRenderedLines.length > 0) {
                allRenderedLines.forEach(l => l.classList.remove('active'));
                allRenderedLines[allRenderedLines.length - 1].classList.add('active');
            }
        };
        
        scrollToBottom(); // Try immediately
        window.addEventListener('load', scrollToBottom); // Try when all assets loaded
        setTimeout(scrollToBottom, 500); // Fallback to ensure it worked
    }

});

// -----------------------------------------------
// Compass UI Interaction
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const nodes       = document.querySelectorAll('.compass-node');
    const panel       = document.getElementById('compassPanel');
    const panelTitle  = document.getElementById('compassPanelTitle');
    const panelText   = document.getElementById('compassPanelText');
    const panelIcon   = document.getElementById('compassPanelIconEl');
    const compassCenter = document.querySelector('.compass-center-ring');
    const compassLines  = document.querySelectorAll('.compass-line');

    if (!nodes.length) return;

    // Show default (first node) immediately
    setTimeout(() => {
        activateNode(nodes[0]);
    }, 1500);

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => activateNode(node));
        node.addEventListener('mouseleave', () => {
            // Keep the last active visually but don't clear panel
        });
    });

    function activateNode(node) {
        const idx   = parseInt(node.dataset.index);
        const title = node.dataset.title;
        const desc  = node.dataset.desc;
        const icon  = node.dataset.icon;

        // Update active class on nodes
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        // Update SVG lines
        compassLines.forEach((line, i) => {
            if (i === idx) {
                line.classList.add('active-line');
            } else {
                line.classList.remove('active-line');
            }
        });

        // Update panel
        if (panel) {
            panel.classList.add('visible');
            panelTitle.textContent  = title;
            panelText.textContent   = desc;

            // Re-create Lucide icon
            panelIcon.setAttribute('data-lucide', icon);
            if (window.lucide) lucide.createIcons({ nodes: [panelIcon.parentElement] });
        }

        // Subtle center glow boost
        if (compassCenter) {
            compassCenter.style.boxShadow = `0 0 60px rgba(255,255,255,0.18), 0 0 120px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.25)`;
            clearTimeout(compassCenter._resetTimer);
            compassCenter._resetTimer = setTimeout(() => {
                compassCenter.style.boxShadow = '';
            }, 1000);
        }
    }

    // Dark card spotlight effect
    document.querySelectorAll('.dark-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});

// -----------------------------------------------
// Network Graph Interaction
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const netNodes = document.querySelectorAll('.net-node');
    const netHub   = document.querySelector('#netHub');
    const lines    = {
        lineGPT:    document.querySelector('#lineGPT'),
        lineGemini: document.querySelector('#lineGemini'),
        lineClaude: document.querySelector('#lineClaude'),
    };

    if (!netNodes.length) return;

    netNodes.forEach(node => {
        const lineId = node.dataset.line;

        node.addEventListener('mouseenter', () => {
            // Highlight only the corresponding line
            Object.values(lines).forEach(l => l && l.classList.remove('active'));
            if (lines[lineId]) lines[lineId].classList.add('active');
        });

        node.addEventListener('mouseleave', () => {
            Object.values(lines).forEach(l => l && l.classList.remove('active'));
        });
    });

    // Hovering the hub highlights all lines
    if (netHub) {
        netHub.addEventListener('mouseenter', () => {
            Object.values(lines).forEach(l => l && l.classList.add('active'));
        });
        netHub.addEventListener('mouseleave', () => {
            Object.values(lines).forEach(l => l && l.classList.remove('active'));
        });
    }

});
