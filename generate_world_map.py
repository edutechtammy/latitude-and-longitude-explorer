"""
Generate an equirectangular world map for the latitude-longitude interactive activity.
This creates a map with the exact specifications needed for coordinate alignment.
"""

import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
from matplotlib.patches import Rectangle

def generate_world_map():
    """
    Generate an equirectangular world map with:
    - 800x400 pixel dimensions (2:1 aspect ratio)
    - Full coverage: -180° to 180° longitude, -90° to 90° latitude
    - No padding or borders
    - Clear land/water boundaries
    """
    
    # Set up figure with exact dimensions (800x400 pixels at 100 DPI = 8x4 inches)
    fig = plt.figure(figsize=(8, 4), dpi=100)
    
    # Create equirectangular projection (plate carrée)
    ax = plt.axes(projection=ccrs.PlateCarree())
    
    # Set exact extent to cover full lat/lng range
    ax.set_extent([-180, 180, -90, 90], crs=ccrs.PlateCarree())
    
    # Add ocean background
    ax.add_feature(cfeature.OCEAN, facecolor='#87CEEB', edgecolor='none', zorder=0)
    
    # Add land masses
    ax.add_feature(cfeature.LAND, facecolor='#90EE90', edgecolor='#333333', 
                   linewidth=0.5, zorder=1)
    
    # Add coastlines for definition
    ax.add_feature(cfeature.COASTLINE, linewidth=0.5, edgecolor='#333333', zorder=2)
    
    # Add country borders (optional, can be removed if too cluttered)
    ax.add_feature(cfeature.BORDERS, linewidth=0.3, edgecolor='#666666', 
                   linestyle=':', alpha=0.5, zorder=2)
    
    # Add lakes for better geography
    ax.add_feature(cfeature.LAKES, facecolor='#87CEEB', edgecolor='#333333',
                   linewidth=0.3, alpha=0.8, zorder=1)
    
    # Remove all padding and margins
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    ax.set_aspect('auto')
    
    # Remove axis labels and ticks (we'll overlay our own grid in the HTML/CSS)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    
    # Save with no padding
    plt.savefig('world_map_equirectangular.png', 
                dpi=100, 
                bbox_inches='tight',
                pad_inches=0,
                facecolor='#87CEEB',
                edgecolor='none')
    
    print("✓ World map generated successfully!")
    print("✓ File saved as: world_map_equirectangular.png")
    print("✓ Dimensions: 800x400 pixels")
    print("✓ Projection: Equirectangular (Plate Carrée)")
    print("✓ Ready to use in the interactive activity!")
    
    plt.close()

if __name__ == "__main__":
    print("Generating equirectangular world map...")
    print("-" * 50)
    generate_world_map()
