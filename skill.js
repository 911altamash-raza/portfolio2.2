// Optimized Particle Background
    (function() {
      const bgCanvas = document.getElementById("bgCanvas");
      const bgCtx = bgCanvas.getContext("2d");
      
      function initCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        
        const particleCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.1
          });
        }
        
        let animationId;
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;
        
        function animate(currentTime) {
          if (!lastTime || currentTime - lastTime >= interval) {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            
            for (let p of particles) {
              bgCtx.beginPath();
              bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              bgCtx.fillStyle = `rgba(0, 255, 204, ${p.alpha})`;
              bgCtx.fill();
              
              p.x += p.dx;
              p.y += p.dy;
              
              if (p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
              if (p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;
            }
            
            lastTime = currentTime;
          }
          
          animationId = requestAnimationFrame(animate);
        }
        
        animate(0);
        
        // Handle resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            cancelAnimationFrame(animationId);
            initCanvas();
          }, 200);
        });
      }
      
      // Initialize
      document.addEventListener('DOMContentLoaded', initCanvas);
    })();

    // Radar Chart Module
    (function() {
      document.addEventListener('DOMContentLoaded', () => {
        const radarCtx = document.getElementById('radarChart')?.getContext('2d');
        if (!radarCtx) return;
        
        const defaultData = [70, 60, 80, 50, 70];
        const skillLabels = ['Front-End', 'Back-End', 'Non-Coding Website', 'Graphic Designing', 'Video Editing'];
        const skillColors = ['#00f7ff', '#ff8c00', '#00ff8c', '#ff00ff', '#ff4b5c'];
        
        const chartData = {
          labels: skillLabels,
          datasets: [{
            label: 'My Skills',
            data: [...defaultData],
            backgroundColor: 'rgba(0, 255, 247, 0.1)',
            borderColor: '#00fff7',
            pointBackgroundColor: skillColors,
            pointBorderColor: '#0ff',
            pointHoverBorderColor: '#fff',
            pointRadius: 6,
            borderWidth: 2,
          }]
        };
        
        const chartConfig = {
          type: 'radar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                angleLines: { color: 'rgba(0, 255, 255, 0.3)' },
                grid: { color: 'rgba(0, 255, 255, 0.3)' },
                pointLabels: {
                  color: '#0ff',
                  font: { size: 14 }
                },
                ticks: {
                  color: '#0ff',
                  stepSize: 20,
                  backdropColor: 'transparent',
                  showLabelBackdrop: false
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}%`
                }
              }
            }
          }
        };
        
        const radarChart = new Chart(radarCtx, chartConfig);
      });
    })();

    // Skill Item Animation
    (function() {
      document.addEventListener('DOMContentLoaded', () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
          item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          item.style.width = '6rem';
          item.style.height = '6rem';
          item.style.backgroundColor = '#1e293b';
          item.style.borderRadius = '0.75rem';
          item.style.display = 'flex';
          item.style.alignItems = 'center';
          item.style.justifyContent = 'center';
          item.style.cursor = 'pointer';
          
          item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1)';
            item.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
          });
          
          item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
          });
          
          item.addEventListener('focus', () => {
            item.style.transform = 'scale(1.1)';
            item.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
            item.style.outline = 'none';
          });
          
          item.addEventListener('blur', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
          });
        });
      });
    })();