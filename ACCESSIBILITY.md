# Accessibility Features

This interactive learning activity has been designed with comprehensive accessibility features to ensure all students can effectively learn about latitude and longitude.

## WCAG 2.1 Level AA Compliance

### Keyboard Navigation
- **Full keyboard support**: All interactive elements can be accessed using the Tab key
- **Skip link**: Press Tab on page load to access "Skip to main content" link
- **Enhanced slider controls**:
  - Arrow keys: Fine adjustments (0.1°)
  - Page Up/Down: Large adjustments (1°)
  - Home/End: Jump to minimum/maximum values
- **Enter/Space**: Activate buttons and remove dots
- **Delete/Backspace**: Remove focused dots from map

### Screen Reader Support
- **Semantic HTML**: Proper landmarks (header, main, nav, aside, footer)
- **ARIA labels**: Descriptive labels for all interactive elements
- **ARIA live regions**: Dynamic content updates announced automatically
- **ARIA attributes**: slider values, button states (aria-pressed), and hidden decorative elements
- **Role attributes**: Proper roles for lists, status updates, and presentational elements

### Visual Accessibility
- **Focus indicators**: High-visibility yellow outlines (3px) on all focusable elements
- **Color contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Multiple cues**: Not relying on color alone (text + icons + position)
- **High contrast mode**: Enhanced outlines and borders for users with high contrast preferences
- **Reduced motion**: Animations disabled for users who prefer reduced motion

### Content Accessibility
- **Clear language**: Simple, educational explanations
- **Descriptive labels**: Challenge buttons include full coordinate information
- **Feedback messages**: Real-time updates about current location and geographical context
- **Multiple learning modalities**: Visual (map), auditory (screen reader), and kinesthetic (sliders)

## Screen Reader Testing

### Recommended Testing Procedure
1. **NVDA** (Windows): Free, open-source screen reader
2. **JAWS** (Windows): Industry-standard screen reader
3. **VoiceOver** (macOS/iOS): Built-in Apple screen reader
4. **TalkBack** (Android): Built-in Android screen reader

### Expected Announcements
- Slider movements: "25.5 degrees North"
- Button presses: "Dot placed at 40.7°N, 74°W"
- Mode changes: "Compare mode enabled"
- Challenge completion: "Moved to 0°N, 0°E"
- Dot removal: "Dot removed from 51.5°N, 0°E"

## Assistive Technology Compatibility

### Supported Technologies
- Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- Screen magnification software
- Voice control software (Dragon NaturallySpeaking, Voice Control)
- Switch access devices
- Alternative input devices

### Known Limitations
- The visual map representation is primarily visual; screen reader users rely on coordinate feedback
- Dots on map are clickable but don't provide spatial context without vision
- Compare mode is fully accessible but may be more intuitive with visual reference

## Student Accommodations

### For Students with Visual Impairments
- Complete keyboard navigation eliminates need for precise mouse control
- Screen reader announces all coordinate changes and geographical context
- Text-based feedback provides rich context about locations

### For Students with Motor Impairments
- Large touch targets (minimum 44x44px for buttons)
- Keyboard shortcuts reduce need for precise movements
- Dots can be removed via keyboard (no mouse required)

### For Students with Cognitive Disabilities
- Clear, consistent layout with logical flow
- Step-by-step challenges with specific targets
- Immediate feedback reinforces learning
- Multiple ways to interact with content

### For Students with Hearing Impairments
- All content is visual and does not require audio
- No audio-only information

## Accessibility Checklist

- ✅ Keyboard accessible
- ✅ Screen reader compatible
- ✅ High contrast mode support
- ✅ Focus indicators visible
- ✅ ARIA attributes implemented
- ✅ Semantic HTML structure
- ✅ Skip navigation link
- ✅ Live region announcements
- ✅ Reduced motion support
- ✅ Color contrast compliant
- ✅ Touch target size adequate
- ✅ Descriptive labels present

## Testing Checklist

### Manual Testing
- [ ] Tab through entire page
- [ ] Use only keyboard to complete all tasks
- [ ] Test with screen reader
- [ ] Verify focus indicators are visible
- [ ] Test with 200% zoom
- [ ] Test with high contrast mode
- [ ] Test on mobile devices

### Automated Testing Tools
- axe DevTools (browser extension)
- WAVE (Web Accessibility Evaluation Tool)
- Lighthouse (Chrome DevTools)
- Pa11y (command line tool)

## Contact for Accessibility Issues

If students or instructors encounter accessibility barriers, please document:
1. The specific task or feature affected
2. Assistive technology being used (if any)
3. Browser and operating system
4. Expected vs. actual behavior

This helps ensure continuous improvement of accessibility features.
