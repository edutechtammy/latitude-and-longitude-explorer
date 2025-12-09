# Latitude and Longitude Explorer

An interactive learning activity for Technical College Physical Science students studying Earth and Space. Designed to help students understand and contrast latitude and longitude coordinates.

## Learning Objective

**LO4.1.3**: Contrast latitude and longitude

## Features

### Interactive Controls
- **Dual Sliders**: Independent control of latitude (-90° to +90°) and longitude (-180° to +180°)
- **Visual Map**: Equirectangular world map with real geography
- **Crosshair Indicator**: Real-time visual feedback of current coordinates
- **Place Dots**: Mark locations on the map for reference and comparison
- **Compare Mode**: Place two dots and analyze differences in their coordinates

### Educational Components
- **Quick Reference Panel**: Side-by-side comparison of latitude vs longitude characteristics
- **Dynamic Feedback**: Real-time geographical context based on current coordinates
- **Hemisphere Indicators**: Shows Northern/Southern and Eastern/Western positions
- **Challenge Activities**: Six preset challenges to explore specific locations
- **Visual Grid Lines**: Color-coded Equator (red) and Prime Meridian (blue)
- **Learning Summary**: Key takeaways about coordinate systems

### Accessibility
- Full keyboard navigation support
- Screen reader compatible with ARIA labels
- High contrast mode support
- Reduced motion preferences honored
- See [ACCESSIBILITY.md](ACCESSIBILITY.md) for complete details

## Files

- `index.html` - Main HTML structure with semantic markup
- `styles.css` - Complete styling with responsive design and accessibility features
- `script.js` - Interactive functionality and educational logic
- `generate_world_map.py` - Python script to generate the equirectangular map
- `world_map_equirectangular.png` - Generated world map (800x400px)
- `ACCESSIBILITY.md` - Comprehensive accessibility documentation

## Getting Started

### Simple Setup (No Installation Required)
1. Open `index.html` in any modern web browser
2. The activity is ready to use immediately!

### Regenerating the World Map (Optional)

If you need to regenerate the map with different specifications:

**Requirements:**
- Python 3.6+
- matplotlib
- cartopy

**Installation:**
```bash
# Create virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate

# Install dependencies
pip install matplotlib cartopy
```

**Generate Map:**
```bash
python generate_world_map.py
```

This creates `world_map_equirectangular.png` with:
- 800×400 pixel dimensions (2:1 aspect ratio)
- Equirectangular projection for accurate coordinate mapping
- Full coverage: -180° to 180° longitude, -90° to 90° latitude
- No padding or borders

## How to Use

### Basic Interaction
1. **Move the sliders** to explore different latitude and longitude coordinates
2. **Watch the crosshair** move on the map to show your position
3. **Read the feedback** to learn about the geographical context
4. **Click "Place Red Dot"** to mark a location

### Try the Challenges
Click any challenge button to automatically navigate to important locations:
- Equator & Prime Meridian intersection
- North and South Poles
- Tropic of Cancer
- Major cities (New York, London)

### Compare Mode
1. Click **"Enable Compare Mode"**
2. Place your first dot at any coordinate
3. Move to a different location and place a second dot
4. Review the **comparison panel** to see the differences

### Keyboard Navigation
- **Tab**: Move between controls
- **Arrow Keys**: Fine-tune slider positions
- **Page Up/Down**: Larger slider adjustments
- **Home/End**: Jump to min/max values
- **Enter/Space**: Activate buttons
- **Delete/Backspace**: Remove focused dots

## Educational Design

### Addresses Learning Objective
The activity helps students **contrast** latitude and longitude through:

1. **Visual Distinction**: Red horizontal line (Equator) vs blue vertical line (Prime Meridian)
2. **Independent Controls**: Separate sliders showing how each coordinate works differently
3. **Direction Feedback**: North/South vs East/West indicators
4. **Range Comparison**: -90° to +90° vs -180° to +180°
5. **Hemisphere Learning**: Shows how each coordinate system divides Earth differently
6. **Comparison Mode**: Direct analysis of coordinate differences between two locations

### Pedagogical Features
- **Immediate feedback**: Reinforces learning in real-time
- **Multiple representations**: Visual (map), numerical (coordinates), textual (descriptions)
- **Progressive complexity**: Start simple, add comparison for deeper understanding
- **Self-directed exploration**: Students can experiment freely
- **Structured challenges**: Guided practice for key concepts

## Browser Compatibility

- Chrome/Edge (recommended): Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design with touch support

## Technical Specifications

### Map Projection
- **Type**: Equirectangular (Plate Carrée)
- **Dimensions**: 800×400 pixels
- **Coordinate Mapping**: Linear relationship between lat/lng and x/y pixels
- **Coverage**: Complete global coverage with no distortion at the equator

### Coordinate System
- **Latitude**: -90° (South Pole) to +90° (North Pole)
- **Longitude**: -180° (International Date Line, West) to +180° (Date Line, East)
- **Precision**: 0.1° increments (approximately 11 km at equator)

## Customization

### Modifying Challenges
Edit the challenge buttons in `index.html`:
```html
<button class="challenge-btn" data-lat="YOUR_LAT" data-lng="YOUR_LNG">
    Your Challenge Name
</button>
```

### Adjusting Map Appearance
Modify `generate_world_map.py` to change:
- Colors (ocean, land)
- Features (borders, lakes, coastlines)
- Resolution
- Additional annotations

### Styling
Edit `styles.css` to customize:
- Color scheme
- Button styles
- Layout and spacing
- Font choices

## License

This educational material is designed for use in Technical College Physical Science courses. Feel free to adapt for your educational needs.

## Support

For questions, issues, or suggestions for improvement, please document:
- Browser and version
- Operating system
- Steps to reproduce any issues
- Expected vs actual behavior

## Credits

- Map data: Natural Earth (via Cartopy)
- Projection: Equirectangular/Plate Carrée
- Educational design: Aligned with Physical Science learning objectives
