// Global variables
let currentLatitude = 0;
let currentLongitude = 0;
let compareMode = false;
let comparisonDots = [];
let dotCounter = 0;
let activeTab = 'explore-tab';

// DOM elements
const latitudeSlider = document.getElementById('latitude-slider');
const longitudeSlider = document.getElementById('longitude-slider');
const latValue = document.getElementById('lat-value');
const lngValue = document.getElementById('lng-value');
const latDirection = document.getElementById('lat-direction');
const lngDirection = document.getElementById('lng-direction');
const crosshair = document.getElementById('crosshair');
const placeCompareDotBtn = document.getElementById('place-compare-dot-btn');
const clearCompareDotsBtn = document.getElementById('clear-compare-dots-btn');
const feedbackDiv = document.getElementById('location-feedback');
const displayCoords = document.getElementById('display-coords');
const dotsContainer = document.getElementById('dots-container');
const comparisonPanel = document.getElementById('comparison-panel');
const challengeButtons = document.querySelectorAll('.challenge-btn');
const srAnnouncements = document.getElementById('sr-announcements');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

// Screen reader announcement helper
function announceToScreenReader(message, priority = 'polite') {
    srAnnouncements.setAttribute('aria-live', priority);
    srAnnouncements.textContent = message;
    // Clear after announcement
    setTimeout(() => {
        srAnnouncements.textContent = '';
    }, 1000);
}

// Initialize the application
function init() {
    setupEventListeners();
    setupTabNavigation();
    updatePosition();
    updateFeedback();
}

// Event listeners
function setupEventListeners() {
    latitudeSlider.addEventListener('input', handleLatitudeChange);
    longitudeSlider.addEventListener('input', handleLongitudeChange);

    // Compare tab button listeners
    if (placeCompareDotBtn) {
        placeCompareDotBtn.addEventListener('click', placeDot);
    }
    if (clearCompareDotsBtn) {
        clearCompareDotsBtn.addEventListener('click', clearComparisonDots);
    }    // Keyboard support for sliders
    latitudeSlider.addEventListener('keydown', handleSliderKeydown);
    longitudeSlider.addEventListener('keydown', handleSliderKeydown);

    // Window resize listener for responsive coordinate calculations
    window.addEventListener('resize', () => {
        updatePosition();
        // Update all existing dots
        comparisonDots.forEach(dotData => {
            const worldMap = document.getElementById('world-map');
            const mapWidth = worldMap.offsetWidth;
            const mapHeight = worldMap.offsetHeight;

            const x = ((dotData.lng + 180) / 360) * (mapWidth - 20) + 10;
            const y = ((90 - dotData.lat) / 180) * (mapHeight - 20) + 10;

            dotData.element.style.left = x + 'px';
            dotData.element.style.top = y + 'px';
        });
    });

    // Challenge button listeners
    challengeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lat = parseFloat(e.target.dataset.lat);
            const lng = parseFloat(e.target.dataset.lng);
            animateToCoordinates(lat, lng);
        });
    });
}

// Tab Navigation Setup
function setupTabNavigation() {
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = e.target.getAttribute('aria-controls');
            switchTab(targetTab);
        });

        // Keyboard navigation for tabs
        button.addEventListener('keydown', (e) => {
            const currentIndex = Array.from(tabButtons).indexOf(e.target);
            let nextIndex;

            switch (e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = (currentIndex + 1) % tabButtons.length;
                    tabButtons[nextIndex].focus();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = currentIndex === 0 ? tabButtons.length - 1 : currentIndex - 1;
                    tabButtons[nextIndex].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    e.target.click();
                    break;
            }
        });
    });
}

// Switch between tabs
function switchTab(targetTabId) {
    // Update active tab tracking
    activeTab = targetTabId;

    // Update button states
    tabButtons.forEach(button => {
        const isActive = button.getAttribute('aria-controls') === targetTabId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive.toString());
    });

    // Update panel visibility
    tabPanels.forEach(panel => {
        const isActive = panel.id === targetTabId;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', (!isActive).toString());
    });

    // Announce tab change to screen readers
    const activeButton = document.querySelector(`[aria-controls="${targetTabId}"]`);
    announceToScreenReader(`Switched to ${activeButton.textContent} tab`);

    // Handle tab-specific functionality
    handleTabSwitch(targetTabId);
}

// Handle tab-specific behavior
function handleTabSwitch(tabId) {
    switch (tabId) {
        case 'compare-tab':
            // Auto-enable compare mode when entering Compare tab
            enableCompareMode();
            break;
        case 'explore-tab':
        case 'challenges-tab':
        case 'reference-tab':
            // Auto-disable compare mode when leaving Compare tab
            if (compareMode) {
                disableCompareMode();
            }
            break;
    }

    // Handle other tab-specific functionality
    if (tabId === 'challenges-tab') {
        // Focus on first challenge button for better UX
        setTimeout(() => {
            const firstChallenge = document.querySelector('.challenge-btn');
            if (firstChallenge) firstChallenge.focus();
        }, 100);
    }
}

// Update comparison panel visibility based on compare mode
function updateComparisonPanelVisibility() {
    if (activeTab === 'compare-tab') {
        comparisonPanel.style.display = compareMode ? 'block' : 'none';
        comparisonPanel.setAttribute('aria-hidden', (!compareMode).toString());
    }
}

// Enhanced keyboard navigation for sliders
function handleSliderKeydown(e) {
    const slider = e.target;
    const currentValue = parseFloat(slider.value);
    const step = parseFloat(slider.step);
    let newValue = currentValue;

    switch (e.key) {
        case 'PageUp':
            e.preventDefault();
            newValue = Math.min(parseFloat(slider.max), currentValue + (step * 10));
            break;
        case 'PageDown':
            e.preventDefault();
            newValue = Math.max(parseFloat(slider.min), currentValue - (step * 10));
            break;
        case 'Home':
            e.preventDefault();
            newValue = parseFloat(slider.min);
            break;
        case 'End':
            e.preventDefault();
            newValue = parseFloat(slider.max);
            break;
    }

    if (newValue !== currentValue) {
        slider.value = newValue;
        slider.dispatchEvent(new Event('input'));
    }
}

// Slider change handlers
function handleLatitudeChange(e) {
    currentLatitude = parseFloat(e.target.value);
    updateLatitudeDisplay();
    updatePosition();
    updateFeedback();
}

function handleLongitudeChange(e) {
    currentLongitude = parseFloat(e.target.value);
    updateLongitudeDisplay();
    updatePosition();
    updateFeedback();
}

// Update latitude display and direction
function updateLatitudeDisplay() {
    latValue.textContent = Math.abs(currentLatitude).toFixed(1) + '°';

    let directionText;
    if (currentLatitude > 0) {
        latDirection.textContent = 'North';
        latDirection.style.color = '#007bff';
        directionText = 'North';
    } else if (currentLatitude < 0) {
        latDirection.textContent = 'South';
        latDirection.style.color = '#28a745';
        directionText = 'South';
    } else {
        latDirection.textContent = 'Equator';
        latDirection.style.color = '#dc3545';
        directionText = 'Equator';
    }

    // Update ARIA attributes for screen readers
    const ariaText = `${Math.abs(currentLatitude).toFixed(1)} degrees ${directionText}`;
    latitudeSlider.setAttribute('aria-valuenow', currentLatitude);
    latitudeSlider.setAttribute('aria-valuetext', ariaText);
}

// Update longitude display and direction
function updateLongitudeDisplay() {
    lngValue.textContent = Math.abs(currentLongitude).toFixed(1) + '°';

    let directionText;
    if (currentLongitude > 0) {
        lngDirection.textContent = 'East';
        lngDirection.style.color = '#fd7e14';
        directionText = 'East';
    } else if (currentLongitude < 0) {
        lngDirection.textContent = 'West';
        lngDirection.style.color = '#6f42c1';
        directionText = 'West';
    } else {
        lngDirection.textContent = 'Prime Meridian';
        lngDirection.style.color = '#dc3545';
        directionText = 'Prime Meridian';
    }

    // Update ARIA attributes for screen readers
    const ariaText = `${Math.abs(currentLongitude).toFixed(1)} degrees ${directionText}`;
    longitudeSlider.setAttribute('aria-valuenow', currentLongitude);
    longitudeSlider.setAttribute('aria-valuetext', ariaText);
}

// Update crosshair position on map
function updatePosition() {
    // Get actual map dimensions for responsive calculation
    const worldMap = document.getElementById('world-map');
    const mapWidth = worldMap.offsetWidth;
    const mapHeight = worldMap.offsetHeight;

    // Convert lat/lng to pixel coordinates with 10px margin for crosshair centering
    // Latitude: -90 to 90 maps to (mapHeight-10) to 10 pixels (inverted)
    // Longitude: -180 to 180 maps to 10 to (mapWidth-10) pixels

    const x = ((currentLongitude + 180) / 360) * (mapWidth - 20) + 10;
    const y = ((90 - currentLatitude) / 180) * (mapHeight - 20) + 10;

    crosshair.style.left = x + 'px';
    crosshair.style.top = y + 'px';

    // Update coordinate display
    const latStr = currentLatitude >= 0 ?
        `${currentLatitude.toFixed(1)}°N` :
        `${Math.abs(currentLatitude).toFixed(1)}°S`;
    const lngStr = currentLongitude >= 0 ?
        `${currentLongitude.toFixed(1)}°E` :
        `${Math.abs(currentLongitude).toFixed(1)}°W`;

    displayCoords.textContent = `${latStr}, ${lngStr}`;
}

// Update feedback based on current position
function updateFeedback() {
    let feedback = `Current coordinates: ${displayCoords.textContent}<br><br>`;

    // Add geographical context
    if (Math.abs(currentLatitude) < 5 && Math.abs(currentLongitude) < 5) {
        feedback += "🎯 You're very close to where the Equator and Prime Meridian intersect! This is in the Gulf of Guinea, off the coast of West Africa.";
    } else if (Math.abs(currentLatitude) < 5) {
        feedback += "🌍 You're near the <strong>Equator</strong> - the imaginary line that divides Earth into Northern and Southern hemispheres.";
    } else if (Math.abs(currentLongitude) < 5) {
        feedback += "🌍 You're near the <strong>Prime Meridian</strong> - the line that divides Earth into Eastern and Western hemispheres.";
    } else if (currentLatitude > 66.5) {
        feedback += "🏔️ You're in the <strong>Arctic Circle</strong> - very far north where it can be daylight for 24 hours in summer!";
    } else if (currentLatitude < -66.5) {
        feedback += "🐧 You're in the <strong>Antarctic Circle</strong> - very far south near Antarctica!";
    } else if (currentLatitude > 23.5 && currentLatitude < 66.5) {
        feedback += "🌡️ You're in the <strong>Northern Temperate Zone</strong> - where most of North America, Europe, and northern Asia are located.";
    } else if (currentLatitude < -23.5 && currentLatitude > -66.5) {
        feedback += "🌡️ You're in the <strong>Southern Temperate Zone</strong> - where southern South America, southern Africa, and Australia are located.";
    } else if (Math.abs(currentLatitude) <= 23.5) {
        feedback += "☀️ You're in the <strong>Tropical Zone</strong> - where it's warm year-round and you might find rainforests!";
    }

    // Add hemisphere information
    feedback += "<br><br><strong>Hemisphere Information:</strong><br>";
    feedback += `• You're in the <strong>${currentLatitude >= 0 ? 'Northern' : 'Southern'} Hemisphere</strong> (latitude)<br>`;
    feedback += `• You're in the <strong>${currentLongitude >= 0 ? 'Eastern' : 'Western'} Hemisphere</strong> (longitude)`;

    feedbackDiv.innerHTML = feedback;
}

// Place a dot at current coordinates
function placeDot() {
    const dot = document.createElement('div');
    dot.className = 'dot';

    // Add ARIA attributes for accessibility
    dot.setAttribute('role', 'listitem');
    const latStr = currentLatitude >= 0 ?
        `${currentLatitude.toFixed(1)}°N` :
        `${Math.abs(currentLatitude).toFixed(1)}°S`;
    const lngStr = currentLongitude >= 0 ?
        `${currentLongitude.toFixed(1)}°E` :
        `${Math.abs(currentLongitude).toFixed(1)}°W`;
    dot.setAttribute('aria-label', `Location marker at ${latStr}, ${lngStr}`);

    if (compareMode) {
        if (comparisonDots.length === 0) {
            dot.classList.add('compare-1');
            dot.setAttribute('aria-label', `Comparison Location 1 at ${latStr}, ${lngStr}`);
            comparisonDots.push({
                element: dot,
                lat: currentLatitude,
                lng: currentLongitude,
                index: 1
            });
        } else if (comparisonDots.length === 1) {
            dot.classList.add('compare-2');
            dot.setAttribute('aria-label', `Comparison Location 2 at ${latStr}, ${lngStr}`);
            comparisonDots.push({
                element: dot,
                lat: currentLatitude,
                lng: currentLongitude,
                index: 2
            });
        } else {
            // Replace oldest dot
            comparisonDots[0].element.remove();
            comparisonDots.shift();
            dot.classList.add('compare-1');
            dot.setAttribute('aria-label', `Comparison Location 1 at ${latStr}, ${lngStr}`);
            comparisonDots.push({
                element: dot,
                lat: currentLatitude,
                lng: currentLongitude,
                index: 1
            });
            // Update classes
            if (comparisonDots.length > 1) {
                comparisonDots[1].element.className = 'dot compare-2';
                comparisonDots[1].index = 2;
            }
        }
        updateComparisonPanel();
    }

    // Position the dot using actual map dimensions
    const worldMap = document.getElementById('world-map');
    const mapWidth = worldMap.offsetWidth;
    const mapHeight = worldMap.offsetHeight;

    const x = ((currentLongitude + 180) / 360) * (mapWidth - 20) + 10;
    const y = ((90 - currentLatitude) / 180) * (mapHeight - 20) + 10;

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    dotsContainer.appendChild(dot);

    // Announce to screen readers
    announceToScreenReader(`Dot placed at ${latStr}, ${lngStr}`);

    // Add click-to-remove functionality
    dot.addEventListener('click', () => {
        dot.remove();
        announceToScreenReader(`Dot removed from ${latStr}, ${lngStr}`);
        if (compareMode) {
            comparisonDots = comparisonDots.filter(d => d.element !== dot);
            updateComparisonPanel();
        }
    });

    // Add keyboard support for removing dots
    dot.setAttribute('tabindex', '0');
    dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            dot.click();
        }
    });
}

// Clear all dots
function clearAllDots() {
    const dotCount = dotsContainer.children.length;
    dotsContainer.innerHTML = '';
    comparisonDots = [];
    updateComparisonPanel();

    if (dotCount > 0) {
        announceToScreenReader(`Cleared ${dotCount} dot${dotCount !== 1 ? 's' : ''} from map`);
    }
}

// Clear only comparison dots
function clearComparisonDots() {
    const compareDotsCount = comparisonDots.length;

    // Remove comparison dots from the DOM
    comparisonDots.forEach(dotData => {
        if (dotData.element && dotData.element.parentNode) {
            dotData.element.remove();
        }
    });

    // Clear the comparison dots array
    comparisonDots = [];
    updateComparisonPanel();

    if (compareDotsCount > 0) {
        announceToScreenReader(`Cleared ${compareDotsCount} comparison dot${compareDotsCount !== 1 ? 's' : ''} from map`);
    }
}

// Enable compare mode
function enableCompareMode() {
    compareMode = true;
    updateComparisonPanelVisibility();
    announceToScreenReader('Compare mode enabled automatically');
}

// Disable compare mode
function disableCompareMode() {
    compareMode = false;
    updateComparisonPanelVisibility();
    announceToScreenReader('Compare mode disabled');

    // Remove compare-specific dots
    document.querySelectorAll('.dot.compare-1, .dot.compare-2').forEach(dot => {
        dot.className = 'dot';
    });
    comparisonDots = [];
    updateComparisonPanel();
}

// Toggle compare mode (legacy function - now simplified)
function toggleCompareMode() {
    if (compareMode) {
        disableCompareMode();
    } else {
        enableCompareMode();
    }
}// Update comparison panel
function updateComparisonPanel() {
    const location1 = document.getElementById('location-1');
    const location2 = document.getElementById('location-2');
    const analysis = document.getElementById('comparison-analysis');

    if (comparisonDots.length >= 1) {
        const dot1 = comparisonDots.find(d => d.index === 1) || comparisonDots[0];
        const lat1Str = dot1.lat >= 0 ? `${dot1.lat.toFixed(1)}°N` : `${Math.abs(dot1.lat).toFixed(1)}°S`;
        const lng1Str = dot1.lng >= 0 ? `${dot1.lng.toFixed(1)}°E` : `${Math.abs(dot1.lng).toFixed(1)}°W`;

        location1.querySelector('.coords').textContent = `${lat1Str}, ${lng1Str}`;
        location1.querySelector('.description').textContent = getLocationDescription(dot1.lat, dot1.lng);
    } else {
        location1.querySelector('.coords').textContent = 'Not set';
        location1.querySelector('.description').textContent = '-';
    }

    if (comparisonDots.length >= 2) {
        const dot2 = comparisonDots.find(d => d.index === 2) || comparisonDots[1];
        const lat2Str = dot2.lat >= 0 ? `${dot2.lat.toFixed(1)}°N` : `${Math.abs(dot2.lat).toFixed(1)}°S`;
        const lng2Str = dot2.lng >= 0 ? `${dot2.lng.toFixed(1)}°E` : `${Math.abs(dot2.lng).toFixed(1)}°W`;

        location2.querySelector('.coords').textContent = `${lat2Str}, ${lng2Str}`;
        location2.querySelector('.description').textContent = getLocationDescription(dot2.lat, dot2.lng);
    } else {
        location2.querySelector('.coords').textContent = 'Not set';
        location2.querySelector('.description').textContent = '-';
    }

    // Update analysis
    if (comparisonDots.length >= 2) {
        const dot1 = comparisonDots.find(d => d.index === 1) || comparisonDots[0];
        const dot2 = comparisonDots.find(d => d.index === 2) || comparisonDots[1];

        const latDiff = Math.abs(dot1.lat - dot2.lat);
        const lngDiff = Math.abs(dot1.lng - dot2.lng);

        let analysisText = `<strong>Comparison Analysis:</strong><br>`;
        analysisText += `• Latitude difference: ${latDiff.toFixed(1)}° `;
        analysisText += latDiff > 45 ? '(Very different north-south positions)' :
            latDiff > 20 ? '(Moderately different north-south positions)' :
                '(Similar north-south positions)';
        analysisText += `<br>• Longitude difference: ${lngDiff.toFixed(1)}° `;
        analysisText += lngDiff > 90 ? '(Very different east-west positions)' :
            lngDiff > 45 ? '(Moderately different east-west positions)' :
                '(Similar east-west positions)';

        // Hemisphere comparison
        const sameLatHemisphere = (dot1.lat >= 0) === (dot2.lat >= 0);
        const sameLngHemisphere = (dot1.lng >= 0) === (dot2.lng >= 0);

        analysisText += `<br>• Both locations are in the ${sameLatHemisphere ? 'same' : 'different'} latitude hemisphere(s)`;
        analysisText += `<br>• Both locations are in the ${sameLngHemisphere ? 'same' : 'different'} longitude hemisphere(s)`;

        analysis.innerHTML = analysisText;
    } else {
        analysis.textContent = 'Place two dots to see the comparison!';
    }
}

// Get location description based on coordinates
function getLocationDescription(lat, lng) {
    if (Math.abs(lat) < 5 && Math.abs(lng) < 5) {
        return "Near Equator & Prime Meridian intersection";
    } else if (lat > 66.5) {
        return "Arctic Circle";
    } else if (lat < -66.5) {
        return "Antarctic Circle";
    } else if (Math.abs(lat) <= 23.5) {
        return "Tropical Zone";
    } else if (lat > 23.5) {
        return "Northern Temperate Zone";
    } else {
        return "Southern Temperate Zone";
    }
}

// Animate to specific coordinates (for challenges)
function animateToCoordinates(targetLat, targetLng) {
    const startLat = currentLatitude;
    const startLng = currentLongitude;
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const animate = () => {
        currentStep++;
        const progress = currentStep / steps;

        // Easing function for smooth animation
        const easeInOut = progress < 0.5 ?
            2 * progress * progress :
            1 - Math.pow(-2 * progress + 2, 3) / 2;

        const newLat = startLat + (targetLat - startLat) * easeInOut;
        const newLng = startLng + (targetLng - startLng) * easeInOut;

        // Update sliders and current values
        currentLatitude = newLat;
        currentLongitude = newLng;
        latitudeSlider.value = newLat;
        longitudeSlider.value = newLng;

        updateLatitudeDisplay();
        updateLongitudeDisplay();
        updatePosition();
        updateFeedback();

        if (currentStep < steps) {
            setTimeout(animate, stepDuration);
        } else {
            // Announce when animation completes
            const latStr = targetLat >= 0 ? `${targetLat}°N` : `${Math.abs(targetLat)}°S`;
            const lngStr = targetLng >= 0 ? `${targetLng}°E` : `${Math.abs(targetLng)}°W`;
            announceToScreenReader(`Moved to ${latStr}, ${lngStr}`);
        }
    };

    animate();
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);