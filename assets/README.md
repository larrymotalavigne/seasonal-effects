# Assets Directory

This directory contains visual assets for the README and documentation.

## Required Assets

To complete the README demo section, create the following files:

### Preview GIFs (Recommended size: 600x400px, < 5MB each)

- `snow-preview.gif` - Snow effect demonstration
- `fireworks-preview.gif` - Fireworks effect demonstration
- `petals-preview.gif` - Cherry blossom petals demonstration
- `confetti-preview.gif` - Confetti effect demonstration
- `leaves-preview.gif` - Falling leaves demonstration

### Main Demo Video (Optional)

- `demo-video.mp4` - Full feature demonstration (30-60 seconds)

## How to Create These Assets

### Method 1: Using the Example App

1. **Start the example application**:
   ```bash
   cd examples/basic-usage
   npm install
   npm start
   ```

2. **Record each effect**:
   - Navigate to http://localhost:4200
   - Use screen recording software to capture each effect section
   - Record for 5-10 seconds per effect

3. **Convert to GIF**:
   ```bash
   # Using FFmpeg
   ffmpeg -i snow-effect.mov -vf "fps=30,scale=600:-1:flags=lanczos" -loop 0 snow-preview.gif

   # Optimize size
   gifsicle -O3 --colors 128 snow-preview.gif -o snow-preview.gif
   ```

### Method 2: Using Screen Recording Tools

**Windows - ScreenToGif**:
1. Download from https://www.screentogif.com/
2. Select area to record
3. Record effect (5-10 seconds)
4. Export as GIF with optimization

**macOS - Kap**:
1. Download from https://getkap.co/
2. Select recording area
3. Record effect
4. Export as GIF

**Linux - Peek**:
1. Install: `sudo apt install peek`
2. Select area
3. Record effect
4. Save as GIF

### Method 3: Using GitHub Issue Trick

1. Create a temporary issue in your repository
2. Drag and drop video files into the issue comment
3. Copy the generated GitHub CDN URL
4. Use that URL in the README
5. Close the issue (optional)

## Recommended Settings

- **Frame Rate**: 30 fps
- **Duration**: 5-10 seconds per effect
- **Resolution**: 600x400px or 800x600px
- **File Size**: < 5MB per GIF
- **Colors**: 128-256 colors for smaller file size
- **Loop**: Infinite

## GIF Optimization Tools

- [gifsicle](https://www.lcdf.org/gifsicle/) - Command-line GIF optimizer
- [ezgif.com](https://ezgif.com/optimize) - Online GIF optimizer
- [gifski](https://gif.ski/) - High-quality GIF encoder

## Example FFmpeg Commands

```bash
# Convert video to GIF (basic)
ffmpeg -i input.mov -vf "fps=30,scale=600:-1:flags=lanczos" output.gif

# Convert with better quality
ffmpeg -i input.mov -vf "fps=30,scale=600:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif

# Trim video first (e.g., 5 seconds from start)
ffmpeg -ss 00:00:00 -t 00:00:05 -i input.mov output-trimmed.mov

# Create looping GIF
ffmpeg -i input.mov -vf "fps=30,scale=600:-1:flags=lanczos" -loop 0 output.gif
```

## Alternative: Use Placeholder Images

If you don't have demo videos yet, you can use placeholder images:

```markdown
![Snow Effect](https://via.placeholder.com/600x400/e3f2fd/1976d2?text=Snow+Effect)
```

Or create simple diagrams/screenshots until proper demos are ready.
