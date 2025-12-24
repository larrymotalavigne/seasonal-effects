# Creating Demo Videos for @seasonal-effects/angular

This guide helps you create professional demo videos and GIFs for the library.

## Quick Setup

### 1. Install Dependencies

```bash
# Install Angular dependencies
npm install

# Install recording tools (optional)
# macOS
brew install ffmpeg gifsicle

# Ubuntu/Debian
sudo apt install ffmpeg gifsicle

# Windows (using Chocolatey)
choco install ffmpeg
```

### 2. Build the Library

```bash
npm run build
```

### 3. Run the Demo App

```bash
cd examples/basic-usage
npm install
npm start
```

Open http://localhost:4200

## Recording Instructions

### Individual Effect Previews

Record each effect separately for the README table:

1. **Snow Effect**
   - Scroll to the "Snow Effect" section
   - Record 8-10 seconds
   - Save as `snow-recording.mov`

2. **Fireworks Effect**
   - Scroll to the "Fireworks Effect" section
   - Wait for 2-3 fireworks to launch
   - Record 8-10 seconds
   - Save as `fireworks-recording.mov`

3. **Petals Effect**
   - Scroll to the "Petals Effect" section
   - Record 8-10 seconds
   - Save as `petals-recording.mov`

4. **Confetti Effect** (if adding manually)
   - Use directive: `<div seasonalEffect="confetti">`
   - Record 8-10 seconds
   - Save as `confetti-recording.mov`

5. **Leaves Effect** (if adding manually)
   - Use directive: `<div seasonalEffect="leaves">`
   - Record 8-10 seconds
   - Save as `leaves-recording.mov`

### Main Demo Video

For the full demo video:

1. Start at the top of the page
2. Slowly scroll down
3. Show each effect in action
4. Highlight the feature cards
5. Total duration: 30-60 seconds

## Converting to GIF

### Using FFmpeg (Recommended)

```bash
#!/bin/bash
# convert-to-gif.sh

# Convert all recordings to optimized GIFs
for effect in snow fireworks petals confetti leaves; do
  if [ -f "${effect}-recording.mov" ]; then
    echo "Converting ${effect}..."

    # Generate palette for better quality
    ffmpeg -i "${effect}-recording.mov" \
      -vf "fps=30,scale=600:-1:flags=lanczos,palettegen" \
      -y "${effect}-palette.png"

    # Create GIF using palette
    ffmpeg -i "${effect}-recording.mov" \
      -i "${effect}-palette.png" \
      -lavfi "fps=30,scale=600:-1:flags=lanczos [x]; [x][1:v] paletteuse" \
      -loop 0 \
      "${effect}-preview.gif"

    # Optimize
    gifsicle -O3 --colors 128 "${effect}-preview.gif" -o "../assets/${effect}-preview.gif"

    # Cleanup
    rm "${effect}-palette.png"

    echo "✓ ${effect}-preview.gif created"
  fi
done

echo "All GIFs created in ../assets/"
```

### Manual Conversion

```bash
# 1. Generate palette
ffmpeg -i snow-recording.mov -vf "fps=30,scale=600:-1:flags=lanczos,palettegen" palette.png

# 2. Create GIF with palette
ffmpeg -i snow-recording.mov -i palette.png -lavfi "fps=30,scale=600:-1:flags=lanczos [x]; [x][1:v] paletteuse" snow.gif

# 3. Optimize
gifsicle -O3 --colors 128 snow.gif -o ../assets/snow-preview.gif

# 4. Check file size
du -h ../assets/snow-preview.gif
```

## Alternative: Using Web Tools

### LICEcap (Simple, cross-platform)

1. Download from https://www.cockos.com/licecap/
2. Position the recording frame over effect
3. Click Record
4. Save directly as GIF

### ScreenToGif (Windows, feature-rich)

1. Download from https://www.screentogif.com/
2. Select "Recorder"
3. Position frame and click Record
4. Stop recording
5. Use built-in editor to:
   - Trim frames
   - Add text/arrows
   - Reduce colors
   - Optimize size
6. Export as GIF

## Quality Guidelines

- **Resolution**: 600x400 or 800x600 pixels
- **Frame Rate**: 24-30 fps
- **Duration**: 5-10 seconds (looping)
- **File Size**: < 5MB per GIF
- **Colors**: 128-256 colors
- **Bitrate**: Balance quality vs. size

## Hosting Options

### Option 1: In Repository

```bash
git add assets/*.gif
git commit -m "docs: add effect preview GIFs"
git push
```

Then reference: `![Snow](./assets/snow-preview.gif)`

### Option 2: GitHub CDN (via Issue)

1. Create new issue in repository
2. Drag-drop GIF into comment
3. Copy generated URL (e.g., `https://github.com/user-attachments/assets/...`)
4. Use URL in README
5. Can close issue after

### Option 3: External Hosting

- [Imgur](https://imgur.com/) - Free image hosting
- [Cloudinary](https://cloudinary.com/) - CDN with optimization
- [GitHub Pages](https://pages.github.com/) - Host with your docs

## Creating a Video Demo

### Script Example

```
[0:00-0:05] Title card: "@seasonal-effects/angular"
[0:05-0:10] Show installation command
[0:10-0:15] Show provider setup code
[0:15-0:20] Snow effect in action
[0:20-0:25] Fireworks effect
[0:25-0:30] Petals effect
[0:30-0:35] Show directive usage
[0:35-0:40] Show intensity levels
[0:40-0:45] Show SSR compatibility
[0:45-0:50] Show accessibility (reduced motion)
[0:50-0:60] Closing: GitHub link + call-to-action
```

### Video Tools

- **OBS Studio** - Free, professional recording
- **QuickTime** (macOS) - Simple screen recording
- **ShareX** (Windows) - Feature-rich, free
- **SimpleScreenRecorder** (Linux) - Easy to use

## Tips for Great Demos

1. **Clean Browser**: Use incognito/private mode
2. **Resolution**: Record at 1920x1080, scale down later
3. **Cursor**: Hide cursor or use smooth movements
4. **Duration**: Keep individual GIFs short (5-10s)
5. **Looping**: Ensure smooth loop transitions
6. **Performance**: Close other apps for smooth recording
7. **Testing**: Preview GIF before committing

## Troubleshooting

**GIF too large?**
- Reduce resolution: `-vf scale=400:-1`
- Reduce colors: `--colors 64`
- Reduce frame rate: `fps=20`
- Trim duration: Record less

**Choppy animation?**
- Increase frame rate: `fps=30`
- Use palette-based conversion
- Check CPU usage during recording

**Poor quality?**
- Use palette generation method
- Increase colors: `--colors 256`
- Higher source resolution
- Better source video quality

## Automation Script

Create `scripts/create-demos.sh`:

```bash
#!/bin/bash
set -e

echo "🎬 Creating demo assets..."

# Ensure assets directory exists
mkdir -p assets

# Check if recordings exist
if [ ! -f "recordings/snow-recording.mov" ]; then
  echo "❌ No recordings found in recordings/ directory"
  echo "Please record effects first using the demo app"
  exit 1
fi

cd recordings

# Process each effect
for effect in snow fireworks petals confetti leaves; do
  if [ -f "${effect}-recording.mov" ]; then
    echo "Processing ${effect}..."

    ffmpeg -i "${effect}-recording.mov" \
      -vf "fps=30,scale=600:-1:flags=lanczos,palettegen" \
      -y "${effect}-palette.png" -loglevel error

    ffmpeg -i "${effect}-recording.mov" -i "${effect}-palette.png" \
      -lavfi "fps=30,scale=600:-1 [x]; [x][1:v] paletteuse" \
      -loop 0 "${effect}.gif" -loglevel error

    gifsicle -O3 --colors 128 "${effect}.gif" -o "../assets/${effect}-preview.gif"

    rm "${effect}-palette.png" "${effect}.gif"

    size=$(du -h "../assets/${effect}-preview.gif" | cut -f1)
    echo "✓ ${effect}-preview.gif ($size)"
  fi
done

echo "✅ All demos created in assets/"
```

Make executable: `chmod +x scripts/create-demos.sh`

Run: `./scripts/create-demos.sh`
