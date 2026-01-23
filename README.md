# Latitude and Longitude Explorer

An interactive learning activity for Texas State Technical College Physical Science students studying Earth and Space. Designed to help students understand and contrast latitude and longitude coordinates through an engaging tabbed interface.

## Learning Objective

**LO4.1.3**: Contrast latitude and longitude

## Features

### Tabbed Learning Interface
- **Explore Tab**: Interactive coordinate exploration with real-time feedback
- **Challenges Tab**: Guided activities to discover key locations (North Pole, Tropic of Cancer/Capricorn, etc.)
- **Compare Tab**: Advanced two-location comparison with automatic analysis
- **Reference Tab**: Quick reference guide and key learning points

### Interactive Controls
- **Dual Sliders**: Independent control of latitude (-90° to +90°) and longitude (-180° to +180°)
- **Visual Map**: Equirectangular world map with real geography and responsive grid lines
- **Crosshair Indicator**: Real-time visual feedback of current coordinates
- **Automatic Compare Mode**: Compare functionality activates when entering Compare tab

### Educational Components
- **Interactive Instructions**: Clear guidance for using sliders and tabs
- **Dynamic Feedback**: Real-time geographical context based on current coordinates
- **Hemisphere Indicators**: Shows Northern/Southern and Eastern/Western positions
- **Seven Challenge Activities**: Preset challenges including both Tropics and major cities
- **Visual Grid Lines**: Color-coded Equator (Lone Star Red) and Prime Meridian (Texas Blue)
- **Responsive Design**: Optimized for all screen sizes with accurate grid positioning

### Brand Integration
- **Texas State Technical College Colors**: Texas Blue (#1d2757) and Lone Star Red (#d13138)
- **Professional Design**: Consistent with institutional branding guidelines
- **Enhanced Visibility**: Strategic use of red accents for important interactive elements

### Accessibility
- Full keyboard navigation support
- Screen reader compatible with ARIA labels
- High contrast mode support
- Reduced motion preferences honored
- See [ACCESSIBILITY.md](ACCESSIBILITY.md) for complete details

## Files

- `index.html` - Main HTML structure with semantic markup and tabbed interface
- `styles.css` - Complete styling with brand colors, responsive design, and accessibility features
- `script.js` - Interactive functionality with tab management and educational logic
- `generate_world_map.py` - Python script to generate the equirectangular map
- `world_map_equirectangular.png` - Generated world map (800x400px)
- `BRAND-GUIDELINES.md` - Texas State Technical College brand color specifications
- `ACCESSIBILITY.md` - Comprehensive accessibility documentation

## Getting Started

### Simple Setup (No Installation Required)
1. Open `index.html` in any modern web browser
2. The activity is ready to use immediately!

## How to Use

### Getting Started
1. **Read the instructions** above the sliders and tabs
2. **Use the sliders** to move the crosshair and explore coordinates
3. **Select different tabs** to access various learning activities
4. **Watch the coordinate display** to see your current position

### Tab-by-Tab Guide

#### Explore Tab (Default)
- Move sliders to explore different locations
- Read real-time feedback about your current coordinates
- Learn about hemispheres, geographical context, and coordinate relationships

#### Challenges Tab
Click challenge buttons to navigate to important locations:
- Equator & Prime Meridian intersection
- North and South Poles
- Tropic of Cancer and Tropic of Capricorn
- Major cities (New York, London)

#### Compare Tab
- Use sliders to position first location, then click "Place Comparison Dot"
- Move to different coordinates and place a second dot
- Automatic analysis shows coordinate differences and relationships
- Use "Clear Comparison Dots" to start over

#### Reference Tab
- Quick reference cards for latitude vs longitude
- Key learning points summary
- Helpful for review and reinforcement

### Keyboard Navigation
- **Tab**: Move between controls
- **Arrow Keys**: Fine-tune slider positions
- **Page Up/Down**: Larger slider adjustments
- **Home/End**: Jump to min/max values
- **Enter/Space**: Activate buttons
- **Delete/Backspace**: Remove focused dots

## Educational Design & Features

### Tabbed Learning Progression
The interface is organized into four tabs that provide a natural learning progression:

#### 1. **Explore Tab** - Discovery & Fundamentals
- Interactive coordinate exploration with real-time feedback
- Hemisphere identification and geographic context
- Coordinate validation and error prevention
- Foundation building for spatial awareness

#### 2. **Challenges Tab** - Guided Practice  
- Seven pre-defined locations for structured learning
- Automatic navigation to important geographical points
- Reinforcement of key concepts (poles, tropics, prime meridian)
- Immediate success feedback and coordinate display

#### 3. **Compare Tab** - Advanced Analysis
- Two-point comparison with automatic difference calculation
- Distance and direction analysis between locations
- Visual representation of coordinate relationships
- Critical thinking through spatial comparison

#### 4. **Reference Tab** - Quick Learning Support
- Concise latitude vs longitude differentiation
- Key concept summary cards
- Always-available reference material
- Reinforcement of core learning objectives

### Texas State Technical College Brand Integration
- **Texas Blue (#1d2757)**: Primary interface elements, headers, active states
- **Lone Star Red (#d13138)**: Action buttons, emphasis, feedback elements
- Professional appearance aligned with institutional branding
- Consistent color application throughout all interface components

### Pedagogical Approach
### Pedagogical Approach
The activity helps students **contrast** latitude and longitude through:

1. **Visual Distinction**: Red horizontal line (Equator) vs blue vertical line (Prime Meridian)
2. **Independent Controls**: Separate sliders showing how each coordinate works differently
3. **Direction Feedback**: North/South vs East/West indicators
4. **Range Comparison**: -90° to +90° vs -180° to +180°
5. **Hemisphere Learning**: Shows how each coordinate system divides Earth differently
6. **Advanced Comparison**: Direct analysis of coordinate differences between two locations

### Accessibility & Inclusive Design
- High contrast colors for visual accessibility
- ARIA labels and semantic HTML structure
- Keyboard navigation support
- Clear visual hierarchy and typography
- Responsive design for all devices

### Technical Implementation
- **Responsive SVG Mapping**: Accurate coordinate-to-pixel conversion across all screen sizes
- **Real-time Validation**: Prevents invalid coordinate ranges and provides immediate feedback
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Cross-browser Compatibility**: Tested across modern browsers
- **Performance Optimized**: Minimal dependencies, fast loading times

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
